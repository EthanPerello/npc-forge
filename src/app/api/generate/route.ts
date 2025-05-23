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

export async function POST(request: NextRequest): Promise<NextResponse<GenerationResponse>> {
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
        { error: 'Invalid request data', character: null as any },
        { status: 400 }
      );
    }
    
    // Validate required fields
    if (!data.description || data.description.trim() === '') {
      console.error('Validation failed: Missing description');
      console.log('Full data object:', data);
      return NextResponse.json(
        { error: 'Character description is required. Please describe your character.', character: null as any },
        { status: 400 }
      );
    }
    
    // Use the selected model as provided (don't force to cheapest)
    const model: OpenAIModel = data.model || DEFAULT_MODEL;
    
    console.log(`Using text model: ${model} for generation`);
    console.log(`Portrait generation: ${data.include_portrait ? 'ENABLED' : 'DISABLED'}`);
    
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
    
    // Build system prompt
    const systemPrompt = buildSystemPrompt(cleanedData);
    
    try {
      console.log('=== Starting Character Generation ===');
      
      // Generate character with the selected model
      const character = await generateCharacter(systemPrompt, data.description, model);
      
      console.log(`Generated character: ${character.name}`);
      
      // Check if this is a fallback example character
      const isFallback = !!character.added_traits?.fallback_note;
      
      if (isFallback) {
        console.log('Using fallback example character');
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
          } else {
            console.log('Portrait generation returned empty result');
          }
        } catch (portraitError) {
          console.error('Failed to generate portrait:', portraitError);
          // Continue without portrait if it fails
        }
      } else {
        if (!data.include_portrait) {
          console.log('Portrait generation skipped - not requested by user');
        } else {
          console.log('Portrait generation skipped - example character already has portrait');
        }
      }
      
      // Only increment usage counter for real API calls (not fallbacks)
      if (!isFallback) {
        console.log('Incrementing usage counters');
        incrementUsage(model);
        if (data.include_portrait && data.portrait_options?.image_model) {
          incrementUsage(data.portrait_options.image_model);
        }
      } else {
        console.log('Skipping usage increment for fallback character');
      }
      
      console.log('=== Character Generation Complete ===');
      
      return NextResponse.json({ character });
    } catch (error) {
      // Handle OpenAI errors specifically
      console.error('Error in generate route:', error);
      
      // Example fallback is handled in generateCharacter
      // This should rarely be reached, but just in case:
      return NextResponse.json(
        { 
          error: error instanceof Error ? error.message : 'An unknown error occurred',
          character: null as any
        },
        { status: 500 }
      );
    }
  } catch (error) {
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

// Build a system prompt based on the form data
function buildSystemPrompt(data: Partial<CharacterFormData>): string {
  // Base prompt
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
      "type": "Quest Type" // Optional
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
  
  // Add reminder to only return JSON
  prompt += `\n\nRemember: Your response must be ONLY the JSON object. Do not include any explanatory text before or after.`;
  
  return prompt;
}