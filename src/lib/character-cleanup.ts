// src/lib/character-cleanup.ts
import { prisma } from './prisma';
import { Character } from './types';

// Generate content hash for duplicate detection
function generateContentHash(character: Character): string {
  const normalized = {
    name: character.name?.trim().toLowerCase(),
    appearance: character.appearance?.trim(),
    personality: character.personality?.trim(),
    backstory_hook: character.backstory_hook?.trim()
  };
  
  return Buffer.from(JSON.stringify(normalized)).toString('base64').slice(0, 16);
}

// Check if characters are duplicates
function isDuplicateCharacter(char1: Character, char2: Character): boolean {
  // Exact name match (case insensitive)
  const name1 = char1.name?.trim().toLowerCase();
  const name2 = char2.name?.trim().toLowerCase();
  
  if (name1 === name2 && name1 && name2) {
    return true;
  }
  
  // Content hash match
  if (generateContentHash(char1) === generateContentHash(char2)) {
    return true;
  }
  
  return false;
}

interface CleanupResult {
  totalCharacters: number;
  duplicatesFound: number;
  duplicatesRemoved: number;
  charactersKept: number;
  errors: string[];
}

/**
 * Clean up duplicate characters for a specific user
 */
export async function cleanupUserDuplicates(userId: string): Promise<CleanupResult> {
  const result: CleanupResult = {
    totalCharacters: 0,
    duplicatesFound: 0,
    duplicatesRemoved: 0,
    charactersKept: 0,
    errors: []
  };
  
  try {
    // Get all characters for the user
    const characters = await prisma.character.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' } // Keep older characters when deduplicating
    });
    
    result.totalCharacters = characters.length;
    
    if (characters.length === 0) {
      return result;
    }
    
    console.log(`Found ${characters.length} characters for user ${userId}`);
    
    // Group characters by content hash and name
    const seenHashes = new Map<string, any>();
    const seenNames = new Map<string, any>();
    const duplicatesToRemove: string[] = [];
    
    for (const dbChar of characters) {
      const character = dbChar.data as unknown as Character;
      const contentHash = generateContentHash(character);
      const normalizedName = character.name?.trim().toLowerCase();
      
      // Check for exact content duplicates
      if (seenHashes.has(contentHash)) {
        const existing = seenHashes.get(contentHash);
        console.log(`Found duplicate content: ${character.name} (${dbChar.id}) vs ${existing.character.name} (${existing.id})`);
        
        result.duplicatesFound++;
        duplicatesToRemove.push(dbChar.id);
        continue;
      }
      
      // Check for name duplicates with similar content
      if (normalizedName && seenNames.has(normalizedName)) {
        const existing = seenNames.get(normalizedName);
        const existingCharacter = existing.data as unknown as Character;
        
        if (isDuplicateCharacter(character, existingCharacter)) {
          console.log(`Found duplicate by name and content: ${character.name} (${dbChar.id}) vs ${existingCharacter.name} (${existing.id})`);
          
          result.duplicatesFound++;
          duplicatesToRemove.push(dbChar.id);
          continue;
        }
      }
      
      // Keep this character
      seenHashes.set(contentHash, dbChar);
      if (normalizedName) {
        seenNames.set(normalizedName, dbChar);
      }
    }
    
    result.charactersKept = characters.length - duplicatesToRemove.length;
    
    console.log(`Found ${duplicatesToRemove.length} duplicates to remove`);
    
    // Remove duplicates in batches
    if (duplicatesToRemove.length > 0) {
      const batchSize = 10;
      
      for (let i = 0; i < duplicatesToRemove.length; i += batchSize) {
        const batch = duplicatesToRemove.slice(i, i + batchSize);
        
        try {
          const deleteResult = await prisma.character.deleteMany({
            where: {
              id: { in: batch },
              userId // Safety check
            }
          });
          
          result.duplicatesRemoved += deleteResult.count;
          console.log(`Removed batch of ${deleteResult.count} duplicates`);
        } catch (error) {
          const errorMsg = `Failed to remove batch: ${error}`;
          console.error(errorMsg);
          result.errors.push(errorMsg);
        }
      }
    }
    
    console.log(`Cleanup completed for user ${userId}: ${result.duplicatesRemoved} duplicates removed, ${result.charactersKept} characters kept`);
    
  } catch (error) {
    const errorMsg = `Error during cleanup: ${error}`;
    console.error(errorMsg);
    result.errors.push(errorMsg);
  }
  
  return result;
}

/**
 * Clean up duplicates for all users (admin function)
 */
export async function cleanupAllUserDuplicates(): Promise<Record<string, CleanupResult>> {
  const results: Record<string, CleanupResult> = {};
  
  try {
    // Get all users who have characters
    const usersWithCharacters = await prisma.character.findMany({
      select: { userId: true },
      distinct: ['userId']
    });
    
    console.log(`Found ${usersWithCharacters.length} users with characters`);
    
    for (const { userId } of usersWithCharacters) {
      try {
        console.log(`Cleaning up duplicates for user: ${userId}`);
        results[userId] = await cleanupUserDuplicates(userId);
        
        // Add a small delay to avoid overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to cleanup user ${userId}:`, error);
        results[userId] = {
          totalCharacters: 0,
          duplicatesFound: 0,
          duplicatesRemoved: 0,
          charactersKept: 0,
          errors: [`Failed to process user: ${error}`]
        };
      }
    }
    
  } catch (error) {
    console.error('Error getting users for cleanup:', error);
  }
  
  return results;
}

/**
 * Get duplicate statistics without removing anything
 */
export async function analyzeDuplicates(userId?: string): Promise<{
  totalCharacters: number;
  duplicateGroups: Array<{
    hash: string;
    characters: Array<{
      id: string;
      name: string;
      createdAt: Date;
    }>;
  }>;
  duplicateCount: number;
}> {
  const where = userId ? { userId } : {};
  
  const characters = await prisma.character.findMany({
    where,
    select: {
      id: true,
      data: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'asc' }
  });
  
  const hashGroups = new Map<string, Array<any>>();
  
  for (const dbChar of characters) {
    const character = dbChar.data as unknown as Character;
    const contentHash = generateContentHash(character);
    
    if (!hashGroups.has(contentHash)) {
      hashGroups.set(contentHash, []);
    }
    
    hashGroups.get(contentHash)!.push({
      id: dbChar.id,
      name: character.name,
      createdAt: dbChar.createdAt
    });
  }
  
  // Find groups with duplicates
  const duplicateGroups = Array.from(hashGroups.entries())
    .filter(([_, group]) => group.length > 1)
    .map(([hash, characters]) => ({ hash, characters }));
  
  const duplicateCount = duplicateGroups.reduce(
    (total, group) => total + (group.characters.length - 1), 
    0
  );
  
  return {
    totalCharacters: characters.length,
    duplicateGroups,
    duplicateCount
  };
}

/**
 * API endpoint to cleanup duplicates for current user
 */
export async function createCleanupAPI() {
  return async function handler(req: Request) {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    try {
      // You'll need to get the current user here
      // const user = await getCurrentUser();
      // if (!user) {
      //   return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      //     status: 401,
      //     headers: { 'Content-Type': 'application/json' }
      //   });
      // }
      
      const { action, userId } = await req.json();
      
      let result;
      
      switch (action) {
        case 'analyze':
          result = await analyzeDuplicates(userId);
          break;
        case 'cleanup':
          if (!userId) {
            throw new Error('User ID required for cleanup');
          }
          result = await cleanupUserDuplicates(userId);
          break;
        default:
          throw new Error('Invalid action');
      }
      
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
    } catch (error) {
      console.error('Cleanup API error:', error);
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  };
}

// Export utility functions for use in other parts of the app
export {
  generateContentHash,
  isDuplicateCharacter
};