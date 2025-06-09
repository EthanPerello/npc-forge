# API Documentation

This document describes the internal API structure of NPC Forge for developers who want to understand how the application works or contribute to its development.

## API Endpoints

NPC Forge uses Next.js API routes for its backend functionality.

### `POST /api/generate`

Generates a new character based on provided parameters.

#### Request Body

```typescript
{
  description: string;                    // Character description
  include_quests: boolean;                // Whether to include quests
  include_dialogue: boolean;              // Whether to include dialogue
  include_items: boolean;                 // Whether to include items
  genre?: string;                         // Optional genre
  sub_genre?: string;                     // Optional sub-genre
  gender?: string;                        // Optional gender
  age_group?: string;                     // Optional age group
  moral_alignment?: string;               // Optional alignment
  relationship_to_player?: string;        // Optional relationship
  advanced_options?: object;              // Advanced character options
  quest_options?: object;                 // Quest configuration
  dialogue_options?: object;              // Dialogue configuration
  item_options?: object;                  // Item configuration
  portrait_options?: object;              // Portrait configuration
  text_model?: string;                    // Selected text model
  image_model?: string;                   // Selected image model
}
```

#### Response

**Success response (200 OK):**

```typescript
{
  character: {
    name: string;                     // Character name
    selected_traits: object;          // User-selected traits
    added_traits: object;             // AI-added traits
    appearance: string;               // Appearance description
    personality: string;              // Personality description
    backstory_hook: string;           // Brief backstory
    quests?: Array<object>;           // Optional quests
    dialogue_lines?: string[];        // Optional dialogue
    items?: string[];                 // Optional items
    image_url?: string;               // Optional portrait URL
  }
}
```

**Error response (400/500):**

```typescript
{
  error: string;                      // Error message
  character: null;                    // Null character data
}
```

### `POST /api/regenerate`

Regenerates specific character attributes or elements.

#### Request Body

```typescript
{
  characterData: object;              // Complete character object
  regenerationType: string;           // Type of regeneration
  targetIndex?: number;               // For specific element regeneration
  textModel?: string;                 // Model for text regeneration
  imageModel?: string;                // Model for portrait regeneration
}
```

#### Response

**Success response (200 OK):**

```typescript
{
  character: object;                  // Updated character object
  success: boolean;                   // Operation success status
}
```

### `POST /api/chat`

Handles character conversations with AI-powered responses.

#### Request Body

```typescript
{
  characterId: string;                // ID of the character
  character: Character;               // Complete character object
  messages: ChatMessage[];            // Previous conversation messages
  newMessage: string;                 // User's new message (max 1000 chars)
  model: OpenAIModel;                 // Selected AI model for response
}
```

#### Response

**Success response (200 OK):**

```typescript
{
  success: true;
  message: {
    id: string;                       // Unique message ID
    role: 'assistant';                // Message role
    content: string;                  // Character's response
    timestamp: string;                // ISO timestamp
    characterId: string;              // Character ID
  }
}
```

**Error response (400/403/500):**

```typescript
{
  success: false;
  error: string;                      // Error message
  errorType: string;                  // Error category
}
```

#### Error Types

• `invalid_request`: Missing fields or invalid data
• `rate_limit`: Temporary API rate limit reached
• `quota_exceeded`: Monthly usage limit reached
• `authentication`: API authentication error
• `server_error`: Temporary server issues
• `timeout`: Request timeout
• `network`: Network connectivity issues

#### Chat Features

**Dynamic Response Lengths:**
• Simple greetings (< 20 chars): 150 tokens (1-2 sentences)
• Medium questions (20-100 chars): 200-350 tokens (2-4 sentences)
• Detailed requests (> 100 chars): 600 tokens (1-2 paragraphs)
• Maximum cap: 800 tokens to prevent cutoff

**Character Consistency:**
• System prompts include character traits, personality, and backstory
• Recent conversation context (last 15 messages) provided
• Temperature set to 0.8 for natural responses
• Automatic retry for responses that appear cut off

**Usage Integration:**
• Checks usage limits before API calls
• Increments usage count only after successful responses
• Model switching supported mid-conversation

### `GET /api/proxy-image`

Proxies external image URLs for CORS compatibility.

#### Query Parameters

```typescript
{
  url: string;                        // External image URL to proxy
}
```

## Model Integration

### Supported Models

**Text Models:**
• gpt-4o-mini (Standard tier)
• gpt-4.1-mini (Enhanced tier)
• gpt-4o (Premium tier)

**Image Models:**
• dall-e-2 (Standard tier)
• dall-e-3 (Enhanced tier)
• gpt-image-1 (Premium tier)

### Usage Limits

**Text Models (including chat):**
• Standard: 50 generations per month
• Enhanced: 30 generations per month
• Premium: 10 generations per month

**Image Models:**
• Standard: 10 generations per month
• Enhanced: 5 generations per month
• Premium: 3 generations per month

> **Note**: Chat conversations count against text model limits

## Character Generation Flow

1. **Input Validation**: Verify required fields and sanitize inputs
2. **Model Selection**: Apply user-selected text and image models
3. **Character Generation**: Request character data from OpenAI
4. **Portrait Generation**: Create character portrait if requested
5. **Response Formatting**: Return structured character data

## Chat System Flow

1. **Session Management**: Get or create chat session for character
2. **Context Preparation**: Include character details and recent conversation history
3. **Input Validation**: Check message length and usage limits
4. **Response Generation**: Call OpenAI with dynamic token limits
5. **Response Processing**: Handle cutoff detection and retry logic
6. **Storage**: Save messages to IndexedDB
7. **Usage Tracking**: Increment usage count after successful response

## Regeneration Features

Supports regenerating:
• Individual character attributes (name, appearance, personality, backstory)
• Portrait images with different models
• Quest components (title, description, reward)
• Dialogue lines
• Item descriptions

## Error Handling

### Character Generation

• Input validation and sanitization
• API error categorization and user-friendly messages
• Timeout protection with retry logic
• Graceful degradation for failed generations

### Chat System

• Comprehensive error categorization (rate limits, quotas, network issues)
• Automatic retry for cut-off responses
• Usage limit enforcement before API calls
• Message length validation (1000 character limit)
• Network timeout handling with 60-second timeout

## Security Measures

• Server-side API calls to OpenAI (API keys not exposed to client)
• Input sanitization to prevent malicious content
• Content filtering through OpenAI's moderation system
• Rate limiting through client-side usage tracking
• Message length limits to prevent abuse

## Data Storage

### Character Data

• IndexedDB for character library storage
• Portrait compression for storage efficiency
• JSON import/export capabilities

### Chat Data

• IndexedDB for conversation storage per character
• System prompts with character context
• Message history with automatic trimming (100 message limit)
• Complete local storage - no server-side data retention

## Related Documentation

• [Architecture Overview](/docs/architecture) - For system design
• [Model Selection Guide](/docs/models) - For understanding model tiers
• [Chat with Characters](/docs/chat) - For chat system usage
• [Contributing Guidelines](/docs/contributing) - For development workflow