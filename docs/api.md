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
    image_data?: string;              // Optional portrait data
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

Regenerates specific character attributes or elements, including trait generation capabilities.

#### Request Body

```typescript
{
  character: object;                  // Complete character object
  field: string;                      // Type of regeneration
  model?: string;                     // Model for text regeneration
  portraitOptions?: object;           // Portrait options for image regeneration
}
```

#### Supported Regeneration Types

**Character Attributes:**
- `name`: Character name
- `appearance`: Physical appearance description
- `personality`: Personality description
- `backstory_hook`: Character backstory

**Portrait Regeneration:**
- `portrait`: Complete portrait regeneration

**Component Regeneration:**
- `quest_[index]_[component]`: Quest components (title, description, reward)
- `dialogue_[index]`: Individual dialogue lines
- `item_[index]`: Individual items

**Trait Generation:**
- `additional_traits`: Generate multiple new traits
- `add_single_trait`: Generate one new trait
- `regenerate_trait_[traitKey]`: Regenerate a specific trait

#### Response

**Success response (200 OK):**

```typescript
{
  success: true;
  character: object;                  // Updated character object
  field: string;                      // Field that was regenerated
}
```

**Error response (400/403/500):**

```typescript
{
  success: false;
  error: string;                      // Error message
  type: string;                       // Error category
  field: string;                      // Field that failed
}
```

### `POST /api/edit-portrait`

Edits existing character portraits using AI-powered image editing with text prompts.

#### Request Body

```typescript
{
  character: Character;               // Complete character object with existing portrait
  editPrompt: string;                 // Text description of desired changes
  imageModel?: ImageModel;            // Image model to use (defaults to 'gpt-image-1')
}
```

#### Edit Prompt Examples

```typescript
// Color changes
"change hair color to blonde"
"make the eyes green"

// Accessories
"add a red hat"
"remove glasses"
"add a beard"

// Clothing
"change shirt to blue"
"add armor"
"remove the cloak"

// Facial expressions
"make them smile"
"give them a serious expression"
```

#### Response

**Success response (200 OK):**

```typescript
{
  success: true;
  character: {
    ...originalCharacter,
    image_data: string;               // Updated portrait as base64 data
    portrait_options: {
      ...originalOptions,
      image_model: string;            // Model used for editing
    }
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

• `invalid_request`: Missing fields, invalid character data, or prompt issues
• `unsupported_model`: Model doesn't support image editing (only gpt-image-1 recommended)
• `rate_limit`: Temporary API rate limit reached
• `quota_exceeded`: Monthly usage limit reached
• `payload_too_large`: Image too large for editing
• `timeout`: Request timeout
• `network`: Network connectivity issues

#### Model Support

Currently, only `gpt-image-1` is recommended for reliable image editing:
- `dall-e-2`: Limited editing capabilities
- `dall-e-3`: Not supported for editing
- `gpt-image-1`: Full editing support with best results

#### Usage Limits

Portrait editing counts against your image model monthly limits:
- Standard (dall-e-2): 10 edits per month
- Enhanced (dall-e-3): 5 edits per month  
- Premium (gpt-image-1): 3 edits per month

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

## Enhanced API Reliability

### JSON Parsing Improvements

All API endpoints now include enhanced JSON parsing with multiple fallback strategies:

• Primary JSON parsing with error handling
• Fallback parsing for responses with trailing commas
• Content cleaning for malformed responses
• Graceful degradation when parsing fails

### Request Size Validation

• Maximum request size limits enforced (10MB for regeneration, 50MB for portrait editing)
• Automatic payload cleaning to prevent oversized requests
• Character data sanitization before API calls
• Special character handling in character names and IDs

### Error Categorization

Enhanced error handling with specific user-friendly messages:

• `rate_limit`: Temporary API rate limiting
• `quota_exceeded`: Monthly usage limits reached
• `authentication`: API key or authentication issues
• `payload_too_large`: Request size exceeds limits
• `timeout`: Request timeout errors
• `network`: Network connectivity issues
• `server_error`: Temporary server issues
• `invalid_request`: Request validation failures

## Model Integration

### Supported Models

**Text Models:**
• gpt-4o-mini (Standard tier)
• gpt-4.1-mini (Enhanced tier)
• gpt-4o (Premium tier)

**Image Models:**
• dall-e-2 (Standard tier)
• dall-e-3 (Enhanced tier)
• gpt-image-1 (Premium tier, best for editing)

### Usage Limits

**Text Models (including chat):**
• Standard: 50 generations per month
• Enhanced: 30 generations per month
• Premium: 10 generations per month

**Image Models (including portrait editing):**
• Standard: 10 generations per month
• Enhanced: 5 generations per month
• Premium: 3 generations per month

> **Note**: Chat conversations and portrait editing count against respective model limits

## Character Generation Flow

1. **Input Validation**: Verify required fields and sanitize inputs
2. **Model Selection**: Apply user-selected text and image models
3. **Character Generation**: Request character data from OpenAI
4. **Portrait Generation**: Create character portrait if requested
5. **Response Formatting**: Return structured character data

## Portrait Editing Flow

1. **Validation**: Verify character has existing portrait and edit prompt is valid
2. **Model Check**: Ensure selected model supports editing (gpt-image-1 recommended)
3. **Usage Verification**: Check monthly limits before processing
4. **Image Processing**: Convert portrait data to appropriate format
5. **AI Editing**: Call OpenAI image editing endpoint with prompt
6. **Response Processing**: Return updated character with new portrait
7. **Usage Tracking**: Increment usage count after successful edit

## Chat System Flow

1. **Session Management**: Get or create chat session for character
2. **Context Preparation**: Include character details and recent conversation history
3. **Input Validation**: Check message length and usage limits
4. **Response Generation**: Call OpenAI with dynamic token limits
5. **Response Processing**: Handle cutoff detection and retry logic
6. **Storage**: Save messages to IndexedDB
7. **Usage Tracking**: Increment usage count after successful response

## Trait Generation Features

### Additional Traits Generation

• Generate multiple new traits for a character
• Traits returned as JSON object with trait names as keys
• Automatic formatting and validation
• Integration with existing trait display system

### Individual Trait Generation

• Generate single traits on demand
• Regenerate specific existing traits
• Consistent formatting with Title Case
• Smart filtering excludes overly long traits

### Trait Management

• Add custom traits manually
• Edit existing trait names and values
• Remove unwanted traits
• Regenerate traits with AI assistance

## Regeneration Features

Supports regenerating:
• Individual character attributes (name, appearance, personality, backstory)
• Portrait images with different models
• Portrait editing with text prompts
• Quest components (title, description, reward)
• Dialogue lines
• Item descriptions
• Character traits (individual or multiple)

## Error Handling

### Character Generation

• Input validation and sanitization
• API error categorization and user-friendly messages
• Timeout protection with retry logic
• Graceful degradation for failed generations

### Portrait Editing

• Model compatibility validation
• Image size and format validation
• Edit prompt validation and sanitization
• Automatic retry for network issues
• Clear error messages for different failure types

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
• Message and prompt length limits to prevent abuse

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
• [Character Library Guide](/docs/library) - For trait management features
• [Contributing Guidelines](/docs/contributing) - For development workflow