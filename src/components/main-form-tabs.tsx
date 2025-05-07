'use client';

import { useState } from 'react';
import { useCharacter } from '@/contexts/character-context';
import CharacterTab from './tabs/character-tab';
import QuestsTab from './tabs/quests-tab';
import DialogueTab from './tabs/dialogue-tab';
import ItemsTab from './tabs/items-tab';
import Button from './ui/button';
import { Sparkles, Check } from 'lucide-react';

export default function MainFormTabs() {
  const [activeTab, setActiveTab] = useState('character');
  const { formData, updateFormData, generateCharacter, isLoading, error } = useCharacter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Add a hidden button for the randomize function to be triggered from the footer
  const handleRandomize = () => {
    // Find and call the randomize button in CharacterTab
    document.getElementById('randomize-button')?.click();
  };

  // Handle checkbox changes for quest, dialogue, and item inclusion
  const handleIncludeChange = (type: 'quests' | 'dialogue' | 'items', checked: boolean) => {
    updateFormData({ [`include_${type}`]: checked });
  };

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Handle form submission - make sure we don't accidentally trigger browser form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission behavior which might cause page refreshes
    e.preventDefault();
    e.stopPropagation();
    
    if (!formData.description) return;
    
    await generateCharacter();
    
    // Show success message for 3 seconds
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const tabs = [
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800">
      {/* Tab Header */}
      <div className="bg-gray-100 dark:bg-gray-700 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button" 
                /* Explicitly specify button type to prevent form submission */
                onClick={(e) => {
                  e.preventDefault(); // Prevent possible form submission
                  if (!tab.disabled) handleTabChange(tab.id);
                }}
                className={`py-2 px-4 rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white dark:bg-indigo-700' 
                    : tab.disabled
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-600 dark:text-gray-500'
                      : 'bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={formData.include_quests}
                onChange={(e) => handleIncludeChange('quests', e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span className="text-gray-700 dark:text-gray-300">Include Quests</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={formData.include_dialogue}
                onChange={(e) => handleIncludeChange('dialogue', e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span className="text-gray-700 dark:text-gray-300">Include Dialogue</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={formData.include_items}
                onChange={(e) => handleIncludeChange('items', e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
              />
              <span className="text-gray-700 dark:text-gray-300">Include Items</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Wrap form around the tab content to contain all our form elements */}
      <form onSubmit={handleSubmit} className="p-6">
        {tabs.find(tab => tab.id === activeTab)?.content}
        
        {/* Generate button inside the form to make it the default submit action */}
        <div className="mt-6 flex justify-center">
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            disabled={!formData.description || isLoading}
            isLoading={isLoading}
            leftIcon={<Sparkles className="h-5 w-5" />}
            size="lg"
          >
            {isLoading ? 'Generating...' : 'Generate Character'}
          </Button>
        </div>
        
        {/* Hidden button for randomizing from the footer */}
        <button 
          id="randomize-button"
          type="button"
          onClick={handleRandomize}
          className="hidden"
        />
      </form>
      
      {/* Error and Success Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm font-bold dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}
      
      {showSuccessMessage && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm font-bold flex items-center dark:bg-green-900/30 dark:text-green-300">
          <Check className="h-5 w-5 mr-2" />
          Character successfully generated!
        </div>
      )}
    </div>
  );
}