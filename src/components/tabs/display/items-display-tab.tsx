'use client';

import {
  Shield,
  Sword,
  Scroll,
  Gem,
  Package,
  TestTube,
  Shirt,
  Book,
  Key,
  Hammer
} from 'lucide-react';

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
        <h3 className="text-lg font-semibold text-indigo-700 mb-3 dark:text-indigo-300">
          Character Inventory
        </h3>

        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-600"
            >
              <div className="flex items-start">
                {/* Item icon - based on text */}
                <div className="text-indigo-500 mr-3 dark:text-indigo-400 flex-shrink-0">
                  {getItemIcon(item)}
                </div>

                <div className="flex-1">
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
        <h3 className="text-sm font-semibold text-indigo-700 mb-2 dark:text-indigo-300">
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

// Helper function to determine an appropriate icon for the item
function getItemIcon(itemName: string): React.ReactNode {
  const itemNameLower = itemName.toLowerCase();

  if (itemNameLower.includes('sword') || itemNameLower.includes('blade') || itemNameLower.includes('dagger')) {
    return <Sword size={20} />;
  }
  if (itemNameLower.includes('bow') || itemNameLower.includes('arrow') || itemNameLower.includes('axe')) {
    return <Sword size={20} />;
  }
  if (itemNameLower.includes('staff') || itemNameLower.includes('wand')) {
    return <Hammer size={20} />;
  }
  if (itemNameLower.includes('shield') || itemNameLower.includes('armor') || itemNameLower.includes('helmet')) {
    return <Shield size={20} />;
  }
  if (itemNameLower.includes('potion') || itemNameLower.includes('elixir') || itemNameLower.includes('vial')) {
    return <TestTube size={20} />;
  }
  if (itemNameLower.includes('scroll') || itemNameLower.includes('book') || itemNameLower.includes('tome')) {
    return <Scroll size={20} />;
  }
  if (
    itemNameLower.includes('gem') || itemNameLower.includes('crystal') ||
    itemNameLower.includes('jewel') || itemNameLower.includes('ring') ||
    itemNameLower.includes('necklace')
  ) {
    return <Gem size={20} />;
  }
  if (itemNameLower.includes('map')) {
    return <Scroll size={20} />;
  }
  if (itemNameLower.includes('clothing') || itemNameLower.includes('cloak') || itemNameLower.includes('robe')) {
    return <Shirt size={20} />;
  }
  if (itemNameLower.includes('key')) {
    return <Key size={20} />;
  }
  if (itemNameLower.includes('book') || itemNameLower.includes('journal') || itemNameLower.includes('note')) {
    return <Book size={20} />;
  }

  // Default icon for unspecified item types
  return <Package size={20} />;
}
