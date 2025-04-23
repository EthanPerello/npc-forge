import Link from 'next/link';
import { Server, Cloud, Code, Database, Globe } from 'lucide-react';

export default function DeploymentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Deployment Guide</h1>
      
      <p className="lead mb-8">
        This document provides instructions for deploying NPC Forge to various environments, including Vercel (the recommended platform) and self-hosting options.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Deployment Options</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge is a Next.js application that can be deployed in several ways:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 flex items-start">
            <div className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Cloud className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Vercel (Recommended)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Seamless deployment with the creators of Next.js</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 flex items-start">
            <div className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Netlify</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Alternative hosting with similar features to Vercel</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 flex items-start">
            <div className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Server className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Self-hosting</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deploy to your own server or cloud provider</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 flex items-start">
            <div className="mt-1 mr-3 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
              <Code className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Static Export</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Generate static files for hosting anywhere</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Deployment to Vercel</h2>
        
        <h3 className="text-lg font-medium mb-3">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
          <li>A <a href="https://github.com/signup" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">GitHub account</a></li>
          <li>A <a href="https://vercel.com/signup" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">Vercel account</a> (free tier available)</li>
          <li>An <a href="https://platform.openai.com/" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">OpenAI API key</a></li>
        </ul>
        
        <h3 className="text-lg font-medium mb-3">Deployment Steps</h3>
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">1. Fork the repository</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Go to the <a href="https://github.com/EthanPerello/npc-forge" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">NPC Forge repository</a> and click the "Fork" button to create your own copy.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">2. Create a new project in Vercel</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Log in to <a href="https://vercel.com/" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">Vercel</a></li>
              <li>Click "Add New" → "Project"</li>
              <li>Import your forked GitHub repository</li>
              <li>Configure the project:
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Framework Preset: Next.js</li>
                  <li>Root Directory: ./</li>
                  <li>Build Command: Leave as default</li>
                  <li>Output Directory: Leave as default</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">3. Set up environment variables</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Add the following environment variable:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
              OPENAI_API_KEY=your_api_key_here
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">4. Deploy</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Click "Deploy" and wait for the build to complete.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">5. Verify the deployment</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Once deployed, Vercel will provide a URL where you can access your application. Open the URL to verify that everything is working correctly.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Deployment to Netlify</h2>
        
        <h3 className="text-lg font-medium mb-3">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
          <li>A <a href="https://github.com/signup" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">GitHub account</a></li>
          <li>A <a href="https://app.netlify.com/signup" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">Netlify account</a> (free tier available)</li>
          <li>An <a href="https://platform.openai.com/" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">OpenAI API key</a></li>
        </ul>
        
        <h3 className="text-lg font-medium mb-3">Deployment Steps</h3>
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">1. Fork the repository</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Go to the <a href="https://github.com/EthanPerello/npc-forge" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">NPC Forge repository</a> and click the "Fork" button to create your own copy.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">2. Create a new site in Netlify</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Log in to <a href="https://app.netlify.com/" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">Netlify</a></li>
              <li>Click "New site from Git"</li>
              <li>Choose GitHub as your Git provider</li>
              <li>Select your forked repository</li>
              <li>Configure the build settings:
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Build command: <code>npm run build</code></li>
                  <li>Publish directory: <code>.next</code></li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">3. Set up environment variables</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Go to Site settings → Environment variables and add:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
              OPENAI_API_KEY=your_api_key_here
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">4. Update build settings for Next.js</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              In your repository, create a <code>netlify.toml</code> file with the following content:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"`}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">5. Deploy</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Commit and push the <code>netlify.toml</code> file to trigger a deployment.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Self-Hosting</h2>
        
        <h3 className="text-lg font-medium mb-3">Prerequisites</h3>
        <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700 dark:text-gray-300">
          <li>A server with Node.js 18+ installed</li>
          <li>Git</li>
          <li>An <a href="https://platform.openai.com/" className="text-indigo-600 hover:underline dark:text-indigo-400" target="_blank" rel="noopener noreferrer">OpenAI API key</a></li>
        </ul>
        
        <h3 className="text-lg font-medium mb-3">Deployment Steps</h3>
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">1. Clone the repository</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`git clone https://github.com/EthanPerello/npc-forge.git
cd npc-forge`}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">2. Install dependencies</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`npm install`}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">3. Set up environment variables</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Create a <code>.env.local</code> file with your OpenAI API key:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`OPENAI_API_KEY=your_api_key_here`}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">4. Build the application</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`npm run build`}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">5. Start the server</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`npm start`}
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              The application will be available at <code>http://localhost:3000</code>.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">6. Set up a reverse proxy (optional but recommended)</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Use Nginx or Apache as a reverse proxy to serve your application securely.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Example Nginx configuration:
            </p>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
{`server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Deployment Checklist</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Use this checklist for each deployment:
        </p>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Environment variables are correctly set</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Production build completes successfully</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">API endpoints are functional</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Character generation works</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait generation works</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Usage limits function correctly</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">UI is responsive on different devices</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">Security headers are properly configured</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Architecture Overview
            </Link>
            {" "}for system understanding
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Contributing Guidelines
            </Link>
            {" "}for development workflow
          </li>
          <li>
            <Link href="/docs/security" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Security Documentation
            </Link>
            {" "}for security considerations
          </li>
        </ul>
      </div>
    </div>
  );
}