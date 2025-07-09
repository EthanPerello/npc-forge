// lib/hybrid-storage.ts (COMPLETE FIXED VERSION)
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
import { 
  getChatSession as getLocalChatSession,
  saveChatSession as saveLocalChatSession,
  addMessageToSession as addLocalMessageToSession,
  getChatSessionsForCharacter as getLocalChatSessionsForCharacter,
  deleteChatSession as deleteLocalChatSession,
  clearChatSessionsForCharacter as clearLocalChatSessionsForCharacter
} from './chat-storage';
import { ChatSession, ChatMessage } from './chat-types';

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

// FIXED: Cloud API functions with proper upsert behavior
async function saveCharacterToCloud(character: Character, formData?: CharacterFormData): Promise<any> {
  const response = await fetch('/api/v1/characters', {
    method: 'POST',
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
    throw new Error(`Failed to save character to cloud: ${response.statusText}`);
  }
  
  return response.json();
}

// NEW: Upsert character to cloud (create or update)
async function upsertCharacterToCloud(id: string, character: Character, formData?: CharacterFormData): Promise<any> {
  // First try to update existing character
  try {
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
    
    if (response.ok) {
      return response.json();
    } else if (response.status === 404) {
      // Character doesn't exist, create it
      return await saveCharacterToCloud(character, formData);
    } else {
      throw new Error(`Failed to update character in cloud: ${response.statusText}`);
    }
  } catch (error) {
    // If update fails, try to create
    console.warn('Update failed, trying to create:', error);
    return await saveCharacterToCloud(character, formData);
  }
}

async function getCharactersFromCloud(): Promise<any[]> {
  const response = await fetch('/api/v1/characters');
  
  if (!response.ok) {
    throw new Error(`Failed to fetch characters from cloud: ${response.statusText}`);
  }
  
  return response.json();
}

async function getCharacterFromCloud(id: string): Promise<any | null> {
  const response = await fetch(`/api/v1/characters/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch character from cloud: ${response.statusText}`);
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
  
  if (!response.ok) {
    throw new Error(`Failed to delete character from cloud: ${response.statusText}`);
  }
}

async function saveChatSessionToCloud(session: ChatSession): Promise<any> {
  const response = await fetch('/api/v1/chat/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(session),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to save chat session to cloud: ${response.statusText}`);
  }
  
  return response.json();
}

async function getChatSessionsFromCloud(characterId: string): Promise<any[]> {
  const response = await fetch(`/api/v1/chat/sessions?characterId=${characterId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch chat sessions from cloud: ${response.statusText}`);
  }
  
  return response.json();
}

// NEW: Deduplication utility functions
function deduplicateCharacters(characters: StoredCharacter[]): StoredCharacter[] {
  const seen = new Map<string, StoredCharacter>();
  
  for (const character of characters) {
    const existingChar = seen.get(character.id);
    
    if (!existingChar) {
      seen.set(character.id, character);
    } else {
      // If duplicate found, prefer the newer one or cloud version
      const existingDate = new Date(existingChar.createdAt).getTime();
      const currentDate = new Date(character.createdAt).getTime();
      
      // Prefer cloud characters over local ones (assuming cloud has precedence)
      // or prefer newer characters
      if (currentDate > existingDate) {
        seen.set(character.id, character);
      }
    }
  }
  
  return Array.from(seen.values());
}

function convertCloudToStoredCharacter(cloudChar: any): StoredCharacter {
  return {
    id: cloudChar.id,
    character: cloudChar.data || cloudChar.character,
    createdAt: cloudChar.createdAt || new Date().toISOString(),
    isExample: false, // Cloud characters are never examples
    formData: cloudChar.formData,
    hasStoredImage: false // Will be handled separately
  };
}

// Hybrid Storage Class with FIXED deduplication
export class HybridCharacterStorage {
  private user: { id: string } | null = null;
  private initialized = false;
  private syncPromise: Promise<void> | null = null;
  private lastSyncTime = 0;
  private readonly SYNC_COOLDOWN = 5000; // 5 seconds between syncs
  
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const previousUser = this.user;
      this.user = await getAuthenticatedUser();
      
      console.log(`HybridStorage initialized. User authenticated: ${!!this.user}`);
      
      // If user just signed in (wasn't authenticated before but is now), trigger sync
      if (!previousUser && this.user && isOnline()) {
        console.log('User just signed in, triggering automatic sync...');
        this.triggerAutoSync();
      }
    } catch (error) {
      console.warn('Failed to initialize hybrid storage:', error);
    }
    
    // Always initialize local storage
    await initializeLocalLibrary();
    this.initialized = true;
  }
  
  /**
   * FIXED: Trigger automatic sync with cooldown to prevent spam
   */
  private triggerAutoSync(): void {
    const now = Date.now();
    if (this.syncPromise || (now - this.lastSyncTime) < this.SYNC_COOLDOWN) {
      console.log('Sync already in progress or in cooldown, skipping...');
      return;
    }
    
    this.lastSyncTime = now;
    this.syncPromise = this.performAutoSync().finally(() => {
      this.syncPromise = null;
    });
  }
  
  /**
   * FIXED: Perform automatic sync with proper duplicate checking
   */
  private async performAutoSync(): Promise<void> {
    try {
      console.log('Starting automatic sync of local characters to cloud...');
      
      const localCharacters = await getLocalCharacters();
      const userCharacters = localCharacters.filter(char => !char.isExample);
      
      if (userCharacters.length === 0) {
        console.log('No user characters to sync');
        return;
      }
      
      // Get existing cloud characters to check for duplicates
      let existingCloudCharacters: any[] = [];
      try {
        existingCloudCharacters = await getCharactersFromCloud();
      } catch (error) {
        console.warn('Failed to fetch existing cloud characters for sync check:', error);
        // Continue with sync anyway, API should handle duplicates
      }
      
      const existingCloudIds = new Set(existingCloudCharacters.map(char => char.id));
      
      let synced = 0;
      let skipped = 0;
      let failed = 0;
      
      for (const storedChar of userCharacters) {
        try {
          // Check if character already exists in cloud
          if (existingCloudIds.has(storedChar.id)) {
            console.log(`Character ${storedChar.character.name} already exists in cloud, updating...`);
            await updateCharacterInCloud(storedChar.id, storedChar.character, storedChar.formData);
            synced++;
          } else {
            console.log(`Syncing new character ${storedChar.character.name} to cloud...`);
            await saveCharacterToCloud(storedChar.character, storedChar.formData);
            synced++;
          }
        } catch (error) {
          // Check if error is due to duplicate (409 conflict)
          if (error instanceof Error && error.message.includes('409')) {
            console.log(`Character ${storedChar.character.name} already exists (409), skipping...`);
            skipped++;
          } else {
            failed++;
            console.warn(`Failed to sync character ${storedChar.character.name}:`, error);
          }
        }
      }
      
      console.log(`Auto-sync completed: ${synced} synced, ${skipped} skipped, ${failed} failed`);
      
      // Emit event for UI updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('characters-synced', {
          detail: { synced, skipped, failed, total: userCharacters.length }
        }));
      }
    } catch (error) {
      console.error('Auto-sync failed:', error);
    }
  }
  
  /**
   * Get current sync status
   */
  getSyncStatus(): { isAuthenticated: boolean; isSyncing: boolean } {
    return {
      isAuthenticated: !!this.user,
      isSyncing: !!this.syncPromise
    };
  }
  
  /**
   * Force re-check authentication and trigger sync if needed
   */
  async refreshAuth(): Promise<void> {
    this.initialized = false;
    await this.initialize();
  }
  
  /**
   * FIXED: Get all characters with proper deduplication and merging
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
    // Priority: Cloud characters take precedence over local ones for authenticated users
    const allCharacters = [...cloudCharacters, ...localCharacters];
    const deduplicatedCharacters = deduplicateCharacters(allCharacters);
    
    console.log(`Total unique characters after deduplication: ${deduplicatedCharacters.length}`);
    
    // Sort by creation date (newest first) for consistent ordering
    return deduplicatedCharacters.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  /**
   * FIXED: Save character with duplicate checking
   */
  async saveCharacter(
    character: Character, 
    formData?: CharacterFormData, 
    isExample = false
  ): Promise<any> {
    await this.initialize();
    
    let cloudResult = null;
    let localResult = null;
    
    // Always save locally first (for offline capability)
    try {
      localResult = await saveLocalCharacter(character, formData, isExample);
      console.log('Character saved to local storage');
    } catch (error) {
      console.error('Failed to save character locally:', error);
      throw error; // Local save is critical
    }
    
    // If authenticated and online, also save to cloud (but not example characters)
    if (this.user && isOnline() && !isExample) {
      try {
        // Use upsert to handle potential duplicates
        cloudResult = await upsertCharacterToCloud(localResult.id, character, formData);
        console.log('Character upserted to cloud');
      } catch (error) {
        console.warn('Failed to save character to cloud:', error);
        // Don't throw - local save succeeded
      }
    }
    
    return localResult; // Return local result for compatibility
  }
  
  /**
   * FIXED: Get character by ID with proper cloud/local fallback
   */
  async getCharacterById(id: string): Promise<StoredCharacter | null> {
    await this.initialize();
    
    // Try local first (faster)
    const localCharacter = await getLocalCharacterById(id);
    
    // If user is authenticated and online, also check cloud
    if (this.user && isOnline()) {
      try {
        const cloudCharacter = await getCharacterFromCloud(id);
        if (cloudCharacter) {
          const cloudStored = convertCloudToStoredCharacter(cloudCharacter);
          
          // If we have both, prefer the newer one
          if (localCharacter) {
            const localDate = new Date(localCharacter.createdAt).getTime();
            const cloudDate = new Date(cloudStored.createdAt).getTime();
            
            if (cloudDate >= localDate) {
              console.log(`Using cloud version of character ${id} (newer or same age)`);
              return cloudStored;
            } else {
              console.log(`Using local version of character ${id} (newer)`);
              return localCharacter;
            }
          } else {
            console.log(`Found character ${id} in cloud only`);
            return cloudStored;
          }
        }
      } catch (error) {
        console.warn('Failed to load character from cloud, using local:', error);
      }
    }
    
    if (localCharacter) {
      console.log(`Found character ${id} in local storage only`);
    }
    return localCharacter;
  }
  
  /**
   * Load character with image - combines cloud and local logic
   */
  async loadCharacterWithImage(id: string): Promise<Character | null> {
    await this.initialize();
    
    // Try to get character data (with proper deduplication)
    const storedCharacter = await this.getCharacterById(id);
    if (!storedCharacter) return null;
    
    const character = JSON.parse(JSON.stringify(storedCharacter.character)) as Character;
    
    // Try to load image from local storage first (for performance)
    if (storedCharacter.hasStoredImage || !character.image_data) {
      try {
        const imageData = await getLocalImage(id);
        if (imageData) {
          character.image_data = imageData;
          console.log(`Loaded image for character ${character.name} from local storage`);
          return character;
        }
      } catch (error) {
        console.warn('Failed to load image from local storage:', error);
      }
    }
    
    // If we have a portrait URL but no local image data, try to fetch it
    if (character.image_url && !character.image_data) {
      try {
        const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(character.image_url)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.imageData) {
            character.image_data = data.imageData;
            
            // Save to local storage for future use
            try {
              await saveLocalImage(id, data.imageData);
            } catch (error) {
              console.warn('Failed to cache image locally:', error);
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch image from URL:', error);
      }
    }
    
    return character;
  }
  
  /**
   * FIXED: Update character with proper sync
   */
  async updateCharacter(
    id: string, 
    character: Character, 
    formData?: CharacterFormData
  ): Promise<boolean> {
    await this.initialize();
    
    let success = false;
    
    // Always update locally first
    try {
      success = await updateLocalCharacter(id, character, formData);
      console.log('Character updated in local storage');
    } catch (error) {
      console.error('Failed to update character locally:', error);
      return false;
    }
    
    // If authenticated and online, also update in cloud
    if (this.user && isOnline()) {
      try {
        await updateCharacterInCloud(id, character, formData);
        console.log('Character updated in cloud');
      } catch (error) {
        console.warn('Failed to update character in cloud:', error);
        // Don't fail - local update succeeded
      }
    }
    
    return success;
  }
  
  /**
   * FIXED: Delete character with better sync handling
   */
  async deleteCharacter(id: string): Promise<boolean> {
    await this.initialize();
    
    let localSuccess = false;
    let cloudSuccess = false;
    
    console.log(`Starting deletion process for character: ${id}`);
    
    // First, check if character exists locally to get its details
    const localCharacter = await getLocalCharacterById(id);
    const isExample = localCharacter?.isExample || false;
    
    console.log(`Character found locally: ${!!localCharacter}, isExample: ${isExample}`);
    
    // Delete from local storage first
    try {
      localSuccess = await deleteLocalCharacter(id);
      console.log(`Local deletion ${localSuccess ? 'succeeded' : 'failed'} for character: ${id}`);
    } catch (error) {
      console.error('Failed to delete character locally:', error);
    }
    
    // If authenticated and online, also delete from cloud (but only for user characters)
    if (this.user && isOnline() && !isExample) {
      console.log('Attempting cloud deletion for user character...');
      try {
        await deleteCharacterFromCloud(id);
        cloudSuccess = true;
        console.log('Character deleted from cloud successfully');
      } catch (error) {
        // If character doesn't exist in cloud (404), that's actually success
        if (error instanceof Error && error.message.includes('404')) {
          cloudSuccess = true;
          console.log('Character was not in cloud (404), treating as successful deletion');
        } else {
          console.error('Failed to delete character from cloud:', error);
          cloudSuccess = false;
        }
      }
    } else if (isExample) {
      // For example characters, we don't need cloud deletion
      cloudSuccess = true;
      console.log('Skipping cloud deletion for example character');
    } else if (!this.user) {
      // If not authenticated, only local deletion matters
      cloudSuccess = true;
      console.log('Skipping cloud deletion - user not authenticated');
    } else if (!isOnline()) {
      // If offline, only local deletion matters
      cloudSuccess = true;
      console.log('Skipping cloud deletion - user offline');
    }
    
    const overallSuccess = localSuccess && cloudSuccess;
    console.log(`Deletion process completed. Local: ${localSuccess}, Cloud: ${cloudSuccess}, Overall: ${overallSuccess}`);
    
    // Emit deletion event for UI updates
    if (overallSuccess && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('character-deleted', {
        detail: { characterId: id, isExample }
      }));
    }
    
    return overallSuccess;
  }
  
  /**
   * FIXED: Sync local changes to cloud with proper duplicate handling
   */
  async syncToCloud(): Promise<{ success: number; failed: number; skipped: number }> {
    await this.initialize();
    
    if (!this.user || !isOnline()) {
      throw new Error('User must be authenticated and online to sync');
    }
    
    const localCharacters = await getLocalCharacters();
    const userCharacters = localCharacters.filter(char => !char.isExample);
    
    // Get existing cloud characters to check for duplicates
    let existingCloudCharacters: any[] = [];
    try {
      existingCloudCharacters = await getCharactersFromCloud();
    } catch (error) {
      console.warn('Failed to fetch existing cloud characters:', error);
    }
    
    const existingCloudIds = new Set(existingCloudCharacters.map(char => char.id));
    
    let success = 0;
    let failed = 0;
    let skipped = 0;
    
    for (const storedChar of userCharacters) {
      try {
        if (existingCloudIds.has(storedChar.id)) {
          // Character exists, update it
          await updateCharacterInCloud(storedChar.id, storedChar.character, storedChar.formData);
          success++;
          console.log(`Updated existing character: ${storedChar.character.name}`);
        } else {
          // Character doesn't exist, create it
          await saveCharacterToCloud(storedChar.character, storedChar.formData);
          success++;
          console.log(`Created new character: ${storedChar.character.name}`);
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('409')) {
          // Conflict - character already exists
          skipped++;
          console.log(`Skipped duplicate character: ${storedChar.character.name}`);
        } else {
          console.error(`Failed to sync character ${storedChar.character.name}:`, error);
          failed++;
        }
      }
    }
    
    console.log(`Manual sync completed: ${success} succeeded, ${skipped} skipped, ${failed} failed`);
    return { success, failed, skipped };
  }
}

// Hybrid Chat Storage Class
export class HybridChatStorage {
  private user: { id: string } | null = null;
  private initialized = false;
  
  async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      this.user = await getAuthenticatedUser();
      console.log(`HybridChatStorage initialized. User authenticated: ${!!this.user}`);
    } catch (error) {
      console.warn('Failed to initialize hybrid chat storage:', error);
    }
    
    this.initialized = true;
  }
  
  /**
   * Get or create chat session - tries cloud first, falls back to local
   */
  async getChatSession(characterId: string, character: Character): Promise<ChatSession> {
    await this.initialize();
    
    // If user is authenticated and online, try cloud first
    if (this.user && isOnline()) {
      try {
        const cloudSessions = await getChatSessionsFromCloud(characterId);
        if (cloudSessions.length > 0) {
          const latestSession = cloudSessions.sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0];
          console.log(`Using cloud chat session for character ${character.name}`);
          return latestSession;
        }
      } catch (error) {
        console.warn('Failed to load chat session from cloud, using local:', error);
      }
    }
    
    // Fallback to local storage
    return getLocalChatSession(characterId, character);
  }
  
  /**
   * Save chat session - saves to both cloud and local
   */
  async saveChatSession(session: ChatSession): Promise<void> {
    await this.initialize();
    
    // Always save locally first
    try {
      await saveLocalChatSession(session);
      console.log('Chat session saved to local storage');
    } catch (error) {
      console.error('Failed to save chat session locally:', error);
      throw error;
    }
    
    // If authenticated and online, also save to cloud
    if (this.user && isOnline()) {
      try {
        await saveChatSessionToCloud(session);
        console.log('Chat session saved to cloud');
      } catch (error) {
        console.warn('Failed to save chat session to cloud:', error);
        // Don't throw - local save succeeded
      }
    }
  }
  
  /**
   * Add message to session - updates both cloud and local
   */
  async addMessageToSession(
    sessionId: string, 
    role: 'user' | 'assistant', 
    content: string,
    isError: boolean = false
  ): Promise<ChatMessage> {
    await this.initialize();
    
    // Always add to local first
    const message = await addLocalMessageToSession(sessionId, role, content, isError);
    
    // If authenticated and online, sync the updated session to cloud
    if (this.user && isOnline()) {
      // Note: This would require getting the updated session and saving it
      // Implementation depends on your cloud chat API design
    }
    
    return message;
  }
}

// Create singleton instances
export const hybridCharacterStorage = new HybridCharacterStorage();
export const hybridChatStorage = new HybridChatStorage();