// src/app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateCharacter, generatePortrait } from '@/lib/openai';
import { Character, CharacterFormData, GenerationResponse, OpenAIModel } from '@/lib/types';
import { removeEmptyValues, sanitizeUserInput } from '@/lib/utils';
import { incrementUsage, hasReachedLimit } from '@/lib/usage-limits';
import { DEFAULT_MODEL } from '@/lib/models';

export const maxDuration = 60; // Set max duration to 60 seconds

// Track recent API calls to implement server-side rate limiting
const recentApiCalls: Map<string, number[]> = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_CALLS_PER_WINDOW = 10; // Increased from 5 to 10 for better UX

// Clean up old entries periodically (only on server)
if (typeof setInterval !== 'undefined' && typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of recentApiCalls.entries()) {
      // Keep only timestamps within the window
      const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
      if (recentTimestamps.length === 0) {
        recentApiCalls.delete(ip);
      } else {
        recentApiCalls.set(ip, recentTimestamps);
      }
    }
  }, 300000); // Clean up every 5 minutes
}

// Check if a request is rate limited
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  
  // Get existing timestamps for this IP or initialize empty array
  const timestamps = recentApiCalls.get(ip) || [];
  
  // Filter to only include timestamps within the rate limit window
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  // Check if there are too many recent calls
  if (recentTimestamps.length >= MAX_CALLS_PER_WINDOW) {
    return true;
  }
  
  // Update timestamps and store
  recentApiCalls.set(ip, [...recentTimestamps, now]);
  return false;
}

// Enhanced error response interface
interface ErrorResponse {
  error: string;
  character: null;
  errorType?: string;
  shouldRetry?: boolean;
  userMessage?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<GenerationResponse | ErrorResponse>> {
  console.log('=== Character Generation API Called ===');
  
  try {
    // Get client IP for rate limiting (use CloudFlare headers if available)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? 
      forwarded.split(',')[0] : // Extract the first IP from x-forwarded-for
      'unknown-ip'; // Fallback
    
    console.log(`Request from IP: ${ip}`);
    
    // For showcase purposes, we won't actually block any requests,
    // just check if we would rate limit and log it
    if (process.env.NODE_ENV !== 'development') {
      const wouldRateLimit = isRateLimited(ip);
      if (wouldRateLimit) {
        console.log(`Rate limiting would apply for IP: ${ip} (but allowing request for showcase)`);
      }
    }
    
    // Get form data from request
    let data: CharacterFormData;
    
    try {
      data = await request.json();
      console.log('Received form data:', {
        description: data.description ? `"${data.description.substring(0, 50)}..."` : 'MISSING',
        model: data.model,
        include_portrait: data.include_portrait,
        include_quests: data.include_quests,
        include_dialogue: data.include_dialogue,
        include_items: data.include_items,
        genre: data.genre
      });
    } catch (parseError) {
      console.error('Error parsing request JSON:', parseError);
      return NextResponse.json(
        { 
          error: 'Invalid request data format', 
          character: null as any,
          errorType: 'validation_error',
          userMessage: 'Request format is invalid. Please try again.'
        },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!data.description || data.description.trim() === '') {
      console.error('Validation failed: Missing description');
      console.log('Full data object:', data);
      return NextResponse.json(
        { 
          error: 'Character description is required. Please describe your character.', 
          character: null as any,
          errorType: 'validation_error',
          userMessage: 'Character description is required. Please describe your character before generating.'
        },
        { status: 400 }
      );
    }
    
    // Use the selected model as provided (don't force to cheapest)
    const model: OpenAIModel = data.model || DEFAULT_MODEL;
    
    console.log(`Using text model: ${model} for generation`);
    console.log(`Portrait generation: ${data.include_portrait ? 'ENABLED' : 'DISABLED'}`);
    
    // Check usage limits BEFORE making API calls
    try {
      if (hasReachedLimit(model)) {
        console.log(`Usage limit reached for model: ${model}`);
        return NextResponse.json(
          { 
            error: `Monthly limit reached for ${model}. Please try a different model or wait until next month.`, 
            character: null as any,
            errorType: 'quota_exceeded',
            userMessage: `Monthly usage limit reached for ${model}. Try a different model or wait until next month.`
          },
          { status: 403 }
        );
      }
      
      // Also check image model limits if portrait is requested
      if (data.include_portrait && data.portrait_options?.image_model) {
        if (hasReachedLimit(data.portrait_options.image_model)) {
          console.log(`Image model usage limit reached for: ${data.portrait_options.image_model}`);
          return NextResponse.json(
            { 
              error: `Monthly limit reached for ${data.portrait_options.image_model}. Please try a different image model or wait until next month.`, 
              character: null as any,
              errorType: 'quota_exceeded',
              userMessage: `Monthly usage limit reached for image model ${data.portrait_options.image_model}. Try a different model.`
            },
            { status: 403 }
          );
        }
      }
    } catch (limitError) {
      console.warn('Error checking usage limits (continuing anyway):', limitError);
      // Continue with request if limit checking fails (fail open)
    }
    
    // Sanitize the character description
    const originalDescription = data.description;
    data.description = sanitizeUserInput(data.description);
    
    if (originalDescription !== data.description) {
      console.log('Description was sanitized');
    }
    
    // Also sanitize any other free-text inputs
    if (data.advanced_options?.distinctive_features) {
      data.advanced_options.distinctive_features = 
        sanitizeUserInput(data.advanced_options.distinctive_features);
    }
    
    if (data.advanced_options?.homeland) {
      data.advanced_options.homeland = 
        sanitizeUserInput(data.advanced_options.homeland);
    }
    
    // Clean form data by removing empty values
    const cleanedData = removeEmptyValues(data);
    
    console.log('Cleaned data summary:', {
      hasDescription: !!cleanedData.description,
      textModel: cleanedData.model,
      imageModel: cleanedData.portrait_options?.image_model,
      includePortrait: cleanedData.include_portrait
    });
    
    // Build system prompt with improved trait instructions
    const systemPrompt = buildSystemPrompt(cleanedData);
    
    let character: Character;
    let usageIncremented = false;
    let imageUsageIncremented = false;
    
    try {
      console.log('=== Starting Character Generation ===');
      
      // Generate character with the selected model
      character = await generateCharacter(systemPrompt, data.description, model);
      
      console.log(`Generated character: ${character.name}`);
      
      // Check if this is a fallback example character
      const isFallback = !!character.added_traits?.fallback_note;
      
      if (isFallback) {
        console.log('Using fallback example character');
      }
      
      // Increment usage AFTER successful character generation (not for fallbacks)
      if (!isFallback) {
        try {
          console.log('Incrementing text model usage counter');
          incrementUsage(model);
          usageIncremented = true;
          console.log(`Successfully incremented usage for model ${model}`);
        } catch (usageError) {
          console.warn('Error incrementing text model usage (continuing anyway):', usageError);
        }
      } else {
        console.log('Skipping usage increment for fallback character');
      }
      
      // Generate portrait if needed and if portrait generation is enabled
      if (data.include_portrait && (!isFallback || (!character.image_data && !character.image_url))) {
        console.log('=== Starting Portrait Generation ===');
        
        try {
          // Transfer portrait options from form data to character object
          if (data.portrait_options) {
            character.portrait_options = data.portrait_options;
            console.log(`Using image model: ${data.portrait_options.image_model || 'default'}`);
          }
          
          const imageUrl = await generatePortrait(character);
          
          if (imageUrl) {
            character.image_url = imageUrl;
            console.log('Portrait generation successful');
            
            // Increment image model usage AFTER successful portrait generation
            if (!isFallback && data.portrait_options?.image_model) {
              try {
                console.log('Incrementing image model usage counter');
                incrementUsage(data.portrait_options.image_model);
                imageUsageIncremented = true;
                console.log(`Successfully incremented usage for image model ${data.portrait_options.image_model}`);
              } catch (usageError) {
                console.warn('Error incrementing image model usage (continuing anyway):', usageError);
              }
            }
          } else {
            console.log('Portrait generation returned empty result');
          }
        } catch (portraitError: any) {
          console.error('Failed to generate portrait:', portraitError);
          
          // Add portrait error information to character for user feedback
          if (!character.added_traits) {
            character.added_traits = {};
          }
          
          // Store error details for the frontend
          character.added_traits.portrait_generation_failed = 'true';
          character.added_traits.portrait_error_message = portraitError.message || 'Portrait generation failed';
          character.added_traits.portrait_error_type = portraitError.type || 'unknown';
          character.added_traits.portrait_should_retry = portraitError.shouldRetry ? 'true' : 'false';
          
          console.log('Portrait generation failed, but continuing with character without portrait');
          // Continue without portrait - don't fail the entire request
        }
      } else {
        if (!data.include_portrait) {
          console.log('Portrait generation skipped - not requested by user');
        } else {
          console.log('Portrait generation skipped - example character already has portrait');
        }
      }
      
      console.log('=== Character Generation Complete ===');
      
      return NextResponse.json({ character });
    } catch (error: any) {
      // Handle character generation errors specifically
      console.error('Error in character generation:', error);
      
      // Enhanced error handling with type information
      const errorResponse: ErrorResponse = {
        error: error.message || 'Character generation failed',
        character: null,
        errorType: error.type || 'generation_error',
        shouldRetry: error.shouldRetry !== false, // Default to true unless explicitly false
        userMessage: error.message || 'Character generation failed. Please try again.'
      };
      
      // Specific handling for different error types
      if (error.type === 'json_parse') {
        errorResponse.userMessage = 'AI response was unclear. Please try again with a simpler description.';
      } else if (error.type === 'timeout') {
        errorResponse.userMessage = 'Request timed out. Please try again.';
        errorResponse.shouldRetry = true;
      } else if (error.type === 'rate_limit') {
        errorResponse.userMessage = 'Too many requests. Please wait a moment and try again.';
        errorResponse.shouldRetry = true;
      } else if (error.type === 'quota_exceeded') {
        errorResponse.userMessage = 'Monthly usage limit reached for this model tier. Try a different model or wait until next month.';
        errorResponse.shouldRetry = false;
      }
      
      return NextResponse.json(errorResponse, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error in generate route:', error);
    
    const errorResponse: ErrorResponse = {
      error: error.message || 'An unknown error occurred',
      character: null,
      errorType: 'server_error',
      shouldRetry: true,
      userMessage: 'Server error occurred. Please try again.'
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Build a system prompt based on the form data with improved trait instructions
function buildSystemPrompt(data: Partial<CharacterFormData>): string {
  // Base prompt with enhanced trait instructions
  let prompt = `
You are an expert RPG character generator. Generate a detailed NPC profile based on the description and parameters provided.

CRITICAL INSTRUCTIONS:
- You must respond with ONLY valid JSON
- Do not include any text, explanations, or commentary outside the JSON
- Ensure all strings are properly escaped with backslashes before quotes
- Do not use unescaped quotes within string values
- End all arrays and objects properly with closing brackets/braces
- Do not include trailing commas before closing brackets/braces
- Do not use em dashes (—), smart quotes, or special Unicode characters
- Use only standard ASCII characters and proper JSON escaping

TRAIT GUIDELINES:
- For added_traits, use only SHORT keywords or phrases (1-3 words maximum)
- Examples: "brave", "silver hair", "merchant", "tall", "scarred"
- Do NOT use full sentences or long descriptions in traits
- Keep trait values simple and clear
- Capitalize trait values properly (e.g., "Green Eyes" not "green eyes")
- Do not include punctuation in trait values

Return ONLY valid JSON with the following structure:
{
  "name": "Character Name",
  "selected_traits": {
    // Copy of the traits that were selected by the user
  },
  "added_traits": {
    // Additional SHORT traits you've added (1-3 words each)
    // Examples: "eye_color": "green", "demeanor": "stern", "skill": "archery"
  },
  "appearance": "Detailed physical description as a paragraph",
  "personality": "Detailed personality description as a paragraph",
  "backstory_hook": "A 1-2 sentence hook about the character's past or motivation"`;
  
  // Add conditional components
  if (data.include_items) {
    prompt += `,
  "items": [
    "Item 1 with description",
    "Item 2 with description",
    "Item 3 with description"
    // Include ${data.item_options?.number_of_items || 3} items
  ]`;
  }
  
  if (data.include_dialogue) {
    prompt += `,
  "dialogue_lines": [
    "Line 1",
    "Line 2",
    "Line 3"
    // Include ${data.dialogue_options?.number_of_lines || 3} dialogue lines
  ]`;
  }
  
  if (data.include_quests) {
    prompt += `,
  "quests": [
    {
      "title": "Quest Title",
      "description": "Quest Description",
      "reward": "Quest Reward",
      "type": "Quest Type"
    }
    // Include ${data.quest_options?.number_of_quests || 1} quests
  ]`;
  }
  
  // Close the JSON structure
  prompt += `
}`;
  
  // Add genre info if available
  if (data.genre) {
    if (data.sub_genre) {
      prompt += `\n\nThe character should fit within the ${data.genre} genre, specifically the ${data.sub_genre} sub-genre.`;
    } else {
      prompt += `\n\nThe character should fit within the ${data.genre} genre.`;
    }
  }
  
  // Add main character options if specified
  const traits: string[] = [];
  
  if (data.gender) traits.push(`gender: ${data.gender}`);
  if (data.age_group) traits.push(`age group: ${data.age_group}`);
  if (data.moral_alignment) traits.push(`moral alignment: ${data.moral_alignment}`);
  if (data.relationship_to_player) traits.push(`relationship to player: ${data.relationship_to_player}`);
  
  if (traits.length > 0) {
    prompt += `\n\nInclude these specific traits: ${traits.join(', ')}.`;
  }
  
  // Add advanced options if specified
  const advancedTraits: string[] = [];
  
  if (data.advanced_options?.species) advancedTraits.push(`species: ${data.advanced_options.species}`);
  if (data.advanced_options?.occupation) advancedTraits.push(`occupation: ${data.advanced_options.occupation}`);
  if (data.advanced_options?.social_class) advancedTraits.push(`social class: ${data.advanced_options.social_class}`);
  if (data.advanced_options?.height) advancedTraits.push(`height: ${data.advanced_options.height}`);
  if (data.advanced_options?.build) advancedTraits.push(`build: ${data.advanced_options.build}`);
  if (data.advanced_options?.distinctive_features) advancedTraits.push(`distinctive features: ${data.advanced_options.distinctive_features}`);
  if (data.advanced_options?.homeland) advancedTraits.push(`homeland: ${data.advanced_options.homeland}`);
  
  // Handle personality traits array
  if (data.advanced_options?.personality_traits && data.advanced_options.personality_traits.length > 0) {
    advancedTraits.push(`personality traits: ${data.advanced_options.personality_traits.join(', ')}`);
  }
  
  if (advancedTraits.length > 0) {
    prompt += `\n\nAlso include these advanced traits: ${advancedTraits.join(', ')}.`;
  }
  
  // Add quest options if specified
  if (data.include_quests && data.quest_options) {
    const questOptions: string[] = [];
    
    if (data.quest_options.quest_type && data.quest_options.quest_type !== 'any') {
      questOptions.push(`type: ${data.quest_options.quest_type}`);
    }
    
    if (data.quest_options.reward_type && data.quest_options.reward_type !== 'any') {
      questOptions.push(`reward type: ${data.quest_options.reward_type}`);
    }
    
    if (questOptions.length > 0) {
      prompt += `\n\nFor quests, include these specifics: ${questOptions.join(', ')}.`;
    }
  }
  
  // Add dialogue options if specified
  if (data.include_dialogue && data.dialogue_options) {
    const dialogueOptions: string[] = [];
    
    if (data.dialogue_options.tone && data.dialogue_options.tone !== 'any') {
      dialogueOptions.push(`tone: ${data.dialogue_options.tone}`);
    }
    
    if (data.dialogue_options.context && data.dialogue_options.context !== 'any') {
      dialogueOptions.push(`context: ${data.dialogue_options.context}`);
    }
    
    if (dialogueOptions.length > 0) {
      prompt += `\n\nFor dialogue, include these specifics: ${dialogueOptions.join(', ')}.`;
    }
  }
  
  // Add item options if specified
  if (data.include_items && data.item_options) {
    const itemOptions: string[] = [];
    
    if (data.item_options.rarity_distribution && data.item_options.rarity_distribution !== 'balanced') {
      itemOptions.push(`rarity distribution: ${data.item_options.rarity_distribution}`);
    }
    
    if (data.item_options.item_categories && data.item_options.item_categories.length > 0) {
      itemOptions.push(`categories: ${data.item_options.item_categories.join(', ')}`);
    }
    
    if (itemOptions.length > 0) {
      prompt += `\n\nFor items, include these specifics: ${itemOptions.join(', ')}.`;
    }
  }
  
  // Add final guidance
  prompt += `\n\nBe creative, detailed, and ensure the character feels cohesive and interesting. The character should feel realistic and well-rounded, with a distinct personality and appearance that matches their background and traits.`;
  
  // Add reminder to only return JSON with enhanced instructions
  prompt += `\n\nCRITICAL: Your response must be ONLY the JSON object. No explanatory text before or after. No markdown formatting. Just pure, valid JSON that can be parsed directly. Use simple ASCII characters only - no em dashes, smart quotes, or Unicode characters.`;
  
  return prompt;
}