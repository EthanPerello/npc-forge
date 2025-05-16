import Link from 'next/link';
import { Sparkles, BookOpen, Image, Archive, LayoutList, List, Settings, FileJson } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">NPC Forge Features</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300">
        NPC Forge offers a comprehensive set of tools for creating rich, detailed non-player characters for your games, 
        stories, and creative projects. This document outlines all available features.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Wizard-Based Character Creation (v0.13.0)</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Step-by-Step Process: Guided creation through four distinct steps</li>
              <li>Progress Tracking: Sticky progress bar with clickable navigation</li>
              <li>Welcome Guide: Introduction popup for first-time users</li>
              <li>Quick Generation: "Generate Random Character" button for instant results</li>
              <li>Step-Aware Controls: Context-sensitive footer with Continue, Back, and New Character buttons</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Archive className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Character Library System</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Complete CRUD Operations: Create, Read, Update, Delete characters</li>
              <li>Local Storage: Uses IndexedDB for reliable character storage</li>
              <li>Search and Filter: Find characters by name, genre, or traits</li>
              <li>Import/Export: JSON import/export for character data</li>
              <li>Example Characters: Pre-loaded sample characters for inspiration</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Settings className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Character Regeneration (v0.12.0)</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Individual Attribute Regeneration: Regenerate specific character elements</li>
              <li>Portrait Regeneration: Update character portraits with different models</li>
              <li>Component-Level Regeneration: Individual quest elements, dialogue lines, item descriptions</li>
              <li>Loading States: Visual feedback during regeneration</li>
              <li>Model Selection: Choose different AI models for regeneration</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">AI-Powered Character Generation</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Multiple AI Models: Choose from different quality tiers</li>
              <li>Rich Text Descriptions: Detailed paragraphs for appearance, personality, and backstory</li>
              <li>Backstory Hooks: Concise hooks that set up character motivations</li>
              <li>Special Abilities: Unique powers or skills that make each character distinctive</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Image className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">AI Portrait Generation</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Multiple Image Models: dall-e-2, dall-e-3, and gpt-image-1</li>
              <li>Portrait Customization: Control art style, mood, framing, and background</li>
              <li>Visual Consistency: Images match character descriptions and traits</li>
              <li>Portrait Storage: Images saved locally with IndexedDB</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <LayoutList className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Comprehensive Character Elements</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Quest Generation: Create quests including title, description, reward, and type</li>
              <li>Dialogue Lines: Generate character-specific dialogue with customizable tone and context</li>
              <li>Item Inventories: Create lists of items with customizable categories and rarity</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Customization Options</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg mb-6 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <BookOpen className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Genre & Template System</h3>
          </div>
          <div className="mb-3 text-gray-700 dark:text-gray-300">
            <p className="mb-2">NPC Forge offers a comprehensive genre system to shape your characters:</p>
            <ul className="list-disc list-inside pl-4 space-y-1">
              <li><strong>Core genres:</strong> Fantasy, Science Fiction, Historical, Contemporary</li>
              <li><strong>Sub-genres:</strong> 16 specialized templates within each core genre</li>
              <li><strong>Example characters:</strong> Each template includes examples for inspiration</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg mb-6 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <Settings className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Model Selection System (v0.7.0)</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Tier</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Text Model</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Image Model</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Monthly Limit</th>
                  <th className="border border-gray-300 dark:border-gray-600 p-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">🟢 Standard</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">gpt-4o-mini</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">dall-e-2</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">Unlimited</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">Frequent generations</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">🟡 Enhanced</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">gpt-4.1-mini</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">dall-e-3</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">30/month</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">Higher quality</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">🔴 Premium</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">gpt-4o</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">gpt-image-1</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">10/month</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">Maximum detail</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <List className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Character Trait Customization</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Basic Traits</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Gender, age group, moral alignment, relationship to player</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">Advanced Options</h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Physical traits, background elements, occupation, personality traits (unlimited selection)</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Settings className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Generation Options</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Quest Options:</strong> Types, rewards, quantity (1-3)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Dialogue Options:</strong> Tone, context, quantity (3-10)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Item Options:</strong> Categories, rarity, quantity (3-10)</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm"><strong>Portrait Options:</strong> Art style, mood, framing, background</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Utility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Editing (v0.10.0+)</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>Full Character Editing: Modify all character attributes</li>
              <li>Add/Remove Elements: Dynamically add or remove quests, dialogue, and items</li>
              <li>Regeneration Controls: Regenerate specific character elements</li>
              <li>Portrait Management: Upload or regenerate character portraits</li>
              <li>Model Selection: Choose different AI models for regeneration</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">User Interface Enhancements</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>Dark Mode Support: Complete dark mode toggle with theme persistence</li>
              <li>Responsive Design: Optimized for desktop, tablet, and mobile</li>
              <li>Sticky Footer: Quick access to generation controls</li>
              <li>Loading Notifications: Floating messages during character generation</li>
              <li>Success Animations: Visual feedback after character creation</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Randomization & Management</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>Randomize Options: Quickly generate random traits for inspiration</li>
              <li>Clear Options: Reset all character traits while preserving description and portrait settings</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Usage Management</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>Per-Model Usage Tracking: Individual quotas for different AI models</li>
              <li>Visual Indicators: Clear display of remaining generations</li>
              <li>Development Bypass: Unlimited usage in development mode</li>
              <li>Monthly Reset: Automatic limit reset at month start</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technical Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">API Integration</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>Multiple OpenAI Models: Support for various text and image generation models</li>
              <li>Regeneration API: Dedicated /api/regenerate endpoint for character updates</li>
              <li>Error Handling: Graceful fallbacks for API failures</li>
              <li>Content Filtering: Automatic content policy compliance</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Storage & Performance</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>IndexedDB Integration: Reliable local storage for characters and portraits</li>
              <li>Database Recovery: Resilient storage with validation and recovery logic</li>
              <li>Portrait Compression: Automatic compression and storage of portrait images</li>
              <li>Efficient API Usage: Optimized prompts to minimize token consumption</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Security & Privacy</h3>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>No Server Storage: Characters stored only locally</li>
              <li>Input Sanitization: Prevents malicious inputs</li>
              <li>Client-Side Limits: Usage tracking without external dependencies</li>
              <li>Privacy-First: No personal data collection or tracking</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <FileJson className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Export & Saving</h3>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li>JSON export for complete character data</li>
              <li>Portrait downloads for character images</li>
              <li>Future-proof format for importing into games</li>
              <li>Complete data ownership and portability</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Features</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Planned for Future Releases</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>"Talk to NPC" Chat Interface</strong> (v0.14.0): Interactive conversations with your characters</li>
            <li><strong>User Accounts & Cloud Features</strong> (v0.15.0): Account creation and cloud sync</li>
            <li><strong>Game Integration API</strong> (v1.0.0): RESTful API for accessing characters</li>
            <li><strong>Advanced Character Features</strong>: Voice generation, 3D models, character relationships</li>
            <li><strong>World Building Tools</strong>: Setting generation, maps, and cultural context</li>
          </ul>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            For more details, see the <Link href="/docs/roadmap" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Development Roadmap</Link>.
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              How to Use NPC Forge
            </Link>
            {" "}for step-by-step usage guide
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library Guide
            </Link>
            {" "}for managing your character collection
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Generation Options
            </Link>
            {" "}for detailed customization options
          </li>
          <li>
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Examples
            </Link>
            {" "}for sample generated characters
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}for understanding AI model tiers
          </li>
        </ul>
      </div>
    </div>
  );
}