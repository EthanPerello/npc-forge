'use client';

import { useEffect, useState } from 'react';
import { useCharacter } from '@/contexts/character-context';
import TabInterface, { Tab } from '@/components/ui/tab-interface';
import Button from '@/components/ui/button';
import PortraitDisplay from '@/components/portrait-display';
import JsonViewer from '@/components/json-viewer';
import UsageLimitDisplay from '@/components/usage-limit-display';
import { getCharacterTraitsArray } from '@/lib/utils';

// Tab components for character display
import CharacterProfileTab from '@/components/tabs/display/profile-tab';
import QuestsDisplayTab from '@/components/tabs/display/quests-display-tab';
import DialogueDisplayTab from '@/components/tabs/display/dialogue-display-tab';
import ItemsDisplayTab from '@/components/tabs/display/items-display-tab';

export default function CharacterDisplay() {
  const { 
    character, 
    downloadCharacterJSON, 
    formData
  } = useCharacter();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showJson, setShowJson] = useState(false);
  
  // Reset to profile tab when character changes
  useEffect(() => {
    if (character) {
      setActiveTab('profile');
    }
  }, [character]);
  
  if (!character) {
    return null;
  }
  
  // Define the tabs, with conditional tabs based on character data
  const tabs: Tab[] = [
    {
      id: 'profile',
      label: 'Profile',
      content: <CharacterProfileTab character={character} />
    }
  ];
  
  // Add quests tab if character has quests and they were included in generation
  if (character.quests?.length && formData.include_quests) {
    tabs.push({
      id: 'quests',
      label: 'Quests',
      content: <QuestsDisplayTab quests={character.quests} />
    });
  }
  
  // Add dialogue tab if character has dialogue and they were included in generation
  if (character.dialogue_lines?.length && formData.include_dialogue) {
    tabs.push({
      id: 'dialogue',
      label: 'Dialogue',
      content: <DialogueDisplayTab dialogueLines={character.dialogue_lines} />
    });
  }
  
  // Add items tab if character has items and they were included in generation
  if (character.items?.length && formData.include_items) {
    tabs.push({
      id: 'items',
      label: 'Items',
      content: <ItemsDisplayTab items={character.items} />
    });
  }
  
  // Extract traits for display
  const traits = getCharacterTraitsArray(character);
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 mt-8">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 dark:text-white">
          {character.name}
        </h2>
        
        <div className="md:flex gap-6">
          {/* Portrait Section */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <PortraitDisplay 
              imageUrl={character.image_url} 
              name={character.name} 
            />
            
            {/* Traits Display */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">Traits</h3>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm dark:bg-gray-700 dark:text-gray-300"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="md:w-2/3">
            {/* Tab Interface */}
            <TabInterface 
              tabs={tabs} 
              defaultTabId="profile" 
              onChange={setActiveTab}
              className="mb-6"
            />
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={downloadCharacterJSON}
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                }
              >
                Download JSON
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => setShowJson(!showJson)}
              >
                {showJson ? 'Hide' : 'Show'} JSON Data
              </Button>
            </div>
            
            {/* JSON Viewer */}
            {showJson && (
              <div className="mt-4">
                <JsonViewer 
                  data={character} 
                  title="Character Data"
                  downloadable={true}
                  downloadFilename={`${character.name.replace(/\s+/g, '_').toLowerCase()}.json`}
                  collapsible={true}
                />
              </div>
            )}
            
            {/* Usage Limit Display */}
            <div className="mt-6">
              <UsageLimitDisplay variant="detailed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}