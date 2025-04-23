import Link from 'next/link';

export default function GenerationOptionsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Character Generation Options</h1>
      
      <p className="lead mb-8">
        NPC Forge offers a wide range of options to customize your generated characters. This guide provides a detailed breakdown of all available settings.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Basic Character Options</h2>
        
        <h3 className="text-xl font-medium mb-3">Genre Selection</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The genre system provides templates and defaults that shape your character generation:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Fantasy</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Medieval fantasy settings with magic, mythical creatures, and epic quests
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Sci-Fi</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Futuristic settings with advanced technology, space travel, and scientific themes
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Historical</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Settings based on actual historical periods and civilizations
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Contemporary</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Modern-day settings with realistic characters and scenarios
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-3">Sub-Genres</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Each main genre includes specialized sub-genres that further refine the character generation:
        </p>
        
        <div className="mb-6 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Fantasy sub-genres include:
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>High Fantasy: Epic worlds with elaborate magic systems</li>
            <li>Dark Fantasy: Grim settings with dangerous magic</li>
            <li>Urban Fantasy: Modern settings with magical elements</li>
            <li>Sword & Sorcery: Focus on personal battles rather than world-threatening conflicts</li>
          </ul>
          
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
            Sci-Fi sub-genres include:
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Space Opera: Epic adventures across galaxies</li>
            <li>Cyberpunk: Near-future dystopias with high technology</li>
            <li>Post-Apocalyptic: Settings after global catastrophes</li>
            <li>Hard Sci-Fi: Scientifically rigorous futures</li>
          </ul>
          
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
            And more sub-genres for Historical and Contemporary settings...
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Character Description</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The free-text description field allows you to provide specific details about your character. More detailed descriptions typically result in more tailored characters.
        </p>
        
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-6 dark:bg-gray-800 dark:border-gray-700">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Example of a good description:</h4>
          <p className="text-gray-700 italic dark:text-gray-400">
            A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic that causes plants to grow in her footsteps. She wears leather armor adorned with living vines and carries a bow made from a branch of the oldest tree in the forest.
          </p>
        </div>
        
        <h3 className="text-xl font-medium mb-3">Basic Traits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Gender</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Male</li>
              <li>Female</li>
              <li>Nonbinary</li>
              <li>Unknown</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Age Group</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Child</li>
              <li>Teen</li>
              <li>Adult</li>
              <li>Elder</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Moral Alignment</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Good</li>
              <li>Neutral</li>
              <li>Evil</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Relationship to Player</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Ally</li>
              <li>Enemy</li>
              <li>Neutral</li>
              <li>Mentor</li>
              <li>Rival</li>
              <li>Betrayer</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Advanced Options</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg mb-6 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
            Advanced options include more detailed controls for character creation:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Physical traits (height, build, distinctive features)</li>
            <li>Background elements (social class, homeland)</li>
            <li>Occupation selection with genre-specific options</li>
            <li>Personality traits selection (up to 3 traits)</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Physical Traits</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Height</li>
              <li>Build</li>
              <li>Distinctive Features</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Background Elements</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Social Class</li>
              <li>Homeland/Origin</li>
              <li>Occupation</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Personality</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Personality Traits (up to 3)</li>
              <li>20+ options available</li>
              <li>Multi-select interface</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Additional Generation Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Quest Generation</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>1-3 quests per character</li>
              <li>Multiple quest types</li>
              <li>Customizable rewards</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Dialogue Generation</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>3-10 dialogue lines</li>
              <li>Customizable tone</li>
              <li>Context-specific dialogue</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Item Generation</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>3-10 items per character</li>
              <li>Rarity distribution options</li>
              <li>Category-specific items</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Portrait Customization</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg mb-6 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
            You can customize your character portraits with these options:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Art Style (realistic, fantasy, anime, etc.)</li>
            <li>Expression/Mood (neutral, happy, serious, etc.)</li>
            <li>Framing (portrait, bust, full-body, action)</li>
            <li>Background (plain, gradient, themed, etc.)</li>
          </ul>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Art Style</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Realistic</li>
              <li>Fantasy Art</li>
              <li>Anime/Manga</li>
              <li>Comic Book</li>
              <li>Pixel Art</li>
              <li>Oil Painting</li>
              <li>Watercolor</li>
              <li>3D Render</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Expression/Mood</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Neutral</li>
              <li>Happy/Smiling</li>
              <li>Serious</li>
              <li>Angry</li>
              <li>Sad</li>
              <li>Determined</li>
              <li>Mysterious</li>
              <li>Heroic</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Framing</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Portrait (Head/Shoulders)</li>
              <li>Bust (Upper Body)</li>
              <li>Full Body</li>
              <li>Action Pose</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Background</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Plain/Solid Color</li>
              <li>Gradient</li>
              <li>Themed (Based on Character)</li>
              <li>Environmental</li>
              <li>Abstract</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6 dark:bg-yellow-900/30 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Portrait Generation Tip</h4>
          <p className="text-yellow-700 dark:text-yellow-400">
            For best results, only specify the portrait options that are important to you. The AI can often create better portraits when given some creative freedom.
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Utility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Randomize Options</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The "Randomize Options" button will generate random values for:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Gender</li>
              <li>Age group</li>
              <li>Moral alignment</li>
              <li>Relationship to player</li>
              <li>Height and Build</li>
              <li>Social class</li>
              <li>Occupation</li>
              <li>Personality traits (1-3 random traits)</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Clear Options</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The "Clear Options" button resets all character traits while preserving:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Your character description</li>
              <li>Any portrait customization options</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              This is useful when you want to start fresh with a new character concept but keep your written description.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Next Steps</h2>
        <p className="text-indigo-600 dark:text-indigo-400 mb-4">
          Now that you understand the available options:
        </p>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Check the How to Use guide
            </Link>
            {" "}for step-by-step instructions
          </li>
          <li>
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              View Character Examples
            </Link>
            {" "}to see what's possible
          </li>
          <li>
            <Link href="/" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Try creating your own character
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}