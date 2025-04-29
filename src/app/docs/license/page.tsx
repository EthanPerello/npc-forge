import React from 'react';
import Link from 'next/link';

export default function LicensePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">License Information</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        NPC Forge is made available under the terms of the MIT License.
      </p>

      {/* MIT License Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">MIT License</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 overflow-auto font-mono text-sm">
            <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
MIT License

Copyright (c) 2025 Ethan Perello

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
            </pre>
          </div>
        </div>
      </div>

      {/* What This Means */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">What This Means</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The MIT License is a permissive license that allows you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
            <li>Use NPC Forge commercially</li>
            <li>Modify the code</li>
            <li>Distribute your own versions</li>
            <li>Use it privately</li>
            <li>Use it as part of larger works</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300">
            The only requirement is that you include the original copyright notice and license text in any copy of the software/source.
          </p>
        </div>
      </div>

      {/* Third-Party Licenses */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Third-Party Licenses</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NPC Forge uses several third-party libraries and resources, each with their own licenses:
          </p>
          
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Major Dependencies</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Next.js</strong> – 
              <a
                href="https://github.com/vercel/next.js/blob/canary/license.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 ml-1"
              >
                MIT License
              </a>
            </li>
            <li>
              <strong>React</strong> – 
              <a
                href="https://github.com/facebook/react/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 ml-1"
              >
                MIT License
              </a>
            </li>
            <li>
              <strong>TypeScript</strong> – 
              <a
                href="https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 ml-1"
              >
                Apache 2.0
              </a>
            </li>
            <li>
              <strong>Tailwind CSS</strong> – 
              <a
                href="https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 ml-1"
              >
                MIT License
              </a>
            </li>
            <li>
              <strong>Lucide Icons</strong> – 
              <a
                href="https://github.com/lucide-icons/lucide/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 ml-1"
              >
                ISC License
              </a>
            </li>
          </ul>
          
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">API Usage</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NPC Forge relies on the OpenAI API for generation, which is subject to{" "}
            <a
              href="https://openai.com/policies/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
            >
              OpenAI's Terms of Use
            </a>.
          </p>
        </div>
      </div>

      {/* Content Ownership */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Content Ownership</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Generated Characters</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The characters and content generated using NPC Forge belong to you, the user. You are free to use them in any way you see fit, including in commercial projects.
          </p>

          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">OpenAI Usage Rights</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            According to OpenAI's policy at the time of writing, content created using their API services belongs to the entity that created it. However, please refer to the most current{" "}
            <a
              href="https://openai.com/policies/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
            >
              OpenAI Terms of Service
            </a>{" "}
            for any updates to this policy.
          </p>

          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Project Assets</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700 dark:text-gray-300">
            <li>The NPC Forge name, logo, and branding elements are proprietary to Ethan Perello.</li>
            <li>Documentation, example characters, and other project-specific content are provided under the same MIT License as the code unless otherwise specified.</li>
          </ul>
        </div>
      </div>

      {/* Contributing */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Contributing</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            By contributing to NPC Forge, you agree that your contributions will be licensed under the same MIT License as the rest of the project.
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Questions</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            If you have questions about licensing or usage rights, please contact{" "}
            <a
              href="mailto:ethanperello@gmail.com"
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
            >
              ethanperello@gmail.com
            </a>.
          </p>
        </div>
      </div>

      {/* Related Documentation */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for development participation
          </li>
          <li>
            <Link href="/docs/credits" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Credits &amp; Acknowledgements
            </Link>
            {" "}for project attribution
          </li>
          <li>
            <Link href="/docs/security" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Security Documentation
            </Link>
            {" "}for data handling practices
          </li>
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Setup
            </Link>
            {" "}for getting started with development
          </li>
        </ul>
      </div>

      {/* Footer Disclaimer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 text-center">
        <em>
          This information is provided for general understanding and does not constitute legal advice.
          Please consult a legal professional for specific guidance.
        </em>
      </div>
    </div>
  );
}