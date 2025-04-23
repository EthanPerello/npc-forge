import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'How to Use NPC Forge',
  description: 'A step-by-step guide on how to use NPC Forge to generate detailed NPCs for your games and stories.',
};

export default function HowToUsePage() {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none px-6 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-4">How to Use NPC Forge</h1>
      <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-8">
        NPC Forge is an AI-powered character generator for games, storytelling, and creative projects. Follow this guide to make the most of its features.
      </p>

      {/* Quick Start Guide */}
      <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>

      <h3 className="text-xl font-medium mb-2">1. Choose a template or write a description</h3>
      <p className="mb-6">
        Select a genre template (Fantasy, Sci‑Fi, Historical, or Contemporary) or enter your own character description. The more specific, the more tailored the result.
      </p>
      <blockquote className="border-l-4 pl-4 italic text-gray-700 dark:text-gray-300 mb-6">
        “A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic.”
      </blockquote>
      <div className="my-8 border rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/docs/character-tab-selections.png"
          alt="Character Tab Selections"
          width={800}
          height={500}
          className="w-full"
        />
      </div>

      <h3 className="text-xl font-medium mb-2">2. Customize character details</h3>
      <p className="mb-4">
        Use the tabs to configure traits, quests, dialogue, and inventory:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Character Tab</strong>: gender, age, alignment, relationship, and advanced traits</li>
        <li><strong>Quests Tab</strong>: quest type, rewards, number of quests</li>
        <li><strong>Dialogue Tab</strong>: tone, context, number of lines</li>
        <li><strong>Items Tab</strong>: item categories, rarity, quantity</li>
      </ul>
      <div className="my-8 border rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/docs/advanced-character-tab-selections.png"
          alt="Advanced Character Options"
          width={800}
          height={500}
          className="w-full"
        />
      </div>

      <h3 className="text-xl font-medium mb-2">3. Generate your character</h3>
      <p className="mb-4">
        Click <strong>Generate Character</strong>. The AI will produce:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Name, appearance, personality, backstory hook</li>
        <li>AI-generated portrait</li>
        <li>Quests, dialogue lines, and items (if selected)</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">4. Review and save</h3>
      <p className="mb-6">
        Explore all tabs for details. Download your character as JSON for future reference.
      </p>
      <div className="my-8 border rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/docs/character-tab-results.png"
          alt="Character Display Results"
          width={800}
          height={500}
          className="w-full"
        />
      </div>

      {/* Portrait Customization */}
      <h2 className="text-2xl font-semibold mb-4">Portrait Customization</h2>
      <p className="mb-4">
        NPC Forge lets you fine-tune portrait generation:
      </p>
      <div className="my-8 border rounded-lg overflow-hidden shadow-md">
        <Image
          src="/images/docs/portrait-character-tab-selections.png"
          alt="Portrait Options"
          width={800}
          height={500}
          className="w-full"
        />
      </div>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Art Style</strong>: realistic, fantasy, anime, comic, etc.</li>
        <li><strong>Mood</strong>: expression (neutral, happy, serious, etc.)</li>
        <li><strong>Framing</strong>: headshot, bust, full-body, action</li>
        <li><strong>Background</strong>: plain, gradient, themed environment</li>
      </ul>
      <blockquote className="border-l-4 pl-4 italic text-gray-700 dark:text-gray-300 mb-8">
        <strong>Tip:</strong> Specifying only key options often yields the best results—trust the AI’s creativity.
      </blockquote>

      {/* Usage Limits */}
      <h2 className="text-2xl font-semibold mb-4">Understanding Usage Limits</h2>
      <p className="mb-6">
        NPC Forge allows up to 15 character generations per month:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Monthly Reset</strong>: count resets at the start of each month</li>
        <li><strong>Remaining Generations</strong>: displayed in the usage indicator</li>
        <li><strong>Save Your Work</strong>: download JSON to keep characters beyond the limit</li>
      </ul>

      {/* Advanced Tips */}
      <h2 className="text-2xl font-semibold mb-4">Advanced Tips</h2>

      <h3 className="text-xl font-medium mb-2">Effective Descriptions</h3>
      <p className="mb-4">
        Use vivid, specific language for better output:
      </p>
      <p><strong>Good:</strong> “A rogue android engineer living on a space station who modifies tech beyond legal limits, making them a target for corporate security.”</p>
      <p><strong>Basic:</strong> “A tech engineer in space.”</p>

      <h3 className="text-xl font-medium mb-2">Using Templates</h3>
      <p className="mb-4">
        Each genre template has sub-genres for inspiration:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Fantasy:</strong> High Fantasy, Dark Fantasy, Urban Fantasy, Sword &amp; Sorcery</li>
        <li><strong>Sci-Fi:</strong> Space Opera, Cyberpunk, Post-Apocalyptic, Hard Sci-Fi</li>
        <li><strong>Historical:</strong> Medieval, Ancient Civilizations, Renaissance</li>
        <li><strong>Contemporary:</strong> Mystery &amp; Thriller, Slice of Life, Supernatural</li>
      </ul>

      <h3 className="text-xl font-medium mb-2">Character Iterations</h3>
      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li>Refine your description with more detail</li>
        <li>Generate again</li>
        <li>Repeat until satisfied</li>
      </ol>

      <h3 className="text-xl font-medium mb-2">Randomize & Clear</h3>
      <p className="mb-6">
        Use “Randomize Options” to shuffle traits or “Clear Options” to reset all fields while keeping your description.
      </p>

      {/* Example Use Cases */}
      <h2 className="text-2xl font-semibold mb-4">Example Use Cases</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Game Developers:</strong> Populate NPCs with consistent lore</li>
        <li><strong>Tabletop RPG Players:</strong> Quickly generate memorable side characters</li>
        <li><strong>Writers &amp; Worldbuilders:</strong> Create supporting cast for stories</li>
        <li><strong>Game Masters:</strong> Fill sessions with interesting NPCs on the fly</li>
      </ul>

      {/* Troubleshooting */}
      <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li><strong>Portrait Failed:</strong> Simplify options or try again</li>
        <li><strong>Generation Failed:</strong> Check your internet or API key—errors might come from disallowed content</li>
        <li><strong>Limit Reached:</strong> Wait for monthly reset or download existing characters</li>
      </ul>

      {/* Next Steps */}
      <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <Link href="/docs/character-examples" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            View Character Examples
          </Link>
        </li>
        <li>
          <Link href="/docs/faq" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            Read the FAQ
          </Link>
        </li>
        <li>
          <Link href="/docs/generation-options" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
            Explore Generation Options
          </Link>
        </li>
      </ul>
    </div>
  );
}
