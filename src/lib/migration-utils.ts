// src/lib/migration-utils.ts
import { prisma } from './prisma'
import { saveImage, getImageStorageStatus } from './image-storage'
import { getStoredCharacters, updateCharacter } from './character-storage'
import { isSupabaseAvailable, getStorageUser } from './supabase-client'
import { Character } from './types'

export interface MigrationProgress {
  total: number
  processed: number
  uploaded: number
  failed: number
  skipped: number
  currentCharacter?: string
  errors: Array<{ characterId: string; characterName: string; error: string }>
}

export interface MigrationResult {
  success: boolean
  progress: MigrationProgress
  message: string
}

/**
 * Generate content hash for duplicate detection (Unicode-safe)
 */
function generateContentHash(character: Character): string {
  const normalized = {
    name: character.name?.trim().toLowerCase() || '',
    appearance: character.appearance?.trim() || '',
    personality: character.personality?.trim() || '',
    backstory_hook: character.backstory_hook?.trim() || ''
  }
  
  try {
    const jsonString = JSON.stringify(normalized)
    
    // Use TextEncoder for Unicode-safe encoding
    if (typeof TextEncoder !== 'undefined') {
      const encoder = new TextEncoder()
      const data = encoder.encode(jsonString)
      
      // Create a simple hash from the bytes
      let hash = 0
      for (let i = 0; i < data.length; i++) {
        hash = ((hash << 5) - hash + data[i]) & 0xffffffff
      }
      
      return Math.abs(hash).toString(36).slice(0, 16)
    } else {
      // Fallback for environments without TextEncoder
      const asciiOnly = jsonString.replace(/[^\x00-\x7F]/g, '')
      return btoa(asciiOnly).slice(0, 16)
    }
  } catch (error) {
    console.warn('Hash generation failed, using fallback:', error)
    const fallback = (character.name || 'unknown') + Date.now()
    return fallback.replace(/[^\w]/g, '').slice(0, 16)
  }
}

/**
 * Enhanced duplicate detection
 */
function isDuplicateCharacter(char1: Character, char2: Character): boolean {
  if (char1.name?.trim().toLowerCase() === char2.name?.trim().toLowerCase()) {
    return true
  }
  
  if (generateContentHash(char1) === generateContentHash(char2)) {
    return true
  }
  
  return false
}

/**
 * Check if migration is needed
 */
export async function checkMigrationNeeded(): Promise<{
  needsMigration: boolean
  charactersWithBase64: number
  charactersWithUrls: number
}> {
  const result = {
    needsMigration: false,
    charactersWithBase64: 0,
    charactersWithUrls: 0
  }

  try {
    const localCharacters = await getStoredCharacters()
    
    for (const stored of localCharacters) {
      if (stored.character.image_data) {
        result.charactersWithBase64++
      }
      if (stored.character.image_url) {
        result.charactersWithUrls++
      }
    }

    result.needsMigration = result.charactersWithBase64 > 0

    console.log(`Migration check: ${result.charactersWithBase64} characters with base64, ${result.charactersWithUrls} with URLs`)
    
  } catch (error) {
    console.error('Failed to check migration needs:', error)
  }

  return result
}

/**
 * Migrate a single character's image from base64 to Supabase Storage
 */
async function migrateCharacterImage(
  characterId: string, 
  character: Character,
  progress: MigrationProgress
): Promise<{ success: boolean; url?: string; error?: string }> {
  
  progress.currentCharacter = character.name

  try {
    if (!character.image_data) {
      return { success: true, error: 'No image data to migrate' }
    }

    if (character.image_url) {
      console.log(`Character ${character.name} already has URL, checking storage...`)
      
      const storageStatus = await getImageStorageStatus(characterId)
      if (storageStatus.hasCloud) {
        return { success: true, url: character.image_url, error: 'Already migrated' }
      }
    }

    console.log(`Migrating image for character: ${character.name}`)

    const uploadResult = await saveImage(characterId, character.image_data, {
      characterId,
      quality: 'display',
      forceLocal: false
    })

    if (uploadResult.url) {
      const updatedCharacter: Character = {
        ...character,
        image_url: uploadResult.url,
      }

      const updateSuccess = await updateCharacter(characterId, updatedCharacter)
      
      if (updateSuccess) {
        console.log(`Successfully migrated ${character.name} to Supabase Storage`)
        return { success: true, url: uploadResult.url }
      } else {
        return { success: false, error: 'Failed to update character record' }
      }
    } else {
      return { success: false, error: 'Failed to upload to Supabase Storage' }
    }

  } catch (error) {
    console.error(`Error migrating character ${character.name}:`, error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

/**
 * Migrate all characters with base64 images to Supabase Storage
 */
export async function migrateImagesToSupabaseStorage(
  onProgress?: (progress: MigrationProgress) => void
): Promise<MigrationResult> {
  
  const progress: MigrationProgress = {
    total: 0,
    processed: 0,
    uploaded: 0,
    failed: 0,
    skipped: 0,
    errors: []
  }

  if (!isSupabaseAvailable()) {
    return {
      success: false,
      progress,
      message: 'Supabase is not available. Please check your environment variables.'
    }
  }

  const user = await getStorageUser()
  if (!user) {
    return {
      success: false,
      progress,
      message: 'User must be authenticated to migrate images to cloud storage.'
    }
  }

  try {
    const localCharacters = await getStoredCharacters()
    const charactersToMigrate = localCharacters.filter(stored => 
      stored.character.image_data && !stored.isExample
    )

    progress.total = charactersToMigrate.length

    if (progress.total === 0) {
      return {
        success: true,
        progress,
        message: 'No characters with base64 images found. Migration not needed.'
      }
    }

    console.log(`Starting migration of ${progress.total} characters...`)

    for (const stored of charactersToMigrate) {
      progress.processed++
      
      if (onProgress) {
        onProgress({ ...progress })
      }

      const result = await migrateCharacterImage(
        stored.id, 
        stored.character, 
        progress
      )

      if (result.success) {
        if (result.url) {
          progress.uploaded++
        } else {
          progress.skipped++
        }
      } else {
        progress.failed++
        progress.errors.push({
          characterId: stored.id,
          characterName: stored.character.name,
          error: result.error || 'Unknown error'
        })
      }

      await new Promise(resolve => setTimeout(resolve, 100))
    }

    if (onProgress) {
      onProgress({ ...progress })
    }

    const successMessage = `Migration completed: ${progress.uploaded} uploaded, ${progress.skipped} skipped, ${progress.failed} failed`
    console.log(successMessage)

    return {
      success: progress.failed === 0,
      progress,
      message: successMessage
    }

  } catch (error) {
    console.error('Migration failed:', error)
    return {
      success: false,
      progress,
      message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Clean up base64 data after successful migration
 */
export async function cleanupBase64Images(
  dryRun: boolean = true
): Promise<{
  success: boolean
  cleaned: number
  errors: string[]
}> {
  const result = {
    success: true,
    cleaned: 0,
    errors: [] as string[]
  }

  try {
    const localCharacters = await getStoredCharacters()
    
    for (const stored of localCharacters) {
      if (stored.character.image_data && stored.character.image_url) {
        if (!dryRun) {
          try {
            const cleanedCharacter: Character = {
              ...stored.character,
              image_data: undefined
            }

            const updateSuccess = await updateCharacter(stored.id, cleanedCharacter)
            
            if (updateSuccess) {
              result.cleaned++
              console.log(`Cleaned up base64 data for ${stored.character.name}`)
            } else {
              result.errors.push(`Failed to update ${stored.character.name}`)
            }
          } catch (error) {
            result.errors.push(`Error cleaning ${stored.character.name}: ${error}`)
          }
        } else {
          result.cleaned++
        }
      }
    }

    if (dryRun) {
      console.log(`Dry run: Would clean up ${result.cleaned} characters`)
    } else {
      console.log(`Cleaned up base64 data from ${result.cleaned} characters`)
    }

    result.success = result.errors.length === 0

  } catch (error) {
    console.error('Cleanup failed:', error)
    result.success = false
    result.errors.push(`Cleanup failed: ${error}`)
  }

  return result
}

/**
 * Validate migration completeness
 */
export async function validateMigration(): Promise<{
  isComplete: boolean
  charactersWithBase64Only: number
  charactersWithUrlOnly: number
  charactersWithBoth: number
  issues: string[]
}> {
  const result = {
    isComplete: false,
    charactersWithBase64Only: 0,
    charactersWithUrlOnly: 0,
    charactersWithBoth: 0,
    issues: [] as string[]
  }

  try {
    const localCharacters = await getStoredCharacters()
    
    for (const stored of localCharacters) {
      if (stored.isExample) continue
      
      const hasBase64 = !!stored.character.image_data
      const hasUrl = !!stored.character.image_url

      if (hasBase64 && hasUrl) {
        result.charactersWithBoth++
      } else if (hasBase64 && !hasUrl) {
        result.charactersWithBase64Only++
        result.issues.push(`Character "${stored.character.name}" still has only base64 data`)
      } else if (!hasBase64 && hasUrl) {
        result.charactersWithUrlOnly++
      }
    }

    result.isComplete = result.charactersWithBase64Only === 0

    console.log(`Migration validation: ${result.charactersWithUrlOnly} URL-only, ${result.charactersWithBoth} both, ${result.charactersWithBase64Only} base64-only`)

  } catch (error) {
    console.error('Validation failed:', error)
    result.issues.push(`Validation failed: ${error}`)
  }

  return result
}