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

// Use sessionStorage for temporary image caching during the session
const IMAGE_CACHE_KEY = 'npc-forge-temp-image-cache';

export default function CharacterDisplay() {
  const { character, formData, downloadCharacterJSON, error, isLoading, saveToLibrary } = useCharacter();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [displayCharacter, setDisplayCharacter] = useState<Character | null>(null);
  
  // Keep references to image data to prevent it from disappearing
  const imageDataRef = useRef<string | null>(null);
  const characterKeyRef = useRef<string | null>(null);
  
  // Initialize cached images from sessionStorage
  const [cachedImages, setCachedImages] = useState<Record<string, string>>(() => {
    // Try to load cached images from sessionStorage
    if (typeof window !== 'undefined') {
      try {
        const cached = sessionStorage.getItem(IMAGE_CACHE_KEY);
        return cached ? JSON.parse(cached) : {};
      } catch (e) {
        console.warn("Failed to load cached images from sessionStorage:", e);
        return {};
      }
    }
    return {};
  });
  
  // Save cached images to sessionStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && Object.keys(cachedImages).length > 0) {
      try {
        sessionStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cachedImages));
      } catch (e) {
        console.warn("Failed to save cached images to sessionStorage:", e);
      }
    }
  }, [cachedImages]);
  
  // Update display character when the main character changes
  useEffect(() => {
    if (character) {
      // Create a deep copy to preserve the character
      const characterCopy = { ...JSON.parse(JSON.stringify(character)) };
      
      // Generate a unique key for this character
      const characterKey = characterCopy.name 
        ? `${characterCopy.name.toLowerCase().replace(/\s+/g, '-')}`
        : `unnamed-${Date.now()}`;
      
      characterKeyRef.current = characterKey;
      
      // Check sources for image data in this priority order:
      // 1. Character's own image_data
      // 2. Previously cached image for this character key
      // 3. Current imageDataRef value
      
      if (characterCopy.image_data) {
        // If character has image data, update our cache and ref
        imageDataRef.current = characterCopy.image_data;
        setCachedImages(prev => ({
          ...prev,
          [characterKey]: characterCopy.image_data as string
        }));
      } 
      else if (cachedImages[characterKey]) {
        // If we have cached image for this character, use it
        characterCopy.image_data = cachedImages[characterKey];
        imageDataRef.current = cachedImages[characterKey];
      }
      else if (imageDataRef.current) {
        // If we have a current image in the ref, use it as fallback
        characterCopy.image_data = imageDataRef.current;
      }
      
      setDisplayCharacter(characterCopy);
      setActiveTab('profile');
    }
  }, [character, cachedImages]);

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
  
  // Save character to library with improved image handling
  const handleSaveToLibrary = async (e: React.MouseEvent) => {
    // Prevent default to avoid form submission
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');
    
    try {
      // Ensure we have the image data stored in the character
      if (displayCharacter) {
        // Create a deep copy to avoid mutations
        const characterToSave = { ...displayCharacter };
        
        // Ensure the image data is included - check all possible sources
        if (!characterToSave.image_data) {
          // Try to get image from our ref or cache
          if (imageDataRef.current) {
            characterToSave.image_data = imageDataRef.current;
          } else if (characterKeyRef.current && cachedImages[characterKeyRef.current]) {
            characterToSave.image_data = cachedImages[characterKeyRef.current];
          }
        }
        
        // Save character with form data
        const success = await saveToLibrary(characterToSave);
        
        if (success) {
          // Show success message
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
    
    // Get the image data from all possible sources
    let imageData = displayCharacter.image_data || 
                   (characterKeyRef.current ? cachedImages[characterKeyRef.current] : null) ||
                   imageDataRef.current ||
                   displayCharacter.image_url;
                   
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
          {/* Portrait section with improved container */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <div className="mx-auto md:mx-0 w-full max-w-[300px]">
              <PortraitDisplay 
                imageUrl={displayCharacter.image_url} 
                imageData={displayCharacter.image_data || 
                          (characterKeyRef.current ? cachedImages[characterKeyRef.current] : undefined) || 
                          imageDataRef.current || 
                          undefined}
                characterId={displayCharacter.name ? `${displayCharacter.name.replace(/\s+/g, '-')}-${Date.now()}` : undefined}
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
                  type="button" // Explicitly set type to prevent form submission
                >
                  Save to Library
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={handleDownload}
                  leftIcon={<Download className="h-4 w-4" />}
                  type="button" // Explicitly set type to prevent form submission
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