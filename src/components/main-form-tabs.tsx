'use client';

import { useState } from 'react';
import TabInterface, { Tab } from '@/components/ui/tab-interface';
import { useCharacter } from '@/contexts/character-context';
import Button from '@/components/ui/button';
import CharacterTab from '@/components/tabs/character-tab';
import QuestsTab from '@/components/tabs/quests-tab';
import DialogueTab from '@/components/tabs/dialogue-tab';
import ItemsTab from '@/components/tabs/items-tab';
import UsageLimitDisplay from '@/components/usage-limit-display';
import DelayedLoadingMessage from '@/components/delayed-loading-message';
import { User, MessageSquare, Package, BookOpen, Zap } from 'lucide-react';

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
      icon: <User className="h-4 w-4 mr-1" />,
      content: <CharacterTab />
    },
    {
      id: 'quests',
      label: 'Quests',
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      content: <QuestsTab />,
      disabled: !formData.include_quests
    },
    {
      id: 'dialogue',
      label: 'Dialogue',
      icon: <MessageSquare className="h-4 w-4 mr-1" />,
      content: <DialogueTab />,
      disabled: !formData.include_dialogue
    },
    {
      id: 'items',
      label: 'Items',
      icon: <Package className="h-4 w-4 mr-1" />,
      content: <ItemsTab />,
      disabled: !formData.include_items
    }
  ];
  
  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden p-6 border border-indigo-100 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center justify-center dark:text-white">
        <User className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
        Create Your NPC
      </h2>
      
      {/* Feature toggles with improved styling */}
      <div className="mb-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800/50">
        <p className="text-sm text-gray-700 mb-3 dark:text-gray-300">
          Select what to include in your character:
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <input
              type="checkbox"
              id="include-quests"
              checked={formData.include_quests}
              onChange={handleToggleQuests}
              className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="include-quests" className="text-sm ml-2 text-gray-700 dark:text-gray-300 flex items-center">
              <BookOpen className="h-4 w-4 mr-1 text-indigo-500" />
              Quests
            </label>
          </div>
          
          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <input
              type="checkbox"
              id="include-dialogue"
              checked={formData.include_dialogue}
              onChange={handleToggleDialogue}
              className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="include-dialogue" className="text-sm ml-2 text-gray-700 dark:text-gray-300 flex items-center">
              <MessageSquare className="h-4 w-4 mr-1 text-indigo-500" />
              Dialogue
            </label>
          </div>
          
          <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <input
              type="checkbox"
              id="include-items"
              checked={formData.include_items}
              onChange={handleToggleItems}
              className="rounded text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="include-items" className="text-sm ml-2 text-gray-700 dark:text-gray-300 flex items-center">
              <Package className="h-4 w-4 mr-1 text-indigo-500" />
              Items
            </label>
          </div>
        </div>
      </div>
      
      {/* Tab Interface with enhanced styling */}
      <TabInterface 
        tabs={tabs} 
        defaultTabId="character" 
        onChange={handleTabChange}
        className="mb-6"
      />
      
      {/* Error Display with improved styling */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
          <svg className="h-5 w-5 mr-2 flex-shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      {/* Delayed loading message */}
      {isLoading && (
        <DelayedLoadingMessage 
          isLoading={isLoading} 
          message="Character generation may take a second... Creating your unique NPC with AI."
        />
      )}
      
      {/* Generate Button and Usage Display with enhanced styling */}
      <div className="mt-8 flex flex-col items-center">
        <Button
          variant="primary"
          size="lg"
          isLoading={isLoading}
          onClick={generateCharacter}
          disabled={!formData.description.trim() || isLoading}
          className="min-w-40 bg-gradient-to-r from-indigo-500 to-indigo-700 border-0 hover:from-indigo-600 hover:to-indigo-800"
          leftIcon={<Zap className="h-5 w-5" />}
        >
          Generate Character
        </Button>
        
        {/* Description to make it clear what happens next */}
        {!isLoading && (
          <p className="text-sm text-gray-600 mt-2 dark:text-gray-400">
            Character will appear below after generation
          </p>
        )}
        
        {/* Usage limit display with improved visibility */}
        <div className="w-full flex justify-center mt-4">
          <UsageLimitDisplay 
            variant="compact" 
            showWhenFull={true} 
            className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:bg-gray-700 dark:border-gray-600" 
          />
        </div>
      </div>
    </div>
  );
}