// src/app/api/regenerate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generatePortrait } from '@/lib/openai';
import { Character, OpenAIModel, ImageModel } from '@/lib/types';
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
      if (typeof cleaned.added_traits[key] === 'string' && cleaned.added_traits[key].length > 500) {
        cleaned.added_traits[key] = cleaned.added_traits[key].substring(0, 500) + '...';
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
    
    // Clean character object to reduce payload size
    const cleanedCharacter = cleanCharacterForAPI(character);

    console.log(`Regenerating ${field} for character: ${cleanedCharacter.name}`);

    // Handle portrait regeneration
    if (field === 'portrait') {
      try {
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

    try {
      let prompt: string;
      let systemPrompt: string;

      // Generate appropriate prompts based on the field
      if (field === 'name') {
        systemPrompt = `Generate a single character name that fits this character's appearance and background. Return only the name, no additional text or formatting.`;
        prompt = `Character: ${cleanedCharacter.appearance || 'A character'}\nBackground: ${cleanedCharacter.backstory_hook || 'Unknown background'}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'appearance') {
        systemPrompt = `Generate a detailed physical appearance description for this character. Include facial features, build, clothing, and distinguishing characteristics. Return only the description, no additional text or formatting.`;
        prompt = `Character Name: ${cleanedCharacter.name}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'personality') {
        systemPrompt = `Generate a detailed personality description for this character. Include traits, mannerisms, motivations, and behavioral patterns. Return only the description, no additional text or formatting.`;
        prompt = `Character Name: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nBackground: ${cleanedCharacter.backstory_hook}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'backstory_hook') {
        systemPrompt = `Generate an engaging backstory hook for this character. Include their origin, key life events, and what drives them. Return only the backstory, no additional text or formatting.`;
        prompt = `Character Name: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
      } else if (field.startsWith('quest_')) {
        // Handle quest regeneration
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
          systemPrompt = `Generate a compelling quest title. Return only the title, no additional text or formatting.`;
          prompt = `Quest Description: ${quest.description}\nCharacter: ${cleanedCharacter.name}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        } else if (questPart === 'description') {
          systemPrompt = `Generate a detailed quest description. Include the objective, stakes, and any relevant context. Return only the description, no additional text or formatting.`;
          prompt = `Quest Title: ${quest.title}\nCharacter: ${cleanedCharacter.name}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        } else if (questPart === 'reward') {
          systemPrompt = `Generate an appropriate quest reward. Include both tangible and intangible benefits. Return only the reward description, no additional text or formatting.`;
          prompt = `Quest: ${quest.title} - ${quest.description}\nCharacter: ${cleanedCharacter.name}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        } else {
          // Regenerate entire quest
          systemPrompt = `Generate a complete quest object with title, description, and reward. Return as JSON object with fields: title, description, reward.`;
          prompt = `Character: ${cleanedCharacter.name}\nAppearance: ${cleanedCharacter.appearance}\nPersonality: ${cleanedCharacter.personality}\nGenre: ${cleanedCharacter.selected_traits?.genre || 'fantasy'}`;
        }
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

        systemPrompt = `Generate a dialogue line that this character would say. Make it consistent with their personality and background. Return only the dialogue, no quotes or additional formatting.`;
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

        systemPrompt = `Generate an item that this character would own or carry. Include its name, description, and significance. Return only the item description, no additional text or formatting.`;
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

      // Clean up the response
      let regeneratedContent = content.trim();

      // Remove common formatting artifacts
      regeneratedContent = regeneratedContent.replace(/^["'`]|["'`]$/g, ''); // Remove surrounding quotes
      regeneratedContent = regeneratedContent.replace(/^\*\*|\*\*$/g, ''); // Remove bold markers
      regeneratedContent = regeneratedContent.replace(/^#+\s*/, ''); // Remove markdown headers

      // For quest whole regeneration, try to parse as JSON
      if (field.includes('quest_') && field.endsWith('_whole')) {
        try {
          const questData = JSON.parse(regeneratedContent);
          regeneratedContent = questData;
        } catch (e) {
          // If parsing fails, return as-is
          console.warn('Failed to parse quest JSON, using as text');
        }
      }

      console.log(`Successfully regenerated ${field}`);

      // Create updated character object with the regenerated content
      // IMPORTANT: Use the original character as base to preserve image_data
      const updatedCharacter = { ...character };
      
      // Log to help debug image preservation
      console.log(`Original character has image_data: ${!!(character.image_data || character.image_url)}`);
      
      // Update the appropriate field in the character object
      if (field.startsWith('quest_')) {
        // Handle quest regeneration
        const parts = field.split('_');
        const questIndex = parseInt(parts[1], 10);
        const questPart = parts[2] || 'whole';
        
        // Ensure quests array exists and has the quest at the index
        if (!updatedCharacter.quests || !updatedCharacter.quests[questIndex]) {
          throw new Error(`Quest at index ${questIndex} not found`);
        }
        
        if (questPart === 'whole') {
          // Replace entire quest
          if (typeof regeneratedContent === 'object') {
            updatedCharacter.quests[questIndex] = regeneratedContent;
          } else {
            throw new Error('Invalid quest data format');
          }
        } else {
          // Update specific quest field
          updatedCharacter.quests[questIndex] = {
            ...updatedCharacter.quests[questIndex],
            [questPart]: regeneratedContent
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
          updatedCharacter.dialogue_lines[index] = regeneratedContent;
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
          updatedCharacter.items[index] = regeneratedContent;
        } else {
          throw new Error(`Item at index ${index} not found`);
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