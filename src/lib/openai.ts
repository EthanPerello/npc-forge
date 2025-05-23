import OpenAI from 'openai';
import { Character, OpenAIModel, ImageModel } from './types';
import { DEFAULT_MODEL } from './models';
import { DEFAULT_IMAGE_MODEL } from './image-models';

// Initialize the OpenAI client with increased timeout settings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60000, // 60 seconds timeout for the client
  maxRetries: 0, // No retries to avoid hitting rate limits
});

// Define OpenAI error type for better error handling
interface OpenAIError {
  status?: number;
  message?: string;
  code?: string;
  param?: string | null;
  type?: string;
}

// Helper function to wait/sleep
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Track last API call time to implement rate limiting
let lastApiCallTime = 0;
const MIN_API_CALL_INTERVAL = 3000; // 3 seconds between API calls (reduced from 5)

// Import example characters from your existing examples
import { exampleCharacters } from './example-characters';

// Extend Character type for example fallback features
interface ExtendedCharacter extends Character {
  genre?: string; // Add optional genre property for example character matching
}

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
  
  character.added_traits.fallback_note = "Example character shown due to API rate limits. Try again later for a custom character.";
  character.added_traits.original_request = description;
  
  return character;
};

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
    
    // Rate limiting - ensure minimum time between API calls
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallTime;
    
    if (timeSinceLastCall < MIN_API_CALL_INTERVAL) {
      const waitTime = MIN_API_CALL_INTERVAL - timeSinceLastCall;
      console.log(`Rate limiting: Waiting ${waitTime}ms before API call`);
      await sleep(waitTime);
    }
    
    // Update last API call time
    lastApiCallTime = Date.now();
    
    console.log(`Using model ${requestModel} for character generation`);

    // Call the OpenAI API with the selected model
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
  } catch (error) {
    console.error("Error generating character:", error);
    
    // For showcase purposes: provide an example character instead of failing
    console.log("Using example character due to API error");
    return getExampleCharacter(description);
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
    // Rate limiting - ensure minimum time between API calls
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallTime;
    
    if (timeSinceLastCall < MIN_API_CALL_INTERVAL) {
      const waitTime = MIN_API_CALL_INTERVAL - timeSinceLastCall;
      console.log(`Rate limiting: Waiting ${waitTime}ms before image API call`);
      await sleep(waitTime);
    }
    
    // Update last API call time
    lastApiCallTime = Date.now();
    
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

    // Base configuration for DALL-E 2/3 or GPT Image models
    const generateOptions: any = {
      model: imageModel,
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    };
    
    // Special options for DALL-E 3
    if (imageModel === 'dall-e-3') {
      generateOptions.quality = 'standard';
      generateOptions.style = 'vivid';
    }
    
    // Special options for GPT Image
    if (imageModel === 'gpt-image-1') {
      generateOptions.quality = 'high';
    }
    
    // Call the API to generate the image
    const response = await openai.images.generate(generateOptions);

    // Get base64 data
    const b64Image = response.data[0].b64_json;
      
    if (!b64Image) {
      throw new Error("No base64 image data returned from OpenAI");
    }
    
    // Create the complete data URL
    const dataUrl = `data:image/png;base64,${b64Image}`;
    
    // Store the data URL in the character
    character.image_data = dataUrl;
    
    console.log(`Successfully generated portrait for ${name}`);
    
    // Return the data URL
    return dataUrl;
  } catch (error) {
    console.error("Error generating portrait:", error);
    
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
    
    // Last resort - create a message about API issues
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    character.added_traits = {
      ...character.added_traits,
      portrait_error: errorMessage
    };
    
    console.log("Portrait generation failed, returning empty string");
    
    // Return empty string if we can't get an image (to satisfy TypeScript)
    return '';
  }
}