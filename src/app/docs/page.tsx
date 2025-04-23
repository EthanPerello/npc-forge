import Link from 'next/link';

export const metadata = {
  title: 'NPC Forge Documentation',
  description: 'Official NPC Forge documentation hub: guides, examples, and developer references.',
};

export default function DocsIndexPage() {
  return (
    <div className="prose prose-blue dark:prose-invert max-w-none px-6 py-8">
      <h1 className="text-4xl font-extrabold mb-4">NPC Forge Documentation</h1>
      <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-8">
        Welcome to the NPC Forge documentation. Here you'll find user guides, example characters, and developer references to help you get the most out of the app.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* User Guides Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">User Guides</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/docs/how-to-use" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                How to Use NPC Forge
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Step-by-step guide to creating characters.</p>
            </li>
            <li>
              <Link href="/docs/character-examples" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Character Examples
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sample NPCs across genres with downloadable JSON.</p>
            </li>
            <li>
              <Link href="/docs/generation-options" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Generation Options
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Detailed breakdown of customization options.</p>
            </li>
            <li>
              <Link href="/docs/features" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Features
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overview of core and advanced capabilities.</p>
            </li>
            <li>
              <Link href="/docs/faq" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                FAQ
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Answers to common questions.</p>
            </li>
          </ul>
        </div>

        {/* Developer Reference Card */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Developer Documentation</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/docs/dev-setup" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Development Setup
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Local environment and project setup.</p>
            </li>
            <li>
              <Link href="/docs/architecture" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Architecture
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">High-level system structure and flow.</p>
            </li>
            <li>
              <Link href="/docs/api" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                API Reference
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Endpoints and request/response formats.</p>
            </li>
            <li>
              <Link href="/docs/security" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Security
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Input validation and data privacy practices.</p>
            </li>
            <li>
              <Link href="/docs/contributing" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Contributing
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Guidelines for code and doc contributions.</p>
            </li>
            <li>
              <Link href="/docs/testing" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Testing
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manual and automated test procedures.</p>
            </li>
            <li>
              <Link href="/docs/deployment" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Deployment
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Deploying to Vercel and other platforms.</p>
            </li>
            <li>
              <Link href="/docs/roadmap" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Roadmap
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming features and release timelines.</p>
            </li>
            <li>
              <Link href="/docs/changelog" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Changelog
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Version history and updates.</p>
            </li>
            <li>
              <Link href="/docs/credits" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                Credits
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">Acknowledgments and third-party credits.</p>
            </li>
            <li>
              <Link href="/docs/license" className="text-xl font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                License
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">MIT License details.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
