import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'How to Use NPC Forge',
  description: 'A step-by-step guide on how to use NPC Forge to generate detailed NPCs for your games and stories.',
};

export default function HowToUsePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">How to Use NPC Forge</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300">
        NPC Forge is an AI-powered character generator for games, storytelling, and creative projects. Follow this guide to make the most of its features.
      </p>

      {/* Quick Start Guide */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>

        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">1. Choose a template or write a description</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Select a genre template (Fantasy, Sci‑Fi, Historical, or Contemporary) or enter your own character description. The more specific, the more tailored the result.
            </p>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 italic text-gray-700 dark:text-gray-300 mb-4">
              "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic."
            </div>
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/character-tab-selections.png"
                alt="Character Tab Selections"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">2. Customize character details</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Use the tabs to configure traits, quests, dialogue, and inventory:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Character Tab</strong>: gender, age, alignment, relationship, and advanced traits</li>
              <li><strong>Quests Tab</strong>: quest type, rewards, number of quests</li>
              <li><strong>Dialogue Tab</strong>: tone, context, number of lines</li>
              <li><strong>Items Tab</strong>: item categories, rarity, quantity</li>
            </ul>
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/advanced-character-tab-selections.png"
                alt="Advanced Character Options"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">3. Generate your character</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Click <strong>Generate Character</strong>. The AI will produce:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Name, appearance, personality, backstory hook</li>
              <li>AI-generated portrait</li>
              <li>Quests, dialogue lines, and items (if selected)</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">4. Review and save</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Explore all tabs for details. Download your character as JSON for future reference.
            </p>
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/character-tab-results.png"
                alt="Character Display Results"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Portrait Customization */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Portrait Customization</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NPC Forge lets you fine-tune portrait generation:
          </p>
          <div className="my-4 border rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/portrait-character-tab-selections.png"
              alt="Portrait Options"
              width={800}
              height={500}
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Art Style</strong>: realistic, fantasy, anime, comic, etc.</li>
            <li><strong>Mood</strong>: expression (neutral, happy, serious, etc.)</li>
            <li><strong>Framing</strong>: headshot, bust, full-body, action</li>
            <li><strong>Background</strong>: plain, gradient, themed environment</li>
          </ul>
          <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
            <p className="italic text-yellow-800 dark:text-yellow-300">
              <strong>Tip:</strong> Specifying only key options often yields the best results—trust the AI's creativity.
            </p>
          </div>
        </div>
      </div>

      {/* Usage Limits */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Understanding Usage Limits</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            NPC Forge allows up to 15 character generations per month:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Monthly Reset</strong>: count resets at the start of each month</li>
            <li><strong>Remaining Generations</strong>: displayed in the usage indicator</li>
            <li><strong>Save Your Work</strong>: download JSON to keep characters beyond the limit</li>
          </ul>
        </div>
      </div>

      {/* Advanced Tips */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Advanced Tips</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Effective Descriptions</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Use vivid, specific language for better output:
            </p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Good:</strong> "A rogue android engineer living on a space station who modifies tech beyond legal limits, making them a target for corporate security."</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Basic:</strong> "A tech engineer in space."</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Using Templates</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Each genre template has sub-genres for inspiration:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Fantasy:</strong> High Fantasy, Dark Fantasy, Urban Fantasy, Sword &amp; Sorcery</li>
              <li><strong>Sci-Fi:</strong> Space Opera, Cyberpunk, Post-Apocalyptic, Hard Sci-Fi</li>
              <li><strong>Historical:</strong> Medieval, Ancient Civilizations, Renaissance</li>
              <li><strong>Contemporary:</strong> Mystery &amp; Thriller, Slice of Life, Supernatural</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Iterations</h3>
            <ol className="list-decimal pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Refine your description with more detail</li>
              <li>Generate again</li>
              <li>Repeat until satisfied</li>
            </ol>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Randomize & Clear</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Use "Randomize Options" to shuffle traits or "Clear Options" to reset all fields while keeping your description.
            </p>
          </div>
        </div>
      </div>

      {/* Example Use Cases */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Example Use Cases</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Game Developers:</strong> Populate NPCs with consistent lore</li>
            <li><strong>Tabletop RPG Players:</strong> Quickly generate memorable side characters</li>
            <li><strong>Writers &amp; Worldbuilders:</strong> Create supporting cast for stories</li>
            <li><strong>Game Masters:</strong> Fill sessions with interesting NPCs on the fly</li>
          </ul>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Portrait Failed:</strong> Simplify options or try again</li>
            <li><strong>Generation Failed:</strong> Check your internet or API key—errors might come from disallowed content</li>
            <li><strong>Limit Reached:</strong> Wait for monthly reset or download existing characters</li>
          </ul>
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              View Character Examples
            </Link>
            {" "}to see what's possible
          </li>
          <li>
            <Link href="/docs/faq" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Read the FAQ
            </Link>
            {" "}for answers to common questions
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Explore Generation Options
            </Link>
            {" "}for all customization settings
          </li>
        </ul>
      </div>
    </div>
  );
}