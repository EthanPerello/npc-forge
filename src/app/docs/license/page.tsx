import React from 'react';

export default function LicensePage() {
  return (
    <div className="prose prose-blue dark:prose-invert max-w-none px-6 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-6">License Information</h1>

      {/* Intro */}
      <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-8">
        NPC Forge is made available under the terms of the MIT License.
      </p>

      {/* MIT License Section */}
      <h2 className="text-2xl font-bold mb-4">MIT License</h2>
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8 overflow-auto font-mono text-sm">
        <pre className="whitespace-pre-wrap">
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

      {/* What This Means */}
      <h2 className="text-2xl font-bold mb-4">What This Means</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
        <li>Use NPC Forge commercially</li>
        <li>Modify the code</li>
        <li>Distribute your own versions</li>
        <li>Use it privately</li>
        <li>Use it as part of larger works</li>
      </ul>
      <p className="mb-8">
        The only requirement is that you include the original copyright notice and
        license text in any copy of the software/source.
      </p>

      {/* Third-Party Licenses */}
      <h2 className="text-2xl font-bold mb-4">Third-Party Licenses</h2>
      <p className="mb-4">
        NPC Forge uses several third-party libraries and resources, each under its own license:
      </p>
      <h3 className="text-xl font-semibold mb-2">Major Dependencies</h3>
      <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Next.js</strong> – 
          <a
            href="https://github.com/vercel/next.js/blob/canary/license.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
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
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
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
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
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
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
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
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
          >
            ISC License
          </a>
        </li>
      </ul>

      {/* API Usage */}
      <h3 className="text-xl font-semibold mb-2">API Usage</h3>
      <p className="mb-8">
        NPC Forge relies on the OpenAI API for generation, which is subject to
        <a
          href="https://openai.com/policies/terms-of-use"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
        >
          OpenAI’s Terms of Use
        </a>.
      </p>

      {/* Content Ownership */}
      <h2 className="text-2xl font-bold mb-4">Content Ownership</h2>

      <h3 className="text-xl font-semibold mb-2">Generated Characters</h3>
      <p className="mb-4">
        Characters and content generated by NPC Forge belong to you. Feel free to use them
        in personal or commercial projects.
      </p>

      <h3 className="text-xl font-semibold mb-2">OpenAI Usage Rights</h3>
      <p className="mb-4">
        As per OpenAI policy, content you generate using their API belongs to you. For
        updates, see the
        <a
          href="https://openai.com/policies/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
        >
          OpenAI Terms of Service
        </a>.
      </p>

      <h3 className="text-xl font-semibold mb-2">Project Assets</h3>
      <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-700 dark:text-gray-300">
        <li>The NPC Forge name, logo, and branding elements are proprietary to Ethan Perello.</li>
        <li>All documentation and example content are under the same MIT License unless noted otherwise.</li>
      </ul>

      {/* Contributing */}
      <h2 className="text-2xl font-bold mb-4">Contributing</h2>
      <p className="mb-8">
        By contributing to NPC Forge, you agree to license your contributions under the MIT License.
      </p>

      {/* Questions */}
      <h2 className="text-2xl font-bold mb-4">Questions</h2>
      <p className="mb-6">
        For licensing inquiries, contact
        <a
          href="mailto:ethanperello@gmail.com"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
        >
          ethanperello@gmail.com
        </a>.
      </p>

      {/* Footer Disclaimer */}
      <hr className="my-8 border-gray-200 dark:border-gray-700" />
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <em>
          This information is provided for general understanding and does not constitute legal advice.
          Please consult a legal professional for specific guidance.
        </em>
      </p>
    </div>
  );
}
