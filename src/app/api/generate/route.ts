import { NextRequest, NextResponse } from 'next/server';
import { generateCharacter, generatePortrait } from '@/lib/openai';
import { Character, CharacterFormData, GenerationResponse } from '@/lib/types';
import { removeEmptyValues, sanitizeUserInput } from '@/lib/utils';

export const maxDuration = 60; // Set max duration to 60 seconds

export async function POST(request: NextRequest): Promise<NextResponse<GenerationResponse>> {
  try {
    // Get form data from request
    const data: CharacterFormData = await request.json();
    
    // Validate required fields
    if (!data.description || data.description.trim() === '') {
      return NextResponse.json(
        { error: 'Character description is required', character: null as any },
        { status: 400 }
      );
    }
    
    // Sanitize the character description
    data.description = sanitizeUserInput(data.description);
    
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
    
    console.log('Generating character with options:', JSON.stringify(cleanedData, null, 2));
    
    // Build system prompt
    const systemPrompt = buildSystemPrompt(cleanedData);
    
    // Generate character
    const character = await generateCharacter(systemPrompt, data.description);
    
    // Generate portrait if successful
    if (character) {
      try {
        // Transfer portrait options from form data to character object
        if (data.portrait_options) {
          character.portrait_options = data.portrait_options;
        }
        
        const imageUrl = await generatePortrait(character);
        character.image_url = imageUrl;
      } catch (portraitError) {
        console.error('Failed to generate portrait:', portraitError);
        // Continue without portrait if it fails
      }
    }
    
    return NextResponse.json({ character });
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
  "backstory_hook": "A 1-2 sentence hook about the character's past or motivation",
  "special_ability": "A unique ability or power the character possesses"`;
  
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