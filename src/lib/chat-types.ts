// src/lib/chat-types.ts
import { Character, OpenAIModel } from './types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  characterId?: string;
  isError?: boolean;
  isLoading?: boolean;
}

export interface ChatSession {
  id: string;
  characterId: string;
  characterName: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
  systemPrompt: string;
  model: OpenAIModel;
  messageCount: number;
}

export interface ChatContextType {
  currentSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  loadChatSession: (characterId: string) => Promise<void>;
  clearChat: () => void;
  retryLastMessage: () => Promise<void>;
}

export interface ChatStorageData {
  sessions: ChatSession[];
  lastUpdated: string;
}

export interface ChatAPIRequest {
  characterId: string;
  character: Character;
  messages: ChatMessage[];
  newMessage: string;
  model: OpenAIModel;
}

export interface ChatAPIResponse {
  success: boolean;
  message?: ChatMessage;
  error?: string;
  errorType?: string;
}

// Chat configuration
export const CHAT_CONFIG = {
  MAX_MESSAGES_PER_SESSION: 100,
  MAX_MESSAGE_LENGTH: 1000,
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
  MESSAGE_RETRY_ATTEMPTS: 3,
  DEFAULT_MODEL: 'gpt-4o-mini' as OpenAIModel,
} as const;