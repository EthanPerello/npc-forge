// scripts/emergency-cleanup.ts
// Run this script to clean up existing duplicates in your database
// Usage: npx ts-node scripts/emergency-cleanup.ts

import { PrismaClient } from '@prisma/client';
import { Character } from '../src/lib/types';

const prisma = new PrismaClient();

// Generate content hash for duplicate detection
function generateContentHash(character: Character): string {
  try {
    const normalized = {
      name: character.name?.trim().toLowerCase() || '',
      appearance: character.appearance?.trim() || '',
      personality: character.personality?.trim() || '',
      backstory_hook: character.backstory_hook?.trim() || ''
    };
    
    return Buffer.from(JSON.stringify(normalized)).toString('base64').slice(0, 16);
  } catch (error) {
    console.warn('Error generating content hash:', error);
    // Fallback to a simple hash based on name only
    return Buffer.from(character.name || 'unknown').toString('base64').slice(0, 16);
  }
}

// Check if characters are duplicates
function isDuplicateCharacter(char1: Character, char2: Character): boolean {
  try {
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
  } catch (error) {
    console.warn('Error comparing characters:', error);
    // Fallback to name comparison only
    return char1.name === char2.name;
  }
}

async function main() {
  console.log('🧹 Starting emergency cleanup of duplicate characters...\n');
  
  try {
    // Get all users with characters
    const usersWithCharacters = await prisma.character.findMany({
      select: { userId: true },
      distinct: ['userId']
    });
    
    console.log(`Found ${usersWithCharacters.length} users with characters\n`);
    
    let totalRemoved = 0;
    let totalKept = 0;
    let totalProcessed = 0;
    
    for (const { userId } of usersWithCharacters) {
      console.log(`📁 Processing user: ${userId}`);
      
      // Get all characters for this user
      const characters = await prisma.character.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' } // Keep older characters
      });
      
      totalProcessed += characters.length;
      console.log(`  Found ${characters.length} characters`);
      
      if (characters.length <= 1) {
        console.log(`  No duplicates possible, skipping\n`);
        totalKept += characters.length;
        continue;
      }
      
      // Group by content hash
      const seenHashes = new Map<string, any>();
      const seenNames = new Map<string, any>();
      const duplicatesToRemove: string[] = [];
      
      for (const dbChar of characters) {
        try {
          // Safely extract character data
          let character: Character;
          
          if (!dbChar.data) {
            console.log(`  ⚠️  Skipping character with no data: ${dbChar.id}`);
            continue;
          }
          
          // Handle both direct object and JSON string cases
          if (typeof dbChar.data === 'string') {
            character = JSON.parse(dbChar.data);
          } else {
            character = dbChar.data as unknown as Character;
          }
          
          // Validate that we have a proper character object
          if (!character || typeof character !== 'object' || !character.name) {
            console.log(`  ⚠️  Skipping invalid character data: ${dbChar.id}`);
            continue;
          }
          
          const contentHash = generateContentHash(character);
          const normalizedName = character.name?.trim().toLowerCase();
          
          // Check for exact content duplicates
          if (seenHashes.has(contentHash)) {
            const existing = seenHashes.get(contentHash);
            const existingCharacter = existing.data as unknown as Character;
            console.log(`  🔍 Found content duplicate: "${character.name}" (keeping "${existingCharacter.name}" from ${existing.createdAt.toISOString()})`);
            duplicatesToRemove.push(dbChar.id);
            continue;
          }
          
          // Check for name duplicates with similar content
          if (normalizedName && seenNames.has(normalizedName)) {
            const existing = seenNames.get(normalizedName);
            let existingCharacter: Character;
            
            if (typeof existing.data === 'string') {
              existingCharacter = JSON.parse(existing.data);
            } else {
              existingCharacter = existing.data as unknown as Character;
            }
            
            if (isDuplicateCharacter(character, existingCharacter)) {
              console.log(`  🔍 Found name+content duplicate: "${character.name}" (keeping earlier version from ${existing.createdAt.toISOString()})`);
              duplicatesToRemove.push(dbChar.id);
              continue;
            }
          }
          
          // Keep this character
          seenHashes.set(contentHash, dbChar);
          if (normalizedName) {
            seenNames.set(normalizedName, dbChar);
          }
          
        } catch (error) {
          console.error(`  ❌ Error processing character ${dbChar.id}:`, error);
          // Skip this character and continue
          continue;
        }
      }
      
      const keptCount = characters.length - duplicatesToRemove.length;
      totalKept += keptCount;
      
      if (duplicatesToRemove.length > 0) {
        console.log(`  🗑️  Removing ${duplicatesToRemove.length} duplicates, keeping ${keptCount} unique characters`);
        
        // Remove duplicates in small batches to avoid overwhelming the database
        const batchSize = 5;
        let removed = 0;
        
        for (let i = 0; i < duplicatesToRemove.length; i += batchSize) {
          const batch = duplicatesToRemove.slice(i, i + batchSize);
          
          try {
            const result = await prisma.character.deleteMany({
              where: {
                id: { in: batch },
                userId // Safety check
              }
            });
            
            removed += result.count;
            
            // Small delay to be gentle on the database
            await new Promise(resolve => setTimeout(resolve, 100));
            
          } catch (error) {
            console.error(`  ❌ Error removing batch:`, error);
          }
        }
        
        totalRemoved += removed;
        console.log(`  ✅ Successfully removed ${removed} duplicates`);
      } else {
        console.log(`  ✨ No duplicates found for this user`);
      }
      
      console.log(''); // Empty line for readability
    }
    
    console.log('🎉 Emergency cleanup completed!');
    console.log(`📊 Summary:`);
    console.log(`   Total characters processed: ${totalProcessed}`);
    console.log(`   Duplicates removed: ${totalRemoved}`);
    console.log(`   Unique characters kept: ${totalKept}`);
    console.log(`   Storage reduction: ${((totalRemoved / totalProcessed) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Emergency cleanup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Advanced analysis function
async function analyzeOnly() {
  console.log('🔍 Analyzing duplicate characters (no changes will be made)...\n');
  
  try {
    const allCharacters = await prisma.character.findMany({
      select: {
        id: true,
        userId: true,
        data: true,
        createdAt: true,
      }
    });
    
    console.log(`Total characters in database: ${allCharacters.length}\n`);
    
    // Group by user
    const userGroups = new Map<string, any[]>();
    
    for (const char of allCharacters) {
      if (!userGroups.has(char.userId)) {
        userGroups.set(char.userId, []);
      }
      userGroups.get(char.userId)!.push(char);
    }
    
    let totalDuplicates = 0;
    
    for (const [userId, characters] of userGroups) {
      if (characters.length <= 1) continue;
      
      const hashes = new Map<string, any[]>();
      
      for (const dbChar of characters) {
        try {
          // Safely extract character data
          let character: Character;
          
          if (!dbChar.data) {
            continue;
          }
          
          // Handle both direct object and JSON string cases
          if (typeof dbChar.data === 'string') {
            character = JSON.parse(dbChar.data);
          } else {
            character = dbChar.data as unknown as Character;
          }
          
          // Validate that we have a proper character object
          if (!character || typeof character !== 'object' || !character.name) {
            continue;
          }
          
          const hash = generateContentHash(character);
          
          if (!hashes.has(hash)) {
            hashes.set(hash, []);
          }
          hashes.get(hash)!.push({ dbChar, character });
          
        } catch (error) {
          console.error(`Error processing character ${dbChar.id}:`, error);
          continue;
        }
      }
      
      const duplicateGroups = Array.from(hashes.values()).filter(group => group.length > 1);
      
      if (duplicateGroups.length > 0) {
        console.log(`User ${userId}:`);
        console.log(`  Total characters: ${characters.length}`);
        
        for (const group of duplicateGroups) {
          const duplicateCount = group.length - 1;
          totalDuplicates += duplicateCount;
          
          const characterName = group[0]?.character?.name || 'Unknown Character';
          console.log(`  Duplicate group "${characterName}": ${group.length} copies (${duplicateCount} duplicates)`);
        }
        console.log('');
      }
    }
    
    console.log(`🎯 Analysis complete:`);
    console.log(`   Total duplicate characters that can be removed: ${totalDuplicates}`);
    console.log(`   Potential storage savings: ${((totalDuplicates / allCharacters.length) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--analyze-only')) {
  analyzeOnly();
} else if (args.includes('--help')) {
  console.log('Emergency Cleanup Script for NPC Forge');
  console.log('');
  console.log('Usage:');
  console.log('  npx ts-node scripts/emergency-cleanup.ts           # Run cleanup');
  console.log('  npx ts-node scripts/emergency-cleanup.ts --analyze-only  # Analyze only');
  console.log('  npx ts-node scripts/emergency-cleanup.ts --help          # Show this help');
  console.log('');
  console.log('This script will:');
  console.log('  1. Find all duplicate characters in your database');
  console.log('  2. Keep the oldest version of each character');
  console.log('  3. Remove newer duplicates');
  console.log('  4. Provide a summary of changes made');
} else {
  main();
}