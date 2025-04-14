'use client';

interface ItemsDisplayTabProps {
  items: string[];
}

export default function ItemsDisplayTab({ items }: ItemsDisplayTabProps) {
  if (!items.length) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
        <p className="text-gray-600 dark:text-gray-400">No items available for this character.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300">
          Character Inventory
        </h3>
        
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li 
              key={index} 
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
            >
              <div className="flex items-start">
                {/* Item icon - simplified version uses emoji based on text */}
                <div className="text-xl mr-3">
                  {getItemEmoji(item)}
                </div>
                
                <div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
          Usage Tip
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          These items can be used as inventory for this NPC, as loot drops, quest rewards, 
          or trade items. Each item is described to give a sense of its appearance and quality.
        </p>
      </div>
    </div>
  );
}

// Helper function to extract a thematic emoji for the item
function getItemEmoji(itemName: string): string {
  const itemNameLower = itemName.toLowerCase();
  
  if (itemNameLower.includes('sword') || itemNameLower.includes('blade') || itemNameLower.includes('dagger')) return '🗡️';
  if (itemNameLower.includes('bow') || itemNameLower.includes('arrow')) return '🏹';
  if (itemNameLower.includes('staff') || itemNameLower.includes('wand')) return '🪄';
  if (itemNameLower.includes('shield')) return '🛡️';
  if (itemNameLower.includes('armor') || itemNameLower.includes('helmet') || itemNameLower.includes('plate')) return '🪖';
  if (itemNameLower.includes('potion') || itemNameLower.includes('elixir') || itemNameLower.includes('vial')) return '🧪';
  if (itemNameLower.includes('scroll') || itemNameLower.includes('book') || itemNameLower.includes('tome')) return '📜';
  if (itemNameLower.includes('map')) return '🗺️';
  if (itemNameLower.includes('ring') || itemNameLower.includes('jewelry') || itemNameLower.includes('necklace')) return '💍';
  if (itemNameLower.includes('gem') || itemNameLower.includes('crystal') || itemNameLower.includes('jewel')) return '💎';
  if (itemNameLower.includes('coin') || itemNameLower.includes('gold') || itemNameLower.includes('silver')) return '💰';
  if (itemNameLower.includes('food') || itemNameLower.includes('bread') || itemNameLower.includes('meat')) return '🍖';
  if (itemNameLower.includes('drink') || itemNameLower.includes('wine') || itemNameLower.includes('ale')) return '🍷';
  if (itemNameLower.includes('herb') || itemNameLower.includes('plant') || itemNameLower.includes('flower')) return '🌿';
  if (itemNameLower.includes('key')) return '🔑';
  if (itemNameLower.includes('lock') || itemNameLower.includes('chest')) return '🔒';
  if (itemNameLower.includes('tool') || itemNameLower.includes('hammer')) return '🔨';
  if (itemNameLower.includes('tech') || itemNameLower.includes('device') || itemNameLower.includes('gadget')) return '⚙️';
  
  // Default for items that don't match specific categories
  return '📦';
}