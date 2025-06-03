# API Documentation

This document describes the internal API structure of NPC Forge for developers who want to understand how the application works or contribute to its development.

## API Endpoints

NPC Forge uses Next.js API routes for its backend functionality.

### `POST /api/generate`

Generates a new character based on provided parameters.

#### Request Body

The request includes character creation parameters:

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

Success response (200 OK):

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

Error response (400/500):

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

Success response (200 OK):

```typescript
{
  character: object;                  // Updated character object
  success: boolean;                   // Operation success status
}
```

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
- gpt-4o-mini (Standard tier)
- gpt-4.1-mini (Enhanced tier)  
- gpt-4o (Premium tier)

**Image Models:**
- dall-e-2 (Standard tier)
- dall-e-3 (Enhanced tier)
- gpt-image-1 (Premium tier)

### Usage Limits

Based on v0.14.0 changelog:

**Text Models:**
- Standard: 50 generations per month
- Enhanced: 30 generations per month
- Premium: 10 generations per month

**Image Models:**
- Standard: 10 generations per month
- Enhanced: 5 generations per month
- Premium: 3 generations per month

## Character Generation Flow

1. **Input Validation**: Verify required fields and sanitize inputs
2. **Model Selection**: Apply user-selected text and image models
3. **Character Generation**: Request character data from OpenAI
4. **Portrait Generation**: Create character portrait if requested
5. **Response Formatting**: Return structured character data

## Regeneration Features

Supports regenerating:
- Individual character attributes (name, appearance, personality, backstory)
- Portrait images with different models
- Quest components (title, description, reward)
- Dialogue lines
- Item descriptions

## Error Handling

- Input validation and sanitization
- API error categorization and user-friendly messages
- Timeout protection with retry logic
- Graceful degradation for failed generations

## Security Measures

- Server-side API calls to OpenAI (API keys not exposed to client)
- Input sanitization to prevent malicious content
- Content filtering through OpenAI's moderation system
- Rate limiting through client-side usage tracking

## Related Documentation

- [Architecture Overview](architecture.md) - For system design
- [Model Selection Guide](models.md) - For understanding model tiers
- [Contributing Guidelines](contributing.md) - For development workflow