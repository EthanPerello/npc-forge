import Link from 'next/link';
import { Book, User, FileText, Settings, HelpCircle, Database, MessageCircle, Layers, Server, Code, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'NPC Forge Documentation',
  description: 'Official NPC Forge documentation hub: guides, examples, and references for AI-powered character creation and interactive conversations.',
};

export default function DocsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">NPC Forge Documentation</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        Welcome to the NPC Forge documentation. Here you'll find comprehensive guides and references to help you get the most out of this AI-powered character generator with interactive chat capabilities.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <User className="h-5 w-5 mr-2" />
          User Guides
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Book className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/how-to-use" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                How to Use NPC Forge
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Step-by-step guide to creating detailed NPCs and chatting with them using the wizard interface.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/chat" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Chat with Characters
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Interactive conversation guide for real-time character conversations with AI-powered responses.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/character-examples" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Character Examples
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Sample NPCs across different genres with portraits and conversation examples.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Database className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/library" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Character Library Guide
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Managing, editing, chatting with, and organizing your character collection with advanced filtering.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Settings className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/generation-options" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Generation Options
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Detailed breakdown of all character customization settings and chat-optimized options.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Layers className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/features" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Features Overview
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Comprehensive guide to all features including interactive chat and enhanced library system.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Server className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/models" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Model Selection Guide
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Understanding AI model tiers for character generation and chat conversations.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/faq" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Frequently Asked Questions
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Answers to common questions about character creation, chat features, usage limits, and troubleshooting.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Code className="h-5 w-5 mr-2" />
          Developer Documentation
        </h2>
        
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
                <Code className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                Technical Documentation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Complete developer resources including setup guides, architecture documentation, API references, and contribution guidelines.
              </p>
              <Link 
                href="/docs/developer" 
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                View Developer Docs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Getting Started</h2>
        <p className="mb-4 text-indigo-600 dark:text-indigo-400">
          New to NPC Forge? We recommend checking out these pages first:
        </p>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              How to Use NPC Forge
            </Link>
            {" "}for getting started with character creation
          </li>
          <li>
            <Link href="/docs/chat" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Chat with Characters
            </Link>
            {" "}to learn about interactive conversations
          </li>
          <li>
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Examples
            </Link>
            {" "}to see what's possible across different genres
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}to understand AI tiers and usage limits
          </li>
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}to explore all available capabilities
          </li>
        </ul>
      </div>
    </div>
  );
}