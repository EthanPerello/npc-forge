import OpenAI from 'openai';
import { Character, OpenAIModel, ImageModel } from './types';
import { DEFAULT_MODEL } from './models';
import { DEFAULT_IMAGE_MODEL } from './image-models';

// Initialize the OpenAI client with timeout settings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 seconds timeout for the client
  maxRetries: 2, // Retry twice on failures
});

// Define OpenAI error type for better error handling
interface OpenAIError {
  status?: number;
  message?: string;
  code?: string;
  param?: string | null;
  type?: string;
}

export async function generateCharacter(
  systemPrompt: string, 
  description: string,
  model: OpenAIModel = DEFAULT_MODEL
): Promise<Character> {
  try {
    console.log(`Generating character with model: ${model}`);

    // Call the OpenAI API with the selected model
    const response = await openai.chat.completions.create({
      model: model, // Use the selected model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: description }
      ],
      temperature: 0.8,
      // The client-level timeout setting will apply here
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content returned from OpenAI");
    }

    // Extract the JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in the response");
    }

    try {
      // Parse the JSON
      const character: Character = JSON.parse(jsonMatch[0]);
      
      // Validate essential fields are present
      const requiredFields = ['name', 'appearance', 'personality', 'backstory_hook'];
      for (const field of requiredFields) {
        if (!character[field as keyof Character]) {
          throw new Error(`Generated character missing required field: ${field}`);
        }
      }
      
      return character;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      // Try to clean the JSON string if parsing fails
      const cleaned = jsonMatch[0].replace(/[\u0000-\u001F]+/g, " ").trim();
      const character = JSON.parse(cleaned);
      
      // Still validate after cleaning
      const requiredFields = ['name', 'appearance', 'personality', 'backstory_hook'];
      for (const field of requiredFields) {
        if (!character[field as keyof Character]) {
          throw new Error(`Generated character missing required field: ${field}`);
        }
      }
      
      return character; 
    }
  } catch (error) {
    console.error("Error generating character:", error);
    // Add more detailed error logging
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}, message: ${error.message}`);
      if (error.stack) console.error(`Stack: ${error.stack}`);
    }
    
    // Provide more specific error messages based on error type
    const apiError = error as OpenAIError;
    if (apiError.status === 429) {
      throw new Error("OpenAI API rate limit exceeded. Please try again later.");
    } else if (apiError.status === 400) {
      throw new Error("OpenAI API rejected the request. Your description may contain inappropriate content.");
    } else if (error instanceof Error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while generating character");
    }
  }
}

// Helper function to categorize if a trait is visual
function isVisualTrait(key: string): boolean {
  const visualTraits = [
    'gender', 'age_group', 'species', 'height', 'build', 
    'distinctive_features', 'appearance', 'skin', 'hair', 'eyes',
    'face', 'body', 'clothing', 'attire', 'outfit', 'scar',
    'tattoo', 'mark', 'accessory', 'jewelry', 'weapon'
  ];
  
  return visualTraits.some(trait => key.toLowerCase().includes(trait));
}

export async function generatePortrait(character: Character): Promise<string> {
  try {
    // Gather appearance details from the character
    const appearanceText = character.appearance || "";
    
    // Get name and key traits
    const name = character.name || "character";
    
    // Gather visual traits from selected_traits
    const visualTraits: string[] = [];
    
    if (character.selected_traits) {
      Object.entries(character.selected_traits).forEach(([key, value]) => {
        if (value && isVisualTrait(key)) {
          if (typeof value === 'string') {
            visualTraits.push(`${key.replace(/_/g, ' ')}: ${value}`);
          }
        }
      });
    }
    
    // Gather visual traits from added_traits
    if (character.added_traits) {
      Object.entries(character.added_traits).forEach(([key, value]) => {
        if (value && isVisualTrait(key)) {
          if (typeof value === 'string') {
            visualTraits.push(`${key.replace(/_/g, ' ')}: ${value}`);
          }
        }
      });
    }
    
    // Get portrait customization options - only include non-empty values
    const portraitOptions = character.portrait_options || {};
    
    // Use selected image model or default
    const imageModel: ImageModel = (portraitOptions.image_model as ImageModel) || DEFAULT_IMAGE_MODEL;
    
    // Debug: Log the portrait options to verify they're being passed correctly
    console.log("Portrait options received:", JSON.stringify(portraitOptions, null, 2));
    
    // Only add options that have been explicitly selected (not empty strings)
    const artStyle = portraitOptions.art_style ? `${portraitOptions.art_style} style,` : '';
    const mood = portraitOptions.mood ? `with a ${portraitOptions.mood} expression,` : '';
    const framing = portraitOptions.framing ? `${portraitOptions.framing} shot,` : '';
    const background = portraitOptions.background ? `with a ${portraitOptions.background} background,` : '';
    
    // Create a prompt for the image generation
    const imagePrompt = `Portrait of ${name}: ${appearanceText.substring(0, 250)}
    ${visualTraits.length > 0 ? `Important visual characteristics: ${visualTraits.join(', ')}.` : ''}
    ${artStyle} ${mood} ${framing} ${background}
    High quality, detailed character portrait, professional digital art.`;

    console.log(`Generating character portrait with ${imageModel}`);
    console.log("Portrait prompt:", imagePrompt); // Debug the actual prompt being sent
    
    // Base configuration for all models
    const generateOptions: any = {
      model: imageModel,
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024"
    };
    
    // Only add quality parameter for models that support it
    if (imageModel === 'gpt-image-1') {
      generateOptions.quality = "high";
    } else if (imageModel === 'dall-e-3') {
      generateOptions.quality = "standard";
    }
    // DALL-E-2 doesn't support the quality parameter, so we omit it
    
    const response = await openai.images.generate(generateOptions);

    return response.data[0].url || '';
  } catch (error) {
    console.error("Error generating portrait:", error);
    
    // Type guard for better error handling
    const apiError = error as OpenAIError;
    
    // Provide a helpful error message for common issues
    if (apiError.status === 429) {
      throw new Error("Rate limit exceeded for image generation. Please try again later.");
    } else if (apiError.status === 400) {
      throw new Error("Bad request error. The image prompt may violate content policies.");
    }
    
    if (error instanceof Error) {
      throw error;
    } else {
      // Fallback for unknown error types
      throw new Error("An unknown error occurred while generating portrait");
    }
  }
}