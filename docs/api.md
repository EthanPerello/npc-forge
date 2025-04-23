# API Documentation

This document describes the internal API structure and functionality of NPC Forge. It's intended for developers who want to understand how the application works or contribute to its development.

## API Endpoints

NPC Forge uses Next.js API routes for its backend functionality. The main endpoint is:

### `POST /api/generate`

Generates a character based on provided parameters.

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
    personality_traits?: string[];        // Up to 3 personality traits
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

## Core API Implementation

The endpoint is implemented in `/src/app/api/generate/route.ts`.

### Key Functions

#### `POST` Handler

The main handler for processing generation requests:

```typescript
export async function POST(request: NextRequest): Promise<NextResponse<GenerationResponse>> {
  try {
    // Get form data from request
    const data: CharacterFormData = await request.json();
    
    // Validate required fields
    if (!data.description || data.description.trim() === '') {
      return NextResponse.json(
        { error: 'Character description is required', character: null as any },
        { status: 400 }
      );
    }
    
    // Sanitize inputs
    data.description = sanitizeUserInput(data.description);
    
    // Clean form data by removing empty values
    const cleanedData = removeEmptyValues(data);
    
    // Build system prompt
    const systemPrompt = buildSystemPrompt(cleanedData);
    
    // Generate character
    const character = await generateCharacter(systemPrompt, data.description);
    
    // Generate portrait if successful
    if (character) {
      try {
        // Transfer portrait options from form data to character object
        if (data.portrait_options) {
          character.portrait_options = data.portrait_options;
        }
        
        const imageUrl = await generatePortrait(character);
        character.image_url = imageUrl;
      } catch (portraitError) {
        // Continue without portrait if it fails
        console.error('Failed to generate portrait:', portraitError);
      }
    }
    
    return NextResponse.json({ character });
  } catch (error) {
    // Error handling
    console.error('Error in generate route:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        character: null as any
      },
      { status: 500 }
    );
  }
}
```

#### `buildSystemPrompt` Function

Builds the prompt for OpenAI based on user selections:

```typescript
function buildSystemPrompt(data: Partial<CharacterFormData>): string {
  // Base prompt structure
  let prompt = `
You are an expert RPG character generator. Generate a detailed NPC profile based on the description and parameters provided.

IMPORTANT: You must only respond with valid JSON matching the structure below. Do not include any additional text, explanations, or commentary outside the JSON.

Return ONLY valid JSON with the following structure:
{
  "name": "Character Name",
  "selected_traits": {
    // Copy of the traits that were selected by the user
  },
  "added_traits": {
    // Additional traits you've added that weren't specified
  },
  "appearance": "Detailed physical description as a paragraph",
  "personality": "Detailed personality description as a paragraph",
  "backstory_hook": "A 1-2 sentence hook about the character's past or motivation",
  "special_ability": "A unique ability or power the character possesses"`;
  
  // Add conditional components based on user selections
  // ...
  
  // Close JSON structure and add additional guidance
  // ...
  
  return prompt;
}
```

## OpenAI Integration

The OpenAI API integration is handled in `/src/lib/openai.ts`.

### Character Generation

```typescript
export async function generateCharacter(systemPrompt: string, description: string): Promise<Character> {
  try {
    // Call the OpenAI API with GPT-4o-mini
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Higher quota than gpt-4o
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: description }
      ],
      temperature: 0.8,
    });

    // Parse response and validate
    // ...
    
    return character;
  } catch (error) {
    // Error handling
    // ...
  }
}
```

### Portrait Generation

```typescript
export async function generatePortrait(character: Character): Promise<string> {
  try {
    // Gather appearance details from the character
    // ...
    
    // Create a prompt for the image generation
    const imagePrompt = `Portrait of ${name}: ${appearanceText.substring(0, 250)}
    ${visualTraits.length > 0 ? `Important visual characteristics: ${visualTraits.join(', ')}.` : ''}
    ${artStyle} ${mood} ${framing} ${background}
    High quality, detailed character portrait, professional digital art.`;
    
    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || '';
  } catch (error) {
    // Error handling
    // ...
  }
}
```

## Usage Limits Integration

The application includes a client-side usage tracking system in `/src/lib/usage-limits.ts`.

```typescript
// Get the current usage data from localStorage
export function getUsageData(): UsageData {
  // Default data for new users
  const defaultData: UsageData = {
    count: 0,
    monthKey: getCurrentMonthKey(),
    lastUpdated: new Date().toISOString()
  };
  
  // Check if localStorage is available (will not be in SSR)
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return defaultData;
  }
  
  try {
    // Try to get and parse stored data
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return defaultData;
    
    const parsedData: UsageData = JSON.parse(storedData);
    const currentMonthKey = getCurrentMonthKey();
    
    // Reset count if it's a new month
    if (parsedData.monthKey !== currentMonthKey) {
      const resetData: UsageData = {
        count: 0,
        monthKey: currentMonthKey,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
      return resetData;
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error reading usage data:', error);
    return defaultData;
  }
}
```

## Utility Functions

Various utility functions in `/src/lib/utils.ts` support the API:

```typescript
// Sanitizes user input to remove potential control characters and normalize whitespace
export function sanitizeUserInput(input: string): string {
    if (!input) return '';
    
    // Remove any control characters
    let sanitized = input.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
    
    // Normalize whitespace (but preserve paragraph breaks)
    sanitized = sanitized.replace(/[ \t\v\f]+/g, ' ');
    
    // Trim leading/trailing whitespace
    return sanitized.trim();
}

// Filters out undefined or null values from an object
export function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      // Handle nested objects and arrays
      // ...
    }
    return acc;
  }, {} as Partial<T>);
}
```

## API Security Considerations

- The API endpoint uses server-side validation to prevent invalid inputs
- User inputs are sanitized to prevent control characters or malicious content
- Empty or null values are removed to create cleaner prompts
- Environment variables secure the OpenAI API key
- Error handling prevents sensitive information leakage

## Testing the API

To test the API endpoint manually:

1. Use a tool like cURL, Postman, or Insomnia
2. Send a POST request to `/api/generate`
3. Include a JSON body with the required fields

Example cURL request:

```bash
curl -X POST \
  http://localhost:3000/api/generate \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "A mysterious elven ranger",
    "include_quests": true,
    "include_dialogue": true,
    "include_items": true,
    "genre": "fantasy"
  }'
```

## Related Documentation

- [Architecture Overview](architecture.md) - For high-level system design
- [OpenAI Prompts](prompts.md) - For details on prompt engineering
- [Contributing Guidelines](contributing.md) - For contribution workflows