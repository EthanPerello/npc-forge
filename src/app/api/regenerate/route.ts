// src/app/api/regenerate/route.ts
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
    
    // Handle different field types
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
    
    // Handle basic field regeneration (name, appearance, personality, backstory_hook)
    console.log(`Regenerating basic field: ${field}`);
    const result = await generateBasicField(field, character, selectedModel);
    
    return NextResponse.json({
      success: true,
      field,
      regeneratedContent: result
    });
    
  } catch (error) {
    console.error('Error in regeneration API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to regenerate content';
    return NextResponse.json({ 
      error: errorMessage
    }, { status: 500 });
  }
}

/**
 * Clean generated content to ensure consistent formatting
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
  
  // Apply reasonable length limits
  if (type === 'quest_title' && cleaned.length > 100) {
    cleaned = cleaned.substring(0, 100);
  } else if (type === 'item' && cleaned.length > 300) {
    cleaned = cleaned.substring(0, 300);
  } else if (type === 'quest_description' && cleaned.length > 500) {
    cleaned = cleaned.substring(0, 500);
  } else if (type === 'quest_reward' && cleaned.length > 200) {
    cleaned = cleaned.substring(0, 200);
  }
  
  // Trim whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
}

/**
 * Make a robust API call to OpenAI
 */
async function makeOpenAICall(model: OpenAIModel, systemPrompt: string, userPrompt: string): Promise<string> {
  try {
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
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500, // Reasonable limit to prevent excessively long responses
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`OpenAI API error: ${response.status}`, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI API');
    }
    
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
  }
}

/**
 * Generate basic character fields (name, appearance, personality, backstory_hook)
 */
async function generateBasicField(field: string, character: Character, model: OpenAIModel): Promise<string> {
  const characterInfo = `
Character: ${character.name}
Genre: ${character.selected_traits.genre || "unspecified"}
${character.selected_traits.sub_genre ? `Sub-genre: ${character.selected_traits.sub_genre}` : ""}
${character.selected_traits.occupation ? `Occupation: ${character.selected_traits.occupation}` : ""}
${character.selected_traits.species ? `Species: ${character.selected_traits.species}` : ""}
${character.selected_traits.gender ? `Gender: ${character.selected_traits.gender}` : ""}
${character.selected_traits.age_group ? `Age: ${character.selected_traits.age_group}` : ""}
`.trim();

  const fieldPrompts: {[key: string]: {system: string, user: string}} = {
    name: {
      system: "You are an expert character creator. Generate only a character name that fits the provided character details.",
      user: `${characterInfo}\n\nGenerate a new name for this character. Respond with ONLY the name, no formatting or prefixes.`
    },
    appearance: {
      system: "You are an expert character creator. Generate only a detailed appearance description.",
      user: `${characterInfo}\n\nGenerate a new appearance description (2-3 sentences) for this character. Respond with ONLY the description, no formatting or prefixes.`
    },
    personality: {
      system: "You are an expert character creator. Generate only a detailed personality description.",
      user: `${characterInfo}\n\nGenerate a new personality description (2-3 sentences) for this character. Respond with ONLY the description, no formatting or prefixes.`
    },
    backstory_hook: {
      system: "You are an expert character creator. Generate only a brief backstory hook.",
      user: `${characterInfo}\n\nGenerate a new backstory hook (1-2 sentences) for this character. Respond with ONLY the hook, no formatting or prefixes.`
    }
  };

  const prompts = fieldPrompts[field];
  if (!prompts) {
    throw new Error(`Unknown field: ${field}`);
  }

  const result = await makeOpenAICall(model, prompts.system, prompts.user);
  return cleanGeneratedContent(result, field);
}

/**
 * Generate dialogue line or item
 */
async function regenerateSingleLine(
  type: 'dialogue' | 'item',
  character: Character, 
  index: number,
  model: OpenAIModel
): Promise<string> {
  const characterInfo = `
Character: ${character.name}
Genre: ${character.selected_traits.genre || "unspecified"}
${character.selected_traits.sub_genre ? `Sub-genre: ${character.selected_traits.sub_genre}` : ""}
${character.selected_traits.occupation ? `Occupation: ${character.selected_traits.occupation}` : ""}
${character.personality ? `Personality: ${character.personality.substring(0, 100)}...` : ""}
`.trim();

  let systemPrompt = "";
  let userPrompt = "";
  
  if (type === 'dialogue') {
    systemPrompt = "You are an expert character creator. Generate only a single dialogue line that fits the character.";
    userPrompt = `${characterInfo}\n\nGenerate a new dialogue line for this character. Make it sound natural and reflect their personality. Respond with ONLY the dialogue text, no quotes or prefixes.`;
  } else {
    systemPrompt = "You are an expert character creator. Generate only a single item description that fits the character.";
    userPrompt = `${characterInfo}\n\nGenerate a new item for this character's inventory. Make it appropriate for their role and setting. Respond with ONLY the item description, no prefixes.`;
  }
  
  const result = await makeOpenAICall(model, systemPrompt, userPrompt);
  return cleanGeneratedContent(result, type);
}

/**
 * Generate quest content
 */
async function regenerateQuest(
  character: Character, 
  questIndex: number, 
  part: string, 
  model: OpenAIModel
): Promise<any> {
  const quest = character.quests?.[questIndex];
  if (!quest) throw new Error('Quest not found');
  
  const characterInfo = `
Character: ${character.name}
Genre: ${character.selected_traits.genre || "unspecified"}
${character.selected_traits.sub_genre ? `Sub-genre: ${character.selected_traits.sub_genre}` : ""}
${character.selected_traits.occupation ? `Occupation: ${character.selected_traits.occupation}` : ""}
`.trim();

  if (part === 'whole') {
    // Regenerate entire quest
    const systemPrompt = "You are an expert quest designer. Generate a complete quest in JSON format.";
    const userPrompt = `${characterInfo}\n\nGenerate a complete quest for this character. Respond with valid JSON in this exact format:
{
  "title": "Quest Title (3-6 words)",
  "description": "Quest description (30-60 words)",
  "reward": "Quest reward (10-20 words)",
  "type": "${quest.type || 'any'}"
}`;
    
    const result = await makeOpenAICall(model, systemPrompt, userPrompt);
    
    try {
      // Extract JSON from response
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedQuest = JSON.parse(jsonMatch[0]);
        
        return {
          title: cleanGeneratedContent(parsedQuest.title, 'quest_title'),
          description: cleanGeneratedContent(parsedQuest.description, 'quest_description'),
          reward: cleanGeneratedContent(parsedQuest.reward, 'quest_reward'),
          type: parsedQuest.type || quest.type || 'any'
        };
      }
      throw new Error("No valid JSON found in response");
    } catch (e) {
      console.error("Failed to parse quest JSON:", e);
      // Fallback
      return {
        title: "New Quest",
        description: cleanGeneratedContent(result, 'quest_description'),
        reward: "Quest reward",
        type: quest.type || 'any'
      };
    }
  } else {
    // Regenerate specific part
    const prompts: {[key: string]: {system: string, user: string}} = {
      title: {
        system: "You are an expert quest designer. Generate only a quest title.",
        user: `${characterInfo}\n\nCurrent quest: "${quest.description}"\n\nGenerate a new title for this quest (3-6 words). Respond with ONLY the title, no formatting.`
      },
      description: {
        system: "You are an expert quest designer. Generate only a quest description.",
        user: `${characterInfo}\n\nQuest title: "${quest.title}"\nQuest reward: "${quest.reward}"\n\nGenerate a new description for this quest (30-60 words). Respond with ONLY the description, no formatting.`
      },
      reward: {
        system: "You are an expert quest designer. Generate only a quest reward.",
        user: `${characterInfo}\n\nQuest: "${quest.title}" - ${quest.description}\n\nGenerate a new reward for this quest (10-20 words). Respond with ONLY the reward, no formatting.`
      }
    };

    const prompt = prompts[part];
    if (!prompt) {
      throw new Error(`Unknown quest part: ${part}`);
    }

    const result = await makeOpenAICall(model, prompt.system, prompt.user);
    return cleanGeneratedContent(result, `quest_${part}`);
  }
}