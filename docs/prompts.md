# Prompt Engineering

This document provides insights into the prompt engineering techniques used in NPC Forge to generate characters, portraits, and related elements.

## Overview

NPC Forge uses carefully constructed prompts to communicate with OpenAI's models. The prompts are designed to:

1. Provide clear instructions about the desired output format
2. Include relevant context about the character being generated
3. Specify constraints and requirements for the generation
4. Encourage creativity within defined parameters

## Character Generation Prompts

### Base System Prompt Structure

The system prompt for character generation follows this basic structure:

```
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
  "special_ability": "A unique ability or power the character possesses"
  // Additional fields depending on user selections
}
```

### Dynamic Prompt Components

Additional fields are added based on user selections:

#### Items Component
```
"items": [
  "Item 1 with description",
  "Item 2 with description",
  "Item 3 with description"
  // Include N items based on user selection
]
```

#### Dialogue Component
```
"dialogue_lines": [
  "Line 1",
  "Line 2",
  "Line 3"
  // Include N dialogue lines based on user selection
]
```

#### Quests Component
```
"quests": [
  {
    "title": "Quest Title",
    "description": "Quest Description",
    "reward": "Quest Reward",
    "type": "Quest Type" // Optional
  }
  // Include N quests based on user selection
]
```

### Genre Guidance

The prompt includes genre-specific guidance:

```
The character should fit within the [genre] genre, specifically the [sub-genre] sub-genre.
```

### Trait Specifications

User-selected traits are included in the prompt:

```
Include these specific traits: gender: female, age group: adult, moral alignment: good, relationship to player: ally.
```

```
Also include these advanced traits: species: elf, occupation: ranger, social class: lower class, personality traits: curious, brave, suspicious.
```

### Feature-Specific Guidance

Additional guidance is provided for each optional feature:

```
For quests, include these specifics: type: exploration, reward type: item.
```

```
For dialogue, include these specifics: tone: mysterious, context: first_meeting.
```

```
For items, include these specifics: rarity distribution: balanced, categories: weapons, magical items.
```

### Creativity Encouragement

The prompt ends with guidance to ensure quality:

```
Be creative, detailed, and ensure the character feels cohesive and interesting. The character should feel realistic and well-rounded, with a distinct personality and appearance that matches their background and traits.
```

## Portrait Generation Prompts

Portrait generation uses a different prompt structure focused on visual elements:

```
Portrait of [name]: [appearance_description]
Important visual characteristics: [visual_traits_list].
[art_style] style, [mood] expression, [framing] shot, with a [background] background,
High quality, detailed character portrait, professional digital art.
```

### Visual Traits Extraction

The portrait generation process extracts visual traits from the character data:

```typescript
// Function to categorize if a trait is visual
function isVisualTrait(key: string): boolean {
  const visualTraits = [
    'gender', 'age_group', 'species', 'height', 'build', 
    'distinctive_features', 'appearance', 'skin', 'hair', 'eyes',
    'face', 'body', 'clothing', 'attire', 'outfit', 'scar',
    'tattoo', 'mark', 'accessory', 'jewelry', 'weapon'
  ];
  
  return visualTraits.some(trait => key.toLowerCase().includes(trait));
}
```

## Prompt Engineering Techniques

### 1. Format Enforcement

The prompts use specific language to enforce the desired output format:

```
IMPORTANT: You must only respond with valid JSON matching the structure below. 
Do not include any additional text, explanations, or commentary outside the JSON.
```

### 2. Field Definitions

Each field in the expected output is clearly defined:

```
"appearance": "Detailed physical description as a paragraph"
```

### 3. Character Coherence

The prompts encourage coherence between different aspects of the character:

```
The character should feel realistic and well-rounded, with a distinct personality 
and appearance that matches their background and traits.
```

### 4. Input Sanitization

Before sending to the API, inputs are sanitized:

```typescript
// Sanitize the character description
data.description = sanitizeUserInput(data.description);

// Also sanitize any other free-text inputs
if (data.advanced_options?.distinctive_features) {
  data.advanced_options.distinctive_features = 
    sanitizeUserInput(data.advanced_options.distinctive_features);
}
```

### 5. Token Optimization

Prompts are optimized for token efficiency:

- Concise instructions
- Removed unnecessary explanations
- Structured format for clarity
- Only including relevant information

### 6. Null Handling

The prompt system handles undefined or null values by removing them:

```typescript
// Clean form data by removing empty values
const cleanedData = removeEmptyValues(data);
```

## Prompt Examples

### Simple Character Prompt Example

```
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
  "special_ability": "A unique ability or power the character possesses"
}

The character should fit within the fantasy genre, specifically the high_fantasy sub-genre.

Include these specific traits: gender: female, age group: adult, moral alignment: good, relationship to player: ally.

Also include these advanced traits: species: elf, occupation: ranger, social class: outcast, personality traits: brave, mysterious, cautious.

Be creative, detailed, and ensure the character feels cohesive and interesting. The character should feel realistic and well-rounded, with a distinct personality and appearance that matches their background and traits.

Remember: Your response must be ONLY the JSON object. Do not include any explanatory text before or after.
```

### Portrait Prompt Example

```
Portrait of Thalindra Silverleaf: Tall and lithe, with angular features framed by long silver-blonde hair that cascades down her back, adorned with small braids and leaf ornaments. Her almond-shaped eyes are a piercing emerald green that seem to glow slightly in dim light. She wears fitted leather armor dyed in various shades of green and brown, expertly crafted to blend with the forest surroundings.

Important visual characteristics: gender: female, age group: adult, species: elf, height: tall, build: athletic, distinctive features: glowing green eyes, leaf ornaments in hair.

Fantasy art style, with a determined expression, portrait shot, with a forest background.
High quality, detailed character portrait, professional digital art.
```

## Best Practices

When modifying prompts or developing new features, follow these best practices:

1. **Be Explicit**: Clearly state what you want the model to do
2. **Structure Output**: Define the expected format precisely
3. **Provide Context**: Include relevant information about the character and setting
4. **Balance Constraints and Creativity**: Give enough guidance without being too restrictive
5. **Test Thoroughly**: Try prompts with different inputs to ensure consistency
6. **Optimize Tokens**: Keep prompts efficient to reduce API costs
7. **Handle Edge Cases**: Consider how the prompt will handle unusual inputs

## Modifying Prompts

To modify the prompts used in NPC Forge:

1. Locate the `buildSystemPrompt` function in `/src/app/api/generate/route.ts`
2. Make your changes to the prompt structure or content
3. For portrait generation, modify the prompt construction in the `generatePortrait` function in `/src/lib/openai.ts`
4. Test with diverse inputs to ensure consistent results

## Related Documentation

- [API Documentation](api.md) - For details on the API implementation
- [Architecture Overview](architecture.md) - For high-level system design