'use client';

import { useState } from 'react';
import TabInterface, { Tab } from '@/components/ui/tab-interface';
import { useCharacter } from '@/contexts/character-context';
import Button from '@/components/ui/button';
import CharacterTab from '@/components/tabs/character-tab';
import QuestsTab from '@/components/tabs/quests-tab';
import DialogueTab from '@/components/tabs/dialogue-tab';
import ItemsTab from '@/components/tabs/items-tab';

export default function MainFormTabs() {
  const { 
    formData, 
    updateFormData, 
    isLoading, 
    generateCharacter, 
    error 
  } = useCharacter();
  
  const [activeTab, setActiveTab] = useState('character');
  
  // Toggle handlers for feature inclusion
  const handleToggleQuests = () => {
    updateFormData({ include_quests: !formData.include_quests });
  };
  
  const handleToggleDialogue = () => {
    updateFormData({ include_dialogue: !formData.include_dialogue });
  };
  
  const handleToggleItems = () => {
    updateFormData({ include_items: !formData.include_items });
  };
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  // Define tabs with proper disabled states based on toggle values
  const tabs: Tab[] = [
    {
      id: 'character',
      label: 'Character',
      content: <CharacterTab />
    },
    {
      id: 'quests',
      label: 'Quests',
      content: <QuestsTab />,
      disabled: !formData.include_quests
    },
    {
      id: 'dialogue',
      label: 'Dialogue',
      content: <DialogueTab />,
      disabled: !formData.include_dialogue
    },
    {
      id: 'items',
      label: 'Items',
      content: <ItemsTab />,
      disabled: !formData.include_items
    }
  ];
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4 dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Create Your NPC
      </h2>
      
      {/* Feature toggles */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="include-quests"
            checked={formData.include_quests}
            onChange={handleToggleQuests}
            className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="include-quests" className="text-sm text-gray-700 dark:text-gray-300">
            Include Quests
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="include-dialogue"
            checked={formData.include_dialogue}
            onChange={handleToggleDialogue}
            className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="include-dialogue" className="text-sm text-gray-700 dark:text-gray-300">
            Include Dialogue
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="include-items"
            checked={formData.include_items}
            onChange={handleToggleItems}
            className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="include-items" className="text-sm text-gray-700 dark:text-gray-300">
            Include Items
          </label>
        </div>
      </div>
      
      {/* Tab Interface */}
      <TabInterface 
        tabs={tabs} 
        defaultTabId="character" 
        onChange={handleTabChange}
        className="mb-6"
      />
      
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-700 text-sm dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          {error}
        </div>
      )}
      
      {/* Generate Button */}
      <div className="flex justify-center mt-6">
        <Button
          variant="primary"
          size="lg"
          isLoading={isLoading}
          onClick={generateCharacter}
          disabled={!formData.description.trim() || isLoading}
          className="min-w-32"
        >
          Generate Character
        </Button>
      </div>
    </div>
  );
}