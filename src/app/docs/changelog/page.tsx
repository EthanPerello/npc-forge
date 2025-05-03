import Link from 'next/link';

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Changelog</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        All notable changes to NPC Forge are documented on this page.
        The format is based on <a href="https://keepachangelog.com/en/1.0.0/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
          Keep a Changelog
        </a>, and this project adheres to <a href="https://semver.org/spec/v2.0.0.html" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
          Semantic Versioning
        </a>.
      </p>
      
      {/* Documentation Update - 0.2.0 */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-sm py-1 px-2 rounded mr-3 font-bold">
            0.2.0
          </span>
          <span>April 22, 2025 - Documentation Update</span>
        </h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Added</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Fully integrated documentation system with sidebar and breadcrumb navigation</li>
            <li>New documentation pages in the app:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><code>/docs/how-to-use</code> – usage walkthrough for new users</li>
                <li><code>/docs/character-examples</code> – downloadable JSON examples</li>
                <li><code>/docs/generation-options</code> – full overview of generation settings</li>
                <li><code>/docs/features</code> – all major and optional features explained</li>
                <li><code>/docs/faq</code> – frequently asked questions</li>
                <li><code>/docs/dev-setup</code> – instructions for local setup</li>
                <li><code>/docs/architecture</code> – system and component structure</li>
                <li><code>/docs/api</code> – endpoint descriptions and formats</li>
                <li><code>/docs/security</code> – data handling and localStorage notes</li>
                <li><code>/docs/contributing</code> – style and structure guidelines</li>
                <li><code>/docs/testing</code> – setup and test structure</li>
                <li><code>/docs/deployment</code> – build and deploy to Vercel</li>
                <li><code>/docs/roadmap</code> – upcoming milestones</li>
                <li><code>/docs/changelog</code> – version history</li>
                <li><code>/docs/credits</code> – acknowledgments</li>
                <li><code>/docs/license</code> – license details</li>
              </ul>
            </li>
            <li>Corresponding GitHub Markdown files</li>
            <li>Navigation enhancements:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Collapsible sidebar with auto-expanding sections</li>
                <li>Breadcrumb navigation synced with route</li>
                <li>Mobile toggle with backdrop</li>
                <li>Sticky, scrollable layout with bottom collapse button on desktop</li>
              </ul>
            </li>
            <li>Success message added after character generation (auto-dismisses after 3 seconds)</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Changed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Character tab interface now auto-resets to the "Profile" tab after generation</li>
            <li>Refactored <code>/docs</code> folder for separation between page and markdown content</li>
            <li>Consolidated and renamed image and asset folders under the documentation system</li>
            <li>Redesigned homepage header: replaced static title text with layered hero layout</li>
            <li>Added full-width character collage image (fanned-cards.png) with responsive styling</li>
            <li>Adjusted header height and layout for better visual balance</li>
            <li>Improved title text with larger typography, custom drop shadow, and enhanced positioning</li>
            <li>Applied custom fade-in-up-slow animation for smoother entry effect</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">Fixed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Welcome guide toggle now functions reliably in dev and production environments</li>
            <li><code>useEffect</code> behavior in <code>CharacterDisplay</code> now correctly resets and displays new characters</li>
          </ul>
        </div>
      </div>
      
      {/* Welcome Guide & UI Overhaul - 0.1.4 */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-sm py-1 px-2 rounded mr-3 font-bold">
            0.1.4
          </span>
          <span>April 21, 2025 - Welcome Guide & UI Overhaul</span>
        </h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Added</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Welcome guide component with step-by-step instructions for new users</li>
            <li>"Get Started" button in the welcome guide that reveals the character creation form</li>
            <li>Tooltips for form options to help users understand their purpose</li>
            <li>Success animation triggered after character generation completes</li>
            <li>More Lucide icons used throughout the UI for visual consistency</li>
            <li>Enhanced animations and transitions for a smoother user experience</li>
            <li>Development-only feature: Welcome guide is always visible in development mode for easier testing</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Changed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Complete UI redesign with improved layout, spacing, and visual hierarchy</li>
            <li>Updated color palette to a consistent indigo/blue scheme</li>
            <li>Redesigned character card with better styling and visual clarity</li>
            <li>Refined tab interface with improved interaction feedback</li>
            <li>Replaced emoji-based item icons with consistent Lucide icons</li>
            <li>Enhanced mobile responsiveness across all screens and components</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">Fixed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Sub-genre selection now persists when switching between tabs in the character creation form</li>
            <li>Fixed infinite update loop in the usage limit display component</li>
            <li>Resolved layout issues affecting mobile views</li>
            <li>Improved tab behavior and styling consistency</li>
          </ul>
        </div>
      </div>
      
      {/* Advanced Randomization - 0.1.3 */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-sm py-1 px-2 rounded mr-3 font-bold">
            0.1.3
          </span>
          <span>April 19, 2025 - Advanced Randomization</span>
        </h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Added</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Advanced character randomization with support for sub-genres and visual traits</li>
            <li>Visual trait support in portrait generation for improved consistency and style</li>
            <li>Usage limit system:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Monthly caps per device</li>
                <li>Progress tracking and visual feedback</li>
                <li>Warning messages for approaching limits</li>
              </ul>
            </li>
            <li>Development-only bypass for usage limits</li>
            <li>New utility functions for trait formatting and visual data processing</li>
            <li>Input validation and sanitization for safer and more complete data entry</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Changed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Replaced "None" with "Not specified" across all dropdowns</li>
            <li>Improved capitalization and formatting of displayed trait values</li>
            <li>Enhanced OpenAI prompt structure for better reliability and output clarity</li>
            <li>Refined occupation list, removing niche roles and organizing by genre</li>
            <li>Improved genre templates with better sub-genre examples and structure</li>
            <li>More specific error messages for common API issues</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">Fixed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Removed underscores and improved capitalization in trait labels</li>
            <li>Improved portrait generation prompts for consistent formatting and detail</li>
          </ul>
        </div>
      </div>
      
      {/* UI & Customization - 0.1.2 */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-sm py-1 px-2 rounded mr-3 font-bold">
            0.1.2
          </span>
          <span>April 18, 2025 - UI & Customization</span>
        </h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Added</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>"Clear Options" button that preserves custom description and portrait selections</li>
            <li>Advanced physical traits: height, build, and distinctive features</li>
            <li>Background & origin options, including social class and homeland</li>
            <li>Multi-select personality traits system (up to 3 traits)</li>
            <li>Searchable occupation selector with groupings by genre</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Changed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Upgraded genre system with expanded sub-genres</li>
            <li>Introduced Lucide-based icons for genre visual indicators</li>
            <li>Color-coded UI based on genre categories</li>
            <li>Reorganized advanced options into clear, logical sections</li>
            <li>Improved templates with clearer descriptions and examples</li>
          </ul>
        </div>
      </div>
      
      {/* Portrait Customization - 0.1.1 */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-sm py-1 px-2 rounded mr-3 font-bold">
            0.1.1
          </span>
          <span>April 17, 2025 - Portrait Customization</span>
        </h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-4">
          <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Added</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Portrait customization options:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Art style (realistic, anime, comic, etc.)</li>
                <li>Expression/mood</li>
                <li>Framing (portrait, bust, full-body)</li>
                <li>Background style</li>
              </ul>
            </li>
            <li>Expandable advanced options section</li>
            <li>Searchable dropdown component for improved UX</li>
            <li>PWA support: app manifest and installable icons</li>
            <li>Enhanced Open Graph and metadata for link previews</li>
          </ul>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Changed</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>UI reorganization for improved clarity and navigation</li>
            <li>Better dropdown UX with searchable and grouped entries</li>
            <li>Refined OpenAI prompt construction for portrait generation</li>
          </ul>
        </div>
      </div>
      
      {/* Initial Release - 0.1.0 */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-300 text-sm py-1 px-2 rounded mr-3 font-bold">
            0.1.0
          </span>
          <span>April 12, 2025 - Initial Release</span>
        </h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Added</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Initial release with full character generation engine</li>
            <li>Genre selection with rich templates</li>
            <li>Basic traits: gender, age, alignment, relationships</li>
            <li>Quest, dialogue, and item generation options</li>
            <li>AI-generated portraits via DALL·E 3</li>
            <li>Export to JSON feature</li>
            <li>Fully responsive UI for desktop and mobile</li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/roadmap" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Roadmap
            </Link>
            {" "}for future plans
          </li>
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}for current capabilities
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for how to help with development
          </li>
          <li>
            <Link href="/docs" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Documentation Home
            </Link>
            {" "}for all documentation
          </li>
        </ul>
      </div>
    </div>
  );
}