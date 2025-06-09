// src/lib/chat-storage.ts
import { ChatSession, ChatMessage, CHAT_CONFIG } from './chat-types';
import { Character } from './types';

const CHAT_DB_NAME = 'npc-forge-chat-db';
const CHAT_DB_VERSION = 1;
const CHAT_SESSIONS_STORE = 'chat-sessions';

let chatDbPromise: Promise<IDBDatabase> | null = null;

/**
 * Initialize the chat IndexedDB database
 */
async function initChatDB(): Promise<IDBDatabase> {
  if (chatDbPromise) return chatDbPromise;
  
  chatDbPromise = new Promise((resolve, reject) => {
    console.log("Opening chat IndexedDB database...");
    const request = indexedDB.open(CHAT_DB_NAME, CHAT_DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening chat IndexedDB:', event);
      chatDbPromise = null;
      reject('Could not open chat IndexedDB');
    };

    request.onsuccess = (event) => {
      console.log("Chat IndexedDB opened successfully");
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      console.log("Upgrading chat IndexedDB schema...");
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(CHAT_SESSIONS_STORE)) {
        console.log(`Creating chat object store: ${CHAT_SESSIONS_STORE}`);
        const store = db.createObjectStore(CHAT_SESSIONS_STORE, { keyPath: 'id' });
        store.createIndex('characterId', 'characterId', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };
  });
  
  return chatDbPromise;
}

/**
 * Generate a unique chat session ID
 */
function generateChatSessionId(characterId: string): string {
  return `chat-${characterId}-${Date.now()}`;
}

/**
 * Generate a unique message ID
 */
function generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a system prompt for the character
 */
function createCharacterSystemPrompt(character: Character): string {
  const name = character.name;
  const appearance = character.appearance || "appearance unknown";
  const personality = character.personality || "personality undefined";
  const backstory = character.backstory_hook || "background mysterious";
  
  // Gather traits for context
  const traits: string[] = [];
  
  if (character.selected_traits) {
    Object.entries(character.selected_traits).forEach(([key, value]) => {
      if (value && key !== 'genre' && key !== 'sub_genre') {
        if (Array.isArray(value)) {
          traits.push(`${key.replace(/_/g, ' ')}: ${value.join(', ')}`);
        } else {
          traits.push(`${key.replace(/_/g, ' ')}: ${value}`);
        }
      }
    });
  }
  
  if (character.added_traits) {
    Object.entries(character.added_traits).forEach(([key, value]) => {
      if (value && !key.includes('error') && !key.includes('fallback') && !key.includes('api')) {
        traits.push(`${key.replace(/_/g, ' ')}: ${value}`);
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
}

/**
 * FIXED: Get or create a chat session for a character - always checks for existing sessions first
 * @param characterId - ID of the character
 * @param character - Character data
 * @returns Promise with the chat session
 */
export async function getChatSession(characterId: string, character: Character): Promise<ChatSession> {
  try {
    const db = await initChatDB();
    
    console.log(`Getting chat session for character: ${character.name} (${characterId})`);
    
    // ALWAYS try to find existing sessions first
    const existingSessions = await new Promise<ChatSession[]>((resolve, reject) => {
      const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readonly');
      const store = transaction.objectStore(CHAT_SESSIONS_STORE);
      const index = store.index('characterId');
      const request = index.getAll(characterId);
      
      request.onsuccess = () => {
        resolve(request.result || []);
      };
      
      request.onerror = () => {
        reject('Failed to get existing sessions');
      };
    });
    
    console.log(`Found ${existingSessions.length} existing sessions for ${character.name}`);
    
    // Get the most recent session for this character if any exist
    if (existingSessions.length > 0) {
      const mostRecentSession = existingSessions.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )[0];
      
      console.log(`Using existing chat session for ${character.name}: ${mostRecentSession.id} with ${mostRecentSession.messages.length} messages`);
      console.log(`Last updated: ${mostRecentSession.updatedAt}`);
      return mostRecentSession;
    }
    
    // Create a new session if none exists
    console.log(`Creating new chat session for ${character.name}`);
    const systemMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'system',
      content: createCharacterSystemPrompt(character),
      timestamp: new Date().toISOString(),
      characterId,
    };
    
    const newSession: ChatSession = {
      id: generateChatSessionId(characterId),
      characterId,
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
    const systemMessage: ChatMessage = {
      id: generateMessageId(),
      role: 'system',
      content: createCharacterSystemPrompt(character),
      timestamp: new Date().toISOString(),
      characterId,
    };
    
    return {
      id: generateChatSessionId(characterId),
      characterId,
      characterName: character.name,
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
 * Save a chat session to IndexedDB
 */
export async function saveChatSession(session: ChatSession): Promise<void> {
  try {
    const db = await initChatDB();
    
    // Update the updatedAt timestamp
    const updatedSession = {
      ...session,
      updatedAt: new Date().toISOString(),
      messageCount: session.messages.length
    };
    
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readwrite');
      const store = transaction.objectStore(CHAT_SESSIONS_STORE);
      const request = store.put(updatedSession);
      
      request.onsuccess = () => {
        console.log(`Chat session ${session.id} saved successfully with ${session.messages.length} messages`);
        resolve();
      };
      
      request.onerror = () => {
        reject('Failed to save chat session');
      };
    });
  } catch (error) {
    console.error('Error saving chat session:', error);
    throw error;
  }
}

/**
 * Add a message to a chat session
 */
export async function addMessageToSession(
  sessionId: string, 
  role: 'user' | 'assistant', 
  content: string,
  isError: boolean = false
): Promise<ChatMessage> {
  try {
    const db = await initChatDB();
    
    // Get the current session
    const session = await new Promise<ChatSession>((resolve, reject) => {
      const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readonly');
      const store = transaction.objectStore(CHAT_SESSIONS_STORE);
      const request = store.get(sessionId);
      
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          reject('Session not found');
        }
      };
      
      request.onerror = () => {
        reject('Failed to get session');
      };
    });
    
    // Create the new message
    const newMessage: ChatMessage = {
      id: generateMessageId(),
      role,
      content,
      timestamp: new Date().toISOString(),
      characterId: session.characterId,
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
 * Get all chat sessions for a character
 */
export async function getChatSessionsForCharacter(characterId: string): Promise<ChatSession[]> {
  try {
    const db = await initChatDB();
    
    return new Promise<ChatSession[]>((resolve, reject) => {
      const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readonly');
      const store = transaction.objectStore(CHAT_SESSIONS_STORE);
      const index = store.index('characterId');
      const request = index.getAll(characterId);
      
      request.onsuccess = () => {
        const sessions = request.result || [];
        // Sort by most recent first
        sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        console.log(`Found ${sessions.length} sessions for character ${characterId}`);
        resolve(sessions);
      };
      
      request.onerror = () => {
        reject('Failed to get sessions for character');
      };
    });
  } catch (error) {
    console.error('Error getting sessions for character:', error);
    return [];
  }
}

/**
 * Delete a chat session
 */
export async function deleteChatSession(sessionId: string): Promise<boolean> {
  try {
    const db = await initChatDB();
    
    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readwrite');
      const store = transaction.objectStore(CHAT_SESSIONS_STORE);
      const request = store.delete(sessionId);
      
      request.onsuccess = () => {
        console.log(`Chat session ${sessionId} deleted successfully`);
        resolve(true);
      };
      
      request.onerror = () => {
        reject('Failed to delete chat session');
      };
    });
  } catch (error) {
    console.error('Error deleting chat session:', error);
    return false;
  }
}

/**
 * FIXED: Clear all chat sessions for a character - ensures complete removal
 * @param characterId - ID of the character to clear chats for
 * @returns Promise that resolves to true if successful
 */
export async function clearChatSessionsForCharacter(characterId: string): Promise<boolean> {
  try {
    console.log(`Clearing all chat sessions for character ${characterId}`);
    
    // Get all sessions for this character
    const sessions = await getChatSessionsForCharacter(characterId);
    console.log(`Found ${sessions.length} sessions to delete for character ${characterId}`);
    
    if (sessions.length === 0) {
      console.log(`No sessions to clear for character ${characterId}`);
      return true;
    }
    
    // Delete each session individually to ensure complete removal
    const db = await initChatDB();
    
    const deletePromises = sessions.map(session => {
      return new Promise<boolean>((resolve, reject) => {
        const transaction = db.transaction([CHAT_SESSIONS_STORE], 'readwrite');
        const store = transaction.objectStore(CHAT_SESSIONS_STORE);
        const request = store.delete(session.id);
        
        request.onsuccess = () => {
          console.log(`Deleted chat session: ${session.id}`);
          resolve(true);
        };
        
        request.onerror = () => {
          console.error(`Failed to delete chat session: ${session.id}`);
          reject(false);
        };
      });
    });
    
    // Wait for all deletions to complete
    await Promise.all(deletePromises);
    
    console.log(`Successfully cleared all ${sessions.length} chat sessions for character ${characterId}`);
    
    // Verify sessions are actually gone
    const remainingSessions = await getChatSessionsForCharacter(characterId);
    if (remainingSessions.length > 0) {
      console.warn(`Warning: ${remainingSessions.length} sessions still remain after clearing for character ${characterId}`);
      return false;
    }
    
    console.log(`Verified: No sessions remain for character ${characterId} after clearing`);
    return true;
  } catch (error) {
    console.error('Error clearing chat sessions for character:', error);
    return false;
  }
}

/**
 * Get the most recent conversation messages for API context
 */
export function getRecentMessagesForAPI(session: ChatSession, maxMessages: number = 20): ChatMessage[] {
  // Get recent messages but always include the system prompt if we have one
  const systemMessages = session.messages.filter(msg => msg.role === 'system');
  const conversationMessages = session.messages
    .filter(msg => msg.role !== 'system' && !msg.isError)
    .slice(-maxMessages);
  
  return [...systemMessages, ...conversationMessages];
}