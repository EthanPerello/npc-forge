import Link from 'next/link';
import { Server, Code, AlertTriangle, Check } from 'lucide-react';

export default function ApiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      
      <p className="lead mb-8">
        This document describes the internal API structure and functionality of NPC Forge. It's intended for developers who want to understand how the application works or contribute to its development.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge uses Next.js API routes for its backend functionality. The main endpoint is:
        </p>
        
        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 mb-6 dark:bg-indigo-900/30 dark:border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-800 flex items-center mb-2 dark:text-indigo-300">
            <Server className="h-5 w-5 mr-2" />
            POST /api/generate
          </h3>
          <p className="text-indigo-700 mb-1 dark:text-indigo-300">
            Generates a character based on provided parameters.
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Request Body</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The request body follows the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">CharacterFormData</code> type (defined in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/types.ts</code>):
        </p>
        
        <div className="bg-gray-800 text-gray-200 p-4 rounded-lg mb-4 overflow-auto max-h-96 text-sm font-mono dark:bg-gray-900">
{`{
  description: string;                    // Character description
  include_quests: boolean;                // Whether to include quests
  include_dialogue: boolean;              // Whether to include dialogue
  include_items: boolean;                 // Whether to include items
  genre?: string;                         // Optional genre
  sub_genre?: string;                     // Optional sub-genre
  gender?: 'male' | 'female' | 'nonbinary' | 'unknown';  // Optional gender
  age_group?: 'child' | 'teen' | 'adult' | 'elder';     // Optional age group
  moral_alignment?: 'good' | 'neutral' | 'evil';        // Optional alignment
  relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';  // Optional relationship
  advanced_options?: {
    species?: string;
    occupation?: string;
    personality_traits?: string[];        // Up to 3 personality traits
    social_class?: string;
    height?: string;
    build?: string;
    distinctive_features?: string;
    homeland?: string;
  };
  quest_options?: {
    reward_type?: string;
    number_of_quests?: number;
    quest_type?: string;
  };
  dialogue_options?: {
    number_of_lines?: number;
    tone?: string;
    context?: string;
  };
  item_options?: {
    number_of_items?: number;
    rarity_distribution?: string;
    item_categories?: string[];
  };
  portrait_options?: {
    art_style?: string;
    mood?: string;
    framing?: string;
    background?: string;
  };
}`}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Response</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-2">
              <Check className="h-5 w-5 text-green-600 mr-2 dark:text-green-400" />
              <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Success Response (200 OK)</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono dark:bg-gray-900">
{`{
  character: {
    name: string;                     // Character name
    selected_traits: { /* ... */ };   // Traits selected by the user
    added_traits: { /* ... */ };      // Additional traits added by AI
    appearance: string;               // Appearance description
    personality: string;              // Personality description
    backstory_hook: string;           // Brief backstory hook
    special_ability?: string;         // Optional special ability
    items?: string[];                 // Optional array of items
    dialogue_lines?: string[];        // Optional array of dialogue lines
    quests?: Array<{                  // Optional array of quests
      title: string;
      description: string;
      reward: string;
      type?: string;
    }>;
    image_url?: string;               // Optional portrait URL
    portrait_options?: {              // Portrait generation options
      art_style?: string;
      mood?: string;
      framing?: string;
      background?: string;
    };
  }
}`}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2 dark:text-red-400" />
              <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Error Response (400/500)</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono dark:bg-gray-900">
{`{
  error: string;                      // Error message
  character: null;                    // Null character data
}`}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Core API Implementation</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The endpoint is implemented in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/app/api/generate/route.ts</code>.
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Key Functions</h3>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">POST Handler</h4>
            <p className="text-gray-700 mb-2 dark:text-gray-300">
              The main handler for processing generation requests:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-48 text-sm font-mono dark:bg-gray-900">
{`export async function POST(request: NextRequest): Promise<NextResponse<GenerationResponse>> {
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
    
    // Sanitize inputs
    data.description = sanitizeUserInput(data.description);
    
    // Clean form data by removing empty values
    const cleanedData = removeEmptyValues(data);
    
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
        // Continue without portrait if it fails
        console.error('Failed to generate portrait:', portraitError);
      }
    }
    
    return NextResponse.json({ character });
  } catch (error) {
    // Error handling
    console.error('Error in generate route:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        character: null as any
      },
      { status: 500 }
    );
  }
}`}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">OpenAI Integration</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The OpenAI API integration is handled in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/openai.ts</code>.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Character Generation</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-48 text-sm font-mono dark:bg-gray-900">
{`export async function generateCharacter(systemPrompt: string, description: string): Promise<Character> {
  try {
    // Call the OpenAI API with GPT-4o-mini
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Higher quota than gpt-4o
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: description }
      ],
      temperature: 0.8,
    });

    // Parse response and validate
    // ...
    
    return character;
  } catch (error) {
    // Error handling
    // ...
  }
}`}
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Portrait Generation</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-48 text-sm font-mono dark:bg-gray-900">
{`export async function generatePortrait(character: Character): Promise<string> {
  try {
    // Gather appearance details from the character
    // ...
    
    // Create a prompt for the image generation
    const imagePrompt = \`Portrait of \${name}: \${appearanceText.substring(0, 250)}
    \${visualTraits.length > 0 ? \`Important visual characteristics: \${visualTraits.join(', ')}.\` : ''}
    \${artStyle} \${mood} \${framing} \${background}
    High quality, detailed character portrait, professional digital art.\`;
    
    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url || '';
  } catch (error) {
    // Error handling
    // ...
  }
}`}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Usage Limits Integration</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The application includes a client-side usage tracking system in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/usage-limits.ts</code>.
        </p>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-48 text-sm font-mono dark:bg-gray-900">
{`// Get the current usage data from localStorage
export function getUsageData(): UsageData {
  // Default data for new users
  const defaultData: UsageData = {
    count: 0,
    monthKey: getCurrentMonthKey(),
    lastUpdated: new Date().toISOString()
  };
  
  // Check if localStorage is available (will not be in SSR)
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return defaultData;
  }
  
  try {
    // Try to get and parse stored data
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return defaultData;
    
    const parsedData: UsageData = JSON.parse(storedData);
    const currentMonthKey = getCurrentMonthKey();
    
    // Reset count if it's a new month
    if (parsedData.monthKey !== currentMonthKey) {
      const resetData: UsageData = {
        count: 0,
        monthKey: currentMonthKey,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
      return resetData;
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error reading usage data:', error);
    return defaultData;
  }
}`}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Architecture Overview
            </Link>
            {" "}for high-level system design
          </li>
          <li>
            <Link href="/docs/prompts" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              OpenAI Prompts
            </Link>
            {" "}for details on prompt engineering
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Contributing Guidelines
            </Link>
            {" "}for contribution workflows
          </li>
        </ul>
      </div>
    </div>
  );
}