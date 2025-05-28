// src/lib/openai.ts
import OpenAI from 'openai';
import { Character, OpenAIModel, ImageModel } from './types';
import { DEFAULT_MODEL } from './models';
import { DEFAULT_IMAGE_MODEL } from './image-models';

// Initialize the OpenAI client with increased timeout settings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 90000, // Increased to 90 seconds for better reliability
  maxRetries: 0, // We'll handle retries manually for better control
});

// Define OpenAI error type for better error handling
interface OpenAIError {
  status?: number;
  message?: string;
  code?: string;
  param?: string | null;
  type?: string;
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

// Helper function to wait/sleep
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Track last API call time to implement rate limiting
let lastApiCallTime = 0;
const MIN_API_CALL_INTERVAL = 2000; // 2 seconds between API calls

// Import example characters from your existing examples
import { exampleCharacters } from './example-characters';

// Extend Character type for example fallback features
interface ExtendedCharacter extends Character {
  genre?: string; // Add optional genre property for example character matching
}

// Function to categorize error types
const categorizeError = (error: any): { type: string; message: string; shouldRetry: boolean } => {
  // Handle OpenAI API errors
  if (error?.status || error?.code) {
    const status = error.status;
    const code = error.code || error.error?.code;
    const message = error.message || error.error?.message || 'Unknown API error';
    
    switch (status) {
      case 429:
        return {
          type: 'rate_limit',
          message: 'Rate limit exceeded. Please try again in a few minutes.',
          shouldRetry: true
        };
      case 400:
        return {
          type: 'invalid_request',
          message: 'Invalid request parameters. Please check your settings.',
          shouldRetry: false
        };
      case 401:
        return {
          type: 'authentication',
          message: 'Authentication failed. Please check API configuration.',
          shouldRetry: false
        };
      case 403:
        return {
          type: 'quota_exceeded',
          message: 'Monthly quota exceeded for this model tier.',
          shouldRetry: false
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: 'server_error',
          message: 'OpenAI server error. Please try again.',
          shouldRetry: true
        };
      default:
        return {
          type: 'api_error',
          message: `API error: ${message}`,
          shouldRetry: status >= 500
        };
    }
  }
  
  // Handle network errors
  if (error?.name === 'AbortError' || error?.message?.includes('timeout')) {
    return {
      type: 'timeout',
      message: 'Request timed out. Please try again.',
      shouldRetry: true
    };
  }
  
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
      shouldRetry: true
    };
  }
  
  // Default error
  return {
    type: 'unknown',
    message: error?.message || 'An unexpected error occurred',
    shouldRetry: false
  };
};

// Function to select an appropriate example character based on the description
const getExampleCharacter = (description: string): Character => {
  // Default to the first example
  let selectedExample: ExtendedCharacter = exampleCharacters[0];
  
  // Very basic keyword matching to try to find a relevant example
  const lowerDesc = description.toLowerCase();
  
  // Try to find a matching example by genre or type
  if (lowerDesc.includes('sci-fi') || lowerDesc.includes('future') || lowerDesc.includes('tech') || 
      lowerDesc.includes('robot') || lowerDesc.includes('android')) {
    // Find sci-fi character if available (e.g., Kira-7)
    const sciFiCharacter = exampleCharacters.find((c: ExtendedCharacter) => 
      (c.genre && c.genre === 'sci-fi') || 
      (c.name && c.name.toLowerCase().includes('kira'))
    );
    if (sciFiCharacter) selectedExample = sciFiCharacter;
  } 
  else if (lowerDesc.includes('fantasy') || lowerDesc.includes('magic') || 
           lowerDesc.includes('elf') || lowerDesc.includes('wizard')) {
    // Find fantasy character if available (e.g., Elarion)
    const fantasyCharacter = exampleCharacters.find((c: ExtendedCharacter) => 
      (c.genre && c.genre === 'fantasy') || 
      (c.name && c.name.toLowerCase().includes('elarion'))
    );
    if (fantasyCharacter) selectedExample = fantasyCharacter;
  }
  else if (lowerDesc.includes('detective') || lowerDesc.includes('mystery') || 
           lowerDesc.includes('noir') || lowerDesc.includes('crime')) {
    // Find detective character if available (e.g., Miles Navarro)
    const detectiveCharacter = exampleCharacters.find((c: ExtendedCharacter) => 
      (c.genre && c.genre === 'mystery') || 
      (c.name && c.name.toLowerCase().includes('miles'))
    );
    if (detectiveCharacter) selectedExample = detectiveCharacter;
  }
  
  // Create a copy to avoid modifying the original
  const character = JSON.parse(JSON.stringify(selectedExample)) as Character;
  
  // Add a note about this being an example fallback
  if (!character.added_traits) {
    character.added_traits = {};
  }
  
  character.added_traits.fallback_note = "Example character shown due to API issues. Try again later for a custom character.";
  character.added_traits.original_request = description;
  
  return character;
};

// Retry mechanism with exponential backoff
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Add rate limiting delay
      const now = Date.now();
      const timeSinceLastCall = now - lastApiCallTime;
      
      if (timeSinceLastCall < MIN_API_CALL_INTERVAL) {
        const waitTime = MIN_API_CALL_INTERVAL - timeSinceLastCall;
        console.log(`Rate limiting: Waiting ${waitTime}ms before API call`);
        await sleep(waitTime);
      }
      
      // Update last API call time
      lastApiCallTime = Date.now();
      
      const result = await operation();
      console.log(`Operation succeeded on attempt ${attempt + 1}`);
      return result;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      const errorInfo = categorizeError(error);
      
      // Don't retry if it's not a retryable error
      if (!errorInfo.shouldRetry || attempt === maxRetries) {
        console.log(`Not retrying: shouldRetry=${errorInfo.shouldRetry}, attempt=${attempt}, maxRetries=${maxRetries}`);
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(`Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
      await sleep(delay);
    }
  }
  
  throw lastError;
}

export async function generateCharacter(
  systemPrompt: string, 
  description: string,
  model: OpenAIModel = DEFAULT_MODEL
): Promise<Character> {
  // Ensure we have a description - critical for the "no description error"
  if (!description || description.trim() === '') {
    description = "A mysterious character with unique abilities and an interesting backstory.";
    console.log("Using fallback description because none was provided:", description);
  }
  
  console.log(`Generating character with description: "${description.substring(0, 50)}..." using model: ${model}`);
  
  try {
    // Use the provided model - don't force to cheapest unless there's an error
    const requestModel = model || DEFAULT_MODEL;
    console.log(`Using model ${requestModel} for character generation`);

    // Use retry mechanism for character generation
    const result = await retryWithBackoff(async () => {
      const response = await openai.chat.completions.create({
        model: requestModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: description }
        ],
        temperature: 0.8,
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
        
        console.log(`Successfully generated character: ${character.name}`);
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
        
        console.log(`Successfully generated character (after cleaning): ${character.name}`);
        return character; 
      }
    }, 2); // Allow 2 retries for character generation

    return result;
  } catch (error) {
    console.error("Error generating character:", error);
    
    const errorInfo = categorizeError(error);
    console.log(`Character generation failed with error type: ${errorInfo.type}`);
    
    // For showcase purposes: provide an example character instead of failing completely
    console.log("Using example character due to API error");
    const fallbackCharacter = getExampleCharacter(description);
    
    // Add error information to the fallback character
    if (!fallbackCharacter.added_traits) {
      fallbackCharacter.added_traits = {};
    }
    fallbackCharacter.added_traits.api_error = errorInfo.message;
    fallbackCharacter.added_traits.error_type = errorInfo.type;
    
    return fallbackCharacter;
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
  // If this is an example character with an image, just return its image data
  if (character.added_traits?.fallback_note && character.image_data) {
    console.log("Using example character's existing portrait");
    return character.image_data;
  }
  
  if (character.added_traits?.fallback_note && character.image_url) {
    console.log("Using example character's existing image URL");
    return character.image_url || ''; // Ensure we never return undefined
  }
  
  try {
    // Use the user-selected model, or fall back to default
    const imageModel: ImageModel = character.portrait_options?.image_model || DEFAULT_IMAGE_MODEL;
    
    console.log(`Using image model: ${imageModel} for portrait generation`);
    
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
        if (value && isVisualTrait(key) && typeof value === 'string') {
          visualTraits.push(`${key.replace(/_/g, ' ')}: ${value}`);
        }
      });
    }
    
    // Get portrait customization options - only include non-empty values
    const portraitOptions = character.portrait_options || {};
    
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

    console.log(`Generating portrait with prompt: "${imagePrompt.substring(0, 100)}..."`);

    // Use retry mechanism for portrait generation
    const result = await retryWithBackoff(async () => {
      // Base configuration - start with common parameters
      const generateOptions: any = {
        model: imageModel,
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024"
      };
      
      // Model-specific configurations
      if (imageModel === 'dall-e-2') {
        // DALL-E 2 settings
        generateOptions.response_format = "b64_json";
      } else if (imageModel === 'dall-e-3') {
        // DALL-E 3 settings
        generateOptions.response_format = "b64_json";
        generateOptions.quality = 'standard';
        generateOptions.style = 'vivid';
      } else if (imageModel === 'gpt-image-1') {
        // GPT Image 1 specific settings - does NOT support response_format parameter
        generateOptions.quality = 'high';
        // Note: gpt-image-1 returns base64 by default, no response_format needed
      }
      
      console.log(`Calling OpenAI Images API with model: ${imageModel}`, {
        model: generateOptions.model,
        size: generateOptions.size,
        quality: generateOptions.quality
      });
      
      // Call the API to generate the image
      const response = await openai.images.generate(generateOptions);

      // Get base64 data - handle different response formats by model
      let b64Image: string | undefined;
      
      if (imageModel === 'gpt-image-1') {
        // GPT Image 1 returns base64 data directly in the response
        b64Image = response.data[0].b64_json || response.data[0].url;
        
        // If we got a URL instead of base64, we need to fetch and convert it
        if (b64Image && b64Image.startsWith('http')) {
          console.log("GPT Image 1 returned URL, converting to base64...");
          try {
            const imageResponse = await fetch(b64Image);
            if (!imageResponse.ok) {
              throw new Error(`Failed to fetch image: ${imageResponse.status}`);
            }
            const imageBuffer = await imageResponse.arrayBuffer();
            const base64String = Buffer.from(imageBuffer).toString('base64');
            b64Image = base64String;
          } catch (fetchError) {
            console.error("Failed to convert URL to base64:", fetchError);
            throw new Error("Failed to process image from GPT Image 1");
          }
        }
      } else {
        // DALL-E models return base64 in b64_json field
        b64Image = response.data[0].b64_json;
      }
        
      if (!b64Image) {
        throw new Error("No base64 image data returned from OpenAI");
      }
      
      // Validate base64 data
      if (!b64Image.match(/^[A-Za-z0-9+/]*={0,2}$/)) {
        throw new Error("Invalid base64 image data received");
      }
      
      // Create the complete data URL
      const dataUrl = `data:image/png;base64,${b64Image}`;
      
      console.log(`Successfully generated portrait for ${name} using ${imageModel}`);
      
      return dataUrl;
    }, 3); // Allow 3 retries for portrait generation
    
    // Store the result in the character and return it
    character.image_data = result;
    return result;
    
  } catch (error) {
    console.error("Error generating portrait:", error);
    
    const errorInfo = categorizeError(error);
    console.log(`Portrait generation failed with error type: ${errorInfo.type}`);
    
    // Enhanced error logging for debugging premium model issues
    if (error instanceof Error) {
      console.error(`Portrait generation error details:`, {
        message: error.message,
        model: character.portrait_options?.image_model,
        characterName: character.name,
        errorType: errorInfo.type
      });
    }
    
    // If this is already a fallback example character but we failed to get the image,
    // try to get its image via the example system
    if (character.added_traits?.fallback_note) {
      const matchingExample = exampleCharacters.find((ex: ExtendedCharacter) => ex.name === character.name);
      
      if (matchingExample && (matchingExample.image_data || matchingExample.image_url)) {
        console.log("Using matching example character's portrait as fallback");
        const portraitData = matchingExample.image_data || matchingExample.image_url || '';
        character.image_data = portraitData;
        return portraitData;
      }
    }
    
    // For any other error, use any example character's portrait
    if (exampleCharacters.length > 0 && exampleCharacters[0].image_data) {
      console.log("Using first example character's portrait as fallback");
      return exampleCharacters[0].image_data;
    }
    
    // Add error information to character
    if (!character.added_traits) {
      character.added_traits = {};
    }
    character.added_traits.portrait_error = errorInfo.message;
    character.added_traits.portrait_error_type = errorInfo.type;
    
    console.log("Portrait generation failed completely, returning empty string");
    
    // Throw the error so the calling code can handle it appropriately
    const enhancedError = new Error(errorInfo.message);
    (enhancedError as any).type = errorInfo.type;
    throw enhancedError;
  }
}