// src/contexts/chat-context.tsx
'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode, 
  useMemo 
} from 'react';
import { 
  ChatSession, 
  ChatMessage, 
  ChatContextType, 
  CHAT_CONFIG 
} from '@/lib/chat-types';
import { 
  getChatSession, 
  addMessageToSession, 
  saveChatSession,
  clearChatSessionsForCharacter 
} from '@/lib/chat-storage';
import { Character, OpenAIModel } from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Context provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load a chat session for a specific character
  const loadChatSession = useCallback(async (characterId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load character data from storage
      const { getCharacterById, loadCharacterWithImage } = await import('@/lib/character-storage');
      const storedCharacter = await getCharacterById(characterId);
      
      if (!storedCharacter) {
        throw new Error('Character not found');
      }
      
      // Try to load with image, fallback to stored character
      const fullCharacter = await loadCharacterWithImage(characterId);
      const characterToUse = fullCharacter || storedCharacter.character;
      
      const session = await getChatSession(characterId, characterToUse);
      
      setCurrentSession(session);
      setMessages(session.messages.filter(msg => msg.role !== 'system'));
      
      console.log(`Loaded chat session: ${session.id} with ${session.messages.length} messages`);
    } catch (err) {
      console.error('Error loading chat session:', err);
      setError(err instanceof Error ? err.message : 'Failed to load chat session');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message in the current session
  const sendMessage = useCallback(async (content: string) => {
    if (!currentSession || !content.trim()) {
      return;
    }
    
    if (content.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
      setError(`Message too long. Please keep messages under ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters.`);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add user message to local state immediately
      const userMessage: ChatMessage = {
        id: `temp-user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date().toISOString(),
        characterId: currentSession.characterId,
      };
      
      // Add loading message for character response
      const loadingMessage: ChatMessage = {
        id: `temp-loading-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        characterId: currentSession.characterId,
        isLoading: true,
      };
      
      setMessages(prev => [...prev, userMessage, loadingMessage]);
      
      // Save user message to database
      await addMessageToSession(currentSession.id, 'user', content.trim());
      
      // Get character data for API call
      const { getCharacterById, loadCharacterWithImage } = await import('@/lib/character-storage');
      const storedCharacter = await getCharacterById(currentSession.characterId);
      
      if (!storedCharacter) {
        throw new Error('Character data not found');
      }
      
      const fullCharacter = await loadCharacterWithImage(currentSession.characterId);
      const character = fullCharacter || storedCharacter.character;
      
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId: currentSession.characterId,
          character,
          messages: currentSession.messages,
          newMessage: content.trim(),
          model: currentSession.model,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      // Save assistant message to database
      await addMessageToSession(currentSession.id, 'assistant', data.message.content);
      
      // Update local messages (remove loading message and add real response)
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [...withoutLoading, data.message];
      });
      
      // Update session
      setCurrentSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, userMessage, data.message],
        messageCount: prev.messageCount + 2,
        updatedAt: new Date().toISOString()
      } : null);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
      
      // Remove loading message on error
      setMessages(prev => prev.filter(msg => !msg.isLoading));
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  // Clear the current chat session
  const clearChat = useCallback(async () => {
    if (!currentSession) return;
    
    try {
      await clearChatSessionsForCharacter(currentSession.characterId);
      
      // Reset local state
      setMessages([]);
      setCurrentSession(prev => prev ? {
        ...prev,
        messages: [],
        messageCount: 0,
        updatedAt: new Date().toISOString()
      } : null);
      
      console.log(`Cleared chat for character ${currentSession.characterId}`);
    } catch (err) {
      console.error('Error clearing chat:', err);
      setError('Failed to clear chat');
    }
  }, [currentSession]);

  // Retry the last message
  const retryLastMessage = useCallback(async () => {
    if (!currentSession || messages.length === 0) return;
    
    // Find the last user message
    const lastUserMessage = messages.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) return;
    
    // Remove any assistant messages that came after the last user message
    const filteredMessages = messages.filter(msg => 
      !(msg.role === 'assistant' && new Date(msg.timestamp) > new Date(lastUserMessage.timestamp))
    );
    
    setMessages(filteredMessages);
    
    // Resend the last user message
    await sendMessage(lastUserMessage.content);
  }, [currentSession, messages, sendMessage]);

  // Create the context value
  const contextValue = useMemo(() => ({
    currentSession,
    messages: messages.filter(msg => msg.role !== 'system'), // Filter out system messages for display
    isLoading,
    error,
    sendMessage,
    loadChatSession,
    clearChat,
    retryLastMessage,
  }), [
    currentSession, 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    loadChatSession, 
    clearChat, 
    retryLastMessage
  ]);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook to use the chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

// Optional: Hook to use chat with automatic character loading
export function useChatWithCharacter(characterId: string) {
  const chat = useChat();
  
  // Load the chat session when the hook is first used
  const initializeChat = useCallback(async () => {
    if (characterId && (!chat.currentSession || chat.currentSession.characterId !== characterId)) {
      await chat.loadChatSession(characterId);
    }
  }, [characterId, chat]);
  
  return {
    ...chat,
    initializeChat,
  };
}