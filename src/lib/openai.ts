import OpenAI from 'openai';
import { Character } from './types';

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

// System prompt for character generation
const SYSTEM_PROMPT = `
You are an expert RPG character generator. When a user provides a description of a character or concept, you generate a complete NPC profile.

Return ONLY valid JSON with the following structure, and no other text or explanation:
{
  "name": "Character Name",
  "appearance": "Detailed physical description",
  "personality": ["Trait 1", "Trait 2", "Trait 3"],
  "items": ["Item 1", "Item 2", "Item 3"],
  "dialogue_lines": ["Line 1", "Line 2", "Line 3"],
  "quest": {
    "title": "Quest Title",
    "description": "Quest Description",
    "reward": "Quest Reward"
  },
  "special_ability": "Unique ability or power"
}

Be creative, detailed, and ensure the character feels cohesive and interesting.
`;

export async function generateCharacter(description: string, genre?: string): Promise<Character> {
  try {
    // Build the user prompt
    let userPrompt = `Generate a detailed NPC character`;
    
    if (genre) {
      userPrompt += ` in the ${genre} genre`;
    }
    
    userPrompt += ` based on this description: ${description}`;

    console.log(`Generating character with model: gpt-4o-mini`);

    // Call the OpenAI API with GPT-4o-mini (good balance of quality and quota)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Higher quota than gpt-4o
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
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
      return character;
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      // Try to clean the JSON string if parsing fails
      const cleaned = jsonMatch[0].replace(/[\u0000-\u001F]+/g, " ").trim();
      return JSON.parse(cleaned); 
    }
  } catch (error) {
    console.error("Error generating character:", error);
    // Add more detailed error logging
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}, message: ${error.message}`);
      if (error.stack) console.error(`Stack: ${error.stack}`);
    }
    
    // Rethrow with more helpful error message
    if (error instanceof Error) {
      throw new Error(`OpenAI API error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while generating character");
    }
  }
}

export async function generatePortrait(character: Character): Promise<string> {
  try {
    // Create a prompt for the image generation
    const imagePrompt = `Portrait of ${character.name}: ${character.appearance}. 
    Personality: ${character.personality.join(', ')}. 
    High quality, detailed fantasy character portrait, professional digital art style.`;

    console.log("Generating character portrait with DALL-E-3");
    
    const response = await openai.images.generate({
      model: "dall-e-3", // Using the best model for quality
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard", // Use "hd" for better quality if needed
      // No timeout parameter here, we use the client-level timeout
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error("Error generating portrait:", error);
    
    // Type guard for better error handling
    const apiError = error as OpenAIError;
    
    // Provide a helpful error message for common issues
    if (apiError.status === 429) {
      console.error("Rate limit exceeded for image generation. Consider waiting a minute before trying again.");
    } else if (apiError.status === 400) {
      console.error("Bad request error. The image prompt may violate content policies.");
    }
    
    if (error instanceof Error) {
      throw error;
    } else {
      // Fallback for unknown error types
      throw new Error("An unknown error occurred while generating portrait");
    }
  }
}