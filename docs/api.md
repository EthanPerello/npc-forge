# API Documentation

This document describes the internal API structure and functionality of NPC Forge. It's intended for developers who want to understand how the application works or contribute to its development.

## API Endpoints

NPC Forge uses Next.js API routes for its backend functionality. The main endpoints are:

### `POST /api/generate`

Generates a new character based on provided parameters.

#### Request Body

The request body follows the `CharacterFormData` type (defined in `src/lib/types.ts`):

```typescript
{
  description: string;                    // Character description
  include_quests: boolean;                // Whether to include quests
  include_dialogue: boolean;              // Whether to include dialogue
  include_items: boolean;                 // Whether to include items
  genre?: string;                         // Optional genre
  sub_genre?: string;                     // Optional sub-genre
  gender?: 'male' | 'female' | 'nonbinary' | 'unknown';  // Optional gender
  age_group?: 'child' | 'teen' | 'adult' | 'elder';     // Optional age group
  moral_alignment?: 'good' | 'neutral' | 'evil';        // Optional alignment
  relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';  // Optional relationship
  advanced_options?: {
    species?: string;
    occupation?: string;
    personality_traits?: string[];        // Unlimited personality traits
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
  portrait_options?: {
    art_style?: string;
    mood?: string;
    framing?: string;
    background?: string;
  };
  text_model?: string;                    // Selected text generation model
  image_model?: string;                   // Selected image generation model
}
```

#### Response

Success response (200 OK):

```typescript
{
  character: {
    name: string;                     // Character name
    selected_traits: { /* ... */ };   // Traits selected by the user
    added_traits: { /* ... */ };      // Additional traits added by AI
    appearance: string;               // Appearance description
    personality: string;              // Personality description
    backstory_hook: string;           // Brief backstory hook
    special_ability?: string;         // Optional special ability
    items?: string[];                 // Optional array of items
    dialogue_lines?: string[];        // Optional array of dialogue lines
    quests?: Array<{                  // Optional array of quests
      title: string;
      description: string;
      reward: string;
      type?: string;
    }>;
    image_url?: string;               // Optional portrait URL
    portrait_options?: {              // Portrait generation options
      art_style?: string;
      mood?: string;
      framing?: string;
      background?: string;
    };
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

### `POST /api/regenerate` (v0.12.0+)

Regenerates specific character attributes or elements.

#### Request Body

```typescript
{
  characterData: Character;           // Complete character object
  regenerationType: 'character' | 'portrait' | 'quest' | 'dialogue' | 'item';
  targetIndex?: number;               // For quest/dialogue/item regeneration
  questComponent?: 'title' | 'description' | 'reward';  // For quest component regeneration
  textModel?: string;                 // Model for text regeneration
  imageModel?: string;                // Model for portrait regeneration
}
```

#### Character Attribute Regeneration

For `regenerationType: 'character'`, you can regenerate:
- Name
- Appearance
- Personality
- Backstory hook

#### Component Regeneration

- **Quest**: Regenerate entire quest or specific components (title, description, reward)
- **Dialogue**: Regenerate individual dialogue lines
- **Item**: Regenerate individual item descriptions
- **Portrait**: Regenerate character portrait with selected image model

#### Response

Success response (200 OK):

```typescript
{
  character: Character;               // Updated character object
  regeneratedField?: string;          // Field that was regenerated
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

## Core API Implementation

### Character Generation Flow

The main character generation endpoint (`/src/app/api/generate/route.ts`) follows this process:

1. **Input Validation**: Verify required fields and sanitize inputs
2. **Prompt Construction**: Build AI prompts based on user selections
3. **Model Selection**: Apply user-selected text and image models
4. **Character Generation**: Request character data from OpenAI
5. **Portrait Generation**: Create character portrait if successful
6. **Response Formatting**: Return structured character data

### Model Selection Integration

NPC Forge supports multiple AI models with tiered access:

#### Text Models
- **gpt-4o-mini** (Standard): Unlimited usage
- **gpt-4.1-mini** (Enhanced): 30 generations/month  
- **gpt-4o** (Premium): 10 generations/month

#### Image Models
- **dall-e-2** (Standard): Unlimited usage
- **dall-e-3** (Enhanced): 30 generations/month
- **gpt-image-1** (Premium): 10 generations/month

### Usage Limit Integration

The application includes a client-side usage tracking system in `/src/lib/usage-limits.ts`:

```typescript
// Per-model usage tracking
export interface ModelUsageData {
  [modelName: string]: {
    count: number;
    monthKey: string;
    lastUpdated: string;
  };
}

// Get usage data for specific model
export function getModelUsage(modelName: string): UsageData {
  // Implementation handles per-model tracking
}

// Check if model usage is within limits
export function canUseModel(modelName: string): boolean {
  // Implementation checks individual model limits
}
```

### Regeneration API Implementation

The regeneration endpoint supports granular updates:

```typescript
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { characterData, regenerationType, targetIndex, textModel, imageModel } = await request.json();
    
    let regeneratedCharacter = { ...characterData };
    
    switch (regenerationType) {
      case 'character':
        // Regenerate character attributes
        break;
      case 'portrait':
        // Regenerate portrait with selected model
        break;
      case 'quest':
        // Regenerate quest element
        break;
      case 'dialogue':
        // Regenerate dialogue line
        break;
      case 'item':
        // Regenerate item description
        break;
    }
    
    return NextResponse.json({ character: regeneratedCharacter, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false }, { status: 500 });
  }
}
```

## OpenAI Integration

### Enhanced Prompt Engineering

The OpenAI integration (`/src/lib/openai.ts`) includes:

- **Dynamic Model Selection**: Support for multiple text and image models
- **Optimized Prompts**: Efficient token usage across different model tiers
- **Error Handling**: Graceful fallbacks for API failures
- **Content Filtering**: Automatic content policy compliance

### Portrait Generation with Model Selection

```typescript
export async function generatePortrait(
  character: Character, 
  imageModel: string = 'dall-e-3'
): Promise<string> {
  try {
    const imagePrompt = buildPortraitPrompt(character);
    
    // Model-specific parameters
    const modelConfig = getImageModelConfig(imageModel);
    
    const response = await openai.images.generate({
      model: imageModel,
      prompt: imagePrompt,
      ...modelConfig
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error(`Portrait generation failed with ${imageModel}:`, error);
    throw error;
  }
}
```

## Character Library Integration

### IndexedDB Storage

NPC Forge uses IndexedDB for reliable local storage:

```typescript
// Character storage with IndexedDB
export async function saveCharacter(character: Character): Promise<void> {
  const db = await openDatabase();
  const transaction = db.transaction(['characters'], 'readwrite');
  await transaction.objectStore('characters').put(character);
}

// Portrait storage with compression
export async function savePortrait(characterId: string, imageUrl: string): Promise<void> {
  const compressedImage = await compressImage(imageUrl);
  const db = await openDatabase();
  const transaction = db.transaction(['portraits'], 'readwrite');
  await transaction.objectStore('portraits').put({ id: characterId, data: compressedImage });
}
```

### Character CRUD Operations

The library supports full character management:

- **Create**: Save new characters to IndexedDB
- **Read**: Retrieve characters with filtering and search
- **Update**: Edit character attributes and regenerate elements
- **Delete**: Remove characters and associated portraits

## Security Considerations

### API Security Measures

- **Input Sanitization**: All user inputs are sanitized before processing
- **Model Validation**: Selected models are validated against allowed options
- **Rate Limiting**: Client-side usage tracking prevents abuse
- **Error Handling**: Structured error responses without sensitive data exposure

### Content Moderation

- **OpenAI Content Policy**: Automatic filtering of inappropriate content
- **Prompt Design**: System prompts designed to encourage appropriate outputs
- **Input Validation**: Rejection of potentially harmful inputs

## Testing the API

### Manual Testing

Use tools like cURL, Postman, or Insomnia to test the endpoints:

```bash
# Test character generation
curl -X POST http://localhost:3000/api/generate \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "A mysterious elven ranger",
    "include_quests": true,
    "include_dialogue": true,
    "include_items": true,
    "genre": "fantasy",
    "text_model": "gpt-4o-mini",
    "image_model": "dall-e-3"
  }'

# Test character regeneration
curl -X POST http://localhost:3000/api/regenerate \
  -H 'Content-Type: application/json' \
  -d '{
    "characterData": {...},
    "regenerationType": "character",
    "textModel": "gpt-4o"
  }'
```

## Related Documentation

- [Architecture Overview](architecture.md) - For high-level system design
- [Prompt Engineering](prompts.md) - For details on AI prompt construction
- [Model Selection Guide](models.md) - For understanding model tiers and usage
- [Contributing Guidelines](contributing.md) - For contribution workflows
- [Character Library Documentation](library.md) - For storage and management details