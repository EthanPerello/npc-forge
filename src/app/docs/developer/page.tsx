import Link from 'next/link';
import { Code, Server, ShieldCheck, FileText, Bell, CodeSquare } from 'lucide-react';

export const metadata = {
  title: 'Developer Documentation - NPC Forge',
  description: 'Developer documentation for NPC Forge: setup, architecture, API reference, and contribution guidelines.',
};

export default function DeveloperDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Developer Documentation</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        Welcome to the NPC Forge developer documentation. Here you'll find technical guides, API references, and contribution guidelines for developers who want to work with, extend, or contribute to NPC Forge.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Code className="h-5 w-5 mr-2" />
          Getting Started
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
              <CodeSquare className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              <Link href="/docs/architecture" className="hover:text-indigo-800 dark:hover:text-indigo-300">
                Architecture Overview
              </Link>
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              System structure, chat system architecture, component organization, and data flow.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Server className="h-5 w-5 mr-2" />
          API & Integration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Contributing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Quick Start for Developers</h2>
        <p className="mb-4 text-indigo-600 dark:text-indigo-400">
          New to NPC Forge development? Follow these steps to get started:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Set up your development environment
            </Link>
            {" "}with Node.js, dependencies, and environment variables
          </li>
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Review the system architecture
            </Link>
            {" "}to understand how components interact
          </li>
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Explore the API endpoints
            </Link>
            {" "}for character generation, chat, and management
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Read the contribution guidelines
            </Link>
            {" "}before making changes or submitting PRs
          </li>
          <li>
            <Link href="/docs/testing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Learn the testing procedures
            </Link>
            {" "}to ensure quality and reliability
          </li>
        </ol>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Technical Overview</h2>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            NPC Forge is built with modern web technologies and follows best practices for scalability, 
            maintainability, and performance. The application uses:
          </p>
          
          <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1 mt-4">
            <li><strong>Next.js 14</strong> with App Router for server-side rendering and routing</li>
            <li><strong>TypeScript</strong> for type safety and better developer experience</li>
            <li><strong>Tailwind CSS</strong> for utility-first styling and responsive design</li>
            <li><strong>IndexedDB</strong> for client-side data persistence and chat storage</li>
            <li><strong>OpenAI API</strong> for character generation, chat, and portrait editing</li>
            <li><strong>React Context</strong> for state management across components</li>
          </ul>
          
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            The application is designed to be modular, with clear separation of concerns between 
            UI components, data management, and API interactions. This makes it easy to extend 
            functionality, add new features, and maintain code quality.
          </p>
        </div>
      </div>
    </div>
  );
}