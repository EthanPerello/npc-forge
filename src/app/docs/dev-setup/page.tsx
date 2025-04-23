import Link from 'next/link';
import { Terminal, Package, Code, FileCode, Server } from 'lucide-react';

export default function DevSetupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Development Setup</h1>
      
      <p className="lead mb-8">
        This guide will help you set up NPC Forge for local development. Follow these steps to get the project running on your machine.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Before you begin, ensure you have the following installed:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Node.js</strong> (v18 or newer)</li>
            <li><strong>npm</strong> (v7 or newer)</li>
            <li><strong>Git</strong></li>
            <li><strong>OpenAI API key</strong> (for development)</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Setting Up the Development Environment</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <FileCode className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Clone the Repository</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>git clone https://github.com/EthanPerello/npc-forge.git</p>
              <p>cd npc-forge</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Package className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Install Dependencies</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm install</p>
            </div>
            <p className="mt-2 text-gray-700 text-sm dark:text-gray-300">
              This will install all necessary dependencies including Next.js, React, TypeScript, TailwindCSS, and other libraries.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Code className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Configure Environment Variables</h3>
            </div>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Create a <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">.env.local</code> file in the root directory with your OpenAI API key:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>OPENAI_API_KEY=your_api_key_here</p>
            </div>
            <p className="mt-2 text-gray-600 text-sm italic dark:text-gray-400">
              Note: Never commit your .env.local file to version control!
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Server className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium">Start the Development Server</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm run dev</p>
            </div>
            <p className="mt-2 text-gray-700 text-sm dark:text-gray-300">
              This will start the development server, typically at <a href="http://localhost:3000" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">http://localhost:3000</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Understanding Development Mode</h2>
        
        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 mb-6 dark:bg-indigo-900/20 dark:border-indigo-800">
          <p className="text-gray-700 mb-2 dark:text-gray-300">
            NPC Forge includes special features for development:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Usage Limit Bypass</strong>: In development mode, the app bypasses the 15 generations per month limit.
            </li>
            <li>
              <strong>Welcome Guide</strong>: The welcome guide will always appear in development mode for easier testing.
            </li>
            <li>
              <strong>Local Storage</strong>: Character generation counts are stored in your browser's localStorage, which you can clear if needed.
            </li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Next Steps</h2>
        <p className="text-blue-600 dark:text-blue-400 mb-4">
          Now that you have set up your development environment:
        </p>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Learn about the project architecture
            </Link>
          </li>
          <li>
            <Link href="/docs/api" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Explore the API documentation
            </Link>
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              See the contributing guidelines
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}