import Link from 'next/link';
import { GitBranch, GitMerge, GitPullRequest, Code, CheckCircle } from 'lucide-react';

export default function ContributingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contributing Guidelines</h1>
      
      <p className="lead mb-8">
        Thank you for your interest in contributing to NPC Forge! This document provides guidelines and instructions for contributing to the project.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        
        <h3 className="text-xl font-medium mb-3">Prerequisites</h3>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Node.js v18 or newer</li>
            <li>npm v7 or newer</li>
            <li>Git</li>
            <li>An OpenAI API key for testing</li>
            <li>A GitHub account</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-medium mb-3">Setting Up the Development Environment</h3>
        
        <div className="space-y-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-2">
              <GitBranch className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Fork the repository</h4>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Click the "Fork" button at the top right of the <a href="https://github.com/EthanPerello/npc-forge" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300" target="_blank" rel="noopener noreferrer">NPC Forge repository</a>.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-2">
              <Code className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Clone your fork</h4>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>git clone https://github.com/YOUR-USERNAME/npc-forge.git</p>
              <p>cd npc-forge</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-2">
              <GitMerge className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Add the upstream remote</h4>
            </div>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>git remote add upstream https://github.com/EthanPerello/npc-forge.git</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Install dependencies</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm install</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Create a .env.local file</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>OPENAI_API_KEY=your_api_key_here</p>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Start the development server</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>npm run dev</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Development Workflow</h2>
        
        <h3 className="text-xl font-medium mb-3">Branching Strategy</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          We use a simplified GitFlow workflow:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-6 text-gray-700 dark:text-gray-300">
          <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">main</code>: The main branch that always reflects production-ready code</li>
          <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">feature/name</code>: Feature branches for new features and non-critical bugs</li>
          <li><code className="bg-gray-100 p-1 rounded dark:bg-gray-800">fix/name</code>: Fix branches for critical bug fixes</li>
        </ul>
        
        <h3 className="text-xl font-medium mb-3">Working on a Feature or Bug Fix</h3>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Create a new branch from main</h4>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
# or for fixes
git checkout -b fix/bug-description`}
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700 mb-6">
          <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Commit your changes</h4>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            Follow the commit message format:
          </p>
          <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`git add .
git commit -m "feat: add character library feature"
# or for fixes
git commit -m "fix: resolve portrait generation error"`}
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Prefix your commit messages with one of the following:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li><code className="bg-gray-700 p-1 rounded text-white">feat:</code> for new features</li>
            <li><code className="bg-gray-700 p-1 rounded text-white">fix:</code> for bug fixes</li>
            <li><code className="bg-gray-700 p-1 rounded text-white">docs:</code> for documentation changes</li>
            <li><code className="bg-gray-700 p-1 rounded text-white">style:</code> for formatting changes</li>
            <li><code className="bg-gray-700 p-1 rounded text-white">refactor:</code> for code refactoring</li>
            <li><code className="bg-gray-700 p-1 rounded text-white">test:</code> for adding tests</li>
            <li><code className="bg-gray-700 p-1 rounded text-white">chore:</code> for maintenance tasks</li>
          </ul>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Keep your branch updated</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
{`git fetch upstream
git rebase upstream/main`}
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Push your changes</h4>
            <div className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm font-mono dark:bg-gray-900">
              <p>git push origin feature/your-feature-name</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Pull Request Process</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <div className="flex items-center mb-2">
              <GitPullRequest className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h4 className="font-medium text-gray-800 dark:text-gray-200">Create a Pull Request</h4>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Go to the <a href="https://github.com/EthanPerello/npc-forge" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300" target="_blank" rel="noopener noreferrer">NPC Forge repository</a> and click "New Pull Request".
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Fill in the Pull Request template</h4>
            <p className="text-gray-700 mb-2 dark:text-gray-300">
              Provide:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>A clear and concise description of your changes</li>
              <li>The issue number(s) your PR addresses</li>
              <li>Screenshots or examples if applicable</li>
              <li>Any notes on testing or dependencies</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Update the CHANGELOG</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Add your changes to the "Unreleased" section of CHANGELOG.md following the Keep a Changelog format.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Wait for review</h4>
            <p className="text-gray-700 dark:text-gray-300">
              A maintainer will review your PR and provide feedback. Make any requested changes by adding new commits to your branch.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">PR Request Format</h2>
        
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto text-sm font-mono dark:bg-gray-900">
{`## Summary

Brief explanation of what this PR does.

## Changes

### Added
- ...

### Changed
- ...

### Fixed
- ...`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Coding Standards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">TypeScript</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use TypeScript for all new code</li>
              <li>Define interfaces for all data structures</li>
              <li>Use explicit typing instead of <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">any</code> where possible</li>
              <li>Use optional chaining and nullish coalescing when appropriate</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">React</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use functional components with hooks</li>
              <li>Keep components small and focused</li>
              <li>Use React Context for shared state</li>
              <li>Follow the React file structure of the existing project</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">CSS/Styling</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use Tailwind CSS for styling</li>
              <li>Follow the existing color scheme and design patterns</li>
              <li>Ensure responsive design works on mobile devices</li>
              <li>Use semantic HTML elements</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Code Formatting</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The project uses ESLint and Prettier for code formatting. Before submitting a PR:
            </p>
            <div className="bg-gray-800 text-gray-200 p-2 rounded-md text-sm font-mono mt-2 dark:bg-gray-900">
              <p>npm run lint</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Documentation is an essential part of the project. Please update the relevant Markdown files in the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/docs</code> directory:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <div className="bg-indigo-50 p-2 rounded dark:bg-indigo-900/20">
            <code className="text-indigo-700 dark:text-indigo-300">features.md</code>
          </div>
          <div className="bg-indigo-50 p-2 rounded dark:bg-indigo-900/20">
            <code className="text-indigo-700 dark:text-indigo-300">how-to-use.md</code>
          </div>
          <div className="bg-indigo-50 p-2 rounded dark:bg-indigo-900/20">
            <code className="text-indigo-700 dark:text-indigo-300">api.md</code>
          </div>
          <div className="bg-indigo-50 p-2 rounded dark:bg-indigo-900/20">
            <code className="text-indigo-700 dark:text-indigo-300">security.md</code>
          </div>
          <div className="bg-indigo-50 p-2 rounded dark:bg-indigo-900/20">
            <code className="text-indigo-700 dark:text-indigo-300">architecture.md</code>
          </div>
          <div className="bg-indigo-50 p-2 rounded dark:bg-indigo-900/20">
            <code className="text-indigo-700 dark:text-indigo-300">README.md</code>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Additional Resources</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/architecture" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Architecture Overview
            </Link>
          </li>
          <li>
            <Link href="/docs/api" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              API Documentation
            </Link>
          </li>
          <li>
            <Link href="/docs/security" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Security Documentation
            </Link>
          </li>
          <li>
            <Link href="/docs/testing" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Testing Guide
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}