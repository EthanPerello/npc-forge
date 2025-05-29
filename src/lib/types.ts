// src/lib/types.ts
// Available OpenAI models
export type OpenAIModel = 'gpt-4o-mini' | 'gpt-4.1-mini' | 'gpt-4o';

// Model configuration
export interface ModelConfig {
  id: OpenAIModel;
  label: string;
  description: string;
  tier: 'cheap' | 'mid' | 'premium';
  emoji: string; // For visual representation
  monthlyLimit: number; // How many generations allowed per month
}

// Available image models
export type ImageModel = 'dall-e-2' | 'dall-e-3' | 'gpt-image-1';

// Image model configuration
export interface ImageModelConfig {
  id: ImageModel;
  label: string;
  description: string;
  tier: 'cheap' | 'mid' | 'premium';
  emoji: string; // For visual representation
  monthlyLimit: number; // How many generations allowed per month
}

// Error types for better error handling
export type ErrorType = 'rate_limit' | 'timeout' | 'network' | 'authentication' | 'quota_exceeded' | 'invalid_request' | 'server_error' | 'json_parse' | 'validation_error' | 'generation_error' | 'api_error' | 'unknown';

// Enhanced error interface
export interface APIError {
  type: ErrorType;
  message: string;
  userMessage: string;
  shouldRetry: boolean;
  originalMessage?: string;
}

export interface Character {
  name: string;
  selected_traits: {
    genre?: string;
    sub_genre?: string; // Added for sub-genre tracking
    gender?: 'male' | 'female' | 'nonbinary' | 'unknown';
    age_group?: 'child' | 'teen' | 'adult' | 'elder';
    moral_alignment?: 'good' | 'neutral' | 'evil';
    relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
    species?: string;
    occupation?: string;
    social_class?: string;
    personality_traits?: string[];
    height?: string;
    build?: string;
    distinctive_features?: string;
    homeland?: string;
  };
  added_traits: {
    [key: string]: string | undefined; // Additional traits AI added that weren't selected
    // Enhanced error tracking fields
    fallback_note?: string;
    original_request?: string;
    api_error?: string;
    error_type?: string;
    portrait_error?: string;
    portrait_error_type?: string;
    portrait_error_message?: string;
    portrait_should_retry?: string;
    portrait_generation_failed?: string;
  };
  appearance: string; // Now a freeform paragraph
  personality: string; // Now a freeform paragraph
  backstory_hook: string; // 1-2 sentence hook
  items?: string[];
  dialogue_lines?: string[];
  quests?: Quest[];
  image_url?: string;         // OpenAI URL (temporary)
  image_data?: string;        // Base64 encoded image data (persistent)
  portrait_options?: PortraitOptions;
}

export interface PortraitOptions {
  art_style?: string;
  mood?: string;
  framing?: string;
  background?: string;
  image_model?: ImageModel; // New field for image model selection
}

export interface Quest {
  title: string;
  description: string;
  reward: string;
  type?: string;
}

// Update the Genre type to use the four core genres
export type Genre = 'fantasy' | 'sci-fi' | 'historical' | 'contemporary';

// Add SubGenreOption interface for the sub-genres
export interface SubGenreOption {
  id: string;
  label: string;
  description: string;
  example?: string;
  parentGenreId?: string; // Reference to parent genre ID, useful when flattening
}

// Update TemplateOption to include sub-genres
export interface TemplateOption {
  id: string;
  label: string;
  description: string;
  example: string;
  subGenres?: SubGenreOption[];
}

export interface CharacterFormData {
  description: string;
  include_quests: boolean;
  include_dialogue: boolean;
  include_items: boolean;
  include_portrait: boolean; // NEW: Flag to control portrait generation
  genre?: string;
  sub_genre?: string;
  gender?: 'male' | 'female' | 'nonbinary' | 'unknown';
  age_group?: 'child' | 'teen' | 'adult' | 'elder';
  moral_alignment?: 'good' | 'neutral' | 'evil';
  relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
  advanced_options?: {
    species?: string;
    occupation?: string;
    personality_traits?: string[];
    social_class?: string;
    height?: string;
    build?: string;
    distinctive_features?: string;
    homeland?: string;
  };
  quest_options?: {
    reward_type?: string;
    number_of_quests?: number;
    quest_type?: string;
  };
  dialogue_options?: {
    number_of_lines?: number;
    tone?: string;
    context?: string;
  };
  item_options?: {
    number_of_items?: number;
    rarity_distribution?: string;
    item_categories?: string[];
  };
  portrait_options?: PortraitOptions;
  model?: OpenAIModel;
}

// Enhanced generation response with better error handling
export interface GenerationResponse {
  character: Character;
  error?: string;
}

// Enhanced error response interface
export interface ErrorResponse {
  error: string;
  character: null;
  errorType?: ErrorType;
  shouldRetry?: boolean;
  userMessage?: string;
}

// Union type for API responses
export type APIResponse = GenerationResponse | ErrorResponse;

// Type guard to check if response is an error
export function isErrorResponse(response: APIResponse): response is ErrorResponse {
  return response.character === null && 'error' in response;
}

// Modified option interfaces for selects to allow empty string values
export interface GenderOption {
  value: 'male' | 'female' | 'nonbinary' | 'unknown' | '';
  label: string;
}

export interface AgeGroupOption {
  value: 'child' | 'teen' | 'adult' | 'elder' | '';
  label: string;
}

export interface AlignmentOption {
  value: 'good' | 'neutral' | 'evil' | '';
  label: string;
}

export interface RelationshipOption {
  value: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer' | '';
  label: string;
}

export interface SpeciesOption {
  value: string;
  label: string;
  genre?: Genre[]; // Optional array of genres this species is most appropriate for
}

export interface OccupationOption {
  value: string;
  label: string;
  genre?: Genre[]; // Optional array of genres this occupation is most appropriate for
}

export interface SocialClassOption {
  value: string;
  label: string;
}

export interface PersonalityOption {
  value: string;
  label: string;
}

export interface QuestTypeOption {
  value: string;
  label: string;
  description: string;
}

export interface RewardTypeOption {
  value: string;
  label: string;
}

export interface DialogueToneOption {
  value: string;
  label: string;
  description: string;
}

export interface DialogueContextOption {
  value: string;
  label: string;
}

export interface ItemCategoryOption {
  value: string;
  label: string;
  genre?: Genre[]; // Optional array of genres this item category is most appropriate for
}

export interface RarityDistributionOption {
  value: string;
  label: string;
  description: string;
}

// New interfaces for enhanced error handling and retry logic
export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  operationType: 'character' | 'portrait';
}

export interface GenerationStatus {
  isGenerating: boolean;
  currentStep?: string;
  progress?: number;
  estimatedTimeRemaining?: number;
  lastError?: APIError;
}