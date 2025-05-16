import Link from 'next/link';
import { Server, Code, AlertTriangle, Check, Database, Shield } from 'lucide-react';

export default function ApiPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300">
        This document describes the internal API structure and functionality of NPC Forge. It's intended for developers who want to understand how the application works or contribute to its development.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge uses Next.js API routes for its backend functionality. The main endpoints are:
        </p>
        
        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 mb-6 dark:bg-indigo-900/30 dark:border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-900 flex items-center mb-2 dark:text-indigo-300">
            <Server className="h-5 w-5 mr-2" />
            POST /api/generate
          </h3>
          <p className="text-indigo-900 mb-1 dark:text-indigo-300 font-medium">
            Generates a character based on provided parameters.
          </p>
        </div>

        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 mb-6 dark:bg-indigo-900/30 dark:border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-900 flex items-center mb-2 dark:text-indigo-300">
            <Server className="h-5 w-5 mr-2" />
            POST /api/regenerate (v0.12.0+)
          </h3>
          <p className="text-indigo-900 mb-1 dark:text-indigo-300 font-medium">
            Regenerates specific character attributes or elements.
          </p>
        </div>

        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 mb-6 dark:bg-indigo-900/30 dark:border-indigo-500">
          <h3 className="text-lg font-semibold text-indigo-900 flex items-center mb-2 dark:text-indigo-300">
            <Server className="h-5 w-5 mr-2" />
            GET /api/proxy-image
          </h3>
          <p className="text-indigo-900 mb-1 dark:text-indigo-300 font-medium">
            Proxies external image URLs for CORS compatibility.
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
    personality_traits?: string[];        // Unlimited personality traits
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
  text_model?: string;                    // Selected text generation model
  image_model?: string;                   // Selected image generation model
}`}
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Response</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
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
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
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
        <h2 className="text-2xl font-semibold mb-4">Character Regeneration Endpoint</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-6">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Request Body</h3>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-48 text-sm font-mono dark:bg-gray-900">
{`{
  characterData: Character;           // Complete character object
  regenerationType: 'character' | 'portrait' | 'quest' | 'dialogue' | 'item';
  targetIndex?: number;               // For quest/dialogue/item regeneration
  questComponent?: 'title' | 'description' | 'reward';  // For quest component regeneration
  textModel?: string;                 // Model for text regeneration
  imageModel?: string;                // Model for portrait regeneration
}`}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Character Attribute Regeneration</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">For <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">regenerationType: 'character'</code>:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Name</li>
              <li>Appearance</li>
              <li>Personality</li>
              <li>Backstory hook</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Component Regeneration</h4>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li><strong>Quest</strong>: Regenerate entire quest or specific components</li>
              <li><strong>Dialogue</strong>: Regenerate individual dialogue lines</li>
              <li><strong>Item</strong>: Regenerate individual item descriptions</li>
              <li><strong>Portrait</strong>: Regenerate character portrait with selected image model</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Core API Implementation</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The main character generation endpoint is implemented in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/app/api/generate/route.ts</code>.
        </p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Generation Flow</h3>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Generation Process</h4>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Input Validation</strong>: Verify required fields and sanitize inputs</li>
              <li><strong>Prompt Construction</strong>: Build AI prompts based on user selections</li>
              <li><strong>Model Selection</strong>: Apply user-selected text and image models</li>
              <li><strong>Character Generation</strong>: Request character data from OpenAI</li>
              <li><strong>Portrait Generation</strong>: Create character portrait if successful</li>
              <li><strong>Response Formatting</strong>: Return structured character data</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Model Selection Integration</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge supports multiple AI models with tiered access:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Text Models</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>gpt-4o-mini</strong> (Standard): Unlimited usage</li>
              <li><strong>gpt-4.1-mini</strong> (Enhanced): 30 generations/month</li>
              <li><strong>gpt-4o</strong> (Premium): 10 generations/month</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Image Models</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>dall-e-2</strong> (Standard): Unlimited usage</li>
              <li><strong>dall-e-3</strong> (Enhanced): 30 generations/month</li>
              <li><strong>gpt-image-1</strong> (Premium): 10 generations/month</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Usage Limit Integration</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Database className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Per-Model Usage Tracking</h3>
          </div>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            The application includes a client-side usage tracking system in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/usage-limits.ts</code>:
          </p>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto max-h-48 text-sm font-mono dark:bg-gray-900">
{`// Per-model usage tracking
export interface ModelUsageData {
  [modelName: string]: {
    count: number;
    monthKey: string;
    lastUpdated: string;
  };
}

// Get usage data for specific model
export function getModelUsage(modelName: string): UsageData {
  // Implementation handles per-model tracking
}

// Check if model usage is within limits
export function canUseModel(modelName: string): boolean {
  // Implementation checks individual model limits
}`}
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Security Considerations</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">API Security Measures</h3>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Input sanitization to prevent malicious content</li>
            <li>Server-side API key storage using environment variables</li>
            <li>Validation of incoming requests to ensure proper data structure</li>
            <li>Error handling that prevents information disclosure</li>
            <li>Rate limiting through usage tracking</li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Architecture Overview
            </Link>
            {" "}for high-level system design
          </li>
          <li>
            <Link href="/docs/prompts" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Prompt Engineering
            </Link>
            {" "}for details on prompt construction
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}for understanding model tiers and usage
          </li>
          <li>
            <Link href="/docs/security" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Security Documentation
            </Link>
            {" "}for complete security details
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for contribution workflows
          </li>
        </ul>
      </div>
    </div>
  );
}