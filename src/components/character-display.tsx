'use client';

import { useState, useEffect, useRef } from 'react';
import { useCharacter } from '@/contexts/character-context';
import TabInterface, { Tab } from '@/components/ui/tab-interface';
import ProfileTab from '@/components/tabs/display/profile-tab';
import QuestsDisplayTab from '@/components/tabs/display/quests-display-tab';
import DialogueDisplayTab from '@/components/tabs/display/dialogue-display-tab';
import ItemsDisplayTab from '@/components/tabs/display/items-display-tab';
import PortraitDisplay from '@/components/portrait-display';
import Button from '@/components/ui/button';
import { Download, Save, User, MessageSquare, Package, BookOpen, Image } from 'lucide-react';
import { getCharacterTraitsArray } from '@/lib/utils';
import { Character } from '@/lib/types';

export default function CharacterDisplay() {
  const { character, formData, downloadCharacterJSON, error, isLoading, saveToLibrary, setCharacter } = useCharacter();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Use the character directly from context - no local state needed
  const displayCharacter = character;
  
  // If we don't have a character to display, return null
  if (!displayCharacter) {
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
      content: <ProfileTab character={displayCharacter} />
    }
  ];
  
  if (displayCharacter.quests && displayCharacter.quests.length > 0) {
    tabs.push({
      id: 'quests',
      label: 'Quests',
      icon: <BookOpen className="h-4 w-4 mr-1" />,
      content: <QuestsDisplayTab quests={displayCharacter.quests} />
    });
  }
  
  if (displayCharacter.dialogue_lines && displayCharacter.dialogue_lines.length > 0) {
    tabs.push({
      id: 'dialogue',
      label: 'Dialogue',
      icon: <MessageSquare className="h-4 w-4 mr-1" />,
      content: <DialogueDisplayTab dialogueLines={displayCharacter.dialogue_lines} />
    });
  }
  
  if (displayCharacter.items && displayCharacter.items.length > 0) {
    tabs.push({
      id: 'items',
      label: 'Items',
      icon: <Package className="h-4 w-4 mr-1" />,
      content: <ItemsDisplayTab items={displayCharacter.items} />
    });
  }
  
  // Save character to library - much simpler now
  const handleSaveToLibrary = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');
    
    try {
      if (displayCharacter) {
        console.log("Saving character to library:", displayCharacter.name);
        
        // Save to library (context handles the IndexedDB operations)
        // The character's image_data will remain intact for display
        const success = await saveToLibrary(displayCharacter);
        
        if (success) {
          console.log('Character saved successfully');
          setSaveSuccess(true);
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setSaveSuccess(false);
          }, 3000);
        } else {
          setSaveError('Failed to save character to library');
        }
      }
    } catch (error) {
      setSaveError('Failed to save character to library');
      console.error('Error saving character:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle download button click
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    downloadCharacterJSON();
  };
  
  // Handle download image
  const handleDownloadImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the image data - prioritize image_data
    const imageData = displayCharacter.image_data || displayCharacter.image_url;
                   
    if (!imageData) {
      alert('No image available to download');
      return;
    }
    
    // Create an anchor element and set its href to the image data
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `${displayCharacter.name.replace(/\s+/g, '_').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Get character traits for display
  const traits = getCharacterTraitsArray(displayCharacter);
  
  return (
    <div className="w-full max-w-5xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden mt-8 border border-theme">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Portrait section */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <div className="mx-auto md:mx-0 w-full max-w-[300px]">
              <PortraitDisplay 
                imageUrl={displayCharacter.image_url} 
                imageData={displayCharacter.image_data}
                name={displayCharacter.name} 
                size="medium"
                className="mx-auto"
              />
            </div>
            
            {/* Character traits display */}
            <div className="mt-4 w-full">
              <h3 className="text-sm font-semibold mb-2">Character Traits</h3>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait, index) => (
                  <span 
                    key={index} 
                    className="character-trait-tag text-xs px-2 py-1 rounded-full"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Download image button */}
            <Button
              variant="secondary"
              onClick={handleDownloadImage}
              leftIcon={<Image className="h-4 w-4" />}
              className="mt-4 w-full"
              type="button"
            >
              Download Portrait
            </Button>
          </div>
          
          {/* Character info section */}
          <div className="md:w-2/3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold">{displayCharacter.name}</h2>
              
              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button
                  variant="primary"
                  onClick={handleSaveToLibrary}
                  leftIcon={<Save className="h-4 w-4" />}
                  isLoading={isSaving}
                  disabled={isSaving}
                  type="button"
                >
                  {saveSuccess ? 'Saved!' : 'Save to Library'}
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  leftIcon={<Download className="h-4 w-4" />}
                  type="button"
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