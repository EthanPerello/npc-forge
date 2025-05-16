import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle, Settings, Wand2, Save, Search } from 'lucide-react';

export const metadata = {
  title: 'How to Use NPC Forge',
  description: 'Step-by-step guide to creating detailed NPCs for your games and stories with the new wizard interface.',
};

export default function HowToUsePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">How to Use NPC Forge</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        NPC Forge is an AI-powered character generator featuring a step-by-step wizard interface for creating detailed NPCs for games, storytelling, and creative projects. This guide will walk you through the new wizard-based creation process and all available features.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Quick Start Guide</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-6">
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
            <PlayCircle className="h-5 w-5 mr-2" />
            Welcome to the Wizard
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            When you first visit NPC Forge, you'll see a welcome popup that introduces the new wizard interface. The wizard guides you through four steps to create your perfect character.
          </p>
          
          <div className="my-4 border rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/site-header.png"
              alt="Site Header"
              width={800}
              height={500}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Step 1: Concept</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Choose your foundation:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Select a Genre</strong>: Pick from Fantasy, Sci-Fi, Historical, or Contemporary</li>
              <li><strong>Pick a Sub-Genre</strong>: Choose from 16 specialized templates (e.g., High Fantasy, Cyberpunk, Medieval)</li>
              <li><strong>Write Your Description</strong>: Provide a detailed description of your character</li>
            </ul>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Example description:</h4>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic that causes plants to grow in her footsteps."
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Pro Tip:</strong> The more specific your description, the more tailored your character will be.
              </p>
            </div>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/concept-step.png"
                alt="Concept Step"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Step 2: Options</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Customize character traits:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Basic Traits</strong>: Set gender, age, moral alignment, and relationship to player</li>
              <li><strong>Advanced Options</strong> (expandable):
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Physical traits (height, build, distinctive features)</li>
                  <li>Background (social class, homeland, occupation)</li>
                  <li>Personality traits (unlimited selection)</li>
                </ul>
              </li>
              <li><strong>Additional Elements</strong>:
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Enable/disable quests, dialogue, and items</li>
                  <li>Customize quest types, dialogue tone, item categories</li>
                </ul>
              </li>
            </ul>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Navigation Tip:</strong> Use the sticky progress bar at the top to jump between steps at any time.
              </p>
            </div>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/options-step.png"
                alt="Options Step"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Step 3: Model Selection</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Choose your AI models:</strong>
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Tier</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Text Model</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Image Model</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Usage</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🟢 Standard</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-4o-mini</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">dall-e-2</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Unlimited</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Regular use</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🟡 Enhanced</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-4.1-mini</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">dall-e-3</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">30/month</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Higher quality</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🔴 Premium</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-4o</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-image-1</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">10/month</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum detail</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Portrait Customization</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Art style (realistic, fantasy, anime, etc.)</li>
              <li>Expression/mood (neutral, happy, serious, etc.)</li>
              <li>Framing (portrait, bust, full-body, action)</li>
              <li>Background (plain, gradient, themed, etc.)</li>
            </ul>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For a comprehensive understanding of model tiers and usage strategies, see the{" "}
              <Link href="/docs/models" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Model Selection Guide
              </Link>.
            </p>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/model-step.png"
                alt="Model Step"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Step 4: Generate</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Create your character:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Click "Generate Character" to start the AI generation process</li>
              <li>Watch the progress as your character is created</li>
              <li>Review the complete character profile with tabs for different sections</li>
            </ul>
            
            <div className="bg-green-50 p-3 rounded-md border border-green-200 dark:bg-green-900/20 dark:border-green-800">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>Quick Generation:</strong> Click "Generate Random Character" from any step to create a character with default settings instantly.
              </p>
            </div>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/generate-step.png"
                alt="Generate Step"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Character Library</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Save className="h-5 w-5 mr-2" />
              Saving Characters
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              After generating a character, use the "Save to Library" button to add it to your collection.
            </p>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/character-library.png"
                alt="Character Library"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Managing Your Library
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Browse Characters</strong>: View all saved characters with visual cards</li>
              <li><strong>Search & Filter</strong>: Find specific characters by name, genre, or traits</li>
              <li><strong>Direct Actions</strong>: Each card has buttons for editing, downloading, and deleting</li>
              <li><strong>Import/Export</strong>: Upload JSON files or download characters for backup</li>
            </ul>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For detailed library management, see the{" "}
              <Link href="/docs/library" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Character Library Guide
              </Link>.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Editing Characters</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Full editing capabilities:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Modify all character attributes</li>
              <li>Add or remove quests, dialogue lines, and items</li>
              <li>Regenerate specific character elements</li>
              <li>Upload or regenerate portraits</li>
              <li>Choose different AI models for regeneration</li>
            </ul>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/edit-page.png"
                alt="Edit Page"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn more about character editing in the{" "}
              <Link href="/docs/library" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Character Library Guide
              </Link>.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Advanced Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Regeneration</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Regenerate individual elements:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Character attributes (name, appearance, personality, backstory)</li>
              <li>Portrait with different models or styles</li>
              <li>Individual quest components (title, description, reward)</li>
              <li>Specific dialogue lines</li>
              <li>Item descriptions</li>
            </ul>
            
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">How to regenerate:</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Open character in edit mode</li>
                <li>Click the regenerate icon next to any element</li>
                <li>Choose your preferred model (if applicable)</li>
                <li>Wait for the new content to generate</li>
              </ol>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Model Selection Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Standard Tier</strong>: Perfect for frequent use and experimentation</li>
              <li><strong>Enhanced Tier</strong>: Use for important characters requiring higher quality</li>
              <li><strong>Premium Tier</strong>: Reserve for key NPCs needing maximum detail</li>
            </ul>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For a comprehensive understanding of model tiers and usage strategies, see the{" "}
              <Link href="/docs/models" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Model Selection Guide
              </Link>.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Portrait Customization Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Only specify options that matter most to you</li>
              <li>Leave some options unset to give the AI creative freedom</li>
              <li>Experiment with different art styles for variety</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Common Workflows</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Quick Character Creation</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Click "Generate Random Character" from any step</li>
              <li>Review the generated character</li>
              <li>Make minor edits if needed</li>
              <li>Save to library</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Detailed Character Creation</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Start with Concept step and write a detailed description</li>
              <li>Set specific traits in Options step</li>
              <li>Choose appropriate model tier in Model step</li>
              <li>Generate and review in Generate step</li>
              <li>Edit and regenerate elements as needed</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Creating Character Sets</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Create your first character with specific traits</li>
              <li>Save to library</li>
              <li>Use similar descriptions and traits for related characters</li>
              <li>Edit relationships and backstories to connect them</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Generation Issues</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Character generation failed</strong>: Check your internet connection and try again</li>
              <li><strong>Portrait generation failed</strong>: Try with different portrait options or simpler descriptions</li>
              <li><strong>Slow generation</strong>: This is normal for higher-tier models; wait patiently</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Library Issues</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Characters not saving</strong>: Your browser storage might be full; delete old characters</li>
              <li><strong>Can't edit character</strong>: Make sure it's a user-created character, not an example</li>
              <li><strong>Lost characters</strong>: Characters are stored locally; they don't sync between devices</li>
            </ul>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              For more library troubleshooting, see the{" "}
              <Link href="/docs/library" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Character Library Guide
              </Link>.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Usage Limits</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Reached monthly limit</strong>: Wait for the monthly reset or use Standard tier</li>
              <li><strong>Unexpected limit reached</strong>: Check which models you're using and their individual limits</li>
            </ul>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Learn more about usage management in the{" "}
              <Link href="/docs/models" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Model Selection Guide
              </Link>.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Tips for Best Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Writing Descriptions</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Be specific about key details (appearance, personality, background)</li>
              <li>Include unique elements that make the character memorable</li>
              <li>Mention any special abilities or distinctive features</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Using Advanced Options</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Select personality traits that complement each other</li>
              <li>Choose occupation that fits the genre and character concept</li>
              <li>Use physical traits to reinforce the character's background</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Portrait Generation</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Describe visual elements in your character description</li>
              <li>Choose art style that matches your game's aesthetic</li>
              <li>Use themed backgrounds for context</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Library Organization</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use descriptive names for easy searching</li>
              <li>Group related characters with similar naming conventions</li>
              <li>Download important characters as JSON for backup</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Keyboard Shortcuts</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><kbd className="px-2 py-1 text-xs bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-600">Tab</kbd> / <kbd className="px-2 py-1 text-xs bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-600">Shift+Tab</kbd>: Navigate between form fields</li>
            <li><kbd className="px-2 py-1 text-xs bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-600">Enter</kbd>: Submit current step (equivalent to Continue/Generate)</li>
            <li><kbd className="px-2 py-1 text-xs bg-gray-100 border rounded dark:bg-gray-800 dark:border-gray-600">Escape</kbd>: Close modals and popups</li>
          </ul>
        </div>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/20 dark:border-green-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300 flex items-center">
          <Wand2 className="h-5 w-5 mr-2" />
          Next Steps
        </h2>
        <ul className="list-disc list-inside space-y-1 text-green-600 dark:text-green-400">
          <li>
            Explore{" "}
            <Link href="/docs/character-examples" className="underline hover:text-green-800 dark:hover:text-green-300">
              Character Examples
            </Link>
            {" "}to see what's possible
          </li>
          <li>
            Read about{" "}
            <Link href="/docs/generation-options" className="underline hover:text-green-800 dark:hover:text-green-300">
              Generation Options
            </Link>
            {" "}for detailed customization
          </li>
          <li>
            Check the{" "}
            <Link href="/docs/library" className="underline hover:text-green-800 dark:hover:text-green-300">
              Character Library Guide
            </Link>
            {" "}for advanced management features
          </li>
          <li>
            View the{" "}
            <Link href="/docs/models" className="underline hover:text-green-800 dark:hover:text-green-300">
              Model Selection Guide
            </Link>
            {" "}to understand AI model differences
          </li>
          <li>
            See all available features in the{" "}
            <Link href="/docs/features" className="underline hover:text-green-800 dark:hover:text-green-300">
              Features Overview
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Getting Help</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            Check the{" "}
            <Link href="/docs/faq" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              FAQ
            </Link>
            {" "}for common questions
          </li>
          <li>
            Report issues on{" "}
            <a href="https://github.com/EthanPerello/npc-forge/issues" className="underline hover:text-indigo-800 dark:hover:text-indigo-300" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            Contact support at{" "}
            <a href="mailto:ethanperello@gmail.com" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              ethanperello@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}