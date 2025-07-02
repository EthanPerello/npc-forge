// lib/hybrid-storage.ts
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
  deleteImage as deleteLocalImage
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

// Cloud API functions
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

// Hybrid Storage Class
export class HybridCharacterStorage {
  private user: { id: string } | null = null;
  private initialized = false;
  private syncPromise: Promise<void> | null = null;
  
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
   * Trigger automatic sync in the background (non-blocking)
   */
  private triggerAutoSync(): void {
    if (this.syncPromise) {
      console.log('Sync already in progress, skipping...');
      return;
    }
    
    this.syncPromise = this.performAutoSync().finally(() => {
      this.syncPromise = null;
    });
  }
  
  /**
   * Perform automatic sync of local characters to cloud
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
      
      let synced = 0;
      let failed = 0;
      
      for (const storedChar of userCharacters) {
        try {
          await saveCharacterToCloud(storedChar.character, storedChar.formData);
          synced++;
          console.log(`Synced character: ${storedChar.character.name}`);
        } catch (error) {
          failed++;
          console.warn(`Failed to sync character ${storedChar.character.name}:`, error);
        }
      }
      
      console.log(`Auto-sync completed: ${synced} synced, ${failed} failed`);
      
      // Emit event for UI updates
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('characters-synced', {
          detail: { synced, failed, total: userCharacters.length }
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
   * Get all characters - tries cloud first, falls back to local
   */
  async getCharacters(): Promise<any[]> {
    await this.initialize();
    
    // If user is authenticated and online, try cloud first
    if (this.user && isOnline()) {
      try {
        const cloudCharacters = await getCharactersFromCloud();
        console.log(`Loaded ${cloudCharacters.length} characters from cloud`);
        return cloudCharacters;
      } catch (error) {
        console.warn('Failed to load from cloud, falling back to local:', error);
      }
    }
    
    // Fallback to local storage
    const localCharacters = await getLocalCharacters();
    console.log(`Loaded ${localCharacters.length} characters from local storage`);
    return localCharacters;
  }
  
  /**
   * Save character - saves to both cloud and local if possible
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
        cloudResult = await saveCharacterToCloud(character, formData);
        console.log('Character saved to cloud');
      } catch (error) {
        console.warn('Failed to save character to cloud:', error);
        // Don't throw - local save succeeded
      }
    }
    
    return localResult; // Return local result for compatibility
  }
  
  /**
   * Get character by ID - tries cloud first, falls back to local
   */
  async getCharacterById(id: string): Promise<any | null> {
    await this.initialize();
    
    // If user is authenticated and online, try cloud first
    if (this.user && isOnline()) {
      try {
        const cloudCharacter = await getCharacterFromCloud(id);
        if (cloudCharacter) {
          console.log(`Loaded character ${id} from cloud`);
          return cloudCharacter;
        }
      } catch (error) {
        console.warn('Failed to load character from cloud, trying local:', error);
      }
    }
    
    // Fallback to local storage
    const localCharacter = await getLocalCharacterById(id);
    if (localCharacter) {
      console.log(`Loaded character ${id} from local storage`);
    }
    return localCharacter;
  }
  
  /**
   * Load character with image - combines cloud and local logic
   */
  async loadCharacterWithImage(id: string): Promise<Character | null> {
    await this.initialize();
    
    // Try to get character data (cloud first, then local)
    const storedCharacter = await this.getCharacterById(id);
    if (!storedCharacter) return null;
    
    const character = JSON.parse(JSON.stringify(storedCharacter.character || storedCharacter.data)) as Character;
    
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
   * Update character - updates both cloud and local
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
   * Delete character - deletes from both cloud and local
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
        console.error('Failed to delete character from cloud:', error);
        // For user characters, cloud deletion failure is concerning but not blocking
        // since local deletion is the primary concern for user experience
        cloudSuccess = false;
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
   * Sync local changes to cloud (manual sync)
   */
  async syncToCloud(): Promise<{ success: number; failed: number }> {
    await this.initialize();
    
    if (!this.user || !isOnline()) {
      throw new Error('User must be authenticated and online to sync');
    }
    
    const localCharacters = await getLocalCharacters();
    let success = 0;
    let failed = 0;
    
    for (const storedChar of localCharacters) {
      if (storedChar.isExample) continue; // Skip example characters
      
      try {
        await saveCharacterToCloud(storedChar.character, storedChar.formData);
        success++;
      } catch (error) {
        console.error(`Failed to sync character ${storedChar.character.name}:`, error);
        failed++;
      }
    }
    
    console.log(`Manual sync completed: ${success} succeeded, ${failed} failed`);
    return { success, failed };
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