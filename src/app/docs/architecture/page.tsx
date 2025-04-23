import Link from 'next/link';
import Image from 'next/image';
import { Layers, Code, Server, Database, Layout } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Architecture Overview</h1>
      
      <p className="lead mb-8">
        This document provides an overview of NPC Forge's architecture, explaining the key components and how they interact.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">System Architecture</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge is a Next.js application with a React frontend and serverless API endpoints. It's designed to work as a client-side application that communicates with the OpenAI API for character generation.
        </p>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Key Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Layout className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Frontend (Client-Side)</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>React components for user interface</li>
              <li>Form handling for character options</li>
              <li>State management with React Context</li>
              <li>Character display and rendering</li>
              <li>Local storage for usage tracking</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Server className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Backend (Serverless)</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Next.js API routes for OpenAI integration</li>
              <li>Character generation logic</li>
              <li>Portrait generation logic</li>
              <li>Input validation and sanitization</li>
              <li>Error handling</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Database className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">External Services</h3>
            </div>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>OpenAI API for text generation (GPT-4o-mini)</li>
              <li>OpenAI API for image generation (DALL-E 3)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Component Structure</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <h3 className="text-lg font-medium mb-3">Frontend Components</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            The application is organized into reusable components located in the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/components/</code> directory:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Main Components</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>CharacterDisplay.tsx</li>
                <li>MainFormTabs.tsx</li>
                <li>PortraitDisplay.tsx</li>
                <li>UsageLimitsNotice.tsx</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Tab Components</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>CharacterTab.tsx</li>
                <li>QuestsTab.tsx</li>
                <li>DialogueTab.tsx</li>
                <li>ItemsTab.tsx</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <h3 className="text-lg font-medium mb-3">State Management</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            NPC Forge uses React Context for state management:
          </p>
          <div className="bg-gray-50 p-3 rounded-md dark:bg-gray-800">
            <p className="text-gray-800 dark:text-gray-200 font-medium">CharacterContext.tsx</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Manages character generation state including:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li>Form data for all character options</li>
              <li>Generated character data</li>
              <li>Loading and error states</li>
              <li>Methods for character generation and export</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3">API Structure</h3>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            API endpoints are located in the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/app/api/</code> directory:
          </p>
          <div className="bg-gray-50 p-3 rounded-md dark:bg-gray-800">
            <p className="text-gray-800 dark:text-gray-200 font-medium">/api/generate/route.ts</p>
            <p className="text-gray-600 text-sm dark:text-gray-400">Handles character generation requests:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li>Validates input data</li>
              <li>Constructs prompts for OpenAI</li>
              <li>Processes and returns generated character data</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Data Flow</h2>
        
        <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-medium">User Input Collection</span>
            <p className="ml-6 mt-1">User selects genre, traits, and other options. Form data is managed through the CharacterContext.</p>
          </li>
          <li>
            <span className="font-medium">Character Generation Request</span>
            <p className="ml-6 mt-1">Client sends a POST request to the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/api/generate</code> endpoint with form data.</p>
          </li>
          <li>
            <span className="font-medium">OpenAI API Interaction</span>
            <p className="ml-6 mt-1">Server constructs a system prompt and sends it to GPT-4o-mini, then validates the response.</p>
          </li>
          <li>
            <span className="font-medium">Portrait Generation</span>
            <p className="ml-6 mt-1">Character data is used to generate a portrait prompt for DALL-E 3.</p>
          </li>
          <li>
            <span className="font-medium">Response and Display</span>
            <p className="ml-6 mt-1">Complete character data is returned to the client and displayed in the UI.</p>
          </li>
        </ol>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Core Libraries and Dependencies</h2>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Next.js</strong>: React framework for both frontend and API routes</li>
            <li><strong>React</strong>: UI library for building the interface</li>
            <li><strong>TypeScript</strong>: Type-safe JavaScript</li>
            <li><strong>Tailwind CSS</strong>: Utility-first CSS framework</li>
            <li><strong>OpenAI</strong>: SDK for API integration</li>
            <li><strong>Lucide React</strong>: SVG icon components</li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/api" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              API Documentation
            </Link>
            {" "}for details about the API routes
          </li>
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Development Setup
            </Link>
            {" "}for getting started with the codebase
          </li>
          <li>
            <Link href="/docs/security" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Security Documentation
            </Link>
            {" "}for information about security measures
          </li>
        </ul>
      </div>
    </div>
  );
}