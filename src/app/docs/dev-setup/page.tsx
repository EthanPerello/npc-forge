import Link from 'next/link';
import { Terminal, Package, Code, FileCode, Server } from 'lucide-react';

export const metadata = {
  title: 'Development Setup - NPC Forge Documentation',
  description: 'Local development environment setup for NPC Forge',
};

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
              <strong>Usage Limit Bypass</strong>: In development mode, the app bypasses the usage limits for Enhanced and Premium models.
            </li>
            <li>
              <strong>Character Library</strong>: The character library works fully in development mode with all editing and regeneration features.
            </li>
            <li>
              <strong>Welcome Guide</strong>: The welcome guide will always appear in development mode for easier testing.
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
          
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono mb-3 dark:bg-gray-900 overflow-x-auto">
{`npc-forge/
├── public/                  # Static assets
│   ├── images/              # Images used in the application
│   └── icons/               # App icons and PWA assets
├── src/                     # Source code
│   ├── app/                 # Next.js App Router 
│   │   ├── api/             # API routes
│   │   │   ├── generate/    # Character generation endpoint
│   │   │   ├── regenerate/  # Character regeneration endpoint
│   │   │   └── proxy-image/ # Image proxy endpoint
│   │   ├── docs/            # Documentation pages
│   │   ├── library/         # Character library pages
│   │   │   └── edit/[id]/   # Character editing pages
│   │   └── page.tsx         # Homepage with wizard
│   ├── components/          # React components
│   │   ├── character-wizard.tsx      # Main wizard component
│   │   ├── character-library.tsx     # Library interface
│   │   ├── edit-page/       # Character editing components
│   │   ├── tabs/            # Tab-based components
│   │   ├── ui/              # Reusable UI components
│   │   └── wizard-steps/    # Individual wizard steps
│   ├── contexts/            # React contexts
│   │   ├── character-context.tsx     # Character state management
│   │   └── theme-context.tsx         # Theme/dark mode state
│   └── lib/                 # Utility functions and types
│       ├── character-storage.ts      # IndexedDB operations
│       ├── image-storage.ts          # Portrait storage
│       ├── models.ts                 # Model configuration
│       ├── openai.ts                 # OpenAI API integration
│       ├── templates.ts              # Character templates
│       ├── types.ts                  # TypeScript type definitions
│       ├── usage-limits.ts           # Usage limit tracking
│       └── utils.ts                  # General utilities
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
              <li>Test your changes thoroughly (see <Link href="/docs/testing" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Testing Guide</Link>)</li>
              <li>Submit a pull request</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Running Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Currently, the project relies on manual testing. See the <Link href="/docs/testing" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Testing Guide</Link> for comprehensive testing procedures.
            </p>
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
            <li>Character generation costs approximately $0.04-0.40 depending on the model</li>
            <li>Portrait generation adds another $0.02-0.25 depending on the model</li>
            <li>Consider using Standard models during development to minimize costs</li>
            <li>The development mode bypass means you won't hit usage limits locally</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Development Features</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Wizard Interface Development</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              The wizard is the main interface for character creation, consisting of step components in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/components/wizard-steps/</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">concept-step.tsx</code>: Genre selection and description</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">options-step.tsx</code>: Character traits and customization</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">model-step.tsx</code>: AI model selection</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">results-step.tsx</code>: Generation results and library saving</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Library Development</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              The library system provides comprehensive character management:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/components/character-library.tsx</code>: Main library interface</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/character-storage.ts</code>: IndexedDB operations</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/library/edit/[id]/page.tsx</code>: Character editing page</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Regeneration System</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The regeneration system allows updating specific character elements with individual attributes, portrait images, quest components, dialogue lines, and items all supporting model selection for regeneration.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Customizing the Application</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Adding New Character Options</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Add the new option to the appropriate type in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/types.ts</code></li>
              <li>Update the UI component in the relevant wizard step</li>
              <li>Modify the form handling in the character context</li>
              <li>Update the OpenAI prompt in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/api/generate/route.ts</code></li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Modifying the Character Library</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              The library system consists of:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/components/character-library.tsx</code>: Main library interface</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/character-storage.ts</code>: IndexedDB operations</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/library/edit/[id]/page.tsx</code>: Character editing page</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Adding New AI Models</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Update model configurations in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/models.ts</code></li>
              <li>Add model options to the model selection UI</li>
              <li>Update the API endpoints to handle new models</li>
              <li>Test with the new models</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Common Development Tasks</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Adding a New Character Trait</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Update the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">Character</code> type in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/types.ts</code></li>
              <li>Add the trait option to the appropriate wizard step</li>
              <li>Update the character context to handle the new trait</li>
              <li>Modify the generation prompts to include the trait</li>
              <li>Update the character display and editing components</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Modifying the Generation Process</h3>
            <p className="mb-2 text-gray-700 dark:text-gray-300">
              The generation flow involves:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/contexts/character-context.tsx</code> - Manages wizard state and API calls</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/api/generate/route.ts</code> - Handles the generation API request</li>
              <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/openai.ts</code> - Contains the logic for interacting with OpenAI</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Adding New Regeneration Options</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Update the regeneration types in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/types.ts</code></li>
              <li>Add regeneration UI to the edit page components</li>
              <li>Update <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/app/api/regenerate/route.ts</code> to handle new types</li>
              <li>Test the regeneration flow thoroughly</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Modifying the Character Storage</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The IndexedDB implementation is in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">src/lib/character-storage.ts</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Character data storage and retrieval</li>
              <li>Search and filtering functionality</li>
              <li>Portrait storage with compression</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Testing During Development</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Manual Testing Checklist</h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Wizard Flow</strong>: Test each step of the character creation wizard</li>
            <li><strong>Character Library</strong>: Verify saving, loading, editing, and deleting</li>
            <li><strong>Model Selection</strong>: Test different model combinations</li>
            <li><strong>Regeneration</strong>: Verify all regeneration options work correctly</li>
            <li><strong>Responsive Design</strong>: Test on different screen sizes</li>
            <li><strong>Dark Mode</strong>: Verify theme switching works properly</li>
          </ol>
        </div>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Browser Testing</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Test in multiple browsers:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Chrome</li>
            <li>Firefox</li>
            <li>Safari</li>
            <li>Edge</li>
          </ul>
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
              <li>Examine the browser console for error messages</li>
              <li>Try with different model selections</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Library Issues</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Common library issues:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Characters not saving</strong>: Check IndexedDB permissions and storage space</li>
              <li><strong>Slow loading</strong>: Verify browser performance and clear cache if needed</li>
              <li><strong>Search not working</strong>: Check for JavaScript errors in console</li>
            </ol>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Build Issues</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              If you encounter build problems:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Clear the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">.next</code> folder: <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">rm -rf .next</code></li>
              <li>Reinstall dependencies: <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">npm clean-install</code></li>
              <li>Check for TypeScript errors</li>
              <li>Verify environment variables are set correctly</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Development Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Recommended Extensions (VS Code)</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>ES7+ React/Redux/React-Native snippets</li>
              <li>Tailwind CSS IntelliSense</li>
              <li>TypeScript Importer</li>
              <li>Prettier - Code formatter</li>
              <li>ESLint</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Debugging Tools</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>React Developer Tools (browser extension)</li>
              <li>IndexedDB viewer in browser dev tools</li>
              <li>Network tab for API call inspection</li>
              <li>Console for error tracking</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Contributing Guidelines</h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          When contributing to NPC Forge:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
          <li>Follow the existing code style and patterns</li>
          <li>Write TypeScript for all new code</li>
          <li>Test your changes thoroughly</li>
          <li>Update documentation for new features</li>
          <li>Follow the commit message format (see <Link href="/docs/contributing" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Contributing Guide</Link>)</li>
        </ol>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Architecture Overview
            </Link>
            {" "}for system design and components
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for how to contribute
          </li>
          <li>
            <Link href="/docs/testing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Testing Guide
            </Link>
            {" "}for testing procedures
          </li>
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              API Documentation
            </Link>
            {" "}for API endpoint details
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library Guide
            </Link>
            {" "}for library system details
          </li>
        </ul>
      </div>
    </div>
  );
}