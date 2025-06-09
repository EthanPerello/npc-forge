// src/app/chat/[characterId]/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChatMessage, ChatSession, CHAT_CONFIG } from '@/lib/chat-types';
import { getChatSession, addMessageToSession } from '@/lib/chat-storage';
import { getCharacterById, loadCharacterWithImage } from '@/lib/character-storage';
import { Character, OpenAIModel } from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';
import { hasReachedLimit, getUsageData, getMonthlyLimit, incrementUsage } from '@/lib/usage-limits';
import Button from '@/components/ui/button';
import ModelSelector from '@/components/model-selector';
import PortraitDisplay from '@/components/portrait-display';
import { 
  ArrowLeft, 
  Send, 
  MessageCircle, 
  RefreshCw, 
  AlertCircle,
  Trash2,
  User,
  Bot
} from 'lucide-react';

interface ChatPageProps {}

export default function ChatPage({}: ChatPageProps) {
  const params = useParams();
  const router = useRouter();
  const characterId = decodeURIComponent(params.characterId as string);
  
  // State
  const [character, setCharacter] = useState<Character | null>(null);
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<OpenAIModel>(DEFAULT_MODEL);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Load character and chat session on mount
  useEffect(() => {
    if (!characterId) return;
    
    loadCharacterAndChat();
  }, [characterId]);
  
  const loadCharacterAndChat = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Loading character with ID:', characterId);
      
      // Load character data
      const storedCharacter = await getCharacterById(characterId);
      
      if (!storedCharacter) {
        setError('Character not found');
        return;
      }
      
      // Load full character with image
      const fullCharacter = await loadCharacterWithImage(characterId);
      const characterToUse = fullCharacter || storedCharacter.character;
      
      setCharacter(characterToUse);
      
      // Get or create chat session - ALWAYS get fresh session
      const session = await getChatSession(characterId, characterToUse);
      setChatSession(session);
      setMessages(session.messages.filter(msg => msg.role !== 'system'));
      setSelectedModel(session.model);
      
      console.log(`Loaded chat session for ${characterToUse.name}: ${session.messages.length} messages`);
    } catch (err) {
      console.error('Error loading character and chat:', err);
      setError('Failed to load character or chat session');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendMessage = async () => {
    if (!inputMessage.trim() || !character || !chatSession || isSending) return;
    
    const messageContent = inputMessage.trim();
    
    // Check message length
    if (messageContent.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
      setError(`Message too long. Please keep messages under ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters.`);
      return;
    }
    
    // Check usage limits using your existing system
    if (hasReachedLimit(selectedModel)) {
      const usageData = getUsageData(selectedModel);
      const monthlyLimit = getMonthlyLimit(selectedModel);
      setError(`Monthly limit reached for ${selectedModel}. You have used ${usageData.count} of ${monthlyLimit} generations.`);
      return;
    }
    
    setIsSending(true);
    setError(null);
    setInputMessage('');
    
    try {
      // Add user message to local state immediately
      const userMessage: ChatMessage = {
        id: `temp-user-${Date.now()}`,
        role: 'user',
        content: messageContent,
        timestamp: new Date().toISOString(),
        characterId: characterId,
      };
      
      // Add loading message for character response
      const loadingMessage: ChatMessage = {
        id: `temp-loading-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        characterId: characterId,
        isLoading: true,
      };
      
      setMessages(prev => [...prev, userMessage, loadingMessage]);
      
      // Save user message to database
      await addMessageToSession(chatSession.id, 'user', messageContent);
      
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId,
          character,
          messages: chatSession.messages,
          newMessage: messageContent,
          model: selectedModel,
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      // Save assistant message to database
      await addMessageToSession(chatSession.id, 'assistant', data.message.content);
      
      // Update local messages (remove loading message and add real response)
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading);
        return [...withoutLoading, data.message];
      });
      
      // Update session message count
      setChatSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, userMessage, data.message],
        messageCount: prev.messageCount + 2
      } : null);
      
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
      
      // Remove loading message on error
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      
      // Restore input message so user can try again
      setInputMessage(messageContent);
    } finally {
      setIsSending(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const clearChat = async () => {
    if (!chatSession || !window.confirm('Are you sure you want to clear this conversation? This action cannot be undone.')) {
      return;
    }
    
    try {
      // FIXED: Properly clear the chat by reloading the session
      const { clearChatSessionsForCharacter } = await import('@/lib/chat-storage');
      await clearChatSessionsForCharacter(characterId);
      
      // Force reload the chat session to get a fresh one
      if (character) {
        const newSession = await getChatSession(characterId, character);
        setChatSession(newSession);
        setMessages(newSession.messages.filter(msg => msg.role !== 'system'));
      }
    } catch (err) {
      console.error('Error clearing chat:', err);
      setError('Failed to clear chat');
    }
  };
  
  const retryLastMessage = async () => {
    if (messages.length < 2) return;
    
    // Find the last user message
    const lastUserMessage = messages.slice().reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) return;
    
    // Remove the last assistant message if it exists
    const filteredMessages = messages.filter(msg => 
      !(msg.role === 'assistant' && new Date(msg.timestamp) > new Date(lastUserMessage.timestamp))
    );
    
    setMessages(filteredMessages);
    setInputMessage(lastUserMessage.content);
  };
  
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p>Loading chat...</p>
      </div>
    );
  }
  
  // Error state
  if (!character) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20 text-center">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4 dark:bg-red-900/20 dark:text-red-400">
          {error || 'Character not found'}
        </div>
        <Button
          variant="primary"
          onClick={() => router.push('/library')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Library
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen pt-16 bg-white dark:bg-gray-900">
      {/* COMPACT Header with LARGER portrait */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-3 flex-shrink-0">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={() => router.push('/library')}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              size="sm"
            >
              Back
            </Button>
            
            <div className="flex items-center space-x-3">
              {/* FIXED: Larger portrait in chat header */}
              {character.image_data || character.image_url ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-indigo-200 dark:border-indigo-700">
                  <PortraitDisplay
                    imageUrl={character.image_url}
                    imageData={character.image_data}
                    characterId={characterId}
                    name={character.name}
                    size="small"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-700">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {character.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              <div className="min-w-0">
                <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {character.name}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {messages.filter(msg => msg.role !== 'system').length} messages
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              onClick={clearChat}
              leftIcon={<Trash2 className="h-3 w-3" />}
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
        
        {/* COMPACT Model Selector */}
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">Model:</span>
          <div className="flex-1 max-w-xs">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as OpenAIModel)}
              className="w-full text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="gpt-4o-mini">🟢 Standard (gpt-4o-mini)</option>
              <option value="gpt-4.1-mini">🟡 Enhanced (gpt-4.1-mini)</option>
              <option value="gpt-4o">🔴 Premium (gpt-4o)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {messages.filter(msg => msg.role !== 'system').length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-8 w-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
              Start a conversation with {character.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm">
              Say hello or ask {character.name} about their background, interests, or anything else you'd like to know.
            </p>
          </div>
        ) : (
          messages
            .filter(msg => msg.role !== 'system')
            .map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-3 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : message.isLoading
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                      : message.isError
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {message.role === 'user' ? (
                        <User className="h-3 w-3" />
                      ) : (
                        <Bot className="h-3 w-3" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      {message.isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin h-3 w-3 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                          <span className="text-sm">{character.name} is thinking...</span>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm whitespace-pre-wrap chat-message">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.role === 'user' 
                              ? 'text-indigo-200' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Error message */}
      {error && (
        <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 flex-shrink-0">
          <div className="flex items-center space-x-2 text-red-700 dark:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm flex-1">{error}</span>
            <Button
              variant="secondary"
              onClick={retryLastMessage}
              leftIcon={<RefreshCw className="h-3 w-3" />}
              size="sm"
            >
              Retry
            </Button>
            <Button
              variant="secondary"
              onClick={() => setError(null)}
              size="sm"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
      
      {/* COMPACT Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 flex-shrink-0">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${character.name}...`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none chat-input text-sm"
              rows={1}
              disabled={isSending}
            />
          </div>
          
          <Button
            variant="primary"
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isSending}
            leftIcon={isSending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            size="sm"
          >
            Send
          </Button>
        </div>
        
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {inputMessage.length}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH} characters
          {inputMessage.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH * 0.9 && (
            <span className="text-orange-500 ml-2">
              Approaching limit
            </span>
          )}
        </div>
      </div>
    </div>
  );
}