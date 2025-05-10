import { NextRequest, NextResponse } from 'next/server';
import { generatePortrait } from '@/lib/openai';
import { Character, OpenAIModel } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { character, field, model, portraitOptions } = data;

    // Validate required parameters with improved logging
    if (!character) {
      console.error("Missing character data in regeneration request");
      return NextResponse.json({ error: 'Character data is required' }, { status: 400 });
    }

    if (!field && !portraitOptions) {
      console.error("Missing field or portraitOptions in regeneration request");
      return NextResponse.json({ error: 'Field or portraitOptions is required' }, { status: 400 });
    }

    console.log(`Regeneration request for: Field=${field}, Character=${character.name}`);
    
    // Handle portrait regeneration
    if (field === 'portrait') {
      if (!portraitOptions) {
        return NextResponse.json({ error: 'Portrait options are required for portrait regeneration' }, { status: 400 });
      }

      console.log("Regenerating portrait with options:", portraitOptions);

      // Update the character's portrait_options
      character.portrait_options = {
        ...character.portrait_options,
        ...portraitOptions
      };

      // Generate the new portrait
      try {
        const imageData = await generatePortrait(character);
        
        console.log("Portrait generation successful");
        return NextResponse.json({ 
          success: true, 
          field: 'portrait',
          imageData
        });
      } catch (error) {
        console.error("Portrait generation failed:", error);
        return NextResponse.json({ 
          error: error instanceof Error ? error.message : 'Failed to generate portrait' 
        }, { status: 500 });
      }
    }
    
    // Handle text field regeneration
    if (!field || field === 'portrait') {
      return NextResponse.json({ error: 'Invalid field for regeneration' }, { status: 400 });
    }

    console.log(`Regenerating field: ${field} using model: ${model}`);

    // Use the specified model or fall back to a default
    const selectedModel = model as OpenAIModel || 'gpt-4o-mini';
    
    // For quest regeneration
    if (field.startsWith('quest_') && field.includes('_')) {
      const parts = field.split('_');
      const questIndex = parseInt(parts[1], 10);
      const questPart = parts[2] || 'whole';
      
      if (isNaN(questIndex) || questIndex < 0 || !character.quests || questIndex >= character.quests.length) {
        console.error(`Invalid quest index: ${questIndex}`);
        return NextResponse.json({ error: 'Invalid quest index' }, { status: 400 });
      }
      
      console.log(`Regenerating quest ${questIndex}, part: ${questPart}`);
      const regeneratedQuest = await regenerateQuest(character, questIndex, questPart, selectedModel);
      
      return NextResponse.json({
        success: true,
        field,
        regeneratedContent: regeneratedQuest
      });
    }
    
    // For dialogue or item regeneration
    if (field.startsWith('dialogue_') || field.startsWith('item_')) {
      const parts = field.split('_');
      const index = parseInt(parts[1], 10);
      const type = field.startsWith('dialogue_') ? 'dialogue' : 'item';
      
      let array: string[] | undefined;
      if (type === 'dialogue') {
        array = character.dialogue_lines;
      } else {
        array = character.items;
      }
      
      if (isNaN(index) || index < 0 || !array || index >= array.length) {
        console.error(`Invalid ${type} index: ${index}`);
        return NextResponse.json({ error: `Invalid ${type} index` }, { status: 400 });
      }
      
      console.log(`Regenerating ${type} at index: ${index}`);
      const regeneratedLine = await regenerateSingleLine(type, character, index, selectedModel);
      
      return NextResponse.json({
        success: true,
        field,
        regeneratedContent: regeneratedLine
      });
    }
    
    // For basic field regeneration (name, appearance, personality, backstory_hook)
    console.log(`Regenerating basic field: ${field}`);
    const systemPrompt = createRegenerationPrompt(field, character);
    const description = createRegenerationDescription(field, character);
    const result = await generateFieldContent(field, systemPrompt, description, selectedModel);
    
    return NextResponse.json({
      success: true,
      field,
      regeneratedContent: result
    });
    
  } catch (error) {
    console.error('Error in regeneration API:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to regenerate content' 
    }, { status: 500 });
  }
}

/**
 * Clean generated content to ensure consistent formatting
 * @param content - The raw generated content
 * @param type - The type of content being cleaned (item, quest_title, etc.)
 * @returns Cleaned content without markdown or prefixes
 */
function cleanGeneratedContent(content: string, type: string = ''): string {
    if (!content) return '';
    
    // Remove markdown formatting (asterisks for bold/italic)
    let cleaned = content.replace(/\*\*|__|\*|_/g, '');
    
    // Remove common prefixes based on content type
    const prefixPatterns: {[key: string]: RegExp} = {
      item: /^(item:|item name:|description:|item description:)/i,
      quest_title: /^(quest:|quest title:|title:)/i,
      quest_description: /^(quest description:|description:)/i,
      quest_reward: /^(quest reward:|reward:)/i,
      dialogue: /^(dialogue:|dialogue line:|character says:|says:)/i,
      name: /^(name:|character name:)/i
    };
    
    // Apply specific prefix removal if type is specified
    if (type && prefixPatterns[type]) {
      cleaned = cleaned.replace(prefixPatterns[type], '');
    } else {
      // Otherwise try to remove any common prefixes
      cleaned = cleaned.replace(/^(item:|item name:|description:|quest title:|title:|quest description:|quest reward:|reward:|dialogue:|character says:|says:|name:)/i, '');
    }
    
    // Remove any remaining markdown-style formatting
    cleaned = cleaned.replace(/\[|\]|\(|\)|#/g, '');
    
    // Only apply length limits to extremely long content
    // Using much higher limits to avoid cutting off normal content
    if (type === 'quest_title' && cleaned.length > 150) {
      cleaned = cleaned.substring(0, 150);
    } else if (type === 'item' && cleaned.length > 500) {
      cleaned = cleaned.substring(0, 500);
    } else if (type === 'quest_description' && cleaned.length > 800) {
      cleaned = cleaned.substring(0, 800);
    } else if (type === 'quest_reward' && cleaned.length > 400) {
      cleaned = cleaned.substring(0, 400);
    }
    
    // Trim whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
  }

// Create a description of the character for context in regeneration
function createRegenerationDescription(field: string, character: Character): string {
  // Gather essential information about the character
  const genre = character.selected_traits.genre || "unspecified genre";
  const subGenre = character.selected_traits.sub_genre || "";
  const gender = character.selected_traits.gender || "";
  const age = character.selected_traits.age_group || "";
  const alignment = character.selected_traits.moral_alignment || "";
  const relationship = character.selected_traits.relationship_to_player || "";
  const species = character.selected_traits.species || "human";
  const occupation = character.selected_traits.occupation || "";
  
  // Start with basic info that should be included for all regenerations
  let description = `Character name: ${character.name}
Genre: ${genre}${subGenre ? ", " + subGenre : ""}
`;

  // Add traits based on what's available
  if (gender) description += `Gender: ${gender}\n`;
  if (age) description += `Age: ${age}\n`;
  if (alignment) description += `Alignment: ${alignment}\n`;
  if (relationship) description += `Relationship to player: ${relationship}\n`;
  if (species && species !== "human") description += `Species: ${species}\n`;
  if (occupation) description += `Occupation: ${occupation}\n`;
  
  // Add other relevant sections not being regenerated for context
  if (field !== 'appearance' && character.appearance) {
    description += `\nAppearance: ${character.appearance}\n`;
  }
  
  if (field !== 'personality' && character.personality) {
    description += `\nPersonality: ${character.personality}\n`;
  }
  
  if (field !== 'backstory_hook' && character.backstory_hook) {
    description += `\nBackstory hook: ${character.backstory_hook}\n`;
  }
  
  // Add instructions for what we're regenerating
  description += `\nPlease generate a new ${field} for this character that fits with the details above.`;
  
  return description;
}

// Create a specific prompt for regeneration of a single field
function createRegenerationPrompt(field: string, character: Character): string {
  const basePrompt = `You are an expert NPC character designer. You will regenerate only the specific requested field for an existing NPC character. 
Maintain the existing character's style, theme, and consistency. Only generate content for the exact requested field.`;
  
  const fieldPrompts: {[key: string]: string} = {
    name: `${basePrompt}
Your task is to generate a new NAME for this character. The name should fit the character's existing traits, background, and genre.
IMPORTANT:
- Keep the name concise and fitting for the genre/world
- Do NOT use any markdown formatting or prefixes
- Respond with ONLY the new name as a single string.`,
    
    appearance: `${basePrompt}
Your task is to generate a new detailed APPEARANCE description for this character.
IMPORTANT:
- The appearance should fit the character's existing traits while being vivid and evocative
- Keep it between 50-100 words
- Do NOT use any markdown formatting or prefixes
- Respond with ONLY the appearance description as a paragraph.`,
    
    personality: `${basePrompt}
Your task is to generate a new detailed PERSONALITY description for this character.
IMPORTANT:
- The personality should be consistent with the character's genre, role, and existing traits
- Keep it between 50-100 words
- Do NOT use any markdown formatting or prefixes
- Respond with ONLY the personality description as a paragraph.`,
    
    backstory_hook: `${basePrompt}
Your task is to generate a new BACKSTORY HOOK for this character - a brief, intriguing element of their past or motivation.
IMPORTANT:
- The backstory hook should fit the character's existing traits and offer roleplaying potential
- Keep it to 1-2 sentences (20-40 words)
- Do NOT use any markdown formatting or prefixes
- Respond with ONLY the backstory hook.`
  };
  
  return fieldPrompts[field] || basePrompt;
}

// Generate new content for a specific field
async function generateFieldContent(
  field: string, 
  systemPrompt: string, 
  description: string, 
  model: OpenAIModel
): Promise<string> {
  try {
    console.log(`Generating ${field} content with model: ${model}`);
    // For simple fields, we make a direct call to the API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: description }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    // Clean content based on field type
    const cleanedContent = cleanGeneratedContent(content, field);
    
    console.log(`Successfully generated ${field} content (${cleanedContent.length} chars)`);
    return cleanedContent;
  } catch (error) {
    console.error(`Error generating ${field}:`, error);
    throw error;
  }
}

// For single dialogue line or item regeneration
async function regenerateSingleLine(
  type: 'dialogue' | 'item',
  character: Character, 
  index: number,
  model: OpenAIModel
): Promise<string> {
  try {
    const characterInfo = `
Character: ${character.name}
Genre: ${character.selected_traits.genre || "unspecified"}
${character.selected_traits.sub_genre ? `Sub-genre: ${character.selected_traits.sub_genre}` : ""}
Occupation: ${character.selected_traits.occupation || "unspecified"}
Personality: ${character.personality?.substring(0, 100) || "unspecified"}...
`;

    let prompt = "";
    
    if (type === 'dialogue') {
      prompt = `Generate a new dialogue line for this NPC:
${characterInfo}

IMPORTANT:
- The dialogue should sound natural for this character and reflect their personality and role
- Keep it brief (10-20 words recommended)
- Do NOT use quotation marks, markdown formatting, or any dialogue tags
- Do NOT add prefixes like "Character says:" or similar
- Respond with ONLY the plain text dialogue line

Example of good format: "I've been tracking these ruins for decades. The secrets they hold could change everything."
`;
    } else {
      prompt = `Generate a new item for this NPC's inventory:
${characterInfo}

IMPORTANT:
- The item should be appropriate for this character, their occupation, and setting
- Keep the description brief and concise (20-40 words maximum)
- Do NOT use markdown formatting (no asterisks, no bullet points)
- Do NOT include "Item:" or "Description:" prefixes
- Respond with ONLY the plain text item description

Example of good format: "A weathered leather-bound journal filled with encrypted notes, its corners reinforced with tarnished brass."
`;
    }
    
    console.log(`Generating ${type} content`);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: `You are an expert NPC designer. Create engaging ${type === 'dialogue' ? 'dialogue' : 'items'} that fit the character.` },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content.trim();
    
    // Clean the generated content
    content = cleanGeneratedContent(content, type);
    
    return content;
  } catch (error) {
    console.error(`Error regenerating ${type}:`, error);
    throw error;
  }
}

// Special handling for quest regeneration
async function regenerateQuest(
  character: Character, 
  questIndex: number, 
  part: string, 
  model: OpenAIModel
): Promise<any> {
  try {
    const quest = character.quests?.[questIndex];
    if (!quest) throw new Error('Quest not found');
    
    const characterInfo = `
Character: ${character.name}
Genre: ${character.selected_traits.genre || "unspecified"}
${character.selected_traits.sub_genre ? `Sub-genre: ${character.selected_traits.sub_genre}` : ""}
Occupation: ${character.selected_traits.occupation || "unspecified"}
`;

    let prompt = "";
    
    if (part === 'whole') {
      // Regenerate entire quest
      prompt = `Generate a complete quest for this NPC:
${characterInfo}

IMPORTANT:
- The quest should be concise and clearly written
- Title should be 3-6 words
- Description should be 30-60 words
- Reward should be 10-20 words
- Do NOT use markdown formatting
- Do NOT include prefixes like "Quest Title:" etc.

Respond with JSON in this exact format:
{
  "title": "Quest Title",
  "description": "Detailed quest description",
  "reward": "What the player gets for completing the quest",
  "type": "${quest.type || 'any'}"
}`;
    } else if (part === 'title') {
      // Regenerate just the title
      prompt = `Generate a new title for this NPC's quest:
${characterInfo}

Current quest description: ${quest.description}
Current quest reward: ${quest.reward}
Quest type: ${quest.type || 'any'}

IMPORTANT:
- Title should be brief (3-6 words)
- Do NOT use markdown formatting
- Do NOT include any prefixes like "Quest Title:"
- Respond with ONLY the plain text title

Example of good format: "The Forgotten Artifact"`;
    } else if (part === 'description') {
      // Regenerate just the description
      prompt = `Generate a new description for this NPC's quest:
${characterInfo}

Quest title: ${quest.title}
Current quest reward: ${quest.reward}
Quest type: ${quest.type || 'any'}

IMPORTANT:
- Keep the description concise (30-60 words maximum)
- Do NOT use markdown formatting
- Do NOT include any prefixes like "Quest Description:"
- Respond with ONLY the plain text description

Example of good format: "A valuable artifact has been stolen from the local museum. The thief is believed to be hiding in the abandoned district. Investigate the area and recover the artifact before it falls into the wrong hands."`;
    } else if (part === 'reward') {
      // Regenerate just the reward
      prompt = `Generate a new reward for this NPC's quest:
${characterInfo}

Quest title: ${quest.title}
Quest description: ${quest.description}
Quest type: ${quest.type || 'any'}

IMPORTANT:
- Keep the reward brief and specific (10-20 words)
- Do NOT use markdown formatting
- Do NOT include any prefixes like "Quest Reward:" 
- Respond with ONLY the plain text reward

Example of good format: "A rare enchanted dagger that glows in the presence of hidden treasure."`;
    }
    
    console.log(`Generating quest content for part: ${part}`);
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: "You are an expert NPC and quest designer. Create engaging content that fits the character and genre." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`);
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || ''}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    // Return appropriate format based on the part being regenerated
    if (part === 'whole') {
      try {
        // Extract JSON if it's a whole quest
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedQuest = JSON.parse(jsonMatch[0]);
          
          // Clean each field
          return {
            title: cleanGeneratedContent(parsedQuest.title, 'quest_title'),
            description: cleanGeneratedContent(parsedQuest.description, 'quest_description'),
            reward: cleanGeneratedContent(parsedQuest.reward, 'quest_reward'),
            type: parsedQuest.type || quest.type || 'any'
          };
        }
        throw new Error("No valid JSON found in the response");
      } catch (e) {
        console.error("Failed to parse quest JSON:", e);
        // Fallback with structured data
        return {
          title: "New Quest",
          description: cleanGeneratedContent(content, 'quest_description'),
          reward: "Quest reward",
          type: quest.type || 'any'
        };
      }
    } else if (part === 'title') {
      return cleanGeneratedContent(content, 'quest_title');
    } else if (part === 'description') {
      return cleanGeneratedContent(content, 'quest_description');
    } else { // reward
      return cleanGeneratedContent(content, 'quest_reward');
    }
  } catch (error) {
    console.error(`Error regenerating quest:`, error);
    throw error;
  }
}