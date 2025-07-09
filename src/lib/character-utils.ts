// lib/character-utils.ts - NEW FILE
import { Character } from './types';
import { StoredCharacter } from './character-storage';

/**
 * Advanced character deduplication with multiple strategies
 */
export interface DeduplicationOptions {
  preferCloud?: boolean; // Prefer cloud version over local when duplicates found
  preferNewer?: boolean; // Prefer newer characters when duplicates found
  strictIdMatch?: boolean; // Only consider exact ID matches as duplicates
  fuzzyNameMatch?: boolean; // Also consider similar names as potential duplicates
}

/**
 * Deduplicate an array of stored characters using various strategies
 */
export function deduplicateStoredCharacters(
  characters: StoredCharacter[], 
  options: DeduplicationOptions = {}
): StoredCharacter[] {
  const {
    preferCloud = true,
    preferNewer = true,
    strictIdMatch = true,
    fuzzyNameMatch = false
  } = options;

  if (!strictIdMatch && !fuzzyNameMatch) {
    console.warn('No deduplication strategy specified, defaulting to strict ID match');
    return deduplicateByExactId(characters, preferCloud, preferNewer);
  }

  let result = characters;

  // First pass: Remove exact ID duplicates
  if (strictIdMatch) {
    result = deduplicateByExactId(result, preferCloud, preferNewer);
  }

  // Second pass: Remove fuzzy name duplicates (if enabled)
  if (fuzzyNameMatch) {
    result = deduplicateByFuzzyName(result, preferCloud, preferNewer);
  }

  return result;
}

/**
 * Remove duplicates based on exact ID matches
 */
function deduplicateByExactId(
  characters: StoredCharacter[], 
  preferCloud: boolean, 
  preferNewer: boolean
): StoredCharacter[] {
  const seen = new Map<string, StoredCharacter>();

  for (const character of characters) {
    const existingChar = seen.get(character.id);

    if (!existingChar) {
      seen.set(character.id, character);
    } else {
      // Determine which character to keep
      const shouldReplace = shouldReplaceCharacter(existingChar, character, preferCloud, preferNewer);
      if (shouldReplace) {
        seen.set(character.id, character);
      }
    }
  }

  return Array.from(seen.values());
}

/**
 * Remove duplicates based on fuzzy name matching
 */
function deduplicateByFuzzyName(
  characters: StoredCharacter[], 
  preferCloud: boolean, 
  preferNewer: boolean
): StoredCharacter[] {
  const result: StoredCharacter[] = [];
  const processedNames = new Set<string>();

  for (const character of characters) {
    const normalizedName = normalizeCharacterName(character.character.name);
    
    // Check if we've seen a similar name
    let isDuplicate = false;
    for (const processedName of processedNames) {
      if (areNamesSimilar(normalizedName, processedName)) {
        isDuplicate = true;
        
        // Find the existing character with similar name
        const existingIndex = result.findIndex(c => 
          normalizeCharacterName(c.character.name) === processedName
        );
        
        if (existingIndex >= 0) {
          const existingChar = result[existingIndex];
          const shouldReplace = shouldReplaceCharacter(existingChar, character, preferCloud, preferNewer);
          
          if (shouldReplace) {
            result[existingIndex] = character;
            processedNames.delete(processedName);
            processedNames.add(normalizedName);
          }
        }
        break;
      }
    }

    if (!isDuplicate) {
      result.push(character);
      processedNames.add(normalizedName);
    }
  }

  return result;
}

/**
 * Determine if one character should replace another based on preferences
 */
function shouldReplaceCharacter(
  existing: StoredCharacter, 
  candidate: StoredCharacter, 
  preferCloud: boolean, 
  preferNewer: boolean
): boolean {
  // If one is example and other isn't, prefer non-example
  if (existing.isExample && !candidate.isExample) return true;
  if (!existing.isExample && candidate.isExample) return false;

  // Cloud preference
  if (preferCloud) {
    // Assume cloud characters have more recent updatedAt or don't have isExample flag
    // This is a heuristic since we don't have a direct "isFromCloud" flag
    const existingIsLocal = existing.isExample !== undefined;
    const candidateIsLocal = candidate.isExample !== undefined;
    
    if (existingIsLocal && !candidateIsLocal) return true; // Prefer cloud
    if (!existingIsLocal && candidateIsLocal) return false; // Keep cloud
  }

  // Date preference
  if (preferNewer) {
    const existingDate = new Date(existing.createdAt).getTime();
    const candidateDate = new Date(candidate.createdAt).getTime();
    return candidateDate > existingDate;
  }

  // Default: don't replace
  return false;
}

/**
 * Normalize character name for comparison
 */
function normalizeCharacterName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Check if two normalized names are similar enough to be considered duplicates
 */
function areNamesSimilar(name1: string, name2: string, threshold: number = 0.8): boolean {
  // Simple similarity check - you could use more sophisticated algorithms like Levenshtein distance
  if (name1 === name2) return true;
  
  // Check if one name contains the other
  if (name1.includes(name2) || name2.includes(name1)) return true;
  
  // Basic word overlap check
  const words1 = name1.split(' ').filter(w => w.length > 2);
  const words2 = name2.split(' ').filter(w => w.length > 2);
  
  if (words1.length === 0 || words2.length === 0) return false;
  
  const commonWords = words1.filter(word => words2.includes(word));
  const similarity = commonWords.length / Math.max(words1.length, words2.length);
  
  return similarity >= threshold;
}

/**
 * Validate character uniqueness in an array
 */
export function validateCharacterUniqueness(characters: StoredCharacter[]): {
  isValid: boolean;
  duplicates: Array<{ id: string; count: number; names: string[] }>;
} {
  const idCounts = new Map<string, { count: number; names: string[] }>();
  
  for (const character of characters) {
    const existing = idCounts.get(character.id);
    if (existing) {
      existing.count++;
      existing.names.push(character.character.name);
    } else {
      idCounts.set(character.id, {
        count: 1,
        names: [character.character.name]
      });
    }
  }
  
  const duplicates = Array.from(idCounts.entries())
    .filter(([_, data]) => data.count > 1)
    .map(([id, data]) => ({ id, ...data }));
  
  return {
    isValid: duplicates.length === 0,
    duplicates
  };
}

/**
 * Get character statistics for debugging
 */
export function getCharacterStats(characters: StoredCharacter[]): {
  total: number;
  examples: number;
  userCreated: number;
  withImages: number;
  duplicateIds: number;
  oldestDate: string | null;
  newestDate: string | null;
} {
  const total = characters.length;
  const examples = characters.filter(c => c.isExample).length;
  const userCreated = total - examples;
  const withImages = characters.filter(c => c.hasStoredImage || c.character.image_data).length;
  
  const validation = validateCharacterUniqueness(characters);
  const duplicateIds = validation.duplicates.length;
  
  const dates = characters.map(c => new Date(c.createdAt).getTime()).filter(d => !isNaN(d));
  const oldestDate = dates.length > 0 ? new Date(Math.min(...dates)).toISOString() : null;
  const newestDate = dates.length > 0 ? new Date(Math.max(...dates)).toISOString() : null;
  
  return {
    total,
    examples,
    userCreated,
    withImages,
    duplicateIds,
    oldestDate,
    newestDate
  };
}

/**
 * Emergency deduplication - removes all but the newest version of each character
 */
export function emergencyDeduplicate(characters: StoredCharacter[]): StoredCharacter[] {
  console.warn('Performing emergency deduplication - this may result in data loss');
  
  return deduplicateStoredCharacters(characters, {
    preferCloud: true,
    preferNewer: true,
    strictIdMatch: true,
    fuzzyNameMatch: false
  });
}

/**
 * Sync status for UI display
 */
export interface SyncStatus {
  isAuthenticated: boolean;
  isSyncing: boolean;
  lastSyncTime?: number;
  pendingChanges?: number;
  hasConflicts?: boolean;
}

/**
 * Character library health check
 */
export interface LibraryHealthCheck {
  isHealthy: boolean;
  issues: string[];
  stats: ReturnType<typeof getCharacterStats>;
  recommendations: string[];
}

export function checkLibraryHealth(characters: StoredCharacter[]): LibraryHealthCheck {
  const stats = getCharacterStats(characters);
  const validation = validateCharacterUniqueness(characters);
  
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Check for duplicates
  if (!validation.isValid) {
    issues.push(`Found ${validation.duplicates.length} duplicate character IDs`);
    recommendations.push('Run emergency deduplication to fix duplicates');
  }
  
  // Check for corrupted characters
  const corruptedCount = characters.filter(c => 
    !c.character || !c.character.name || !c.id
  ).length;
  
  if (corruptedCount > 0) {
    issues.push(`Found ${corruptedCount} corrupted characters`);
    recommendations.push('Remove corrupted characters from storage');
  }
  
  // Check for very old characters that might need updating
  const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);
  const oldCharacters = characters.filter(c => 
    new Date(c.createdAt).getTime() < sixMonthsAgo
  ).length;
  
  if (oldCharacters > 50) {
    recommendations.push(`Consider archiving ${oldCharacters} characters older than 6 months`);
  }
  
  const isHealthy = issues.length === 0;
  
  return {
    isHealthy,
    issues,
    stats,
    recommendations
  };
}