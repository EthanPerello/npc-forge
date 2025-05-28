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

// Helper function to categorize errors
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { character, field, model, portraitOptions } = body;

    if (!character) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Character data is required',
          type: 'invalid_request'
        },
        { status: 400 }
      );
    }

    if (!field) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Field parameter is required',
          type: 'invalid_request'
        },
        { status: 400 }
      );
    }

    console.log(`Regenerating ${field} for character: ${character.name}`);

    // Handle portrait regeneration
    if (field === 'portrait') {
      try {
        // Create a character object with the portrait options
        const characterWithOptions = {
          ...character,
          portrait_options: {
            ...character.portrait_options,
            ...portraitOptions
          }
        };

        console.log(`Using image model: ${characterWithOptions.portrait_options?.image_model || 'default'}`);
        
        const imageData = await generatePortrait(characterWithOptions);
        
        if (!imageData) {
          throw new Error('No image data returned from portrait generation');
        }

        return NextResponse.json({
          success: true,
          imageData,
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
        prompt = `Character: ${character.appearance || 'A character'}\nBackground: ${character.backstory_hook || 'Unknown background'}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'appearance') {
        systemPrompt = `Generate a detailed physical appearance description for this character. Include facial features, build, clothing, and distinguishing characteristics. Return only the description, no additional text or formatting.`;
        prompt = `Character Name: ${character.name}\nPersonality: ${character.personality}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'personality') {
        systemPrompt = `Generate a detailed personality description for this character. Include traits, mannerisms, motivations, and behavioral patterns. Return only the description, no additional text or formatting.`;
        prompt = `Character Name: ${character.name}\nAppearance: ${character.appearance}\nBackground: ${character.backstory_hook}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
      } else if (field === 'backstory_hook') {
        systemPrompt = `Generate an engaging backstory hook for this character. Include their origin, key life events, and what drives them. Return only the backstory, no additional text or formatting.`;
        prompt = `Character Name: ${character.name}\nAppearance: ${character.appearance}\nPersonality: ${character.personality}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
      } else if (field.startsWith('quest_')) {
        // Handle quest regeneration
        const parts = field.split('_');
        const questIndex = parseInt(parts[1], 10);
        const questPart = parts[2] || 'whole';

        if (isNaN(questIndex) || !character.quests || questIndex >= character.quests.length) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Invalid quest index',
              type: 'invalid_request'
            },
            { status: 400 }
          );
        }

        const quest = character.quests[questIndex];

        if (questPart === 'title') {
          systemPrompt = `Generate a compelling quest title. Return only the title, no additional text or formatting.`;
          prompt = `Quest Description: ${quest.description}\nCharacter: ${character.name}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
        } else if (questPart === 'description') {
          systemPrompt = `Generate a detailed quest description. Include the objective, stakes, and any relevant context. Return only the description, no additional text or formatting.`;
          prompt = `Quest Title: ${quest.title}\nCharacter: ${character.name}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
        } else if (questPart === 'reward') {
          systemPrompt = `Generate an appropriate quest reward. Include both tangible and intangible benefits. Return only the reward description, no additional text or formatting.`;
          prompt = `Quest: ${quest.title} - ${quest.description}\nCharacter: ${character.name}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
        } else {
          // Regenerate entire quest
          systemPrompt = `Generate a complete quest object with title, description, and reward. Return as JSON object with fields: title, description, reward.`;
          prompt = `Character: ${character.name}\nAppearance: ${character.appearance}\nPersonality: ${character.personality}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
        }
      } else if (field.startsWith('dialogue_')) {
        const parts = field.split('_');
        const index = parseInt(parts[1], 10);

        if (isNaN(index) || !character.dialogue_lines || index >= character.dialogue_lines.length) {
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
        prompt = `Character: ${character.name}\nPersonality: ${character.personality}\nBackground: ${character.backstory_hook}\nExisting dialogue style: ${character.dialogue_lines[0] || 'Unknown'}`;
      } else if (field.startsWith('item_')) {
        const parts = field.split('_');
        const index = parseInt(parts[1], 10);

        if (isNaN(index) || !character.items || index >= character.items.length) {
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
        prompt = `Character: ${character.name}\nOccupation: ${character.selected_traits?.occupation || 'Unknown'}\nPersonality: ${character.personality}\nGenre: ${character.selected_traits?.genre || 'fantasy'}`;
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

      // Call OpenAI API with retry logic
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

      return NextResponse.json({
        success: true,
        regeneratedContent,
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