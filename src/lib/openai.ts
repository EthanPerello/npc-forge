// src/lib/openai.ts
import OpenAI from 'openai';
import { Character, OpenAIModel, ImageModel } from './types';
import { DEFAULT_MODEL } from './models';
import { DEFAULT_IMAGE_MODEL } from './image-models';

// Initialize the OpenAI client with increased timeout settings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // Increased to 120 seconds (2 minutes) for image generation
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

// Enhanced JSON parsing utilities
class JSONParser {
  // Clean and normalize JSON string
  static cleanJSONString(jsonStr: string): string {
    return jsonStr
      // Remove control characters
      .replace(/[\u0000-\u001F]+/g, " ")
      // Fix common formatting issues
      .replace(/\n\s*\n/g, "\n")
      // Remove trailing commas before closing braces/brackets (more comprehensive)
      .replace(/,(\s*[}\]])/g, "$1")
      // Fix trailing commas after quoted strings
      .replace(/("(?:[^"\\]|\\.)*"),(\s*[}\]])/g, '$1$2')
      // Fix unescaped quotes in strings (basic attempt)
      .replace(/([^\\])"([^"]*)"([^,}\]\s])/g, '$1\\"$2\\"$3')
      // Remove any text before the first {
      .replace(/^[^{]*/, "")
      // Remove any text after the last }
      .replace(/}[^}]*$/, "}")
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Extract JSON from various formats
  static extractJSON(content: string): string[] {
    const candidates: string[] = [];

    // Try to find JSON in markdown code blocks
    const codeBlockMatch = content.match(/```json\s*([\s\S]*?)\s*```/i);
    if (codeBlockMatch) {
      candidates.push(codeBlockMatch[1]);
    }

    // Find all potential JSON objects
    const jsonMatches = content.match(/\{[\s\S]*?\}/g);
    if (jsonMatches) {
      candidates.push(...jsonMatches);
    }

    // Try the whole content if it looks like it might be JSON
    if (content.trim().startsWith('{') && content.trim().endsWith('}')) {
      candidates.push(content);
    }

    return candidates;
  }

  // Attempt to fix common JSON issues
  static fixCommonIssues(jsonStr: string): string {
    let fixed = jsonStr;

    try {
      // More aggressive trailing comma removal
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
      
      // Fix trailing commas after property values (more specific patterns)
      fixed = fixed.replace(/,(\s*\n\s*[}\]])/g, '$1');
      fixed = fixed.replace(/,(\s*$)/gm, '');
      
      // Fix specific patterns like: "value",\n  }
      fixed = fixed.replace(/("[^"]*"),(\s*\n\s*[}\]])/g, '$1$2');
      
      // Fix incomplete arrays/objects
      const openBraces = (fixed.match(/\{/g) || []).length;
      const closeBraces = (fixed.match(/\}/g) || []).length;
      const openBrackets = (fixed.match(/\[/g) || []).length;
      const closeBrackets = (fixed.match(/\]/g) || []).length;

      // Add missing closing braces
      if (openBraces > closeBraces) {
        fixed += '}';
      }

      // Add missing closing brackets
      if (openBrackets > closeBrackets) {
        fixed += ']';
      }

      // Fix quotes in the middle of strings (more careful approach)
      // Only fix obvious cases where there are unescaped quotes
      fixed = fixed.replace(/"([^"]*)"([^"]*)"([^",}\]\s:,}])/g, '"$1\\"$2\\"$3');

      // One more pass at trailing comma removal
      fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

      return fixed;
    } catch (error) {
      console.warn('Error in JSON fixing:', error);
      return jsonStr;
    }
  }

  // Validate and fix character object
  static validateAndFixCharacter(obj: any): Character {
    const character = obj as Character;

    // Ensure required fields exist - only set defaults if they're truly missing
    if (!character.name || typeof character.name !== 'string' || character.name.trim() === '') {
      character.name = 'Unknown Character';
    }

    if (!character.appearance || typeof character.appearance !== 'string' || character.appearance.trim() === '') {
      character.appearance = 'A mysterious figure with no clear description.';
    }

    if (!character.personality || typeof character.personality !== 'string' || character.personality.trim() === '') {
      character.personality = 'An enigmatic personality that remains unclear.';
    }

    if (!character.backstory_hook || typeof character.backstory_hook !== 'string' || character.backstory_hook.trim() === '') {
      character.backstory_hook = 'A character with a mysterious past.';
    }

    // Ensure objects exist
    if (!character.selected_traits || typeof character.selected_traits !== 'object') {
      character.selected_traits = {};
    }

    if (!character.added_traits || typeof character.added_traits !== 'object') {
      character.added_traits = {};
    }

    // Fix array fields
    if (character.items && !Array.isArray(character.items)) {
      character.items = [];
    }

    if (character.dialogue_lines && !Array.isArray(character.dialogue_lines)) {
      character.dialogue_lines = [];
    }

    if (character.quests && !Array.isArray(character.quests)) {
      character.quests = [];
    }

    // Fix quest structure
    if (character.quests) {
      character.quests = character.quests.map(quest => {
        if (typeof quest === 'string') {
          return {
            title: quest,
            description: quest,
            reward: 'Unknown reward'
          };
        }
        return {
          title: quest.title || 'Untitled Quest',
          description: quest.description || 'No description available',
          reward: quest.reward || 'Unknown reward',
          type: quest.type
        };
      });
    }

    return character;
  }

  // Main parsing function with multiple strategies
  static parseCharacterJSON(content: string): Character {
    console.log('=== Starting JSON parsing process ===');
    console.log('Raw content length:', content.length);
    console.log('Content preview:', content.substring(0, 300) + '...');
    
    const candidates = this.extractJSON(content);
    console.log(`Found ${candidates.length} JSON candidates`);
    
    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      console.log(`\n--- Trying candidate ${i + 1} ---`);
      console.log('Candidate preview:', candidate.substring(0, 200) + '...');
      
      // Try multiple cleaning and fixing strategies
      const strategies = [
        candidate, // Original
        this.cleanJSONString(candidate), // Cleaned
        this.fixCommonIssues(candidate), // Fixed only
        this.fixCommonIssues(this.cleanJSONString(candidate)), // Cleaned and fixed
        // Additional strategy: aggressive trailing comma removal
        candidate.replace(/,(\s*[}\]])/g, '$1').replace(/,(\s*\n\s*[}\]])/g, '$1'),
      ];

      for (let j = 0; j < strategies.length; j++) {
        const jsonStr = strategies[j];
        try {
          console.log(`Trying strategy ${j + 1} for candidate ${i + 1}`);
          const parsed = JSON.parse(jsonStr);
          console.log('Parsed JSON successfully, raw parsed object:', {
            name: parsed.name,
            hasAppearance: !!parsed.appearance,
            hasPersonality: !!parsed.personality,
            keys: Object.keys(parsed)
          });
          
          const character = this.validateAndFixCharacter(parsed);
          console.log('After validation, character name:', character.name);
          
          // Basic validation - ensure it looks like a character
          if (character.name && character.name !== 'Unknown Character' && (character.appearance || character.personality)) {
            console.log(`Successfully parsed character: ${character.name}`);
            return character;
          } else {
            console.log('Character validation failed - name or content missing');
          }
        } catch (parseError) {
          console.log('JSON parse attempt failed:', parseError instanceof Error ? parseError.message : String(parseError));
          // Continue to next strategy
          continue;
        }
      }
    }

    console.log('=== All parsing strategies failed ===');
    throw new Error('Failed to parse valid character JSON from response');
  }
}

// Function to categorize error types with more specificity
const categorizeError = (error: any): { type: string; message: string; shouldRetry: boolean; userMessage: string } => {
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
          shouldRetry: true,
          userMessage: 'Too many requests. Please wait a moment and try again.'
        };
      case 400:
        if (message.toLowerCase().includes('quota')) {
          return {
            type: 'quota_exceeded',
            message: 'Monthly quota exceeded for this model.',
            shouldRetry: false,
            userMessage: 'Monthly usage limit reached for this model tier. Try a different model or wait until next month.'
          };
        }
        return {
          type: 'invalid_request',
          message: 'Invalid request parameters. Please check your settings.',
          shouldRetry: false,
          userMessage: 'Invalid request. Please try adjusting your character description or options.'
        };
      case 401:
        return {
          type: 'authentication',
          message: 'Authentication failed. Please check API configuration.',
          shouldRetry: false,
          userMessage: 'Authentication error. Please contact support.'
        };
      case 403:
        return {
          type: 'quota_exceeded',
          message: 'Monthly quota exceeded for this model tier.',
          shouldRetry: false,
          userMessage: 'Monthly usage limit reached. Try a lower tier model or wait until next month.'
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          type: 'server_error',
          message: 'OpenAI server error. Please try again.',
          shouldRetry: true,
          userMessage: 'Server temporarily unavailable. Retrying automatically...'
        };
      default:
        return {
          type: 'api_error',
          message: `API error: ${message}`,
          shouldRetry: status >= 500,
          userMessage: `API error occurred. ${status >= 500 ? 'Retrying...' : 'Please try again.'}`
        };
    }
  }
  
  // Handle network errors
  if (error?.name === 'AbortError' || error?.message?.includes('timeout') || 
      error?.code === 'ETIMEDOUT' || error?.errno === 'ETIMEDOUT' || 
      error?.message?.includes('ETIMEDOUT')) {
    return {
      type: 'timeout',
      message: 'Request timed out. Please try again.',
      shouldRetry: true,
      userMessage: 'Request timed out. Retrying with longer timeout...'
    };
  }
  
  if (error?.message?.includes('fetch') || error?.message?.includes('network') ||
      error?.code === 'ECONNRESET' || error?.code === 'ENOTFOUND' ||
      error?.message?.includes('connect') || error?.message?.includes('ECONNREFUSED')) {
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
      shouldRetry: true,
      userMessage: 'Network error. Please check your connection and try again.'
    };
  }
  
  // Handle JSON parsing errors
  if (error?.message?.includes('JSON') || error?.message?.includes('parse')) {
    return {
      type: 'json_parse',
      message: 'Failed to parse AI response. Please try again.',
      shouldRetry: true,
      userMessage: 'AI response was unclear. Trying again with better instructions...'
    };
  }
  
  // Default error
  return {
    type: 'unknown',
    message: error?.message || 'An unexpected error occurred',
    shouldRetry: false,
    userMessage: 'An unexpected error occurred. Please try again.'
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

// Enhanced retry mechanism with different strategies for different error types
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  operationType: 'character' | 'portrait' = 'character'
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
      console.log(`${operationType} operation succeeded on attempt ${attempt + 1}`);
      return result;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed for ${operationType}:`, error);
      
      const errorInfo = categorizeError(error);
      
      // Special handling for different error types
      if (errorInfo.type === 'json_parse' && operationType === 'character') {
        // For JSON parse errors, we might want to try with modified prompts
        console.log('JSON parse error - will attempt with cleaner prompt on retry');
      }
      
      if (errorInfo.type === 'timeout' && operationType === 'portrait') {
        console.log('Portrait generation timeout - will retry with longer delay');
      }
      
      // Don't retry if it's not a retryable error
      if (!errorInfo.shouldRetry || attempt === maxRetries) {
        console.log(`Not retrying: shouldRetry=${errorInfo.shouldRetry}, attempt=${attempt}, maxRetries=${maxRetries}, errorType=${errorInfo.type}`);
        
        // Enhance error with user-friendly message
        const enhancedError = new Error(errorInfo.userMessage);
        (enhancedError as any).type = errorInfo.type;
        (enhancedError as any).originalMessage = errorInfo.message;
        (enhancedError as any).shouldRetry = errorInfo.shouldRetry;
        
        throw enhancedError;
      }
      
      // Calculate delay with exponential backoff, with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      
      // For portrait generation, use longer delays due to potential rate limits
      const actualDelay = operationType === 'portrait' ? delay * 1.5 : delay;
      
      console.log(`Retrying ${operationType} in ${actualDelay}ms... (attempt ${attempt + 1}/${maxRetries})`);
      await sleep(actualDelay);
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
      const response = await Promise.race([
        openai.chat.completions.create({
          model: requestModel,
          messages: [
            { 
              role: "system", 
              content: systemPrompt + "\n\nIMPORTANT: Respond only with valid JSON. Do not include any text before or after the JSON object. Ensure all strings are properly escaped and the JSON is complete." 
            },
            { role: "user", content: description }
          ],
          temperature: 0.8,
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Character generation timeout after 60 seconds')), 60000)
        )
      ]) as any;

      // Parse the response
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error("No content returned from OpenAI");
      }

      console.log('Raw API response length:', content.length);
      console.log('Response preview:', content.substring(0, 200) + '...');

      // Use enhanced JSON parsing
      const character = JSONParser.parseCharacterJSON(content);
      
      console.log(`Successfully generated character: ${character.name}`);
      return character;
    }, 2, 1000, 'character'); // Allow 2 retries for character generation

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

    // Use enhanced retry mechanism for portrait generation
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
      
      // Call the API to generate the image with timeout wrapper
      const response = await Promise.race([
        openai.images.generate(generateOptions),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Portrait generation timeout after 2 minutes')), 120000)
        )
      ]) as any;

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
    }, 3, 3000, 'portrait'); // Allow 3 retries for portrait generation with 3 second base delay
    
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
        errorType: errorInfo.type,
        userMessage: errorInfo.userMessage
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
    
    // Add error information to character for user feedback
    if (!character.added_traits) {
      character.added_traits = {};
    }
    character.added_traits.portrait_error = errorInfo.userMessage;
    character.added_traits.portrait_error_type = errorInfo.type;
    
    console.log("Portrait generation failed completely, throwing error for user feedback");
    
    // Throw the enhanced error so the calling code can handle it appropriately
    const enhancedError = new Error(errorInfo.userMessage);
    (enhancedError as any).type = errorInfo.type;
    (enhancedError as any).originalMessage = errorInfo.message;
    (enhancedError as any).shouldRetry = errorInfo.shouldRetry;
    
    throw enhancedError;
  }
}