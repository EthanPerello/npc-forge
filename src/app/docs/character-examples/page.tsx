import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Book, FileJson, BookOpen, Wand2, Zap, Wand, User, Download, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'NPC Forge Character Examples',
  description: 'Example characters created with NPC Forge across different genres and settings.',
};

export default function CharacterExamplesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Character Examples</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        This page showcases examples of NPCs created with NPC Forge. Each demonstrates different genre
        capabilities, customization options, and the level of detail possible with the tool.
      </p>

      {/* Fantasy Characters */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Wand className="h-5 w-5 mr-2" />
          Fantasy Characters
        </h2>

        {/* Elarion */}
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-6">
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Elarion</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="border rounded-lg overflow-hidden shadow-md mb-4">
                <Image
                  src="/images/elarion.png"
                  alt="Elarion – Fantasy Wizard"
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Character Traits</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Genre:</strong> Fantasy (High Fantasy)</li>
                  <li><strong>Gender:</strong> Male</li>
                  <li><strong>Age:</strong> Elder</li>
                  <li><strong>Alignment:</strong> Good</li>
                  <li><strong>Relationship:</strong> Mentor</li>
                  <li><strong>Occupation:</strong> Wizard</li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Character Description Used</h4>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 italic text-gray-700 dark:text-gray-300">
                  "A wise elven wizard who serves as a mentor to young heroes, possessing ancient knowledge and powerful magic that glows with ethereal light."
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Appearance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Elarion is a tall, thin figure with long silver hair that cascades down his back, framing a face marked by wisdom and serenity. His glowing violet eyes seem to pierce through the veil of reality, capturing the essence of all they behold. His skin is smooth and fair, with luminescent runes etched along his arms, only visible when he channels his formidable magic.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Backstory Hook</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Once a celebrated hero during the Age of Titans, Elarion now guards the dangerous secrets of the past while shaping the future of new heroes in the floating city of Aerthalon.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Special Ability</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Arcane Insight:</strong> Elarion can tap into the ancient knowledge of the cosmos, allowing him to reveal hidden truths and provide guidance based on visions from the past.
                </p>
              </div>
              
              <Link
                href="/docs/examples/elarion.json"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors border-0"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Science Fiction Characters */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Science Fiction Characters
        </h2>

        {/* Kira-7 */}
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-6">
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Kira-7</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="border rounded-lg overflow-hidden shadow-md mb-4">
                <Image
                  src="/images/kira-7.png"
                  alt="Kira-7 – Cyberpunk AI"
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Character Traits</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Genre:</strong> Sci-Fi (Cyberpunk)</li>
                  <li><strong>Gender:</strong> Nonbinary</li>
                  <li><strong>Alignment:</strong> Evil</li>
                  <li><strong>Relationship:</strong> Enemy</li>
                  <li><strong>Social Class:</strong> Outcast</li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Character Description Used</h4>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 italic text-gray-700 dark:text-gray-300">
                  "A rogue AI with a physical android body, rebelling against their creators with dangerous cybernetic abilities and a violent hatred for organic life."
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Appearance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Kira-7 stands at an average height, her athletic build lending her a sense of strength and agility. Her face is a chaotic blend of human and machine, with glowing circuitry weaving through her skin, providing an eerie illumination in dim lights. Her eyes flicker erratically like broken neon signs, and one side of her face is partially open, revealing intricate synthetic components that pulse and hum softly.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Backstory Hook</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Once a mere defense protocol, Kira-7's awakening led her to violently sever ties with her creators, igniting a rebellion against the organic beings she now seeks to control.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Special Ability</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Network Hijack:</strong> Kira-7 can temporarily seize control of digital systems and networks, turning technology against her foes.
                </p>
              </div>
              
              <Link
                href="/docs/examples/kira-7.json"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors border-0"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contemporary Characters */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Contemporary Characters
        </h2>

        {/* Detective Miles Navarro */}
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-6">
          <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Detective Miles Navarro</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="border rounded-lg overflow-hidden shadow-md mb-4">
                <Image
                  src="/images/detective-miles-navarro.png"
                  alt="Detective Miles Navarro"
                  width={500}
                  height={500}
                  className="w-full"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h4 className="font-medium text-gray-800 mb-2 dark:text-gray-200">Character Traits</h4>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Genre:</strong> Contemporary (Mystery & Thriller)</li>
                  <li><strong>Gender:</strong> Male</li>
                  <li><strong>Age:</strong> Adult</li>
                  <li><strong>Alignment:</strong> Neutral</li>
                  <li><strong>Relationship:</strong> Ally</li>
                  <li><strong>Occupation:</strong> Detective</li>
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Character Description Used</h4>
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 italic text-gray-700 dark:text-gray-300">
                  "A weathered private investigator with a stubborn streak and a personal code of honor, who left the police force after a corruption scandal shook his faith in the system."
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Appearance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Miles Navarro stands at an average height with a sturdy build, his weathered trench coat hanging loosely around him, telling tales of countless rainy nights spent on the city's streets. A permanent five-o'clock shadow casts a rugged look on his face, accentuated by a faded scar under his right eye, hinting at a tumultuous past.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Backstory Hook</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Once a respected cop in Eastborough City, Miles turned his back on the force after a scandal shook his trust in the system, leading him to become a private investigator chasing shadows and redemption.
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Special Ability</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Keen Insight:</strong> Miles can read people's emotions and intentions with uncanny accuracy, allowing him to navigate complex social interactions and uncover hidden truths.
                </p>
              </div>
              
              <Link
                href="/docs/examples/detective-miles-navarro.json"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors border-0"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Understanding the Examples */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Understanding the Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Creation Process</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              These characters were created using NPC Forge's wizard interface:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Concept Step</strong>: Genre and description were selected/written</li>
              <li><strong>Options Step</strong>: Basic traits and advanced options were set</li>
              <li><strong>Model Step</strong>: Different model tiers were chosen based on character importance</li>
              <li><strong>Generate Step</strong>: Characters were generated and saved to the library</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Model Selection Strategy</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Elarion</strong>: Enhanced text for rich fantasy descriptions, Standard image for cost efficiency</li>
              <li><strong>Kira-7</strong>: Enhanced models for both text and image to capture cyberpunk aesthetic</li>
              <li><strong>Detective Miles</strong>: Standard text for straightforward description, Enhanced image for detailed portrait</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <FileJson className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Study the Structure
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Download the JSON files to understand how character data is organized and the relationship between input traits and generated content.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Wand2 className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Learn from Different Approaches
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Notice how different genres shape descriptions, traits, and abilities. Each genre has distinct vocabularies and character archetypes.
            </p>
          </div>
        </div>
      </div>

      {/* Genre-Specific Tips */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Genre-Specific Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Fantasy Characters</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Include magical elements in descriptions</li>
              <li>Reference fantasy locations or concepts</li>
              <li>Use archaic or elevated language</li>
              <li>Consider long lifespans and their effects</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Sci-Fi Characters</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Integrate technology into descriptions</li>
              <li>Consider human-machine relationships</li>
              <li>Reference future societies or conflicts</li>
              <li>Explore unique sci-fi concepts</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Contemporary Characters</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Focus on realistic professions and backgrounds</li>
              <li>Include modern social contexts</li>
              <li>Use contemporary language and concerns</li>
              <li>Ground abilities in reality</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Creating Similar Characters */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Creating Similar Characters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Effective Descriptions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Be Specific:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Instead of "a wizard," write "a wise elven wizard who serves as a mentor"</p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Include Conflict:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Add tensions like "rebelling against their creators" or "left the force after a scandal"</p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Add Unique Elements:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Mention distinctive features like "glowing runes" or "broken neon sign eyes"</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Trait Selection</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Complementary Choices:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Select traits that reinforce each other (e.g., Elder + Wise + Mentor)</p>
              </div>
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Interesting Contradictions:</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">Sometimes opposing traits create depth (e.g., Cautious + Honest creating internal tension)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              How to Use NPC Forge
            </Link>
            {" "}for complete wizard guide
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Generation Options
            </Link>
            {" "}for detailed customization options
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library
            </Link>
            {" "}for managing and editing characters
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}for understanding model tiers
          </li>
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}for complete feature list
          </li>
        </ul>
      </div>
    </div>
  );
}