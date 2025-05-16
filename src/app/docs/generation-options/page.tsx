import Link from 'next/link';
import { Settings, Palette, MessageSquare, Package, Users, FileText } from 'lucide-react';

export const metadata = {
  title: 'Character Generation Options - NPC Forge',
  description: 'Detailed breakdown of all character generation options and customization settings available in NPC Forge.',
};

export default function GenerationOptionsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Character Generation Options</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        NPC Forge offers extensive customization options through its wizard-based interface. This guide provides a detailed breakdown of all available settings across the four-step creation process.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Overview</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The character creation wizard consists of four main steps:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">1. Concept</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Genre selection and character description</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">2. Options</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Detailed trait and attribute customization</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">3. Model</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">AI model selection for text and images</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">4. Generate</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Character creation and results</p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Step 1: Concept</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Genre Selection</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The genre system provides templates and defaults that shape your character generation:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Fantasy</h4>
                <p className="text-purple-700 dark:text-purple-400 text-sm">
                  Medieval fantasy settings with magic, mythical creatures, and epic quests
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Sci-Fi</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Futuristic settings with advanced technology, space travel, and scientific themes
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/20 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Historical</h4>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  Settings based on actual historical periods and civilizations
                </p>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800">
                <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">Contemporary</h4>
                <p className="text-orange-700 dark:text-orange-400 text-sm">
                  Modern-day settings with realistic characters and scenarios
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Sub-Genres</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Each main genre includes specialized sub-genres:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Fantasy Sub-Genres</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>High Fantasy</strong>: Epic worlds with elaborate magic systems and cosmic struggles</li>
                  <li><strong>Dark Fantasy</strong>: Grim settings with dangerous magic and morally complex characters</li>
                  <li><strong>Urban Fantasy</strong>: Modern settings where magic exists alongside the contemporary world</li>
                  <li><strong>Sword & Sorcery</strong>: Focus on personal battles rather than world-threatening conflicts</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Sci-Fi Sub-Genres</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Space Opera</strong>: Epic adventures across galaxies with interstellar travel</li>
                  <li><strong>Cyberpunk</strong>: Near-future dystopias with high technology and corporate control</li>
                  <li><strong>Post-Apocalyptic</strong>: Settings after global catastrophes</li>
                  <li><strong>Hard Sci-Fi</strong>: Scientifically rigorous futures based on plausible technology</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Historical Sub-Genres</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Medieval</strong>: European Middle Ages with knights, castles, and feudal society</li>
                  <li><strong>Ancient Civilizations</strong>: Egyptian, Roman, Greek, or other ancient cultures</li>
                  <li><strong>Renaissance</strong>: Period of artistic and intellectual revival in Europe</li>
                  <li><strong>Age of Sail</strong>: Era of naval exploration, piracy, and colonial expansion</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Contemporary Sub-Genres</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Urban Life</strong>: Everyday settings in modern cities</li>
                  <li><strong>Mystery & Thriller</strong>: Settings featuring crimes, investigations, and suspense</li>
                  <li><strong>Contemporary Supernatural</strong>: Modern world with hidden supernatural elements</li>
                  <li><strong>Slice of Life</strong>: Focus on everyday experiences with minimal plot</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Character Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The free-text description field allows you to provide specific details about your character. More detailed descriptions typically result in more tailored characters.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-4">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Example of a comprehensive description:</h4>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic that causes plants to grow in her footsteps. She wears leather armor adorned with living vines and carries a bow made from a branch of the oldest tree in the forest. Despite her mystical abilities, she's practical and down-to-earth, preferring actions over words."
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Tips for effective descriptions:</h4>
              <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400 text-sm">
                <li>Include physical appearance details</li>
                <li>Mention personality traits</li>
                <li>Describe background or occupation</li>
                <li>Add unique abilities or characteristics</li>
                <li>Specify relationships or motivations</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              For examples of effective descriptions, see our{" "}
              <Link href="/docs/character-examples" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Character Examples
              </Link>.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Step 2: Options</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Basic Traits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Gender</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Male</li>
                    <li>Female</li>
                    <li>Nonbinary</li>
                    <li>Unknown</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Age Group</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Child</li>
                    <li>Teen</li>
                    <li>Adult</li>
                    <li>Elder</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Moral Alignment</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Good</li>
                    <li>Neutral</li>
                    <li>Evil</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Relationship to Player</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
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
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Advanced Options
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Physical Traits</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li><strong>Height</strong>: Very Short, Short, Average Height, Tall, Very Tall</li>
                    <li><strong>Build</strong>: Thin/Slender, Athletic/Toned, Average Build, Sturdy/Solid, Muscular, Heavy/Large</li>
                    <li><strong>Distinctive Features</strong>: Free text field for scars, tattoos, unusual characteristics, etc.</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Background Elements</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li><strong>Social Class</strong>: Lower Class, Working Class, Middle Class, Upper-middle Class, Upper Class/Nobility, Outcast/Outsider</li>
                    <li><strong>Homeland/Origin</strong>: Free text field for character's place of origin</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Personality</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li><strong>Personality Traits</strong>: Multi-select system with unlimited selection</li>
                    <li>20+ options available including: Brave, Cautious, Curious, Determined, Friendly, Honest, Humorous, Loyal, Mysterious, Proud, etc.</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Occupation</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm mb-2">
                  Searchable dropdown with genre-specific options. Examples include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-300">General Occupations:</p>
                    <p className="text-blue-700 dark:text-blue-400">Merchant/Trader, Leader/Authority Figure, Craftsperson/Artisan, Healer/Medic, Scholar/Academic, Guard/Protector</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-300">Genre-Specific Examples:</p>
                    <ul className="list-disc list-inside text-blue-700 dark:text-blue-400">
                      <li><strong>Fantasy</strong>: Wizard/Mage, Knight/Warrior, Ranger/Hunter</li>
                      <li><strong>Sci-Fi</strong>: Engineer/Technician, Pilot/Navigator, AI Specialist</li>
                      <li><strong>Historical</strong>: Farmer, Soldier, Sailor/Mariner</li>
                      <li><strong>Contemporary</strong>: Doctor, Teacher, Police Officer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Additional Elements</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Enable or disable specific character elements:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Quests</strong>: Include character-related quests</li>
              <li><strong>Dialogue</strong>: Generate character-specific dialogue lines</li>
              <li><strong>Items</strong>: Create character inventory items</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Quest Options</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Quest Configuration</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Number of Quests</strong>: 1-3 quests per character</li>
              <li><strong>Quest Types</strong>: Fetch/Collect, Defeat/Combat, Rescue/Escort, Deliver/Courier, Investigate/Mystery, Exploration, Crafting/Building, Stealth/Heist, Diplomatic</li>
              <li><strong>Reward Types</strong>: Money/Currency, Item/Equipment, Information/Knowledge, Reputation/Standing, Skill/Training, Companion/Ally, Property/Land</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Dialogue Options
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Number of Lines</strong>: 3-10 dialogue lines</li>
              <li><strong>Dialogue Tone</strong>: Friendly, Formal, Mysterious, Aggressive, Cautious, Eccentric, Scholarly, Humorous, Melancholic</li>
              <li><strong>Dialogue Context</strong>: First Meeting, Giving a Quest, Discussing Quest Progress, Quest Completion, Bargaining/Trading, During Combat, Casual Conversation</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Item Options</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Item Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Basic Settings</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li><strong>Number of Items</strong>: 3-10 items</li>
                <li><strong>Rarity Distribution</strong>: Balanced, Mostly Common, Mostly Uncommon, Include Rare Items, Themed by Character</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Item Categories</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Weapons</li>
                <li>Armor & Clothing</li>
                <li>Potions & Consumables</li>
                <li>Scrolls & Books</li>
                <li>Tools & Utility Items</li>
                <li>Jewelry & Accessories</li>
                <li>Artifacts & Relics</li>
                <li>Food & Drink</li>
                <li>Currency & Valuables</li>
                <li>Crafting Materials</li>
                <li>Technology & Gadgets (Sci-Fi)</li>
                <li>Magical Items (Fantasy)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Step 3: Model Selection</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Text Generation Models</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Choose from three tiers of text generation models:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Tier</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Model</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Usage Limit</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🟢 Standard</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-4o-mini</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Unlimited</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Regular use, experimentation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🟡 Enhanced</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-4.1-mini</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">30/month</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Higher quality characters</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🔴 Premium</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-4o</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">10/month</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum detail and complexity</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 mt-4">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Model Selection Tips:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400 text-sm">
                <li>Use Standard for most characters and experimentation</li>
                <li>Reserve Enhanced for important characters requiring higher quality</li>
                <li>Save Premium for key NPCs needing maximum detail and sophistication</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              For a comprehensive guide to model selection and usage strategies, see the{" "}
              <Link href="/docs/models" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
                Model Selection Guide
              </Link>.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Image Generation Models</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Choose from three tiers of portrait generation:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Tier</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Model</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Usage Limit</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Quality</th>
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🟢 Standard</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">dall-e-2</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Unlimited</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Good</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Basic portrait generation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🟡 Enhanced</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">dall-e-3</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">30/month</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">High</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Better detail and style adherence</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">🔴 Premium</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">gpt-image-1</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">10/month</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Highest</td>
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Maximum quality and artistic control</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Portrait Customization</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Art Style & Expression
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Art Style</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
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
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Expression/Mood</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
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
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Framing & Background</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Framing</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Portrait (Head/Shoulders)</li>
                  <li>Bust (Upper Body)</li>
                  <li>Full Body</li>
                  <li>Action Pose</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Background</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Plain/Solid Color</li>
                  <li>Gradient</li>
                  <li>Themed (Based on Character)</li>
                  <li>Environmental</li>
                  <li>Abstract</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm mt-4 dark:bg-yellow-900/20 dark:border-yellow-800">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Portrait Generation Tips</h4>
          <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-400">
            <li>Only specify the options that matter most to you</li>
            <li>Leave some options unset to give the AI creative freedom</li>
            <li>Consider the art style that matches your game or story aesthetic</li>
            <li>Themed backgrounds can provide valuable context</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Step 4: Generate</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Generation Process</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Click "Generate Character" to begin the process</li>
              <li>The AI processes your inputs using the selected models</li>
              <li>Character text is generated first, followed by the portrait</li>
              <li>Loading messages provide feedback during generation</li>
              <li>Results are displayed with tabs for different sections</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Alternative Generation Options</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Generate Random Character</strong>: Creates a character with random traits instantly</li>
              <li><strong>New Character</strong>: Starts the wizard over with fresh options</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Utility Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Randomize Options</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              The "Randomize Options" button generates random values for:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Gender, age group, moral alignment, relationship to player</li>
              <li>Height, build, social class</li>
              <li>Occupation (genre-appropriate)</li>
              <li>Personality traits (1-3 random traits)</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Clear Options</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              The "Clear Options" button resets all character traits while preserving:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Your character description</li>
              <li>Selected genre and sub-genre</li>
              <li>Any portrait customization options</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm">
              This is useful when you want to start fresh with a new character concept but keep your written description.
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Navigation</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Progress Bar</strong>: Click any step in the progress bar to jump directly to it</li>
              <li><strong>Step Controls</strong>: Use Continue/Back buttons or click steps to navigate</li>
              <li><strong>Sticky Footer</strong>: Controls remain visible as you scroll</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Usage Limits and Tracking</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Per-Model Limits</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Each model tier has individual monthly limits:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Standard models: Unlimited usage</li>
              <li>Enhanced models: 30 generations per month</li>
              <li>Premium models: 10 generations per month</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Limit Display</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              The interface shows:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Remaining generations for each model</li>
              <li>Most constrained model when multiple are selected</li>
              <li>Warning when approaching limits</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Monthly Reset</h3>
            <p className="text-gray-700 dark:text-gray-300">
              All usage limits reset at the beginning of each calendar month.
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          For detailed information about usage limits and tracking, see the{" "}
          <Link href="/docs/models" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 underline">
            Model Selection Guide
          </Link>.
        </p>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Tips for Best Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Writing Effective Descriptions</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Be Specific</strong>: Include concrete details about appearance, personality, and background</li>
              <li><strong>Add Unique Elements</strong>: Mention special abilities, quirks, or distinctive features</li>
              <li><strong>Consider Context</strong>: Think about how the character fits into your story or game</li>
              <li><strong>Use Vivid Language</strong>: Descriptive words help the AI create more interesting characters</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Choosing Options</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Start Broad, Then Narrow</strong>: Begin with genre/sub-genre, then add specific traits</li>
              <li><strong>Balance Traits</strong>: Choose complementary personality traits that create depth</li>
              <li><strong>Consider Relationships</strong>: Think about how traits affect the character's role</li>
              <li><strong>Use Advanced Options</strong>: Physical traits and background add authenticity</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Model Selection Strategy</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Match Importance to Quality</strong>: Use higher tiers for important characters</li>
              <li><strong>Consider Your Needs</strong>: Standard tier is often sufficient for most uses</li>
              <li><strong>Plan Your Budget</strong>: Track usage to make the most of limited generations</li>
              <li><strong>Experiment</strong>: Try different models to see quality differences</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Portrait Optimization</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Less is More</strong>: Over-specifying options can constrain the AI unnecessarily</li>
              <li><strong>Art Style Consistency</strong>: Use consistent art styles for characters in the same story</li>
              <li><strong>Background Context</strong>: Themed backgrounds can enhance character presentation</li>
              <li><strong>Expression Matching</strong>: Choose expressions that fit the character's personality</li>
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
              <li><strong>Failed Generation</strong>: Check internet connection, try simpler descriptions</li>
              <li><strong>Portrait Issues</strong>: Reduce portrait specifications or try different art style</li>
              <li><strong>Unexpected Results</strong>: Refine description or adjust trait selections</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Limit Issues</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Reached Limit</strong>: Wait for monthly reset or switch to unlimited Standard tier</li>
              <li><strong>Unexpected Usage</strong>: Check which models are selected and their individual limits</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Navigation Problems</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Stuck on Step</strong>: Ensure all required fields are completed</li>
              <li><strong>Lost Progress</strong>: Use browser back/forward or click progress bar steps</li>
            </ul>
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
            {" "}– Complete wizard walkthrough
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}– Detailed model comparison and usage strategies
          </li>
          <li>
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Examples
            </Link>
            {" "}– See generation results and learn from examples
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library Guide
            </Link>
            {" "}– Managing and editing your characters
          </li>
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}– Complete feature list
          </li>
          <li>
            <Link href="/docs/faq" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              FAQ
            </Link>
            {" "}– Answers to common questions
          </li>
        </ul>
      </div>
    </div>
  );
}