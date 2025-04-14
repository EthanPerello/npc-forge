'use client';

import { useCharacter } from '@/contexts/character-context';
import Select from '@/components/ui/select';
import { QuestTypeOption, RewardTypeOption } from '@/lib/types';

// Quest type options
const questTypeOptions: QuestTypeOption[] = [
  { value: 'any', label: 'Any Type', description: 'Let the AI choose an appropriate quest type' },
  { value: 'fetch', label: 'Fetch/Collect', description: 'Retrieve or gather specific items' },
  { value: 'defeat', label: 'Defeat/Combat', description: 'Defeat enemies or monsters' },
  { value: 'rescue', label: 'Rescue/Escort', description: 'Save or protect someone' },
  { value: 'deliver', label: 'Deliver/Courier', description: 'Transport an item to a location' },
  { value: 'investigate', label: 'Investigate/Mystery', description: 'Solve a mystery or gather information' },
  { value: 'exploration', label: 'Exploration', description: 'Discover a new location or secret' },
  { value: 'crafting', label: 'Crafting/Building', description: 'Create or build something' },
  { value: 'stealth', label: 'Stealth/Heist', description: 'Sneaking or stealing without detection' },
  { value: 'diplomatic', label: 'Diplomatic', description: 'Negotiate, mediate, or solve conflicts' }
];

// Reward type options
const rewardTypeOptions: RewardTypeOption[] = [
  { value: 'any', label: 'Any Reward' },
  { value: 'money', label: 'Money/Currency' },
  { value: 'item', label: 'Item/Equipment' },
  { value: 'information', label: 'Information/Knowledge' },
  { value: 'reputation', label: 'Reputation/Standing' },
  { value: 'skill', label: 'Skill/Training' },
  { value: 'companion', label: 'Companion/Ally' },
  { value: 'property', label: 'Property/Land' }
];

// Quest number options
const questNumberOptions = [
  { value: '1', label: '1 Quest' },
  { value: '2', label: '2 Quests' },
  { value: '3', label: '3 Quests' }
];

export default function QuestsTab() {
  const { formData, updateFormData } = useCharacter();
  
  // Initialize quest options if they don't exist
  if (!formData.quest_options) {
    updateFormData({
      quest_options: {
        number_of_quests: 1,
        reward_type: undefined,
        quest_type: undefined
      }
    });
  }
  
  // Handle quest type change
  const handleQuestTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      quest_options: { 
        ...formData.quest_options,
        quest_type: e.target.value || undefined
      } 
    });
  };
  
  // Handle reward type change
  const handleRewardTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      quest_options: { 
        ...formData.quest_options,
        reward_type: e.target.value || undefined
      } 
    });
  };
  
  // Handle number of quests change
  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      quest_options: { 
        ...formData.quest_options,
        number_of_quests: parseInt(e.target.value) || 1
      } 
    });
  };
  
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Configure the quests this character will offer to players.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Number of Quests */}
        <Select
          label="Number of Quests"
          options={questNumberOptions}
          value={String(formData.quest_options?.number_of_quests || 1)}
          onChange={handleNumberChange}
        />
        
        {/* Quest Type */}
        <Select
          label="Quest Type"
          options={questTypeOptions}
          value={formData.quest_options?.quest_type || ''}
          onChange={handleQuestTypeChange}
          helperText="The general type of task or objective"
        />
        
        {/* Reward Type */}
        <Select
          label="Reward Type"
          options={rewardTypeOptions}
          value={formData.quest_options?.reward_type || ''}
          onChange={handleRewardTypeChange}
          helperText="What the player will receive upon completion"
        />
      </div>
      
      {/* Quest Type Description */}
      {formData.quest_options?.quest_type && formData.quest_options.quest_type !== 'any' && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            {questTypeOptions.find(opt => opt.value === formData.quest_options?.quest_type)?.description}
          </p>
        </div>
      )}
    </div>
  );
}