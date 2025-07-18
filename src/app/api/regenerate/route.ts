import { NextRequest, NextResponse } from 'next/server';
import { generatePortrait } from '@/lib/openai';
import { Character, OpenAIModel, ImageModel } from '@/lib/types';
import { incrementUsage, hasReachedLimit } from '@/lib/usage-limits';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 90000, // 90 seconds timeout
});

// Maximum request size (10MB)
const MAX_REQUEST_SIZE = 10 * 1024 * 1024;

// Helper function to categorize errors with improved JSON formatting
const categorizeError = (error: any): { type: string; message: string; status: number } => {
  if (error?.status || error?.code) {
    const status = error.status;
    const code = error.code || error.error?.code;
    const message = error.message || error.error?.message || 'Unknown API error';
    
    switch (status) {
      case 429:
        return {
          type: 'rate_limit',
          message: 'Rate limit exceeded. Please try again in a few minutes.',
          status: 429
        };
      case 400:
        return {
          type: 'invalid_request',
          message: 'Invalid request parameters. Please check your settings.',
          status: 400
        };
      case 401:
        return {
          type: 'authentication',
          message: 'Authentication failed. Please check API configuration.',
          status: 401
        };
      case 403:
        return {
          type: 'quota_exceeded',
          message: 'Monthly quota exceeded for this model tier.',
          status: 403
        };
      case 413:
        return {
          type: 'payload_too_large',
          message: 'Request too large. Please reduce character data size.',
          status: 413
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: 'server_error',
          message: 'OpenAI server error. Please try again.',
          status: 502
        };
      default:
        return {
          type: 'api_error',
          message: `API error: ${message}`,
          status: status || 500
        };
    }
  }
  
  // Handle network/timeout errors
  if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
    return {
      type: 'timeout',
      message: 'Request timed out. Please try again.',
      status: 408
    };
  }
  
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
      status: 503
    };
  }
  
  // Default error
  return {
    type: 'unknown',
    message: error?.message || 'An unexpected error occurred',
    status: 500
  };
};

// Helper function to clean character data for API requests
function cleanCharacterForAPI(character: any): any {
  const cleaned = { ...character };
  
  // Remove large base64 image data to reduce payload size
  delete cleaned.image_data;
  delete cleaned.image_url;
  
  // Clean the character name of special characters but preserve accented characters
  if (cleaned.name) {
    cleaned.name = cleaned.name
      .replace(/["""'']/g, '"')
      .replace(/—/g, '-')
      .trim(); // Don't remove accented characters
  }
  
  // Limit the size of trait objects
  if (cleaned.selected_traits) {
    Object.keys(cleaned.selected_traits).forEach(key => {
      if (typeof cleaned.selected_traits[key] === 'string' && cleaned.selected_traits[key].length > 500) {
        cleaned.selected_traits[key] = cleaned.selected_traits[key].substring(0, 500) + '...';
      }
    });
  }
  
  if (cleaned.added_traits) {
    Object.keys(cleaned.added_traits).forEach(key => {
      if (typeof cleaned.added_traits[key] === 'string') {
        // Clean special characters but preserve accented characters and limit length
        cleaned.added_traits[key] = cleaned.added_traits[key]
          .replace(/["""'']/g, '"')
          .replace(/—/g, '-')
          .substring(0, 500); // Don't remove accented characters
      }
    });
  }
  
  return cleaned;
}

// Helper function to validate request data
function validateRequest(body: any): { isValid: boolean; error?: string } {
  if (!body) {
    return { isValid: false, error: 'Request body is required' };
  }
  
  if (!body.character) {
    return { isValid: false, error: 'Character data is required' };
  }
  
  if (!body.field) {
    return { isValid: false, error: 'Field parameter is required' };
  }
  
  // Validate character has required properties
  if (!body.character.name || typeof body.character.name !== 'string') {
    return { isValid: false, error: 'Character must have a valid name' };
  }
  
  return { isValid: true };
}

// Enhanced JSON parsing function with multiple strategies
function parseJSONWithFallbacks(content: string): any {
  // Clean the content first but preserve accented characters
  const cleanContent = content.trim()
    .replace(/["""'']/g, '"') // Normalize quotes
    .replace(/—/g, '-') // Replace em dashes
    .replace(/…/g, '...') // Replace ellipsis
    .replace(/^["'`]|["'`]$/g, '') // Remove surrounding quotes
    .replace(/^\*\*|\*\*$/g, '') // Remove bold markers
    .replace(/^#+\s*/, ''); // Remove markdown headers

  // Strategy 1: Direct JSON parse
  try {
    return JSON.parse(cleanContent);
  } catch (e) {
    console.log('Direct JSON parse failed, trying fallbacks...');
  }

  // Strategy 2: Extract JSON from code blocks
  const codeBlockMatch = cleanContent.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch (e) {
      console.log('Code block JSON parse failed...');
    }
  }

  // Strategy 3: Find JSON-like object in text
  const jsonMatch = cleanContent.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      let jsonStr = jsonMatch[0];
      // Remove trailing commas
      jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1');
      return JSON.parse(jsonStr);
    } catch (e) {
      console.log('JSON extraction parse failed...');
    }
  }

  // Strategy 4: Manual object construction for quest
  const titleMatch = cleanContent.match(/"?title"?\s*:\s*"([^"]+)"/i);
  const descriptionMatch = cleanContent.match(/"?description"?\s*:\s*"([^"]+)"/i);
  const rewardMatch = cleanContent.match(/"?reward"?\s*:\s*"([^"]+)"/i);

  if (titleMatch && descriptionMatch && rewardMatch) {
    return {
      title: titleMatch[1],
      description: descriptionMatch[1],
      reward: rewardMatch[1],
      type: "any"
    };
  }

  throw new Error(`Could not parse JSON from content: ${cleanContent.substring(0, 200)}...`);
}

export async function POST(request: NextRequest) {
  try {
    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Request too large. Please reduce character data size.',
          type: 'payload_too_large'
        },
        { status: 413 }
      );
    }

    const body = await request.json();
    
    // Validate request
    const validation = validateRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: validation.error,
          type: 'invalid_request'
        },
        { status: 400 }
      );
    }

    const { character, field, model, portraitOptions } = body;
    
    // Clean character object to reduce payload size and fix special characters
    const cleanedCharacter = cleanCharacterForAPI(character);

    console.log(`Regenerating ${field} for character: ${cleanedCharacter.name}`);

    // Handle portrait regeneration
    if (field === 'portrait') {
      try {
        // Check usage limits BEFORE making API call
        const imageModel = portraitOptions?.image_model || 'dall-e-2';
        
        try {
          if (hasReachedLimit(imageModel)) {
            console.log(`Portrait regeneration blocked: Usage limit reached for ${imageModel}`);
            return NextResponse.json(
              { 
                success: false, 
                error: `Monthly limit reached for ${imageModel}. Please try a different image model or wait until next month.`,
                type: 'quota_exceeded',
                field: 'portrait'
              },
              { status: 403 }
            );
          }
        } catch (limitError) {
          console.warn('Error checking image model usage limits (continuing anyway):', limitError);
        }
        
        // Create a character object with the portrait options
        const characterWithOptions = {
          ...cleanedCharacter,
          portrait_options: {
            ...cleanedCharacter.portrait_options,
            ...portraitOptions
          }
        };

        console.log(`Using image model: ${characterWithOptions.portrait_options?.image_model || 'default'}`);
        
        const imageData = await generatePortrait(characterWithOptions);
        
        if (!imageData) {
          throw new Error('No image data returned from portrait generation');
        }

        // Increment usage count AFTER successful portrait generation
        try {
          incrementUsage(imageModel);
          console.log(`Successfully incremented usage for image model ${imageModel}`);
        } catch (usageError) {
          console.warn('Error incrementing image model usage (continuing anyway):', usageError);
        }

        // Create updated character object for consistent response format
        // Use original character as base to preserve all data
        const updatedCharacter = {
          ...character,
          image_data: imageData,
          portrait_options: {
            ...character.portrait_options,
            ...portraitOptions
          }
        };

        return NextResponse.json({
          success: true,
          character: updatedCharacter,
          field: 'portrait'
        });
      } catch (error) {
        console.error('Portrait regeneration error:', error);
        
        const errorInfo = categorizeError(error);
        return NextResponse.json(
          {
            success: false,
            error: errorInfo.message,
            type: errorInfo.type,
            field: 'portrait'
          },
          { status: errorInfo.status }
        );
      }
    }

    // Handle text field regeneration
    const textModel: OpenAIModel = model || 'gpt-4o-mini';
    console.log(`Using text model: ${textModel} for field: ${field}`);

    // Check usage limits BEFORE making API call
    try {
      if (hasReachedLimit(textModel)) {
        console.log(`Text regeneration blocked: Usage limit reached for ${textModel}`);
        return NextResponse.json(
          { 
            success: false, 
            error: `Monthly limit reached for ${textModel}. Please try a different model or wait until next month.`,
            type: 'quota_exceeded',
            field
          },
          { status: 403 }
        );
      }
    } catch (limitError) {
      console.warn('Error checking text model usage limits (continuing anyway):', limitError);
    }

    try {
      let prompt: string;
      let systemPrompt: string;

      // Generate appropriate prompts based on the field with short length specifications
      if (field === 'name') {
        systemPrompt = `Generate a single character name that fits this character's appearance and background. Return only the name, no additional text or formatting. Preserve any accented characters if appropriate for the character's background.`;
        prompt = `Character: ${cleanedCharacter.appearance || 'A character'}\nBackground: ${cleanedCharacter.backstory_hook || 'Unknown background'}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'appearance') {
        systemPrompt = `Generate a concise physical appearance description for this character in one short paragraph (2-4 sentences). Include facial features, build, clothing, and distinguishing characteristics. Return only the description, no additional text or formatting. Preserve any accented characters if appropriate.`;
        prompt = `Character Name: ${cleanedCharacter.name}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'personality') {
        systemPrompt = `Generate a concise personality description for this character in one short paragraph (2-4 sentences). Include traits, mannerisms, motivations, and behavioral patterns. Return only the description, no additional text or formatting. Preserve any accented characters if appropriate.`;
        prompt = `Character Name: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nBackground: ${cleanedCharacter.backstory_hook}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'backstory_hook') {
        systemPrompt = `Generate a brief backstory hook for this character in 1-2 sentences. Include their origin, key life events, and what drives them. Return only the backstory, no additional text or formatting. Preserve any accented characters if appropriate.`;
        prompt = `Character Name: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field.startsWith('quest_')) {
        // Handle quest regeneration with IMPROVED logic
        const parts = field.split('_');
        const questIndex = parseInt(parts[1], 10);
        const questPart = parts[2] || 'whole';

        if (isNaN(questIndex) || !cleanedCharacter.quests || questIndex >= cleanedCharacter.quests.length) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Invalid quest index',
              type: 'invalid_request'
            },
            { status: 400 }
          );
        }

        const quest = cleanedCharacter.quests[questIndex];

        if (questPart === 'title') {
          systemPrompt = `Generate a compelling quest title. Return only the title, no additional text or formatting. Preserve any accented characters if appropriate.`;
          prompt = `Quest Description: ${quest.description}\nCharacter: ${cleanedCharacter.name}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        } else if (questPart === 'description') {
          systemPrompt = `Generate a detailed quest description. Include the objective, stakes, and any relevant context. Return only the description, no additional text or formatting. Preserve any accented characters if appropriate.`;
          prompt = `Quest Title: ${quest.title}\nCharacter: ${cleanedCharacter.name}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        } else if (questPart === 'reward') {
          systemPrompt = `Generate an appropriate quest reward. Include both tangible and intangible benefits. Return only the reward description, no additional text or formatting. Preserve any accented characters if appropriate.`;
          prompt = `Quest: ${quest.title} - ${quest.description}\nCharacter: ${cleanedCharacter.name}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        } else {
          // FIXED: Regenerate entire quest with better prompt
          systemPrompt = `Generate a complete quest as a valid JSON object. The quest should be appropriate for this character and genre. Return ONLY a JSON object with these exact fields: "title", "description", "reward", "type". Do not include any other text, markdown, or code blocks. Preserve any accented characters if appropriate. Example format:
{
  "title": "The Lost Artifact",
  "description": "Find the ancient relic hidden in the forgotten temple",
  "reward": "500 gold coins and a magical pendant",
  "type": "any"
}`;
          prompt = `Character: ${cleanedCharacter.name}
Appearance: ${cleanedCharacter.appearance}
Personality: ${cleanedCharacter.personality}
Background: ${cleanedCharacter.backstory_hook}
Genre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}
Occupation: ${cleanedCharacter.selected_traits?.occupation || 'Unknown'}

Generate a quest that would be meaningful and appropriate for this character.`;
        }
      } else if (field === 'additional_traits') {
        systemPrompt = `Generate 3-5 additional character traits as short keywords or phrases (1-3 words each). Return as JSON object with trait names as keys and short descriptions as values. Preserve any accented characters if appropriate (e.g., "Café Owner"). Examples: {"eye_color": "Green", "demeanor": "Stern", "skill": "Archery", "quirk": "Whistles"}`;
        prompt = `Character: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'add_single_trait') {
        systemPrompt = `Generate 1 additional character trait as a short keyword or phrase (1-3 words). Return as JSON object with one trait name as key and short description as value. Preserve any accented characters if appropriate (e.g., "Café Owner"). Example: {"hobby": "Reading"}`;
        prompt = `Character: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field.startsWith('regenerate_trait_')) {
        const traitKey = field.replace('regenerate_trait_', '');
        systemPrompt = `Generate a new value for the trait "${traitKey.replace(/_/g, ' ')}" as a short keyword or phrase (1-3 words). Return only the trait value, no additional text or formatting. Preserve any accented characters if appropriate (e.g., "Café Owner").`;
        prompt = `Character: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}\nTrait to regenerate: ${traitKey.replace(/_/g, ' ')}`;
      } else if (field.startsWith('dialogue_')) {
        const parts = field.split('_');
        const index = parseInt(parts[1], 10);

        if (isNaN(index) || !cleanedCharacter.dialogue_lines || index >= cleanedCharacter.dialogue_lines.length) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Invalid dialogue index',
              type: 'invalid_request'
            },
            { status: 400 }
          );
        }

        systemPrompt = `Generate a dialogue line that this character would say. Make it consistent with their personality and background. Return only the dialogue, no quotes or additional formatting. Preserve any accented characters if appropriate.`;
        prompt = `Character: ${cleanedCharacter.name}\nPersonality: ${cleanedCharacter.personality}\nBackground: ${cleanedCharacter.backstory_hook}\nExisting dialogue style: ${cleanedCharacter.dialogue_lines[0] || 'Unknown'}`;
      } else if (field.startsWith('item_')) {
        const parts = field.split('_');
        const index = parseInt(parts[1], 10);

        if (isNaN(index) || !cleanedCharacter.items || index >= cleanedCharacter.items.length) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Invalid item index',
              type: 'invalid_request'
            },
            { status: 400 }
          );
        }

        systemPrompt = `Generate an item that this character would own or carry. Include its name, description, and significance. Return only the item description, no additional text or formatting. Preserve any accented characters if appropriate.`;
        prompt = `Character: ${cleanedCharacter.name}\nOccupation: ${cleanedCharacter.selected_traits?.occupation || 'Unknown'}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: `Unsupported field for regeneration: ${field}`,
            type: 'invalid_request'
          },
          { status: 400 }
        );
      }

      // Call OpenAI API with enhanced error handling
      const response = await openai.chat.completions.create({
        model: textModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No content returned from OpenAI");
      }

      // Clean up the response but preserve accented characters
      let regeneratedContent: string | Record<string, string> = content.trim()
        .replace(/["""'']/g, '"') // Normalize quotes
        .replace(/—/g, '-') // Replace em dashes
        .replace(/…/g, '...') // Replace ellipsis
        .replace(/^["'`]|["'`]$/g, '') // Remove surrounding quotes
        .replace(/^\*\*|\*\*$/g, '') // Remove bold markers
        .replace(/^#+\s*/, ''); // Remove markdown headers

      // Increment usage count AFTER successful API call
      try {
        incrementUsage(textModel);
        console.log(`Successfully incremented usage for text model ${textModel}`);
      } catch (usageError) {
        console.warn('Error incrementing text model usage (continuing anyway):', usageError);
      }

      // IMPROVED: For quest whole regeneration, use enhanced JSON parsing
      if (field.includes('quest_') && field.endsWith('_whole')) {
        try {
          const questData = parseJSONWithFallbacks(regeneratedContent as string);
          
          // Validate the quest object has required fields
          if (!questData.title || !questData.description || !questData.reward) {
            console.warn('Quest data missing required fields, creating default values');
            questData.title = questData.title || 'Generated Quest';
            questData.description = questData.description || 'A quest for this character';
            questData.reward = questData.reward || 'Experience and satisfaction';
            questData.type = questData.type || 'any';
          }
          
          regeneratedContent = questData;
          console.log('Successfully parsed quest JSON:', questData);
        } catch (e) {
          console.error('Failed to parse quest JSON:', e);
          console.log('Raw content was:', regeneratedContent);
          
          // Fallback: create a basic quest from the text
          regeneratedContent = {
            title: "Generated Quest",
            description: (regeneratedContent as string).substring(0, 200) || "A quest for this character",
            reward: "Experience and rewards",
            type: "any"
          };
        }
      }

      // For additional traits regeneration, parse as JSON
      if (field === 'additional_traits' || field === 'add_single_trait') {
        try {
          const traitsData = parseJSONWithFallbacks(regeneratedContent as string);
          if (typeof traitsData === 'object' && traitsData !== null) {
            // Clean the trait values but preserve accented characters
            const cleanedTraits: Record<string, string> = {};
            Object.entries(traitsData).forEach(([key, value]) => {
              if (typeof value === 'string') {
                const cleanedValue = value
                  .replace(/["""'']/g, '"')
                  .replace(/—/g, '-')
                  .replace(/…/g, '...')
                  .trim();
                
                // Only include if it's short enough to be a proper trait
                if (cleanedValue.length <= 25 && 
                    !cleanedValue.includes('.') && 
                    !cleanedValue.includes(',') && 
                    cleanedValue.split(' ').length <= 4) {
                  cleanedTraits[key] = cleanedValue;
                }
              }
            });
            regeneratedContent = cleanedTraits;
          } else {
            throw new Error('Invalid traits data format');
          }
        } catch (e) {
          console.warn('Failed to parse traits JSON, using empty object');
          regeneratedContent = {};
        }
      }

      // For individual trait regeneration, just clean the value but preserve accented characters
      if (field.startsWith('regenerate_trait_')) {
        const cleanedValue = (regeneratedContent as string)
          .replace(/["""'']/g, '"')
          .replace(/—/g, '-')
          .replace(/…/g, '...')
          .trim();
        
        // Only proceed if it's short enough to be a proper trait
        if (cleanedValue.length <= 25 && 
            !cleanedValue.includes('.') && 
            !cleanedValue.includes(',') && 
            cleanedValue.split(' ').length <= 4) {
          regeneratedContent = cleanedValue;
        } else {
          throw new Error('Generated trait value is too long or complex');
        }
      }

      console.log(`Successfully regenerated ${field}`);

      // Create updated character object with the regenerated content
      // IMPORTANT: Use the original character as base to preserve image_data
      const updatedCharacter = { ...character };
      
      // Log to help debug image preservation
      console.log(`Original character has image_data: ${!!(character.image_data || character.image_url)}`);
      
      // IMPROVED: Update the appropriate field in the character object
      if (field.startsWith('quest_')) {
        // Handle quest regeneration with better error checking
        const parts = field.split('_');
        const questIndex = parseInt(parts[1], 10);
        const questPart = parts[2] || 'whole';
        
        // Ensure quests array exists and has the quest at the index
        if (!updatedCharacter.quests || !updatedCharacter.quests[questIndex]) {
          throw new Error(`Quest at index ${questIndex} not found`);
        }
        
        if (questPart === 'whole') {
          // Replace entire quest with validation
          if (typeof regeneratedContent === 'object' && regeneratedContent !== null) {
            // Ensure required fields exist
            const questObject = {
              title: regeneratedContent.title || 'Generated Quest',
              description: regeneratedContent.description || 'A quest for this character',
              reward: regeneratedContent.reward || 'Experience and rewards',
              type: regeneratedContent.type || 'any'
            };
            updatedCharacter.quests[questIndex] = questObject;
            console.log(`Updated quest ${questIndex} with:`, questObject);
          } else {
            throw new Error('Quest regeneration did not return a valid object');
          }
        } else {
          // Update specific quest field
          updatedCharacter.quests[questIndex] = {
            ...updatedCharacter.quests[questIndex],
            [questPart]: regeneratedContent as string
          };
        }
      } else if (field.startsWith('dialogue_')) {
        const parts = field.split('_');
        const index = parseInt(parts[1], 10);
        
        // Ensure dialogue_lines array exists and has enough elements
        if (!updatedCharacter.dialogue_lines) {
          updatedCharacter.dialogue_lines = [];
        }
        if (index >= 0 && index < updatedCharacter.dialogue_lines.length) {
          updatedCharacter.dialogue_lines[index] = regeneratedContent as string;
        } else {
          throw new Error(`Dialogue line at index ${index} not found`);
        }
      } else if (field.startsWith('item_')) {
        const parts = field.split('_');
        const index = parseInt(parts[1], 10);
        
        // Ensure items array exists and has enough elements
        if (!updatedCharacter.items) {
          updatedCharacter.items = [];
        }
        if (index >= 0 && index < updatedCharacter.items.length) {
          updatedCharacter.items[index] = regeneratedContent as string;
        } else {
          throw new Error(`Item at index ${index} not found`);
        }
      } else if (field === 'additional_traits') {
        // Replace additional traits entirely with the new ones
        if (typeof regeneratedContent === 'object' && regeneratedContent !== null) {
          // Merge with existing added_traits, replacing only the regenerated ones
          updatedCharacter.added_traits = {
            ...(updatedCharacter.added_traits || {}),
            ...regeneratedContent
          };
        } else {
          throw new Error('Invalid additional traits data format');
        }
      } else if (field === 'add_single_trait') {
        // Add new trait(s) to existing traits
        if (typeof regeneratedContent === 'object' && regeneratedContent !== null) {
          // Merge the new trait(s) with existing ones
          updatedCharacter.added_traits = {
            ...(updatedCharacter.added_traits || {}),
            ...regeneratedContent
          };
        } else {
          throw new Error('Invalid single trait data format');
        }
      } else if (field.startsWith('regenerate_trait_')) {
        // Update specific trait
        const traitKey = field.replace('regenerate_trait_', '');
        if (typeof regeneratedContent === 'string') {
          updatedCharacter.added_traits = {
            ...(updatedCharacter.added_traits || {}),
            [traitKey]: regeneratedContent
          };
        } else {
          throw new Error('Invalid trait value format');
        }
      } else {
        // Simple field update (name, appearance, personality, backstory_hook)
        if (field in updatedCharacter) {
          (updatedCharacter as any)[field] = regeneratedContent;
        } else {
          throw new Error(`Unknown field: ${field}`);
        }
      }

      console.log(`Updated character still has image_data: ${!!(updatedCharacter.image_data || updatedCharacter.image_url)}`);

      return NextResponse.json({
        success: true,
        character: updatedCharacter,
        field
      });

    } catch (error) {
      console.error(`Text regeneration error for field ${field}:`, error);
      
      const errorInfo = categorizeError(error);
      return NextResponse.json(
        {
          success: false,
          error: errorInfo.message,
          type: errorInfo.type,
          field
        },
        { status: errorInfo.status }
      );
    }

  } catch (error) {
    console.error('Request processing error:', error);
    
    const errorInfo = categorizeError(error);
    
    // Ensure we always return valid JSON
    return NextResponse.json(
      {
        success: false,
        error: errorInfo.message,
        type: errorInfo.type
      },
      { status: errorInfo.status }
    );
  }
}