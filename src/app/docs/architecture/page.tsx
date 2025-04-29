import Link from 'next/link';
import Image from 'next/image';
import { Layers, Code, Server, Database, Layout, FileText, Book, Shield } from 'lucide-react';

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
          NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It's designed to work primarily as a client-side application that communicates with the OpenAI API for character and portrait generation, with key business logic handled in API routes.
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
              <li>React components for tabbed interface</li>
              <li>Form handling for character customization</li>
              <li>State management with React Context</li>
              <li>Character display and rendering</li>
              <li>Local storage for usage tracking</li>
              <li>Welcome guide onboarding flow</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Server className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Backend (Serverless)</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Next.js API routes for OpenAI integration</li>
              <li>Character generation prompt engineering</li>
              <li>Portrait generation with DALL-E 3</li>
              <li>Input validation and sanitization</li>
              <li>Prompt injection protection</li>
              <li>Error handling and response formatting</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Database className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">External Services</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>OpenAI API for text generation (GPT-4o-mini)</li>
              <li>OpenAI API for image generation (DALL-E 3)</li>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-indigo-600 mr-2 dark:text-indigo-400" />
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Source Code</h4>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/app/</code> - Pages and API routes</li>
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/components/</code> - UI components</li>
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/contexts/</code> - React Context providers</li>
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/</code> - Utilities and core logic</li>
              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Book className="h-4 w-4 text-indigo-600 mr-2 dark:text-indigo-400" />
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Documentation</h4>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/docs/</code> - Markdown documentation</li>
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/docs/images/</code> - Documentation visuals</li>
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/docs/examples/</code> - Example character JSON</li>
                <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/release-notes/</code> - Version history</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Frontend Components</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            The application is organized into reusable components located in the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/components/</code> directory:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Core Components</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li>character-display.tsx</li>
                <li>main-form-tabs.tsx</li>
                <li>portrait-display.tsx</li>
                <li>character-form.tsx</li>
                <li>usage-limits-notice.tsx</li>
                <li>welcome-guide.tsx</li>
                <li>template-selector.tsx</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Tab Components</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm">
                <li>/tabs/character-tab.tsx</li>
                <li>/tabs/dialogue-tab.tsx</li>
                <li>/tabs/items-tab.tsx</li>
                <li>/tabs/quests-tab.tsx</li>
                <li>/tabs/portrait-options.tsx</li>
                <li>/tabs/display/profile-tab.tsx</li>
                <li>/tabs/display/dialogue-display-tab.tsx</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">State Management</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            NPC Forge uses React Context for state management:
          </p>
          <div className="bg-gray-50 p-3 rounded-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/contexts/character-context.tsx</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Manages character generation state including:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li>Form data for all character options</li>
              <li>Generated character data</li>
              <li>Loading and error states</li>
              <li>Methods for character generation and export</li>
              <li>Genre and sub-genre selections</li>
              <li>Usage limit tracking</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">API Structure</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            API endpoints are located in the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/app/api/</code> directory:
          </p>
          <div className="bg-gray-50 p-3 rounded-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/app/api/generate/route.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Handles character generation requests:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li>Validates input data</li>
              <li>Constructs prompts for GPT-4o-mini</li>
              <li>Generates portrait descriptions for DALL-E 3</li>
              <li>Ensures sanitized response formatting</li>
              <li>Handles API errors and retry logic</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Core Libraries and Utilities</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/</code> directory contains essential utility modules:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/lib/openai.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">API client wrappers for GPT and DALL-E integration</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/lib/templates.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Prompt templates and default examples</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/lib/types.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Shared TypeScript type definitions</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/lib/usage-limits.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Quota tracking logic using localStorage</p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/src/lib/utils.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">General helper functions (formatting, validation)</p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Data Flow</h2>
        
        <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-medium">User Input Collection</span>
            <p className="ml-6 mt-1">User selects genre, traits, and other options across tabbed interface. Form data is managed through the CharacterContext.</p>
          </li>
          <li>
            <span className="font-medium">Character Generation Request</span>
            <p className="ml-6 mt-1">Client sends a POST request to the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/api/generate</code> endpoint with form data and handles usage limits.</p>
          </li>
          <li>
            <span className="font-medium">OpenAI API Interaction</span>
            <p className="ml-6 mt-1">Server constructs a system prompt and sends it to GPT-4o-mini, then validates the response structure.</p>
          </li>
          <li>
            <span className="font-medium">Portrait Generation</span>
            <p className="ml-6 mt-1">Character data is used to generate a detailed portrait prompt for DALL-E 3 with styling cues.</p>
          </li>
          <li>
            <span className="font-medium">Response and Display</span>
            <p className="ml-6 mt-1">Complete character data is returned to the client and displayed in the tabbed UI.</p>
          </li>
          <li>
            <span className="font-medium">Usage Tracking</span>
            <p className="ml-6 mt-1">Generation count is updated in localStorage with limits (15/month) and visual indicators.</p>
          </li>
        </ol>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Security Considerations</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Shield className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Security Measures</h3>
          </div>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>API key stored securely in environment variables</li>
            <li>Input sanitization to prevent prompt injection</li>
            <li>Client-side usage limits to prevent abuse</li>
            <li>Structured response validation</li>
            <li>Error handling with graceful degradation</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Core Libraries and Dependencies</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Next.js 14</strong>: React framework with App Router</li>
            <li><strong>React</strong>: UI library with hooks for state management</li>
            <li><strong>TypeScript</strong>: Type-safe JavaScript development</li>
            <li><strong>Tailwind CSS</strong>: Utility-first CSS framework</li>
            <li><strong>OpenAI</strong>: SDK for API integration (GPT-4o-mini and DALL-E 3)</li>
            <li><strong>Lucide React</strong>: SVG icon components</li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              API Documentation
            </Link>
            {" "}for details about OpenAI integration
          </li>
          <li>
            <Link href="/docs/prompts" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Prompt Engineering
            </Link>
            {" "}for information about GPT and DALL-E prompts
          </li>
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Setup
            </Link>
            {" "}for environment configuration and local setup
          </li>
          <li>
            <Link href="/docs/security" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Security Documentation
            </Link>
            {" "}for information about security measures
          </li>
          <li>
            <Link href="/docs/roadmap" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Roadmap
            </Link>
            {" "}for future architecture plans
          </li>
        </ul>
      </div>
    </div>
  );
}