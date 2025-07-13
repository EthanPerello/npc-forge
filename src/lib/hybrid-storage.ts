// src/lib/hybrid-storage-fixed.ts
import { Character, CharacterFormData } from './types';
import { 
  getStoredCharacters as getLocalCharacters,
  saveCharacter as saveLocalCharacter,
  deleteCharacter as deleteLocalCharacter,
  updateCharacter as updateLocalCharacter,
  getCharacterById as getLocalCharacterById,
  loadCharacterWithImage as loadLocalCharacterWithImage,
  initializeLibrary as initializeLocalLibrary,
  saveImage as saveLocalImage,
  getImage as getLocalImage,
  deleteImage as deleteLocalImage,
  StoredCharacter
} from './character-storage';

// Interface for sync tracking
interface SyncMetadata {
  lastSyncTime: number;
  syncedCharacterIds: Set<string>;
  cloudCharacterHashes: Map<string, string>; // id -> content hash
}

// Generate content hash for duplicate detection
function generateContentHash(character: Character): string {
  const normalized = {
    name: character.name?.trim().toLowerCase(),
    appearance: character.appearance?.trim(),
    personality: character.personality?.trim(),
    backstory_hook: character.backstory_hook?.trim()
  };
  
  return btoa(JSON.stringify(normalized)).slice(0, 16);
}

// Enhanced duplicate detection
function isDuplicateCharacter(char1: Character, char2: Character): boolean {
  // Exact name match (case insensitive)
  if (char1.name?.trim().toLowerCase() === char2.name?.trim().toLowerCase()) {
    return true;
  }
  
  // Content hash match
  if (generateContentHash(char1) === generateContentHash(char2)) {
    return true;
  }
  
  return false;
}

// Check if we're online and can access cloud storage
function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

// Check if user is authenticated
async function getAuthenticatedUser(): Promise<{ id: string } | null> {
  if (typeof window === 'undefined') return null;
  
  try {
    const response = await fetch('/api/auth/me');
    if (response.ok) {
      const user = await response.json();
      return user?.id ? user : null;
    }
  } catch (error) {
    console.warn('Failed to check authentication:', error);
  }
  
  return null;
}

// FIXED: Upsert character to cloud with proper duplicate checking
async function upsertCharacterToCloud(
  character: Character, 
  formData?: CharacterFormData,
  localId?: string
): Promise<any> {
  // First check if a similar character already exists
  try {
    const existingChars = await getCharactersFromCloud();
    const duplicate = existingChars.find(existing => 
      isDuplicateCharacter(existing.data || existing.character, character)
    );
    
    if (duplicate) {
      console.log(`Found duplicate character ${character.name}, updating instead of creating`);
      return await updateCharacterInCloud(duplicate.id, character, formData);
    }
  } catch (error) {
    console.warn('Failed to check for duplicates:', error);
  }
  
  // Create new character
  const response = await fetch('/api/v1/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: character.name,
      data: character,
      formData,
      localId, // Include local ID for reference
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save character to cloud: ${response.status} ${errorText}`);
  }
  
  return response.json();
}

async function getCharactersFromCloud(): Promise<any[]> {
  const response = await fetch('/api/v1/characters?limit=1000'); // Get all characters
  
  if (!response.ok) {
    throw new Error(`Failed to fetch characters from cloud: ${response.statusText}`);
  }
  
  return response.json();
}

async function updateCharacterInCloud(id: string, character: Character, formData?: CharacterFormData): Promise<any> {
  const response = await fetch(`/api/v1/characters/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: character.name,
      data: character,
      formData,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update character in cloud: ${response.statusText}`);
  }
  
  return response.json();
}

async function deleteCharacterFromCloud(id: string): Promise<void> {
  const response = await fetch(`/api/v1/characters/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok && response.status !== 404) { // 404 is OK - already deleted
    throw new Error(`Failed to delete character from cloud: ${response.statusText}`);
  }
}

// Deduplication utility functions
function deduplicateCharacters(characters: StoredCharacter[]): StoredCharacter[] {
  const seen = new Map<string, StoredCharacter>();
  const seenHashes = new Map<string, StoredCharacter>();
  
  for (const character of characters) {
    // Skip if we've seen this exact ID
    if (seen.has(character.id)) {
      console.log(`Skipping duplicate ID: ${character.id}`);
      continue;
    }
    
    // Check content hash for duplicates with different IDs
    const contentHash = generateContentHash(character.character);
    const existingByHash = seenHashes.get(contentHash);
    
    if (existingByHash) {
      console.log(`Found duplicate content for ${character.character.name}, keeping newer version`);
      const existingDate = new Date(existingByHash.createdAt).getTime();
      const currentDate = new Date(character.createdAt).getTime();
      
      // Keep the newer character
      if (currentDate > existingDate) {
        seen.delete(existingByHash.id);
        seen.set(character.id, character);
        seenHashes.set(contentHash, character);
      }
      // If existing is newer or same age, skip current
    } else {
      seen.set(character.id, character);
      seenHashes.set(contentHash, character);
    }
  }
  
  return Array.from(seen.values());
}

function convertCloudToStoredCharacter(cloudChar: any): StoredCharacter {
  return {
    id: cloudChar.id,
    character: cloudChar.data || cloudChar.character,
    createdAt: cloudChar.createdAt || new Date().toISOString(),
    isExample: false,
    formData: cloudChar.formData,
    hasStoredImage: !!cloudChar.portraitUrl
  };
}

// FIXED: Hybrid Storage Class with proper sync tracking and duplicate prevention
export class HybridCharacterStorage {
  private user: { id: string } | null = null;
  private initialized = false;
  private syncPromise: Promise<void> | null = null;
  private syncMetadata: SyncMetadata = {
    lastSyncTime: 0,
    syncedCharacterIds: new Set(),
    cloudCharacterHashes: new Map()
  };
  private readonly SYNC_COOLDOWN = 30000; // 30 seconds between syncs
  private readonly SYNC_METADATA_KEY = 'npc-forge-sync-metadata';
  
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const previousUser = this.user;
      this.user = await getAuthenticatedUser();
      
      // Load sync metadata from localStorage
      this.loadSyncMetadata();
      
      console.log(`HybridStorage initialized. User authenticated: ${!!this.user}`);
      
      // If user just signed in (wasn't authenticated before but is now), trigger sync
      if (!previousUser && this.user && isOnline()) {
        console.log('User just signed in, triggering sync check...');
        // Use a delay to avoid immediate sync spam
        setTimeout(() => this.triggerSmartSync(), 2000);
      }
    } catch (error) {
      console.warn('Failed to initialize hybrid storage:', error);
    }
    
    // Always initialize local storage
    await initializeLocalLibrary();
    this.initialized = true;
  }
  
  private loadSyncMetadata(): void {
    try {
      const stored = localStorage.getItem(this.SYNC_METADATA_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.syncMetadata = {
          lastSyncTime: parsed.lastSyncTime || 0,
          syncedCharacterIds: new Set(parsed.syncedCharacterIds || []),
          cloudCharacterHashes: new Map(parsed.cloudCharacterHashes || [])
        };
      }
    } catch (error) {
      console.warn('Failed to load sync metadata:', error);
    }
  }
  
  private saveSyncMetadata(): void {
    try {
      const toStore = {
        lastSyncTime: this.syncMetadata.lastSyncTime,
        syncedCharacterIds: Array.from(this.syncMetadata.syncedCharacterIds),
        cloudCharacterHashes: Array.from(this.syncMetadata.cloudCharacterHashes)
      };
      localStorage.setItem(this.SYNC_METADATA_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.warn('Failed to save sync metadata:', error);
    }
  }
  
  /**
   * FIXED: Smart sync that only uploads characters that haven't been synced
   */
  private triggerSmartSync(): void {
    const now = Date.now();
    if (this.syncPromise) {
      console.log('Sync already in progress, skipping...');
      return;
    }
    
    if ((now - this.syncMetadata.lastSyncTime) < this.SYNC_COOLDOWN) {
      console.log('Sync cooldown active, skipping...');
      return;
    }
    
    this.syncMetadata.lastSyncTime = now;
    this.syncPromise = this.performSmartSync().finally(() => {
      this.syncPromise = null;
      this.saveSyncMetadata();
    });
  }
  
  /**
   * FIXED: Smart sync that prevents duplicates and tracks what's been synced
   */
  private async performSmartSync(): Promise<void> {
    try {
      console.log('Starting smart sync...');
      
      // Get local characters that are not examples
      const localCharacters = await getLocalCharacters();
      const userCharacters = localCharacters.filter(char => !char.isExample);
      
      if (userCharacters.length === 0) {
        console.log('No user characters to sync');
        return;
      }
      
      // Get existing cloud characters
      let cloudCharacters: any[] = [];
      try {
        cloudCharacters = await getCharactersFromCloud();
        console.log(`Found ${cloudCharacters.length} characters in cloud`);
      } catch (error) {
        console.warn('Failed to fetch cloud characters:', error);
        return; // Don't sync if we can't check for duplicates
      }
      
      // Build maps of existing cloud data
      const cloudIds = new Set(cloudCharacters.map(char => char.id));
      const cloudHashes = new Map<string, any>();
      
      cloudCharacters.forEach(char => {
        const character = char.data || char.character;
        if (character) {
          const hash = generateContentHash(character);
          cloudHashes.set(hash, char);
        }
      });
      
      let synced = 0;
      let skipped = 0;
      let failed = 0;
      
      for (const localChar of userCharacters) {
        try {
          const contentHash = generateContentHash(localChar.character);
          
          // Skip if we've already synced this character by ID
          if (this.syncMetadata.syncedCharacterIds.has(localChar.id)) {
            console.log(`Already synced ${localChar.character.name} (by ID), skipping`);
            skipped++;
            continue;
          }
          
          // Skip if cloud already has this character by content hash
          if (cloudHashes.has(contentHash)) {
            console.log(`Character ${localChar.character.name} already exists in cloud (by content), marking as synced`);
            this.syncMetadata.syncedCharacterIds.add(localChar.id);
            skipped++;
            continue;
          }
          
          // Check if cloud has character by ID (for updates)
          if (cloudIds.has(localChar.id)) {
            console.log(`Updating existing character ${localChar.character.name} in cloud`);
            await updateCharacterInCloud(localChar.id, localChar.character, localChar.formData);
          } else {
            console.log(`Creating new character ${localChar.character.name} in cloud`);
            await upsertCharacterToCloud(localChar.character, localChar.formData, localChar.id);
          }
          
          // Mark as synced
          this.syncMetadata.syncedCharacterIds.add(localChar.id);
          this.syncMetadata.cloudCharacterHashes.set(localChar.id, contentHash);
          synced++;
          
        } catch (error) {
          console.error(`Failed to sync character ${localChar.character.name}:`, error);
          failed++;
        }
      }
      
      console.log(`Smart sync completed: ${synced} synced, ${skipped} skipped, ${failed} failed`);
      
      // Emit event for UI updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('characters-synced', {
          detail: { synced, skipped, failed, total: userCharacters.length }
        }));
      }
      
    } catch (error) {
      console.error('Smart sync failed:', error);
    }
  }
  
  /**
   * Clean up sync metadata for deleted characters
   */
  private cleanupSyncMetadata(currentCharacterIds: string[]): void {
    const currentIds = new Set(currentCharacterIds);
    
    // Remove sync tracking for characters that no longer exist locally
    for (const syncedId of this.syncMetadata.syncedCharacterIds) {
      if (!currentIds.has(syncedId)) {
        this.syncMetadata.syncedCharacterIds.delete(syncedId);
        this.syncMetadata.cloudCharacterHashes.delete(syncedId);
      }
    }
  }
  
  /**
   * Force re-check authentication and trigger sync if needed
   */
  async refreshAuth(): Promise<void> {
    this.initialized = false;
    await this.initialize();
  }
  
  /**
   * FIXED: Get all characters with proper deduplication
   */
  async getCharacters(): Promise<StoredCharacter[]> {
    await this.initialize();
    
    let cloudCharacters: StoredCharacter[] = [];
    let localCharacters: StoredCharacter[] = [];
    
    // Always get local characters first
    try {
      localCharacters = await getLocalCharacters();
      console.log(`Loaded ${localCharacters.length} characters from local storage`);
    } catch (error) {
      console.error('Failed to load local characters:', error);
    }
    
    // If user is authenticated and online, also get cloud characters
    if (this.user && isOnline()) {
      try {
        const cloudData = await getCharactersFromCloud();
        cloudCharacters = cloudData.map(convertCloudToStoredCharacter);
        console.log(`Loaded ${cloudCharacters.length} characters from cloud`);
      } catch (error) {
        console.warn('Failed to load from cloud, using local only:', error);
      }
    }
    
    // Merge and deduplicate characters
    const allCharacters = [...cloudCharacters, ...localCharacters];
    const deduplicatedCharacters = deduplicateCharacters(allCharacters);
    
    // Clean up sync metadata
    this.cleanupSyncMetadata(deduplicatedCharacters.map(c => c.id));
    
    console.log(`Total unique characters after deduplication: ${deduplicatedCharacters.length}`);
    
    // Sort by creation date (newest first)
    return deduplicatedCharacters.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  /**
   * FIXED: Save character with better duplicate prevention
   */
  async saveCharacter(
    character: Character, 
    formData?: CharacterFormData, 
    isExample = false
  ): Promise<any> {
    await this.initialize();
    
    // Always save locally first
    const localResult = await saveLocalCharacter(character, formData, isExample);
    console.log('Character saved to local storage');
    
    // If authenticated and online, also save to cloud (but not example characters)
    if (this.user && isOnline() && !isExample) {
      try {
        const cloudResult = await upsertCharacterToCloud(character, formData, localResult.id);
        
        // Mark as synced
        this.syncMetadata.syncedCharacterIds.add(localResult.id);
        this.syncMetadata.cloudCharacterHashes.set(localResult.id, generateContentHash(character));
        this.saveSyncMetadata();
        
        console.log('Character saved to cloud');
      } catch (error) {
        console.warn('Failed to save character to cloud:', error);
        // Don't throw - local save succeeded
      }
    }
    
    return localResult;
  }
  
  /**
   * FIXED: Delete character with proper sync cleanup
   */
  async deleteCharacter(id: string): Promise<boolean> {
    await this.initialize();
    
    const localCharacter = await getLocalCharacterById(id);
    const isExample = localCharacter?.isExample || false;
    
    // Delete from local storage
    const localSuccess = await deleteLocalCharacter(id);
    
    // Delete from cloud if user character
    let cloudSuccess = true;
    if (this.user && isOnline() && !isExample) {
      try {
        await deleteCharacterFromCloud(id);
        console.log('Character deleted from cloud');
      } catch (error) {
        console.warn('Failed to delete character from cloud:', error);
        cloudSuccess = false;
      }
    }
    
    // Clean up sync metadata
    if (localSuccess) {
      this.syncMetadata.syncedCharacterIds.delete(id);
      this.syncMetadata.cloudCharacterHashes.delete(id);
      this.saveSyncMetadata();
    }
    
    return localSuccess && cloudSuccess;
  }
  
  /**
   * Manual sync with duplicate prevention
   */
  async syncToCloud(): Promise<{ success: number; failed: number; skipped: number }> {
    await this.initialize();
    
    if (!this.user || !isOnline()) {
      throw new Error('User must be authenticated and online to sync');
    }
    
    // Reset sync metadata to force re-evaluation
    this.syncMetadata.syncedCharacterIds.clear();
    this.syncMetadata.cloudCharacterHashes.clear();
    
    // Trigger smart sync
    await this.performSmartSync();
    
    return { success: 0, failed: 0, skipped: 0 }; // TODO: Return actual counts
  }
  
  /**
   * Get sync status
   */
  getSyncStatus(): { isAuthenticated: boolean; isSyncing: boolean } {
    return {
      isAuthenticated: !!this.user,
      isSyncing: !!this.syncPromise
    };
  }
  
  // ... (rest of the methods remain the same)
  async getCharacterById(id: string): Promise<StoredCharacter | null> {
    await this.initialize();
    
    const localCharacter = await getLocalCharacterById(id);
    
    if (this.user && isOnline()) {
      try {
        const response = await fetch(`/api/v1/characters/${id}`);
        if (response.ok) {
          const cloudCharacter = await response.json();
          const cloudStored = convertCloudToStoredCharacter(cloudCharacter);
          
          if (localCharacter) {
            const localDate = new Date(localCharacter.createdAt).getTime();
            const cloudDate = new Date(cloudStored.createdAt).getTime();
            return cloudDate >= localDate ? cloudStored : localCharacter;
          } else {
            return cloudStored;
          }
        }
      } catch (error) {
        console.warn('Failed to load character from cloud:', error);
      }
    }
    
    return localCharacter;
  }

  async loadCharacterWithImage(id: string): Promise<Character | null> {
    await this.initialize();
    
    const storedCharacter = await this.getCharacterById(id);
    if (!storedCharacter) return null;
    
    const character = JSON.parse(JSON.stringify(storedCharacter.character)) as Character;
    
    if (storedCharacter.hasStoredImage || !character.image_data) {
      try {
        const imageData = await getLocalImage(id);
        if (imageData) {
          character.image_data = imageData;
          return character;
        }
      } catch (error) {
        console.warn('Failed to load image from local storage:', error);
      }
    }
    
    return character;
  }

  async updateCharacter(
    id: string, 
    character: Character, 
    formData?: CharacterFormData
  ): Promise<boolean> {
    await this.initialize();
    
    const localSuccess = await updateLocalCharacter(id, character, formData);
    
    if (this.user && isOnline()) {
      try {
        await updateCharacterInCloud(id, character, formData);
        
        // Update sync metadata
        this.syncMetadata.cloudCharacterHashes.set(id, generateContentHash(character));
        this.saveSyncMetadata();
        
      } catch (error) {
        console.warn('Failed to update character in cloud:', error);
      }
    }
    
    return localSuccess;
  }
}

// Create singleton instance
export const hybridCharacterStorage = new HybridCharacterStorage();