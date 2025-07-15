// src/lib/hybrid-storage.ts
import { Character, CharacterFormData } from './types'
import { 
  getStoredCharacters as getLocalCharacters,
  saveCharacter as saveLocalCharacter,
  deleteCharacter as deleteLocalCharacter,
  updateCharacter as updateLocalCharacter,
  getCharacterById as getLocalCharacterById,
  loadCharacterWithImage as loadLocalCharacterWithImage,
  initializeLibrary as initializeLocalLibrary,
  StoredCharacter
} from './character-storage'
import { 
  saveImage, 
  deleteImage, 
  getImage as getLocalImage,
  getImageStorageStatus,
  ImageStorageResult
} from './image-storage'
import { isValidImageData } from './utils'

// Interface for sync tracking
interface SyncMetadata {
  lastSyncTime: number
  syncedCharacterIds: Set<string>
  cloudCharacterHashes: Map<string, string>
  lastMigrationTime: number
  migratedImageIds: Set<string>
  migrationInProgress: boolean
}

// Generate content hash for duplicate detection (Unicode-safe)
function generateContentHash(character: Character): string {
  const normalized = {
    name: character.name?.trim().toLowerCase() || '',
    appearance: character.appearance?.trim() || '',
    personality: character.personality?.trim() || '',
    backstory_hook: character.backstory_hook?.trim() || ''
  }
  
  try {
    // Convert to JSON string
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
      
      // Convert to base36 for a readable hash
      return Math.abs(hash).toString(36).slice(0, 16)
    } else {
      // Fallback for environments without TextEncoder
      // Remove non-ASCII characters before using btoa
      const asciiOnly = jsonString.replace(/[^\x00-\x7F]/g, '')
      return btoa(asciiOnly).slice(0, 16)
    }
  } catch (error) {
    console.warn('Hash generation failed, using fallback:', error)
    // Ultimate fallback - use character name and current timestamp
    const fallback = (character.name || 'unknown') + Date.now()
    return fallback.replace(/[^\w]/g, '').slice(0, 16)
  }
}

// Enhanced duplicate detection
function isDuplicateCharacter(char1: Character, char2: Character): boolean {
  if (char1.name?.trim().toLowerCase() === char2.name?.trim().toLowerCase()) {
    return true
  }
  
  if (generateContentHash(char1) === generateContentHash(char2)) {
    return true
  }
  
  return false
}

// Check if we're online and can access cloud storage
function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine
}

// Check if user is authenticated
async function getAuthenticatedUser(): Promise<{ id: string } | null> {
  if (typeof window === 'undefined') return null
  
  try {
    const response = await fetch('/api/auth/me')
    if (response.ok) {
      const user = await response.json()
      return user?.id ? user : null
    }
  } catch (error) {
    console.warn('Failed to check authentication:', error)
  }
  
  return null
}

// ENHANCED: Upsert character to cloud with image handling
async function upsertCharacterToCloud(
  character: Character, 
  formData?: CharacterFormData,
  localId?: string
): Promise<any> {
  // Handle image upload separately
  let portraitUrl: string | undefined

  if (character.image_data && isValidImageData(character.image_data)) {
    try {
      console.log('Uploading character image to Supabase Storage...')
      
      const imageResult = await saveImage(localId || character.name, character.image_data, {
        characterId: localId || character.name,
        quality: 'display'
      })

      if (imageResult.url) {
        portraitUrl = imageResult.url
        console.log('Image uploaded successfully to Supabase Storage')
      }
    } catch (error) {
      console.warn('Failed to upload image to Supabase Storage:', error)
      // Continue without image
    }
  }

  // Create character data without base64 image
  const characterForCloud = {
    ...character,
    image_url: portraitUrl || character.image_url,
    image_data: undefined // Don't store base64 in database
  }

  // Check for duplicates
  try {
    const existingChars = await getCharactersFromCloud()
    const duplicate = existingChars.find(existing => 
      isDuplicateCharacter(existing.data || existing.character, characterForCloud)
    )
    
    if (duplicate) {
      console.log(`Found duplicate character ${character.name}, updating instead of creating`)
      return await updateCharacterInCloud(duplicate.id, characterForCloud, formData, portraitUrl)
    }
  } catch (error) {
    console.warn('Failed to check for duplicates:', error)
  }
  
  // Create new character
  const response = await fetch('/api/v1/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: characterForCloud.name,
      data: characterForCloud,
      portraitUrl,
      formData,
      localId,
    }),
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to save character to cloud: ${response.status} ${errorText}`)
  }
  
  return response.json()
}

async function getCharactersFromCloud(): Promise<any[]> {
  const response = await fetch('/api/v1/characters?limit=1000')
  
  if (!response.ok) {
    throw new Error(`Failed to fetch characters from cloud: ${response.statusText}`)
  }
  
  return response.json()
}

async function updateCharacterInCloud(
  id: string, 
  character: Character, 
  formData?: CharacterFormData,
  portraitUrl?: string
): Promise<any> {
  
  const response = await fetch(`/api/v1/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: character.name,
      data: character,
      portraitUrl,
      formData,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Failed to update character in cloud: ${response.statusText}`)
  }
  
  return response.json()
}

async function deleteCharacterFromCloud(id: string): Promise<void> {
  const response = await fetch(`/api/v1/characters/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete character from cloud: ${response.statusText}`)
  }
}

// Deduplication utility functions
function deduplicateCharacters(characters: StoredCharacter[]): StoredCharacter[] {
  const seen = new Map<string, StoredCharacter>()
  const seenHashes = new Map<string, StoredCharacter>()
  
  for (const character of characters) {
    if (seen.has(character.id)) {
      console.log(`Skipping duplicate ID: ${character.id}`)
      continue
    }
    
    const contentHash = generateContentHash(character.character)
    const existingByHash = seenHashes.get(contentHash)
    
    if (existingByHash) {
      console.log(`Found duplicate content for ${character.character.name}, keeping newer version`)
      const existingDate = new Date(existingByHash.createdAt).getTime()
      const currentDate = new Date(character.createdAt).getTime()
      
      if (currentDate > existingDate) {
        seen.delete(existingByHash.id)
        seen.set(character.id, character)
        seenHashes.set(contentHash, character)
      }
    } else {
      seen.set(character.id, character)
      seenHashes.set(contentHash, character)
    }
  }
  
  return Array.from(seen.values())
}

function convertCloudToStoredCharacter(cloudChar: any): StoredCharacter {
  const character = cloudChar.data || cloudChar.character
  
  // If cloud character has portraitUrl, set it as image_url
  if (cloudChar.portraitUrl && !character.image_url) {
    character.image_url = cloudChar.portraitUrl
  }
  
  return {
    id: cloudChar.id,
    character,
    createdAt: cloudChar.createdAt || new Date().toISOString(),
    isExample: false,
    formData: cloudChar.formData,
    hasStoredImage: !!cloudChar.portraitUrl || !!character.image_data
  }
}

// ENHANCED: Hybrid Storage Class with improved image handling
export class HybridCharacterStorage {
  private user: { id: string } | null = null
  private initialized = false
  private syncPromise: Promise<void> | null = null
  private syncMetadata: SyncMetadata = {
    lastSyncTime: 0,
    syncedCharacterIds: new Set(),
    cloudCharacterHashes: new Map(),
    lastMigrationTime: 0,
    migratedImageIds: new Set(),
    migrationInProgress: false
  }
  private readonly SYNC_COOLDOWN = 30000
  private readonly MIGRATION_COOLDOWN = 60000 // 1 minute between auto-migrations
  private readonly SYNC_METADATA_KEY = 'npc-forge-sync-metadata'
  
  async initialize(): Promise<void> {
    if (this.initialized) return
    
    try {
      const previousUser = this.user
      this.user = await getAuthenticatedUser()
      
      this.loadSyncMetadata()
      
      console.log(`HybridStorage initialized. User authenticated: ${!!this.user}`)
      
      if (!previousUser && this.user && isOnline()) {
        console.log('User just signed in, triggering sync and auto-migration...')
        // Start both sync and auto-migration in parallel
        setTimeout(() => {
          this.triggerSmartSync()
          this.triggerAutoMigration()
        }, 2000)
      }
    } catch (error) {
      console.warn('Failed to initialize hybrid storage:', error)
    }
    
    await initializeLocalLibrary()
    this.initialized = true
  }
  
  private loadSyncMetadata(): void {
    try {
      const stored = localStorage.getItem(this.SYNC_METADATA_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        this.syncMetadata = {
          lastSyncTime: parsed.lastSyncTime || 0,
          syncedCharacterIds: new Set(parsed.syncedCharacterIds || []),
          cloudCharacterHashes: new Map(parsed.cloudCharacterHashes || []),
          lastMigrationTime: parsed.lastMigrationTime || 0,
          migratedImageIds: new Set(parsed.migratedImageIds || []),
          migrationInProgress: false // Never persist this as true
        }
      }
    } catch (error) {
      console.warn('Failed to load sync metadata:', error)
    }
  }
  
  private saveSyncMetadata(): void {
    try {
      const toStore = {
        lastSyncTime: this.syncMetadata.lastSyncTime,
        syncedCharacterIds: Array.from(this.syncMetadata.syncedCharacterIds),
        cloudCharacterHashes: Array.from(this.syncMetadata.cloudCharacterHashes),
        lastMigrationTime: this.syncMetadata.lastMigrationTime,
        migratedImageIds: Array.from(this.syncMetadata.migratedImageIds),
        // Don't save migrationInProgress - always start fresh
      }
      localStorage.setItem(this.SYNC_METADATA_KEY, JSON.stringify(toStore))
    } catch (error) {
      console.warn('Failed to save sync metadata:', error)
    }
  }
  
  private triggerSmartSync(): void {
    const now = Date.now()
    if (this.syncPromise) {
      console.log('Sync already in progress, skipping...')
      return
    }
    
    if ((now - this.syncMetadata.lastSyncTime) < this.SYNC_COOLDOWN) {
      console.log('Sync cooldown active, skipping...')
      return
    }
    
    this.syncMetadata.lastSyncTime = now
    this.syncPromise = this.performSmartSync().finally(() => {
      this.syncPromise = null
      this.saveSyncMetadata()
    })
  }
  
  private async performSmartSync(): Promise<void> {
    try {
      console.log('Starting smart sync...')
      
      const localCharacters = await getLocalCharacters()
      const userCharacters = localCharacters.filter(char => !char.isExample)
      
      if (userCharacters.length === 0) {
        console.log('No user characters to sync')
        return
      }
      
      let cloudCharacters: any[] = []
      try {
        cloudCharacters = await getCharactersFromCloud()
        console.log(`Found ${cloudCharacters.length} characters in cloud`)
      } catch (error) {
        console.warn('Failed to fetch cloud characters:', error)
        return
      }
      
      const cloudIds = new Set(cloudCharacters.map(char => char.id))
      const cloudHashes = new Map<string, any>()
      
      cloudCharacters.forEach(char => {
        const character = char.data || char.character
        if (character) {
          const hash = generateContentHash(character)
          cloudHashes.set(hash, char)
        }
      })
      
      let synced = 0
      let skipped = 0
      let failed = 0
      
      for (const localChar of userCharacters) {
        try {
          const contentHash = generateContentHash(localChar.character)
          
          if (this.syncMetadata.syncedCharacterIds.has(localChar.id)) {
            console.log(`Already synced ${localChar.character.name} (by ID), skipping`)
            skipped++
            continue
          }
          
          if (cloudHashes.has(contentHash)) {
            console.log(`Character ${localChar.character.name} already exists in cloud (by content), marking as synced`)
            this.syncMetadata.syncedCharacterIds.add(localChar.id)
            skipped++
            continue
          }
          
          if (cloudIds.has(localChar.id)) {
            console.log(`Updating existing character ${localChar.character.name} in cloud`)
            await updateCharacterInCloud(localChar.id, localChar.character, localChar.formData)
          } else {
            console.log(`Creating new character ${localChar.character.name} in cloud`)
            await upsertCharacterToCloud(localChar.character, localChar.formData, localChar.id)
          }
          
          this.syncMetadata.syncedCharacterIds.add(localChar.id)
          this.syncMetadata.cloudCharacterHashes.set(localChar.id, contentHash)
          synced++
          
        } catch (error) {
          console.error(`Failed to sync character ${localChar.character.name}:`, error)
          failed++
        }
      }
      
      console.log(`Smart sync completed: ${synced} synced, ${skipped} skipped, ${failed} failed`)
      
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('characters-synced', {
          detail: { synced, skipped, failed, total: userCharacters.length }
        }))
      }
      
    } catch (error) {
      console.error('Smart sync failed:', error)
    }
  }
  
  /**
   * AUTOMATIC IMAGE MIGRATION: Triggers background migration without user intervention
   */
  private triggerAutoMigration(): void {
    const now = Date.now()
    
    // Don't run if already in progress
    if (this.syncMetadata.migrationInProgress) {
      console.log('Auto-migration already in progress, skipping...')
      return
    }
    
    // Don't run too frequently
    if ((now - this.syncMetadata.lastMigrationTime) < this.MIGRATION_COOLDOWN) {
      console.log('Auto-migration cooldown active, skipping...')
      return
    }
    
    // Don't run if user isn't authenticated
    if (!this.user || !isOnline()) {
      console.log('Auto-migration requires authenticated user online, skipping...')
      return
    }
    
    this.syncMetadata.migrationInProgress = true
    this.syncMetadata.lastMigrationTime = now
    
    // Run migration in background - don't await to avoid blocking
    this.performAutoMigration().finally(() => {
      this.syncMetadata.migrationInProgress = false
      this.saveSyncMetadata()
    })
  }
  
  /**
   * AUTOMATIC IMAGE MIGRATION: Performs background migration of local images to Supabase Storage
   */
  private async performAutoMigration(): Promise<void> {
    try {
      console.log('Starting automatic image migration...')
      
      // Get local characters with images that haven't been migrated
      const localCharacters = await getLocalCharacters()
      const charactersToMigrate = localCharacters.filter(stored => 
        !stored.isExample && // Skip examples
        stored.character.image_data && // Has local image data
        !stored.character.image_url && // Doesn't have cloud URL yet
        !this.syncMetadata.migratedImageIds.has(stored.id) // Haven't migrated this one yet
      )
      
      if (charactersToMigrate.length === 0) {
        console.log('No characters need image migration')
        return
      }
      
      console.log(`Auto-migrating ${charactersToMigrate.length} character images...`)
      
      let migrated = 0
      let failed = 0
      
      // Process in small batches to avoid overwhelming the system
      const BATCH_SIZE = 3
      for (let i = 0; i < charactersToMigrate.length; i += BATCH_SIZE) {
        const batch = charactersToMigrate.slice(i, i + BATCH_SIZE)
        
        // Process batch in parallel
        const batchPromises = batch.map(async (stored) => {
          try {
            console.log(`Auto-migrating image for: ${stored.character.name}`)
            
            // Upload image to Supabase Storage
            const imageResult = await saveImage(stored.id, stored.character.image_data!, {
              characterId: stored.id,
              quality: 'display'
            })
            
            if (imageResult.url) {
              // Update character with URL
              const updatedCharacter: Character = {
                ...stored.character,
                image_url: imageResult.url
              }
              
              // Update local storage
              const updateSuccess = await updateLocalCharacter(stored.id, updatedCharacter, stored.formData)
              
              if (updateSuccess) {
                // Mark as migrated
                this.syncMetadata.migratedImageIds.add(stored.id)
                migrated++
                console.log(`✓ Auto-migrated: ${stored.character.name}`)
              } else {
                console.warn(`Failed to update character record for: ${stored.character.name}`)
                failed++
              }
            } else {
              console.warn(`Failed to upload image for: ${stored.character.name}`)
              failed++
            }
            
          } catch (error) {
            console.error(`Auto-migration failed for ${stored.character.name}:`, error)
            failed++
          }
        })
        
        // Wait for batch to complete
        await Promise.all(batchPromises)
        
        // Small delay between batches to be nice to the API
        if (i + BATCH_SIZE < charactersToMigrate.length) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
      
      console.log(`Auto-migration completed: ${migrated} migrated, ${failed} failed`)
      
      // Emit event for any UI that wants to listen
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('images-auto-migrated', {
          detail: { migrated, failed, total: charactersToMigrate.length }
        }))
      }
      
    } catch (error) {
      console.error('Auto-migration failed:', error)
    }
  }
  
  /**
   * AUTOMATIC MIGRATION: Migrate a single character's image when accessed
   */
  private async autoMigrateCharacterImage(characterId: string, character: Character): Promise<Character> {
    // Skip if no image data or already has URL
    if (!character.image_data || character.image_url) {
      return character
    }
    
    // Skip if already migrated or migration disabled
    if (this.syncMetadata.migratedImageIds.has(characterId) || !this.user || !isOnline()) {
      return character
    }
    
    try {
      console.log(`Auto-migrating image for character on access: ${character.name}`)
      
      const imageResult = await saveImage(characterId, character.image_data, {
        characterId,
        quality: 'display'
      })
      
      if (imageResult.url) {
        // Update character with URL
        const updatedCharacter: Character = {
          ...character,
          image_url: imageResult.url
        }
        
        // Update in storage
        await updateLocalCharacter(characterId, updatedCharacter)
        
        // Mark as migrated
        this.syncMetadata.migratedImageIds.add(characterId)
        this.saveSyncMetadata()
        
        console.log(`✓ Auto-migrated on access: ${character.name}`)
        return updatedCharacter
      }
    } catch (error) {
      console.warn(`Auto-migration on access failed for ${character.name}:`, error)
    }
    
    return character
  }
  
  private cleanupSyncMetadata(currentCharacterIds: string[]): void {
    const currentIds = new Set(currentCharacterIds)
    
    for (const syncedId of this.syncMetadata.syncedCharacterIds) {
      if (!currentIds.has(syncedId)) {
        this.syncMetadata.syncedCharacterIds.delete(syncedId)
        this.syncMetadata.cloudCharacterHashes.delete(syncedId)
      }
    }
  }
  
  async refreshAuth(): Promise<void> {
    this.initialized = false
    await this.initialize()
  }
  
  async getCharacters(): Promise<StoredCharacter[]> {
    await this.initialize()
    
    let cloudCharacters: StoredCharacter[] = []
    let localCharacters: StoredCharacter[] = []
    
    try {
      localCharacters = await getLocalCharacters()
      console.log(`Loaded ${localCharacters.length} characters from local storage`)
    } catch (error) {
      console.error('Failed to load local characters:', error)
    }
    
    if (this.user && isOnline()) {
      try {
        const cloudData = await getCharactersFromCloud()
        cloudCharacters = cloudData.map(convertCloudToStoredCharacter)
        console.log(`Loaded ${cloudCharacters.length} characters from cloud`)
      } catch (error) {
        console.warn('Failed to load from cloud, using local only:', error)
      }
    }
    
    const allCharacters = [...cloudCharacters, ...localCharacters]
    const deduplicatedCharacters = deduplicateCharacters(allCharacters)
    
    this.cleanupSyncMetadata(deduplicatedCharacters.map(c => c.id))
    
    console.log(`Total unique characters after deduplication: ${deduplicatedCharacters.length}`)
    
    // AUTOMATIC MIGRATION: Trigger background migration when user views their library
    if (this.user && isOnline() && !this.syncMetadata.migrationInProgress) {
      const hasUnmigratedImages = deduplicatedCharacters.some(char => 
        !char.isExample && 
        char.character.image_data && 
        !char.character.image_url &&
        !this.syncMetadata.migratedImageIds.has(char.id)
      )
      
      if (hasUnmigratedImages) {
        console.log('Found unmigrated images, triggering background migration...')
        setTimeout(() => this.triggerAutoMigration(), 3000) // Small delay to not block UI
      }
    }
    
    return deduplicatedCharacters.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
  
  // ENHANCED: Save character with proper image handling
  async saveCharacter(
    character: Character, 
    formData?: CharacterFormData, 
    isExample = false
  ): Promise<any> {
    await this.initialize()
    
    // Handle image processing for local storage
    let localCharacterResult: any
    
    if (character.image_data && isValidImageData(character.image_data)) {
      // Generate a temporary ID for image storage
      const tempId = `temp-${Date.now()}`
      
      try {
        // Save image and get result
        const imageResult = await saveImage(tempId, character.image_data, {
          characterId: tempId,
          quality: 'display',
          forceLocal: isExample // Force local-only for examples
        })
        
        // Update character with image URL if available
        const updatedCharacter = {
          ...character,
          image_url: imageResult.url || character.image_url
        }
        
        // Save to local storage (this will handle the image properly)
        localCharacterResult = await saveLocalCharacter(updatedCharacter, formData, isExample)
        
        // If we got a different ID from local storage, move the image
        if (localCharacterResult.id !== tempId && imageResult.localData) {
          try {
            await saveImage(localCharacterResult.id, imageResult.localData, {
              characterId: localCharacterResult.id,
              forceLocal: true // Store in IndexedDB with proper ID
            })
            
            // Clean up temp image
            await deleteImage(tempId)
          } catch (error) {
            console.warn('Failed to move image to proper ID:', error)
          }
        }
        
      } catch (error) {
        console.warn('Failed to save image, saving character without image:', error)
        // Save character without image
        const characterWithoutImage = { ...character }
        delete characterWithoutImage.image_data
        localCharacterResult = await saveLocalCharacter(characterWithoutImage, formData, isExample)
      }
    } else {
      // No image to process
      localCharacterResult = await saveLocalCharacter(character, formData, isExample)
    }
    
    console.log('Character saved to local storage')
    
    // If authenticated and online, also save to cloud (but not example characters)
    if (this.user && isOnline() && !isExample) {
      try {
        const cloudResult = await upsertCharacterToCloud(character, formData, localCharacterResult.id)
        
        // Mark as synced
        this.syncMetadata.syncedCharacterIds.add(localCharacterResult.id)
        this.syncMetadata.cloudCharacterHashes.set(localCharacterResult.id, generateContentHash(character))
        this.saveSyncMetadata()
        
        console.log('Character saved to cloud')
      } catch (error) {
        console.warn('Failed to save character to cloud:', error)
      }
    }
    
    return localCharacterResult
  }
  
  // ENHANCED: Delete character with proper image cleanup
  async deleteCharacter(id: string): Promise<boolean> {
    await this.initialize()
    
    const localCharacter = await getLocalCharacterById(id)
    const isExample = localCharacter?.isExample || false
    
    // Delete images from both storage systems
    try {
      await deleteImage(id)
    } catch (error) {
      console.warn('Failed to delete character images:', error)
    }
    
    // Delete from local storage
    const localSuccess = await deleteLocalCharacter(id)
    
    // Delete from cloud if user character
    let cloudSuccess = true
    if (this.user && isOnline() && !isExample) {
      try {
        await deleteCharacterFromCloud(id)
        console.log('Character deleted from cloud')
      } catch (error) {
        console.warn('Failed to delete character from cloud:', error)
        cloudSuccess = false
      }
    }
    
    // Clean up sync metadata
    if (localSuccess) {
      this.syncMetadata.syncedCharacterIds.delete(id)
      this.syncMetadata.cloudCharacterHashes.delete(id)
      this.saveSyncMetadata()
    }
    
    return localSuccess && cloudSuccess
  }
  
  // ENHANCED: Load character with proper image handling
  async loadCharacterWithImage(id: string): Promise<Character | null> {
    await this.initialize()
    
    const storedCharacter = await this.getCharacterById(id)
    if (!storedCharacter) return null
    
    const character = JSON.parse(JSON.stringify(storedCharacter.character)) as Character
    
    // Try to load image from local storage first
    if (storedCharacter.hasStoredImage || !character.image_data) {
      try {
        const imageData = await getLocalImage(id)
        if (imageData) {
          character.image_data = imageData
          return character
        }
      } catch (error) {
        console.warn('Failed to load image from local storage:', error)
      }
    }
    
    // If character has image_url but no local image_data, it's using Supabase Storage
    // The UI can load the image directly from the URL
    if (character.image_url && !character.image_data) {
      console.log(`Character ${character.name} uses Supabase Storage URL: ${character.image_url}`)
    }
    
    return character
  }
  
  // Rest of the methods remain largely the same...
  
  async getCharacterById(id: string): Promise<StoredCharacter | null> {
    await this.initialize()
    
    const localCharacter = await getLocalCharacterById(id)
    
    if (this.user && isOnline()) {
      try {
        const response = await fetch(`/api/v1/characters/${id}`)
        if (response.ok) {
          const cloudCharacter = await response.json()
          const cloudStored = convertCloudToStoredCharacter(cloudCharacter)
          
          if (localCharacter) {
            const localDate = new Date(localCharacter.createdAt).getTime()
            const cloudDate = new Date(cloudStored.createdAt).getTime()
            return cloudDate >= localDate ? cloudStored : localCharacter
          } else {
            return cloudStored
          }
        }
      } catch (error) {
        console.warn('Failed to load character from cloud:', error)
      }
    }
    
    return localCharacter
  }

  async updateCharacter(
    id: string, 
    character: Character, 
    formData?: CharacterFormData
  ): Promise<boolean> {
    await this.initialize()
    
    // Handle image updates
    if (character.image_data && isValidImageData(character.image_data)) {
      try {
        const imageResult = await saveImage(id, character.image_data, {
          characterId: id,
          quality: 'display'
        })
        
        if (imageResult.url) {
          character.image_url = imageResult.url
        }
      } catch (error) {
        console.warn('Failed to update character image:', error)
      }
    }
    
    const localSuccess = await updateLocalCharacter(id, character, formData)
    
    if (this.user && isOnline()) {
      try {
        await updateCharacterInCloud(id, character, formData, character.image_url)
        
        this.syncMetadata.cloudCharacterHashes.set(id, generateContentHash(character))
        this.saveSyncMetadata()
        
      } catch (error) {
        console.warn('Failed to update character in cloud:', error)
      }
    }
    
    return localSuccess
  }

  async syncToCloud(): Promise<{ success: number; failed: number; skipped: number }> {
    await this.initialize()
    
    if (!this.user || !isOnline()) {
      throw new Error('User must be authenticated and online to sync')
    }
    
    this.syncMetadata.syncedCharacterIds.clear()
    this.syncMetadata.cloudCharacterHashes.clear()
    
    await this.performSmartSync()
    
    return { success: 0, failed: 0, skipped: 0 }
  }
  
  getSyncStatus(): { isAuthenticated: boolean; isSyncing: boolean } {
    return {
      isAuthenticated: !!this.user,
      isSyncing: !!this.syncPromise
    }
  }
  
  /**
   * Get automatic migration status
   */
  getMigrationStatus(): { 
    isAuthenticated: boolean
    migrationInProgress: boolean
    lastMigrationTime: number
    migratedCount: number
  } {
    return {
      isAuthenticated: !!this.user,
      migrationInProgress: this.syncMetadata.migrationInProgress,
      lastMigrationTime: this.syncMetadata.lastMigrationTime,
      migratedCount: this.syncMetadata.migratedImageIds.size
    }
  }
  
  /**
   * Check if any characters need image migration
   */
  async checkMigrationNeeded(): Promise<{
    needsMigration: boolean
    charactersWithBase64: number
    charactersWithUrls: number
    unmigratedCount: number
  }> {
    await this.initialize()
    
    const result = {
      needsMigration: false,
      charactersWithBase64: 0,
      charactersWithUrls: 0,
      unmigratedCount: 0
    }
    
    try {
      const localCharacters = await getLocalCharacters()
      
      for (const stored of localCharacters) {
        if (stored.isExample) continue // Skip examples
        
        if (stored.character.image_data) {
          result.charactersWithBase64++
          
          // Check if this specific image hasn't been migrated
          if (!stored.character.image_url && !this.syncMetadata.migratedImageIds.has(stored.id)) {
            result.unmigratedCount++
          }
        }
        
        if (stored.character.image_url) {
          result.charactersWithUrls++
        }
      }
      
      result.needsMigration = result.unmigratedCount > 0
      
    } catch (error) {
      console.error('Failed to check migration needs:', error)
    }
    
    return result
  }
  
  /**
   * Manually trigger migration (for emergency use or testing)
   */
  async forceMigration(): Promise<void> {
    if (!this.user || !isOnline()) {
      throw new Error('User must be authenticated and online to force migration')
    }
    
    // Reset cooldown to allow immediate migration
    this.syncMetadata.lastMigrationTime = 0
    this.syncMetadata.migrationInProgress = false
    
    this.triggerAutoMigration()
  }
}

// Create singleton instance
export const hybridCharacterStorage = new HybridCharacterStorage()