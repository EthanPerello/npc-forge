import React from 'react';
import Link from 'next/link';

export default function CreditsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Credits &amp; Acknowledgements</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        NPC Forge has been made possible through the contributions, tools, and resources from many individuals and organizations. This document acknowledges all those who have helped make this project a reality.
      </p>

      {/* Core Development */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Core Development</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">NPC Forge was created and is maintained by:</p>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900/50">
                <span className="text-3xl text-indigo-600 dark:text-indigo-400">EP</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">Ethan Perello</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Design, Development, Documentation</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="https://github.com/EthanPerello"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  GitHub
                </a>
                <a
                  href="https://ethanperello.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:hover:bg-indigo-800"
                >
                  Website
                </a>
                <a
                  href="mailto:ethanperello@gmail.com"
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistance */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">AI Assistance</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">NPC Forge's development was significantly assisted by AI tools:</p>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3 dark:bg-purple-900/50 dark:text-purple-400">
                C
              </div>
              <div>
                <span className="font-medium">Claude</span> (Anthropic) – Assisted with code generation, debugging, documentation writing, and architectural design.
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 dark:bg-green-900/50 dark:text-green-400">
                G
              </div>
              <div>
                <span className="font-medium">ChatGPT</span> (OpenAI) – Helped with code generation, problem-solving, and research.
              </div>
            </li>
          </ul>
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>These AI assistants were instrumental in:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Generating and refactoring code snippets</li>
              <li>Researching design patterns and project architecture</li>
              <li>Developing documentation</li>
              <li>Troubleshooting complex issues</li>
              <li>Creating UI component templates</li>
            </ul>
            <p className="mt-4">
              All AI-generated content was reviewed, tested, and customized to ensure quality, security, and alignment with project goals.
            </p>
          </div>
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Technologies</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Next.js – React framework</li>
            <li>React – UI library</li>
            <li>TypeScript – Type-safe JavaScript</li>
            <li>Tailwind CSS – Utility-first CSS framework</li>
            <li>OpenAI API – Character and portrait generation</li>
            <li>Lucide Icons – SVG icon library</li>
          </ul>
        </div>
      </div>

      {/* Character Generation */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Character Generation</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>OpenAI GPT-4o-mini – Text generation</li>
            <li>OpenAI DALL·E 3 – Portrait generation</li>
          </ul>
        </div>
      </div>

      {/* Special Thanks */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Special Thanks</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>The open-source community for the libraries and tools that make this project possible</li>
            <li>Early users for invaluable feedback and bug reports</li>
            <li>The tabletop RPG and game-dev communities for ongoing inspiration</li>
          </ul>
        </div>
      </div>

      {/* Example Characters */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Example Characters</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Elarion</strong> – Fantasy High Wizard</li>
            <li><strong>Kira-7</strong> – Sci-Fi Cybernetic Antagonist</li>
            <li><strong>Detective Miles Navarro</strong> – Contemporary Mystery Character</li>
          </ul>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            All portraits generated via DALL·E 3 using NPC Forge's portrait system.
          </p>
        </div>
      </div>

      {/* Learning Resources */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Learning Resources</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              <Link href="https://nextjs.org/docs" target="_blank" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                Next.js Documentation
              </Link>
            </li>
            <li>
              <Link href="https://react.dev/docs" target="_blank" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                React Documentation
              </Link>
            </li>
            <li>
              <Link href="https://www.typescriptlang.org/docs" target="_blank" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                TypeScript Documentation
              </Link>
            </li>
            <li>
              <Link href="https://tailwindcss.com/docs" target="_blank" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                Tailwind CSS Documentation
              </Link>
            </li>
            <li>
              <Link href="https://platform.openai.com/docs" target="_blank" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                OpenAI API Documentation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Installation & Development */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Installation &amp; Development</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            For detailed setup instructions, see the&nbsp;
            <Link href="/docs/dev-setup" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
              Dev Setup guide
            </Link>.
          </p>
        </div>
      </div>

      {/* Contributing */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Contributing</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            Contributions are welcome! Read our&nbsp;
            <Link href="/docs/contributing" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
              Contributing Guidelines
            </Link>, then submit a PR via&nbsp;
            <a
              href="https://github.com/EthanPerello/npc-forge"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
            >
              GitHub
            </a>.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Contact</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            For questions or feedback, email&nbsp;
            <a href="mailto:ethanperello@gmail.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
              ethanperello@gmail.com
            </a>.
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for how to get involved
          </li>
          <li>
            <Link href="/docs/license" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              License Information
            </Link>
            {" "}for legal details
          </li>
          <li>
            <Link href="/docs/roadmap" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Roadmap
            </Link>
            {" "}for future plans
          </li>
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Setup
            </Link>
            {" "}for getting started with development
          </li>
        </ul>
      </div>
    </div>
  );
}