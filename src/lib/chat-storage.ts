// src/lib/chat-storage.ts
import { ChatSession, ChatMessage, CHAT_CONFIG } from './chat-types';
import { Character } from './types';

const CHAT_DB_NAME = 'npc-forge-chat-db';
const CHAT_DB_VERSION = 1;
const CHAT_SESSIONS_STORE = 'chat-sessions';

let chatDbPromise: Promise<IDBDatabase> | null = null;

/**
 * Helper function to sanitize character ID for safe storage
 */
function sanitizeCharacterId(id: string): string {
  if (!id || typeof id !== 'string') {
    return 'unknown-character';
  }
  return id.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
}

/**
 * Initialize the chat IndexedDB database with better error handling
 */
async function initChatDB(): Promise<IDBDatabase> {
  if (chatDbPromise) return chatDbPromise;
  
  chatDbPromise = new Promise((resolve, reject) => {
    console.log("Opening chat IndexedDB database...");
    
    // Check if IndexedDB is available
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available'));
      return;
    }
    
    const request = indexedDB.open(CHAT_DB_NAME, CHAT_DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening chat IndexedDB:', event);
      chatDbPromise = null;
      reject(new Error('Could not open chat IndexedDB'));
    };

    request.onsuccess = (event) => {
      console.log("Chat IndexedDB opened successfully");
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Add error handler for the database
      db.onerror = (event) => {
        console.error('Chat IndexedDB error:', event);
      };
      
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      console.log("Upgrading chat IndexedDB schema...");
      const db = (event.target as IDBOpenDBRequest).result;
      
      try {
        if (!db.objectStoreNames.contains(CHAT_SESSIONS_STORE)) {
          console.log(`Creating chat object store: ${CHAT_SESSIONS_STORE}`);
          const store = db.createObjectStore(CHAT_SESSIONS_STORE, { keyPath: 'id' });
          store.createIndex('characterId', 'characterId', { unique: false });
          store.createIndex('updatedAt', 'updatedAt', { unique: false });
          console.log("Chat object store created successfully");
        }
      } catch (error) {
        console.error('Error creating chat object store:', error);
        reject(error);
      }
    };

    request.onblocked = (event) => {
      console.warn('Chat IndexedDB upgrade blocked');
    };
  });
  
  return chatDbPromise;
}

/**
 * Generate a unique chat session ID with better uniqueness
 */
function generateChatSessionId(characterId: string): string {
  const sanitizedId = sanitizeCharacterId(characterId);
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 9);
  return `chat-${sanitizedId}-${timestamp}-${randomSuffix}`;
}

/**
 * Generate a unique message ID
 */
function generateMessageId(): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 9);
  return `msg-${timestamp}-${randomSuffix}`;
}

/**
 * Create a system prompt for the character with better error handling
 */
function createCharacterSystemPrompt(character: Character): string {
  try {
    const name = character.name || "Unknown Character";
    const appearance = character.appearance || "appearance unknown";
    const personality = character.personality || "personality undefined";
    const backstory = character.backstory_hook || "background mysterious";
    
    // Gather traits for context with safer property access
    const traits: string[] = [];
    
    if (character.selected_traits && typeof character.selected_traits === 'object') {
      Object.entries(character.selected_traits).forEach(([key, value]) => {
        try {
          if (value && key !== 'genre' && key !== 'sub_genre') {
            if (Array.isArray(value)) {
              traits.push(`${key.replace(/_/g, ' ')}: ${value.join(', ')}`);
            } else if (typeof value === 'string') {
              traits.push(`${key.replace(/_/g, ' ')}: ${value}`);
            }
          }
        } catch (error) {
          console.warn(`Error processing selected trait ${key}:`, error);
        }
      });
    }
    
    if (character.added_traits && typeof character.added_traits === 'object') {
      Object.entries(character.added_traits).forEach(([key, value]) => {
        try {
          if (value && !key.includes('error') && !key.includes('fallback') && !key.includes('api') && typeof value === 'string') {
            traits.push(`${key.replace(/_/g, ' ')}: ${value}`);
          }
        } catch (error) {
          console.warn(`Error processing added trait ${key}:`, error);
        }
      });
    }
    
    const traitsText = traits.length > 0 ? `\n\nAdditional traits: ${traits.join(', ')}` : '';
    
    return `You are ${name}, a character from a role-playing game. You should respond as this character would, staying true to their personality and background.

Character Details:
- Name: ${name}
- Appearance: ${appearance}
- Personality: ${personality}
- Background: ${backstory}${traitsText}

Instructions:
- Stay in character at all times
- Respond naturally as ${name} would
- Use the character's personality and background to inform your responses
- Keep responses conversational and engaging
- Don't break character or mention that you are an AI
- Draw from the character's traits and background when appropriate
- Keep responses reasonably concise (1-3 paragraphs unless the conversation calls for more)`;
  } catch (error) {
    console.error('Error creating character system prompt:', error);
    // Return a safe fallback prompt
    return `You are a character from a role-playing game. Respond naturally and stay in character. Keep responses conversational and engaging.`;
  }
}

/**
 * Get or create a chat session for a character with enhanced error handling
 * @param characterId - ID of the character
 * @param character - Character data
 * @returns Promise with the chat session
 */
export async function getChatSession(characterId: string, character: Character): Promise<ChatSession> {
  try {
    // Sanitize character ID
    const sanitizedCharacterId = sanitizeCharacterId(characterId);
    
    if (!character || !character.name) {
      throw new Error('Invalid character data provided');
    }
    
    const db = await initChatDB();
    
    console.log(`Getting chat session for character: ${character.name} (${sanitizedCharacterId})`);
    
    // Try to find existing sessions first
    const existingSessions = await new Promise<ChatSession[]>((resolve, reject) => {
      try {
        const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readonly');
        const store = transaction.objectStore(CHAT_SESSIONS_STORE);
        const index = store.index('characterId');
        const request = index.getAll(sanitizedCharacterId);
        
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        
        request.onerror = () => {
          console.error('Error getting existing sessions:', request.error);
          reject(new Error('Failed to get existing sessions'));
        };
        
        transaction.onerror = () => {
          console.error('Transaction error getting existing sessions:', transaction.error);
          reject(new Error('Transaction failed'));
        };
      } catch (error) {
        reject(error);
      }
    });
    
    console.log(`Found ${existingSessions.length} existing sessions for ${character.name}`);
    
    // Get the most recent session for this character if any exist
    if (existingSessions.length > 0) {
      const mostRecentSession = existingSessions.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];
      
      console.log(`Using existing chat session for ${character.name}: ${mostRecentSession.id} with ${mostRecentSession.messages.length} messages`);
      console.log(`Last updated: ${mostRecentSession.updatedAt}`);
      
      // Validate the session data
      if (!mostRecentSession.messages || !Array.isArray(mostRecentSession.messages)) {
        console.warn('Invalid session messages, creating new session');
      } else {
        return mostRecentSession;
      }
    }
    
    // Create a new session if none exists or existing ones are invalid
    console.log(`Creating new chat session for ${character.name}`);
    const systemMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'system',
      content: createCharacterSystemPrompt(character),
      timestamp: new Date().toISOString(),
      characterId: sanitizedCharacterId,
    };
    
    const newSession: ChatSession = {
      id: generateChatSessionId(sanitizedCharacterId),
      characterId: sanitizedCharacterId,
      characterName: character.name,
      messages: [systemMessage], // Start with system message
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      systemPrompt: createCharacterSystemPrompt(character),
      model: CHAT_CONFIG.DEFAULT_MODEL,
      messageCount: 1
    };
    
    // Save the new session
    await saveChatSession(newSession);
    console.log(`Created and saved new chat session for ${character.name}: ${newSession.id}`);
    
    return newSession;
  } catch (error) {
    console.error('Error getting chat session:', error);
    
    // Fallback: create a session without saving to database
    const sanitizedCharacterId = sanitizeCharacterId(characterId);
    const characterName = character?.name || 'Unknown Character';
    
    const systemMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'system',
      content: createCharacterSystemPrompt(character),
      timestamp: new Date().toISOString(),
      characterId: sanitizedCharacterId,
    };
    
    return {
      id: generateChatSessionId(sanitizedCharacterId),
      characterId: sanitizedCharacterId,
      characterName: characterName,
      messages: [systemMessage],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      systemPrompt: createCharacterSystemPrompt(character),
      model: CHAT_CONFIG.DEFAULT_MODEL,
      messageCount: 1
    };
  }
}

/**
 * Save a chat session to IndexedDB with enhanced error handling
 */
export async function saveChatSession(session: ChatSession): Promise<void> {
  try {
    if (!session || !session.id) {
      throw new Error('Invalid session data');
    }
    
    const db = await initChatDB();
    
    // Update the updatedAt timestamp and validate data
    const updatedSession = {
      ...session,
      updatedAt: new Date().toISOString(),
      messageCount: Array.isArray(session.messages) ? session.messages.length : 0,
      characterId: sanitizeCharacterId(session.characterId)
    };
    
    // Ensure messages is an array
    if (!Array.isArray(updatedSession.messages)) {
      updatedSession.messages = [];
    }
    
    await new Promise<void>((resolve, reject) => {
      try {
        const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readwrite');
        const store = transaction.objectStore(CHAT_SESSIONS_STORE);
        const request = store.put(updatedSession);
        
        request.onsuccess = () => {
          console.log(`Chat session ${session.id} saved successfully with ${updatedSession.messages.length} messages`);
          resolve();
        };
        
        request.onerror = () => {
          console.error('Error saving chat session:', request.error);
          reject(new Error('Failed to save chat session'));
        };
        
        transaction.onerror = () => {
          console.error('Transaction error saving chat session:', transaction.error);
          reject(new Error('Transaction failed'));
        };
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error saving chat session:', error);
    throw error;
  }
}

/**
 * Add a message to a chat session with enhanced validation
 */
export async function addMessageToSession(
  sessionId: string, 
  role: 'user' | 'assistant', 
  content: string,
  isError: boolean = false
): Promise<ChatMessage> {
  try {
    if (!sessionId || !content || !role) {
      throw new Error('Missing required parameters for adding message');
    }
    
    if (content.length > 10000) {
      throw new Error('Message content too long');
    }
    
    const db = await initChatDB();
    
    // Get the current session
    const session = await new Promise<ChatSession>((resolve, reject) => {
      try {
        const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readonly');
        const store = transaction.objectStore(CHAT_SESSIONS_STORE);
        const request = store.get(sessionId);
        
        request.onsuccess = () => {
          if (request.result) {
            resolve(request.result);
          } else {
            reject(new Error('Session not found'));
          }
        };
        
        request.onerror = () => {
          console.error('Error getting session:', request.error);
          reject(new Error('Failed to get session'));
        };
      } catch (error) {
        reject(error);
      }
    });
    
    // Validate session data
    if (!Array.isArray(session.messages)) {
      session.messages = [];
    }
    
    // Create the new message
    const newMessage: ChatMessage = {
      id: generateMessageId(),
      role,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      characterId: sanitizeCharacterId(session.characterId),
      isError
    };
    
    // Add the message to the session
    const updatedSession = {
      ...session,
      messages: [...session.messages, newMessage],
      updatedAt: new Date().toISOString()
    };
    
    // Trim messages if we exceed the limit
    if (updatedSession.messages.length > CHAT_CONFIG.MAX_MESSAGES_PER_SESSION) {
      // Keep the first message (usually system) and the most recent messages
      const systemMessages = updatedSession.messages.filter(msg => msg.role === 'system');
      const otherMessages = updatedSession.messages.filter(msg => msg.role !== 'system');
      const recentMessages = otherMessages.slice(-CHAT_CONFIG.MAX_MESSAGES_PER_SESSION + systemMessages.length);
      updatedSession.messages = [...systemMessages, ...recentMessages];
    }
    
    // Save the updated session
    await saveChatSession(updatedSession);
    
    return newMessage;
  } catch (error) {
    console.error('Error adding message to session:', error);
    throw error;
  }
}

/**
 * Get all chat sessions for a character with better error handling
 */
export async function getChatSessionsForCharacter(characterId: string): Promise<ChatSession[]> {
  try {
    const sanitizedCharacterId = sanitizeCharacterId(characterId);
    const db = await initChatDB();
    
    return new Promise<ChatSession[]>((resolve, reject) => {
      try {
        const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readonly');
        const store = transaction.objectStore(CHAT_SESSIONS_STORE);
        const index = store.index('characterId');
        const request = index.getAll(sanitizedCharacterId);
        
        request.onsuccess = () => {
          const sessions = request.result || [];
          // Sort by most recent first and validate data
          const validSessions = sessions
            .filter(session => session && session.id && Array.isArray(session.messages))
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          
          console.log(`Found ${validSessions.length} valid sessions for character ${sanitizedCharacterId}`);
          resolve(validSessions);
        };
        
        request.onerror = () => {
          console.error('Error getting sessions for character:', request.error);
          reject(new Error('Failed to get sessions for character'));
        };
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error getting sessions for character:', error);
    return [];
  }
}

/**
 * Delete a chat session with enhanced error handling
 */
export async function deleteChatSession(sessionId: string): Promise<boolean> {
  try {
    if (!sessionId) {
      return false;
    }
    
    const db = await initChatDB();
    
    return new Promise<boolean>((resolve, reject) => {
      try {
        const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readwrite');
        const store = transaction.objectStore(CHAT_SESSIONS_STORE);
        const request = store.delete(sessionId);
        
        request.onsuccess = () => {
          console.log(`Chat session ${sessionId} deleted successfully`);
          resolve(true);
        };
        
        request.onerror = () => {
          console.error('Error deleting chat session:', request.error);
          reject(new Error('Failed to delete chat session'));
        };
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error deleting chat session:', error);
    return false;
  }
}

/**
 * Clear all chat sessions for a character with enhanced reliability
 * @param characterId - ID of the character to clear chats for
 * @returns Promise that resolves to true if successful
 */
export async function clearChatSessionsForCharacter(characterId: string): Promise<boolean> {
  try {
    const sanitizedCharacterId = sanitizeCharacterId(characterId);
    console.log(`Clearing all chat sessions for character ${sanitizedCharacterId}`);
    
    // Get all sessions for this character
    const sessions = await getChatSessionsForCharacter(sanitizedCharacterId);
    console.log(`Found ${sessions.length} sessions to delete for character ${sanitizedCharacterId}`);
    
    if (sessions.length === 0) {
      console.log(`No sessions to clear for character ${sanitizedCharacterId}`);
      return true;
    }
    
    // Delete each session individually to ensure complete removal
    const db = await initChatDB();
    
    const deletePromises = sessions.map(session => {
      return new Promise<boolean>((resolve, reject) => {
        try {
          const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readwrite');
          const store = transaction.objectStore(CHAT_SESSIONS_STORE);
          const request = store.delete(session.id);
          
          request.onsuccess = () => {
            console.log(`Deleted chat session: ${session.id}`);
            resolve(true);
          };
          
          request.onerror = () => {
            console.error(`Failed to delete chat session: ${session.id}`, request.error);
            resolve(false); // Don't reject, just mark as failed
          };
        } catch (error) {
          console.error(`Error deleting session ${session.id}:`, error);
          resolve(false);
        }
      });
    });
    
    // Wait for all deletions to complete
    const results = await Promise.all(deletePromises);
    const successCount = results.filter(Boolean).length;
    
    console.log(`Successfully deleted ${successCount} of ${sessions.length} chat sessions for character ${sanitizedCharacterId}`);
    
    // Verify sessions are actually gone
    const remainingSessions = await getChatSessionsForCharacter(sanitizedCharacterId);
    if (remainingSessions.length > 0) {
      console.warn(`Warning: ${remainingSessions.length} sessions still remain after clearing for character ${sanitizedCharacterId}`);
      return false;
    }
    
    console.log(`Verified: No sessions remain for character ${sanitizedCharacterId} after clearing`);
    return successCount === sessions.length;
  } catch (error) {
    console.error('Error clearing chat sessions for character:', error);
    return false;
  }
}

/**
 * Get the most recent conversation messages for API context with validation
 */
export function getRecentMessagesForAPI(session: ChatSession, maxMessages: number = 20): ChatMessage[] {
  try {
    if (!session || !Array.isArray(session.messages)) {
      return [];
    }
    
    // Get recent messages but always include the system prompt if we have one
    const systemMessages = session.messages.filter(msg => msg && msg.role === 'system');
    const conversationMessages = session.messages
      .filter(msg => msg && msg.role !== 'system' && !msg.isError && msg.content)
      .slice(-maxMessages);
    
    return [...systemMessages, ...conversationMessages];
  } catch (error) {
    console.error('Error getting recent messages for API:', error);
    return [];
  }
}