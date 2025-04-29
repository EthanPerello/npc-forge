import Link from 'next/link';
import { Terminal, Package, Code, FileCode, Server } from 'lucide-react';

export default function DevSetupPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Development Setup</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        This guide will help you set up NPC Forge for local development. Follow these steps to get the project running on your machine.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Prerequisites</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Setting Up the Development Environment</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <FileCode className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Clone the Repository</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>git clone https://github.com/EthanPerello/npc-forge.git</p>
              <p>cd npc-forge</p>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Package className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Install Dependencies</h3>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm install</p>
            </div>
            <p className="mt-2 text-gray-700 text-sm dark:text-gray-300">
              This will install all necessary dependencies including Next.js, React, TypeScript, TailwindCSS, and other libraries.
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Code className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Configure Environment Variables</h3>
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
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Server className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Start the Development Server</h3>
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
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Understanding Development Mode</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
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
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Project Structure</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Here's an overview of the key directories and files:
          </p>
          
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono mb-3 dark:bg-gray-900">
{`npc-forge/
├── public/                  # Static assets
│   ├── images/              # Images used in the application
│   └── images/docs/         # Documentation images
├── src/                     # Source code
│   ├── app/                 # Next.js App Router 
│   │   ├── api/             # API routes
│   │   │   └── generate/    # Character generation endpoint
│   │   ├── docs/            # Documentation pages
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── tabs/            # Tab-based components
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts
│   │   └── character-context.tsx   # Character state management
│   └── lib/                 # Utility functions and types
│       ├── openai.ts        # OpenAI API integration
│       ├── templates.ts     # Character templates
│       ├── types.ts         # TypeScript type definitions
│       ├── usage-limits.ts  # Usage limit tracking
│       └── utils.ts         # General utilities
├── docs/                    # Documentation (Markdown)
├── .env.local               # Environment variables (create this)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies and scripts`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Workflow for Development</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Creating New Features</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Create a feature branch:
                <div className="bg-gray-800 text-gray-200 p-2 rounded-md text-sm font-mono mt-1 ml-6 dark:bg-gray-900">
                  git checkout -b feature/your-feature-name
                </div>
              </li>
              <li>Implement your changes</li>
              <li>Test your changes thoroughly</li>
              <li>Submit a pull request</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Running Tests</h3>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm run test</p>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Creating a Production Build</h3>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm run build</p>
              <p>npm run start</p>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              This builds an optimized version of the application and starts it locally.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">API Usage Considerations</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            When developing locally, be mindful of your OpenAI API usage:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Each character generation costs approximately $0.04</li>
            <li>Portrait generation adds another $0.04-$0.08</li>
            <li>Consider implementing a mock API response during heavy development to avoid costs</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Common Development Tasks</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Adding a New Character Option</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add the new option to the appropriate type in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/types.ts</code></li>
              <li>Create or update the UI component in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/components/</code></li>
              <li>Update the form handling in the character context</li>
              <li>Modify the OpenAI prompt in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/api/generate/route.ts</code> to include the new option</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Modifying the Character Generation Process</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              The generation flow involves:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/contexts/character-context.tsx</code> - Manages state and API calls</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/api/generate/route.ts</code> - Handles the API request</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/openai.ts</code> - Contains the logic for interacting with OpenAI</li>
            </ul>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Modify these files to change how characters are generated.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Troubleshooting</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">OpenAI API Issues</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              If you're experiencing problems with the OpenAI API:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Check your API key is valid and has sufficient credits</li>
              <li>Verify the API is not experiencing downtime</li>
              <li>Check your network connection</li>
              <li>Examine the API response for error messages</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Next.js Development Problems</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              Common Next.js issues:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Clear the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">.next</code> folder: <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">rm -rf .next</code></li>
              <li>Reinstall dependencies: <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">npm install</code></li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Architecture Overview
            </Link>
            {" "}for system understanding
          </li>
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              API Documentation
            </Link>
            {" "}for details on the API implementation
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for development workflow
          </li>
          <li>
            <Link href="/docs/testing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Testing Guide
            </Link>
            {" "}for testing procedures
          </li>
        </ul>
      </div>
    </div>
  );
}