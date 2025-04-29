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
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Character Generation</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>AI-powered character creation using OpenAI's GPT-4o-mini model</li>
              <li>Rich text descriptions for appearance, personality, and backstory</li>
              <li>Backstory hooks that set up character motivations</li>
              <li>Special abilities that make each character unique</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Image className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">AI Portrait Generation</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>DALL-E 3 integration for visual character representations</li>
              <li>Portrait customization options (art style, mood, framing, background)</li>
              <li>Visual consistency with character descriptions</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <LayoutList className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Character Elements</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Quest generation with titles, descriptions, rewards, and types</li>
              <li>Character-specific dialogue with customizable tone</li>
              <li>Item inventories with categories and rarity options</li>
              <li>Character traits and background elements</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <FileJson className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Export & Saving</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>JSON export for complete character data</li>
              <li>Future-proof format for importing into games</li>
              <li>Download functionality for local storage</li>
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
              <li><strong>Sub-genres:</strong> 16 specialized templates across the core genres</li>
              <li><strong>Example characters:</strong> Each template includes examples for inspiration</li>
            </ul>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <List className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Character Traits</h3>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Basic Traits:</strong> Gender, age group, moral alignment, relationship to player</li>
              <li><strong>Physical Traits:</strong> Height, build, distinctive features</li>
              <li><strong>Background:</strong> Social class, homeland, occupation</li>
              <li><strong>Personality:</strong> Multi-select system for up to 3 traits</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Settings className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Generation Options</h3>
            </div>
            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Quest Options:</strong> Types, rewards, quantity (1-3)</li>
              <li><strong>Dialogue Options:</strong> Tone, context, quantity (3-10)</li>
              <li><strong>Item Options:</strong> Categories, rarity, quantity (3-10)</li>
              <li><strong>Portrait Options:</strong> Art style, mood, framing, background</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Utility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Randomization</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Quick generation of random traits for inspiration, with options to randomize genre, character traits, 
              physical attributes, and more.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">User Interface</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Tabbed interface, expandable sections, responsive design for all devices, 
              and dark mode support.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Usage Management</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Character generation tracking, monthly limits with visual indicators, 
              and clear warning messages.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Features</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Planned for Future Releases</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Character Library:</strong> Save and organize characters locally (v0.3.0)</li>
            <li><strong>Talk to NPC:</strong> Interactive character conversations (v0.4.0)</li>
            <li><strong>Game Integration:</strong> Export formats for popular game engines</li>
            <li><strong>TTRPG Support:</strong> Character sheets for tabletop systems</li>
            <li><strong>Relationship Mapping:</strong> Create connections between NPCs</li>
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
            {" "}for step-by-step usage instructions
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Complete Generation Options Guide
            </Link>
            {" "}for detailed customization options
          </li>
          <li>
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              View Character Examples
            </Link>
            {" "}for sample generated characters
          </li>
        </ul>
      </div>
    </div>
  );
}