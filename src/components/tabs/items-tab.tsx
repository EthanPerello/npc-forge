'use client';

import { useCharacter } from '@/contexts/character-context';
import Select from '@/components/ui/select';
import { ItemCategoryOption, RarityDistributionOption } from '@/lib/types';

// Item category options based on generic RPG categories
const itemCategoryOptions: ItemCategoryOption[] = [
  { value: 'any', label: 'Any Categories' },
  { value: 'weapon', label: 'Weapons' },
  { value: 'armor', label: 'Armor & Clothing' },
  { value: 'potion', label: 'Potions & Consumables' },
  { value: 'scroll', label: 'Scrolls & Books' },
  { value: 'tool', label: 'Tools & Utility Items' },
  { value: 'jewelry', label: 'Jewelry & Accessories' },
  { value: 'artifact', label: 'Artifacts & Relics' },
  { value: 'food', label: 'Food & Drink' },
  { value: 'currency', label: 'Currency & Valuables' },
  { value: 'material', label: 'Crafting Materials' },
  { value: 'tech', label: 'Technology & Gadgets', genre: ['sci-fi'] },
  { value: 'magic', label: 'Magical Items', genre: ['fantasy'] }
];

// Rarity distribution options
const rarityDistributionOptions: RarityDistributionOption[] = [
  { 
    value: 'any', 
    label: 'Any Rarity',
    description: 'Let the AI choose an appropriate distribution of item rarities'
  },
  { 
    value: 'balanced', 
    label: 'Balanced',
    description: 'A mix of common and uncommon items, with a small chance of rare items'
  },
  { 
    value: 'common', 
    label: 'Mostly Common',
    description: 'Practical, everyday items that are easily obtainable'
  },
  { 
    value: 'uncommon', 
    label: 'Mostly Uncommon',
    description: 'Higher quality or less available items that are still obtainable'
  },
  { 
    value: 'rare', 
    label: 'Include Rare Items',
    description: 'Including valuable, hard-to-find, or unique items'
  },
  { 
    value: 'themed', 
    label: 'Themed by Character',
    description: 'Items that match the character\'s profession and background'
  }
];

// Number of items options
const itemNumberOptions = [
  { value: '3', label: '3 items' },
  { value: '5', label: '5 items' },
  { value: '7', label: '7 items' },
  { value: '10', label: '10 items' }
];

export default function ItemsTab() {
  const { formData, updateFormData } = useCharacter();
  
  // Initialize item options if they don't exist
  if (!formData.item_options) {
    updateFormData({
      item_options: {
        number_of_items: 3,
        rarity_distribution: 'any',
        item_categories: []
      }
    });
  }
  
  // Handle rarity distribution change
  const handleRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      item_options: { 
        ...formData.item_options,
        rarity_distribution: e.target.value || 'balanced'
      } 
    });
  };
  
  // Handle number of items change
  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      item_options: { 
        ...formData.item_options,
        number_of_items: parseInt(e.target.value) || 3
      } 
    });
  };
  
  // Handle item category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    
    // If "any" is selected, clear the array
    if (value === 'any') {
      updateFormData({
        item_options: {
          ...formData.item_options,
          item_categories: []
        }
      });
      return;
    }
    
    // If we already have categories and this isn't in it, add it
    // For now, we're just allowing a single category selection, but this could be expanded to multi-select
    updateFormData({
      item_options: {
        ...formData.item_options,
        item_categories: [value]
      }
    });
  };
  
  // Get the current selected category (or "any" if none)
  const selectedCategory = formData.item_options?.item_categories?.length 
    ? formData.item_options.item_categories[0] 
    : 'any';
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Number of Items */}
        <Select
          label="Number of Items"
          options={itemNumberOptions}
          value={String(formData.item_options?.number_of_items || 3)}
          onChange={handleNumberChange}
          fullWidth={false}
        />
        
        {/* Rarity Distribution */}
        <Select
          label="Rarity Distribution"
          options={rarityDistributionOptions}
          value={formData.item_options?.rarity_distribution || 'balanced'}
          onChange={handleRarityChange}
          fullWidth={false}
        />
        
        {/* Item Category */}
        <Select
          label="Category Focus"
          options={itemCategoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          fullWidth={false}
        />
      </div>
    </div>
  );
}