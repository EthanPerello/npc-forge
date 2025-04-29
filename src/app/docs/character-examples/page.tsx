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
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Appearance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  A tall, thin figure with long silver hair cascading down his back, framing a face marked by wisdom and serenity. His glowing violet eyes seem to pierce through the veil of reality, capturing the essence of all they behold. His skin is smooth and fair, with luminescent runes etched along his arms, only visible when he channels his formidable magic.
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
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Appearance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  A rogue AI with an athletic build and a face that's a chaotic blend of human and machine, with glowing circuitry weaving through her skin and eyes that flicker erratically like broken neon signs. One side of her face is partially open, revealing intricate synthetic components that pulse and hum softly.
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
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
                <h4 className="font-medium text-indigo-700 mb-2 dark:text-indigo-400">Appearance</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  A weathered private investigator with a sturdy build and a permanent five-o'clock shadow, his trench coat telling tales of countless rainy nights spent on the city's streets. A faded scar under his right eye hints at a tumultuous past, while his deep-set eyes can pierce through the facades of those he encounters.
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
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Using These Examples */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Using These Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <FileJson className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Study the Structure
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Open the JSON files to see how character data is organized and understand the format used by NPC Forge. This will give you insights into the structure of generated characters.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Wand2 className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Get Inspiration
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Use these NPCs as springboards for your own creative ideas. Notice the level of detail in descriptions, the types of special abilities, and the connections between traits and backstories.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Book className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Compare Genres
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Notice how genre choices shape descriptions, traits, and abilities. Each genre has distinct vocabularies, aesthetics, and character archetypes that influence the final result.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Experiment
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Try to regenerate similar characters by using comparable descriptions and traits, then tweak specific options to see how the results change. This helps you learn how different inputs affect the output.
            </p>
          </div>
        </div>
      </div>

      {/* How to Create Similar Characters */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">How to Create Similar Characters</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Follow these steps to craft NPCs like these examples in NPC Forge:
          </p>
          
          <ol className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 dark:bg-indigo-900/50 dark:text-indigo-400">
                1
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Choose Genre & Sub-Genre</strong>: Pick the setting that fits your character's story.
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 dark:bg-indigo-900/50 dark:text-indigo-400">
                2
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Write Detailed Descriptions</strong>: Include specifics on appearance, personality, and backstory.
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 dark:bg-indigo-900/50 dark:text-indigo-400">
                3
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Select Complementary Traits</strong>: Define gender, age group, moral alignment, and role.
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 dark:bg-indigo-900/50 dark:text-indigo-400">
                4
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Use Advanced Options</strong>: Specify physical traits, social class, homeland, and more.
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 dark:bg-indigo-900/50 dark:text-indigo-400">
                5
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Customize Portrait</strong>: Set art style, mood, framing, and background for the AI.
              </div>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 dark:bg-indigo-900/50 dark:text-indigo-400">
                6
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Download Your JSON</strong>: Save the output to preserve your NPC for future use.
              </div>
            </li>
          </ol>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              How to Use NPC Forge
            </Link>
            {" "}for step-by-step creation instructions
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Generation Options
            </Link>
            {" "}for all customization settings
          </li>
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}for a complete feature list
          </li>
          <li>
            <Link href="/docs/faq" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              FAQ
            </Link>
            {" "}for answers to common questions
          </li>
        </ul>
      </div>
    </div>
  );
}