import { Character, CharacterFormData } from './types';

/**
 * Create a system prompt for the OpenAI API based on the character form data
 */
export function generateSystemPrompt(formData: CharacterFormData): string {
  const includeQuests = formData.include_quests;
  const includeDialogue = formData.include_dialogue;
  const includeItems = formData.include_items;
  
  // Base prompt for all character generation
  let prompt = `You are an expert character creator for RPGs, games, and storytelling.
I want you to create a detailed NPC (Non-Player Character) based on my description.

The output should be a valid JSON object with the following structure:
{
  "name": "Character's Name",
  "appearance": "Detailed physical description",
  "personality": "Detailed personality traits and behaviors",
  "backstory_hook": "A brief hook about their history or motivation",
  "selected_traits": {
    // The traits I've explicitly selected will be here
    // These will be populated based on my input
  },
  "added_traits": {
    // You should add 2-4 additional traits that make sense for this character
    // These should be in the format "trait_name": "trait description"
  }`;
  
  // Add optional sections based on what's being included
  if (includeItems) {
    prompt += `,
  "items": [
    // Include 3-5 items the character might carry or offer
    // Each item should be a string with a detailed description
  ]`;
  }
  
  if (includeDialogue) {
    prompt += `,
  "dialogue_lines": [
    // Include 3-5 unique lines of dialogue this character might say
    // Each line should be a string and reflect their personality
  ]`;
  }
  
  if (includeQuests) {
    prompt += `,
  "quests": [
    // Include 1-3 quests this character might offer
    {
      "title": "Quest Title",
      "description": "Detailed quest description",
      "reward": "What the player gets for completing it",
      "type": "The quest type (e.g., fetch, combat, puzzle)"
    }
  ]`;
  }
  
  // Close the JSON structure
  prompt += `
}

Make the character detailed, engaging, and consistent with the genre/setting.
Ensure all JSON is valid - no trailing commas, properly closed brackets.
Don't include any explanation text outside the JSON.`;

  return prompt;
}

/**
 * Transform form data into a description for the character generation API
 */
export function createCharacterDescription(formData: CharacterFormData): string {
  // Start with the main description
  let description = formData.description || "";
  
  // Add genre information if available
  if (formData.genre) {
    description += `\n\nGenre: ${formData.genre}`;
    
    if (formData.sub_genre) {
      description += `, Sub-genre: ${formData.sub_genre}`;
    }
  }
  
  // Add basic traits if they exist
  const traits: string[] = [];
  
  if (formData.gender) traits.push(`Gender: ${formData.gender}`);
  if (formData.age_group) traits.push(`Age: ${formData.age_group}`);
  if (formData.moral_alignment) traits.push(`Alignment: ${formData.moral_alignment}`);
  if (formData.relationship_to_player) traits.push(`Relationship to player: ${formData.relationship_to_player}`);
  
  if (traits.length > 0) {
    description += `\n\nSelected traits:\n${traits.join('\n')}`;
  }
  
  // Add advanced options if any exist
  if (formData.advanced_options) {
    const advancedTraits: string[] = [];
    
    if (formData.advanced_options.species) {
      advancedTraits.push(`Species: ${formData.advanced_options.species}`);
    }
    
    if (formData.advanced_options.occupation) {
      advancedTraits.push(`Occupation: ${formData.advanced_options.occupation}`);
    }
    
    if (formData.advanced_options.social_class) {
      advancedTraits.push(`Social class: ${formData.advanced_options.social_class}`);
    }
    
    if (formData.advanced_options.height) {
      advancedTraits.push(`Height: ${formData.advanced_options.height}`);
    }
    
    if (formData.advanced_options.build) {
      advancedTraits.push(`Build: ${formData.advanced_options.build}`);
    }
    
    if (formData.advanced_options.distinctive_features) {
      advancedTraits.push(`Distinctive features: ${formData.advanced_options.distinctive_features}`);
    }
    
    if (formData.advanced_options.homeland) {
      advancedTraits.push(`Homeland/Origin: ${formData.advanced_options.homeland}`);
    }
    
    if (formData.advanced_options.personality_traits && formData.advanced_options.personality_traits.length > 0) {
      advancedTraits.push(`Personality traits: ${formData.advanced_options.personality_traits.join(', ')}`);
    }
    
    if (advancedTraits.length > 0) {
      description += `\n\nAdditional details:\n${advancedTraits.join('\n')}`;
    }
  }
  
  // Add quest options if quests are included
  if (formData.include_quests && formData.quest_options) {
    const questTraits: string[] = [];
    
    if (formData.quest_options.number_of_quests) {
      questTraits.push(`Number of quests: ${formData.quest_options.number_of_quests}`);
    }
    
    if (formData.quest_options.quest_type) {
      questTraits.push(`Quest type: ${formData.quest_options.quest_type}`);
    }
    
    if (formData.quest_options.reward_type) {
      questTraits.push(`Reward type: ${formData.quest_options.reward_type}`);
    }
    
    if (questTraits.length > 0) {
      description += `\n\nQuest preferences:\n${questTraits.join('\n')}`;
    }
  }
  
  // Add dialogue options if dialogue is included
  if (formData.include_dialogue && formData.dialogue_options) {
    const dialogueTraits: string[] = [];
    
    if (formData.dialogue_options.number_of_lines) {
      dialogueTraits.push(`Number of dialogue lines: ${formData.dialogue_options.number_of_lines}`);
    }
    
    if (formData.dialogue_options.tone) {
      dialogueTraits.push(`Dialogue tone: ${formData.dialogue_options.tone}`);
    }
    
    if (formData.dialogue_options.context) {
      dialogueTraits.push(`Dialogue context: ${formData.dialogue_options.context}`);
    }
    
    if (dialogueTraits.length > 0) {
      description += `\n\nDialogue preferences:\n${dialogueTraits.join('\n')}`;
    }
  }
  
  // Add item options if items are included
  if (formData.include_items && formData.item_options) {
    const itemTraits: string[] = [];
    
    if (formData.item_options.number_of_items) {
      itemTraits.push(`Number of items: ${formData.item_options.number_of_items}`);
    }
    
    if (formData.item_options.rarity_distribution) {
      itemTraits.push(`Item rarity: ${formData.item_options.rarity_distribution}`);
    }
    
    if (formData.item_options.item_categories && formData.item_options.item_categories.length > 0) {
      itemTraits.push(`Item categories: ${formData.item_options.item_categories.join(', ')}`);
    }
    
    if (itemTraits.length > 0) {
      description += `\n\nItem preferences:\n${itemTraits.join('\n')}`;
    }
  }
  
  return description;
}