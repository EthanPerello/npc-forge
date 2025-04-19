'use client';

import { useEffect, useState, useCallback } from 'react';
import { useCharacter } from '@/contexts/character-context';
import TabInterface, { Tab } from '@/components/ui/tab-interface';
import Button from '@/components/ui/button';
import PortraitDisplay from '@/components/portrait-display';
import JsonViewer from '@/components/json-viewer';
import UsageLimitDisplay from '@/components/usage-limit-display';
import { getCharacterTraitsArray } from '@/lib/utils';
import { Download, Code, User, BookOpen, MessageSquare, Package, Award } from 'lucide-react';

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
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Reset to profile tab when character changes
  useEffect(() => {
    if (character) {
      setActiveTab('profile');
      // Force refresh of usage counts whenever a character is generated
      setRefreshCounter(prev => prev + 1);
      // Show success message
      setShowSuccessMessage(true);
      // Hide success message after 3 seconds
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [character]);
  
  // Callback for refreshing the count
  const refreshUsageCount = useCallback(() => {
    setRefreshCounter(prev => prev + 1);
  }, []);
  
  if (!character) {
    return null;
  }
  
  // Define the tabs, with conditional tabs based on character data
  const tabs: Tab[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4 mr-1" />,
      content: <CharacterProfileTab character={character} />
    }
  ];
  
  // Add quests tab if character has quests and they were included in generation
  if (character.quests?.length && formData.include_quests) {
    tabs.push({
      id: 'quests',
      label: 'Quests',
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      content: <QuestsDisplayTab quests={character.quests} />
    });
  }
  
  // Add dialogue tab if character has dialogue and they were included in generation
  if (character.dialogue_lines?.length && formData.include_dialogue) {
    tabs.push({
      id: 'dialogue',
      label: 'Dialogue',
      icon: <MessageSquare className="h-4 w-4 mr-1" />,
      content: <DialogueDisplayTab dialogueLines={character.dialogue_lines} />
    });
  }
  
  // Add items tab if character has items and they were included in generation
  if (character.items?.length && formData.include_items) {
    tabs.push({
      id: 'items',
      label: 'Items',
      icon: <Package className="h-4 w-4 mr-1" />,
      content: <ItemsDisplayTab items={character.items} />
    });
  }
  
  // Extract traits for display
  const traits = getCharacterTraitsArray(character);
  
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 dark:bg-gray-800 dark:border-gray-700 mt-8 transition-all duration-300">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 text-green-700 p-3 text-center border-b border-green-100 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800/50 flex items-center justify-center">
          <Award className="h-5 w-5 mr-2 text-green-500" />
          Character successfully generated!
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-6 dark:from-blue-400 dark:to-blue-600">
          {character.name}
        </h2>
        
        <div className="md:flex gap-6">
          {/* Portrait Section with improved styling */}
          <div className="md:w-1/3 mb-6 md:mb-0">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl shadow-md dark:from-gray-800 dark:to-gray-700">
              <PortraitDisplay 
                imageUrl={character.image_url} 
                name={character.name} 
              />
              
              {/* Traits Display with visual enhancement */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center dark:text-blue-300">
                  <Award className="h-5 w-5 mr-1 text-blue-600 dark:text-blue-400" />
                  Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className="bg-white px-2 py-1 rounded-md text-sm border border-blue-100 shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
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
            
            {/* Action Buttons with improved design */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={downloadCharacterJSON}
                leftIcon={<Download className="h-5 w-5" />}
                variant="primary"
                className="bg-gradient-to-r from-blue-500 to-blue-700 border-0 hover:from-blue-600 hover:to-blue-800"
              >
                Download JSON
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowJson(!showJson)}
                leftIcon={<Code className="h-5 w-5" />}
                className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30"
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
            
            {/* Usage Limit Display with enhanced styling */}
            <div className="mt-6">
              <UsageLimitDisplay 
                variant="detailed" 
                refreshKey={refreshCounter} 
                onRefresh={refreshUsageCount}
                className="bg-blue-50 dark:bg-blue-900/20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}