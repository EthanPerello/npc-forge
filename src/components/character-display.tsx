'use client';

import { useState, useEffect } from 'react';
import { useCharacter } from '@/contexts/character-context';
import TabInterface, { Tab } from '@/components/ui/tab-interface';
import ProfileTab from '@/components/tabs/display/profile-tab';
import QuestsDisplayTab from '@/components/tabs/display/quests-display-tab';
import DialogueDisplayTab from '@/components/tabs/display/dialogue-display-tab';
import ItemsDisplayTab from '@/components/tabs/display/items-display-tab';
import PortraitDisplay from '@/components/portrait-display';
import Button from '@/components/ui/button';
import { Download, Save, User, MessageSquare, Package, BookOpen } from 'lucide-react';
import { saveCharacter } from '@/lib/character-storage';

export default function CharacterDisplay() {
  const { character, formData, downloadCharacterJSON, error, isLoading } = useCharacter();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isRegeneratingPortrait, setIsRegeneratingPortrait] = useState(false);
  
  // Reset to profile tab when character changes
  useEffect(() => {
    if (character) {
      setActiveTab('profile');
    }
  }, [character]);
  
  if (!character) {
    return null;
  }
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  // Define tabs based on what content is available
  const tabs: Tab[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4 mr-1" />,
      content: <ProfileTab character={character} />
    }
  ];
  
  if (character.quests && character.quests.length > 0) {
    tabs.push({
      id: 'quests',
      label: 'Quests',
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      content: <QuestsDisplayTab quests={character.quests} />
    });
  }
  
  if (character.dialogue_lines && character.dialogue_lines.length > 0) {
    tabs.push({
      id: 'dialogue',
      label: 'Dialogue',
      icon: <MessageSquare className="h-4 w-4 mr-1" />,
      content: <DialogueDisplayTab dialogueLines={character.dialogue_lines} />
    });
  }
  
  if (character.items && character.items.length > 0) {
    tabs.push({
      id: 'items',
      label: 'Items',
      icon: <Package className="h-4 w-4 mr-1" />,
      content: <ItemsDisplayTab items={character.items} />
    });
  }
  
  // Save character to library
  const handleSaveToLibrary = () => {
    try {
      // Reset states
      setSaveSuccess(false);
      setSaveError('');
      
      // Save character with form data
      saveCharacter(character, formData);
      
      // Show success message
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      setSaveError('Failed to save character to library');
      console.error('Error saving character:', error);
    }
  };

  // Handle portrait regeneration (placeholder for now)
  const handleRegeneratePortrait = () => {
    alert('Portrait regeneration will be implemented in a future update.');
    // For now, just show the loading state briefly for UI feedback
    setIsRegeneratingPortrait(true);
    setTimeout(() => {
      setIsRegeneratingPortrait(false);
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden mt-8 border border-theme">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Portrait section */}
          <div className="md:w-1/3">
            <PortraitDisplay 
              imageUrl={character.image_url} 
              name={character.name} 
              isLoading={isRegeneratingPortrait}
              onRegenerate={handleRegeneratePortrait}
            />
          </div>
          
          {/* Character info section */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">{character.name}</h2>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="primary"
                  onClick={handleSaveToLibrary}
                  leftIcon={<Save className="h-4 w-4" />}
                >
                  Save to Library
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={downloadCharacterJSON}
                  leftIcon={<Download className="h-4 w-4" />}
                >
                  Download JSON
                </Button>
              </div>
              
              {/* Save feedback messages */}
              {saveSuccess && (
                <div className="mt-2 p-2 bg-green-50 text-green-700 rounded border border-green-200 text-sm dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                  Character successfully saved to library!
                </div>
              )}
              
              {saveError && (
                <div className="mt-2 p-2 bg-red-50 text-red-700 rounded border border-red-200 text-sm dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                  {saveError}
                </div>
              )}
            </div>
            
            {/* Tabs interface */}
            <TabInterface 
              tabs={tabs} 
              defaultTabId="profile" 
              onChange={handleTabChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}