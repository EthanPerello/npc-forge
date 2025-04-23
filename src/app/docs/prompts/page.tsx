import Link from 'next/link';
import { MessageSquare, Image, Lightbulb, Shield, Check } from 'lucide-react';

export default function PromptsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Prompt Engineering</h1>
      
      <p className="lead mb-8">
        This document provides insights into the prompt engineering techniques used in NPC Forge to generate characters, portraits, and related elements.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge uses carefully constructed prompts to communicate with OpenAI's models. The prompts are designed to:
        </p>
        
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Provide clear instructions about the desired output format</li>
          <li>Include relevant context about the character being generated</li>
          <li>Specify constraints and requirements for the generation</li>
          <li>Encourage creativity within defined parameters</li>
        </ol>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Character Generation Prompts</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <div className="flex items-center mb-3">
            <MessageSquare className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium">Base System Prompt Structure</h3>
          </div>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            The system prompt for character generation follows this basic structure:
          </p>
          <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono dark:bg-gray-900">
{`You are an expert RPG character generator. Generate a detailed NPC profile based on the description and parameters provided.

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
}`}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3">Dynamic Prompt Components</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Additional fields are added based on user selections:
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Items Component</h4>
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono dark:bg-gray-900">
{`"items": [
  "Item 1 with description",
  "Item 2 with description",
  "Item 3 with description"
  // Include N items based on user selection
]`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Dialogue Component</h4>
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono dark:bg-gray-900">
{`"dialogue_lines": [
  "Line 1",
  "Line 2",
  "Line 3"
  // Include N dialogue lines based on user selection
]`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Quests Component</h4>
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono dark:bg-gray-900">
{`"quests": [
  {
    "title": "Quest Title",
    "description": "Quest Description",
    "reward": "Quest Reward",
    "type": "Quest Type" // Optional
  }
  // Include N quests based on user selection
]`}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3">Genre and Trait Guidance</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Genre Guidance</h4>
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono dark:bg-gray-900">
{`The character should fit within the [genre] genre, specifically the [sub-genre] sub-genre.`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Trait Specifications</h4>
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono dark:bg-gray-900">
{`Include these specific traits: gender: female, age group: adult, moral alignment: good, relationship to player: ally.`}
                </div>
                
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono mt-2 dark:bg-gray-900">
{`Also include these advanced traits: species: elf, occupation: ranger, social class: lower class, personality traits: curious, brave, suspicious.`}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Feature-Specific Guidance</h4>
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono dark:bg-gray-900">
{`For quests, include these specifics: type: exploration, reward type: item.`}
                </div>
                
                <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono mt-2 dark:bg-gray-900">
{`For dialogue, include these specifics: tone: mysterious, context: first_meeting.`}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2">Creativity Encouragement</h3>
          <p className="text-gray-700 dark:text-gray-300">
            The prompt ends with guidance to ensure quality:
          </p>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg text-sm font-mono dark:bg-gray-900">
{`Be creative, detailed, and ensure the character feels cohesive and interesting. The character should feel realistic and well-rounded, with a distinct personality and appearance that matches their background and traits.`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Portrait Generation Prompts</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <div className="flex items-center mb-3">
            <Image className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium">Portrait Prompt Structure</h3>
          </div>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            Portrait generation uses a different prompt structure focused on visual elements:
          </p>
          <div className="bg-gray-800 text-gray-200 p-4 rounded-lg text-sm font-mono dark:bg-gray-900">
{`Portrait of [name]: [appearance_description]
Important visual characteristics: [visual_traits_list].
[art_style] style, [mood] expression, [framing] shot, with a [background] background,
High quality, detailed character portrait, professional digital art.`}
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3">Visual Traits Extraction</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            The portrait generation process extracts visual traits from the character data:
          </p>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto text-sm font-mono dark:bg-gray-900">
{`// Function to categorize if a trait is visual
function isVisualTrait(key: string): boolean {
  const visualTraits = [
    'gender', 'age_group', 'species', 'height', 'build', 
    'distinctive_features', 'appearance', 'skin', 'hair', 'eyes',
    'face', 'body', 'clothing', 'attire', 'outfit', 'scar',
    'tattoo', 'mark', 'accessory', 'jewelry', 'weapon'
  ];
  
  return visualTraits.some(trait => key.toLowerCase().includes(trait));
}`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Prompt Engineering Techniques</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Check className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Format Enforcement</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              The prompts use specific language to enforce the desired output format:
            </p>
            <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono mt-2 dark:bg-gray-900">
{`IMPORTANT: You must only respond with valid JSON matching the structure below. 
Do not include any additional text, explanations, or commentary outside the JSON.`}
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Lightbulb className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Field Definitions</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Each field in the expected output is clearly defined:
            </p>
            <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono mt-2 dark:bg-gray-900">
{`"appearance": "Detailed physical description as a paragraph"`}
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Input Sanitization</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Before sending to the API, inputs are sanitized:
            </p>
            <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono mt-2 dark:bg-gray-900">
{`// Sanitize the character description
data.description = sanitizeUserInput(data.description);

// Also sanitize any other free-text inputs
if (data.advanced_options?.distinctive_features) {
  data.advanced_options.distinctive_features = 
    sanitizeUserInput(data.advanced_options.distinctive_features);
}`}
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Null Handling</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              The prompt system handles undefined or null values by removing them:
            </p>
            <div className="bg-gray-800 text-gray-200 p-2 rounded-lg text-sm font-mono mt-2 dark:bg-gray-900">
{`// Clean form data by removing empty values
const cleanedData = removeEmptyValues(data);`}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Example Prompts</h2>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Simple Character Prompt</h3>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-96 text-sm font-mono dark:bg-gray-900">
{`You are an expert RPG character generator. Generate a detailed NPC profile based on the description and parameters provided.

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

Remember: Your response must be ONLY the JSON object. Do not include any explanatory text before or after.`}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Portrait Prompt Example</h3>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-72 text-sm font-mono dark:bg-gray-900">
{`Portrait of Thalindra Silverleaf: Tall and lithe, with angular features framed by long silver-blonde hair that cascades down her back, adorned with small braids and leaf ornaments. Her almond-shaped eyes are a piercing emerald green that seem to glow slightly in dim light. She wears fitted leather armor dyed in various shades of green and brown, expertly crafted to blend with the forest surroundings.

Important visual characteristics: gender: female, age group: adult, species: elf, height: tall, build: athletic, distinctive features: glowing green eyes, leaf ornaments in hair.

Fantasy art style, with a determined expression, portrait shot, with a forest background.
High quality, detailed character portrait, professional digital art.`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          When modifying prompts or developing new features, follow these best practices:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <p className="text-indigo-800 font-medium dark:text-indigo-300">1. Be Explicit</p>
            <p className="text-indigo-700 text-sm dark:text-indigo-400">
              Clearly state what you want the model to do
            </p>
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <p className="text-indigo-800 font-medium dark:text-indigo-300">2. Structure Output</p>
            <p className="text-indigo-700 text-sm dark:text-indigo-400">
              Define the expected format precisely
            </p>
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <p className="text-indigo-800 font-medium dark:text-indigo-300">3. Provide Context</p>
            <p className="text-indigo-700 text-sm dark:text-indigo-400">
              Include relevant information about the character
            </p>
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <p className="text-indigo-800 font-medium dark:text-indigo-300">4. Balance Constraints</p>
            <p className="text-indigo-700 text-sm dark:text-indigo-400">
              Guide without being too restrictive
            </p>
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <p className="text-indigo-800 font-medium dark:text-indigo-300">5. Test Thoroughly</p>
            <p className="text-indigo-700 text-sm dark:text-indigo-400">
              Try prompts with different inputs
            </p>
          </div>
          
          <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <p className="text-indigo-800 font-medium dark:text-indigo-300">6. Optimize Tokens</p>
            <p className="text-indigo-700 text-sm dark:text-indigo-400">
              Keep prompts efficient to reduce API costs
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/api" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              API Documentation
            </Link>
            {" "}for details on the API implementation
          </li>
          <li>
            <Link href="/docs/architecture" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Architecture Overview
            </Link>
            {" "}for high-level system design
          </li>
        </ul>
      </div>
    </div>
  );
}