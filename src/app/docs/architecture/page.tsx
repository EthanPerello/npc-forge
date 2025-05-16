import Link from 'next/link';
import { Layers, Code, Server, Database, Layout, FileText, Book, Shield } from 'lucide-react';

export const metadata = {
  title: 'Architecture Overview - NPC Forge Documentation',
  description: 'System architecture, components, and data flow of NPC Forge',
};

export default function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Architecture Overview</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        This document provides an overview of NPC Forge's architecture, explaining the key components and how they interact to create AI-powered character generation for game developers and storytellers.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">System Architecture</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It's designed as a client-side application that communicates with the OpenAI API for character and portrait generation, with comprehensive character management capabilities.
        </p>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Key Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Layout className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Frontend (Client-Side)</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>React wizard interface for character creation</li>
              <li>Character library management with IndexedDB</li>
              <li>State management with React Context</li>
              <li>Character editing and regeneration</li>
              <li>Local storage for usage tracking and preferences</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Server className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Backend (Serverless Functions)</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Next.js API routes for OpenAI integration</li>
              <li>Character generation and regeneration endpoints</li>
              <li>Model selection and tiered usage system</li>
              <li>Input validation and sanitization</li>
              <li>Error handling and response formatting</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Database className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Local Storage & External Services</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>IndexedDB for character library storage</li>
              <li>Portrait compression and storage</li>
              <li>Usage limit tracking per model</li>
              <li>Multiple OpenAI models for text/images</li>
              <li>Vercel for hosting and deployment</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Project Structure</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Directory Organization</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            The project follows Next.js 14 App Router conventions with a well-organized structure:
          </p>
          
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono mb-3 dark:bg-gray-900 overflow-x-auto">
{`npc-forge/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   ├── generate/        # Character generation endpoint
│   │   │   ├── regenerate/      # Character regeneration endpoint
│   │   │   └── proxy-image/     # Image proxy endpoint
│   │   ├── docs/                # Documentation pages
│   │   ├── library/             # Character library pages
│   │   │   └── edit/[id]/       # Character editing pages
│   │   └── page.tsx             # Homepage with wizard
│   ├── components/              # UI components
│   │   ├── character-wizard.tsx # Main wizard component
│   │   ├── character-library.tsx # Library management
│   │   ├── edit-page/           # Character editing components
│   │   ├── tabs/                # Tab-based components
│   │   ├── ui/                  # Reusable UI components
│   │   └── wizard-steps/        # Individual wizard steps
│   ├── contexts/                # React contexts
│   │   ├── character-context.tsx # Character state management
│   │   └── theme-context.tsx    # Theme/dark mode state
│   └── lib/                     # Utilities and core logic
│       ├── character-storage.ts # IndexedDB operations
│       ├── image-storage.ts     # Portrait storage
│       ├── usage-limits.ts      # Model usage tracking
│       ├── models.ts           # Model configuration
│       ├── openai.ts           # OpenAI API integration
│       └── types.ts            # TypeScript definitions`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Frontend Architecture</h2>
        
        <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Wizard-Based Interface (v0.13.0)</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The character creation wizard consists of four main steps:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-gray-800 dark:text-gray-200">1. Concept Step</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Genre selection and description input</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-gray-800 dark:text-gray-200">2. Options Step</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Character traits and customization</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-gray-800 dark:text-gray-200">3. Model Step</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">AI model selection for text and images</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-gray-800 dark:text-gray-200">4. Generate Step</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Character generation and results</p>
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Library System</h3>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Storage Architecture</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-3">The library uses IndexedDB for reliable local storage:</p>
          
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`// Database schema
interface CharacterDatabase {
  characters: Character[];          // Character data
  portraits: PortraitData[];       // Compressed images
  metadata: LibraryMetadata;       // Search indices
}

// Storage operations
class CharacterStorage {
  async saveCharacter(character: Character): Promise<void>
  async getCharacter(id: string): Promise<Character>
  async updateCharacter(character: Character): Promise<void>
  async deleteCharacter(id: string): Promise<void>
  async searchCharacters(query: string): Promise<Character[]>
}`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Backend Architecture</h2>
        
        <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">API Endpoints</h3>
        
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Character Generation (/api/generate)</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`interface GenerationRequest {
  description: string
  genre?: string
  sub_genre?: string
  // Character traits
  text_model?: string
  image_model?: string
  // Additional options...
}

interface GenerationResponse {
  character: Character
  usage: ModelUsage
}`}
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Character Regeneration (/api/regenerate)</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`interface RegenerationRequest {
  characterData: Character
  regenerationType: 'character' | 'portrait' | 'quest' | 'dialogue' | 'item'
  targetIndex?: number
  questComponent?: 'title' | 'description' | 'reward'
  textModel?: string
  imageModel?: string
}`}
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Model Selection System</h3>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Tiered Model Architecture</h4>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`const TEXT_MODELS: ModelTier[] = [
  { id: 'standard', model: 'gpt-4o-mini', limit: null },
  { id: 'enhanced', model: 'gpt-4.1-mini', limit: 30 },
  { id: 'premium', model: 'gpt-4o', limit: 10 }
]

const IMAGE_MODELS: ModelTier[] = [
  { id: 'standard', model: 'dall-e-2', limit: null },
  { id: 'enhanced', model: 'dall-e-3', limit: 30 },
  { id: 'premium', model: 'gpt-image-1', limit: 10 }
]`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Data Flow</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Character Creation Flow</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>User Input Collection</strong>: Wizard collects data across four steps</li>
              <li><strong>Generation Request</strong>: Client sends POST to /api/generate with validation</li>
              <li><strong>AI Model Interaction</strong>: Text/image generation with selected models</li>
              <li><strong>Response Processing</strong>: Character data returned and displayed</li>
              <li><strong>Library Storage</strong>: Optional save to IndexedDB</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Character Regeneration Flow</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Regeneration Request</strong>: User selects element to regenerate</li>
              <li><strong>Selective Regeneration</strong>: Only specified element is regenerated</li>
              <li><strong>Update and Storage</strong>: Changes reflected and library updated</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Security Architecture</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Input Security</h3>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`// Input sanitization
function sanitizeUserInput(input: string): string {
  // Remove control characters
  let sanitized = input.replace(/[\\u0000-\\u001F\\u007F-\\u009F]/g, '')
  
  // Normalize whitespace
  sanitized = sanitized.replace(/[ \\t\\v\\f]+/g, ' ')
  
  return sanitized.trim()
}`}
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">API Security</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Server-side API key storage</li>
              <li>Input validation and sanitization</li>
              <li>Rate limiting through usage tracking</li>
              <li>Error handling without information leakage</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Performance Optimizations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Client-Side Optimizations</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Efficient IndexedDB usage</li>
              <li>Automatic portrait compression</li>
              <li>Lazy loading of character images</li>
              <li>State management with memoization</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">API Optimizations</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Optimized prompts for token efficiency</li>
              <li>Model-specific prompt variations</li>
              <li>Retry logic for transient failures</li>
              <li>Fallback options for API issues</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              API Documentation
            </Link>
            {" "}for detailed API specifications
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}for understanding the tier system
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library Guide
            </Link>
            {" "}for library usage and management
          </li>
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Setup
            </Link>
            {" "}for local development configuration
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for architecture contribution standards
          </li>
        </ul>
      </div>
    </div>
  );
}