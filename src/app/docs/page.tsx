import Link from 'next/link';
import { Book, Code, User, FileText, Settings, HelpCircle, Calendar, Map, ShieldCheck, CodeSquare, Bell, Layers, Server, FileJson, Award, Database, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'NPC Forge Documentation',
  description: 'Official NPC Forge documentation hub: guides, examples, and developer references for AI-powered character creation and interactive conversations.',
};

export default function DocsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">NPC Forge Documentation</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        Welcome to the NPC Forge documentation. Here you'll find comprehensive guides, examples, and developer references to help you get the most out of this AI-powered character generator with interactive chat capabilities.
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <CodeSquare className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/dev-setup" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Development Setup
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Local environment setup, prerequisites, and project configuration for development.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Layers className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/architecture" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Architecture Overview
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              System structure, chat system architecture, component organization, and data flow.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Server className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/api" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                API Reference
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Complete API documentation including chat endpoints, generation, and OpenAI integration.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/security" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Security Documentation
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Input validation, data privacy practices, and security considerations for chat and storage.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/contributing" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Contributing Guidelines
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              How to contribute code, documentation, and report issues for the project.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/testing" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Testing Guide
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Manual testing procedures, chat testing workflows, and quality assurance practices.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Map className="h-5 w-5 mr-2" />
          Project Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Map className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/roadmap" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Development Roadmap
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Completed features, upcoming releases, and long-term vision for the project.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/credits" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Credits
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Acknowledgments, contributors, and technology credits for the project.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <FileJson className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/license" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                License Information
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              MIT License details, usage rights, and third-party library attributions.
            </p>
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