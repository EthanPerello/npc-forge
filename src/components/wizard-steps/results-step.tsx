'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacter } from '@/contexts/character-context';
import { Character } from '@/lib/types';
import { Download, FileJson, Save, User, Heart, Book, Target, MessageSquare, Package, AlertTriangle, Library } from 'lucide-react';
import Button from '../ui/button';
import TabInterface, { Tab } from '../ui/tab-interface';
import { getCharacterTraitsArray } from '@/lib/utils';

interface ResultsStepProps {
  onNext: () => void;
  isGenerating?: boolean;
}

// Profile Tab Component
const ProfileTab = ({ character }: { character: Character }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center dark:text-blue-300">
        <User className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
        Appearance
      </h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
        {character.appearance}
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center dark:text-blue-300">
        <Heart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
        Personality
      </h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
        {character.personality}
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center dark:text-blue-300">
        <Book className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
        Backstory Hook
      </h3>
      <p className="text-gray-700 italic font-medium dark:text-gray-300 whitespace-pre-line leading-relaxed bg-blue-50 p-3 rounded-md dark:bg-blue-900/20">
        {character.backstory_hook}
      </p>
    </div>
  </div>
);

// Quests Tab Component
const QuestsTab = ({ quests }: { quests: any[] }) => (
  <div className="space-y-4">
    {quests.map((quest, index) => (
      <div key={index} className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
        <h4 className="font-semibold text-gray-800 mb-1 dark:text-gray-200">
          {quest.title}
        </h4>
        {quest.type && (
          <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-1 rounded font-medium mb-2">
            {quest.type}
          </span>
        )}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {quest.description}
        </p>
        <div className="text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">Reward: </span>
          <span className="text-gray-600 dark:text-gray-400">{quest.reward}</span>
        </div>
      </div>
    ))}
  </div>
);

// Dialogue Tab Component
const DialogueTab = ({ dialogueLines }: { dialogueLines: string[] }) => (
  <div className="space-y-3">
    {dialogueLines.map((line, index) => (
      <div 
        key={index} 
        className={`p-3 rounded-lg ${index % 2 === 0 
          ? 'bg-indigo-50 dark:bg-indigo-900/30' 
          : 'bg-blue-50 dark:bg-blue-900/20'}`}
      >
        <div className="italic text-gray-700 dark:text-gray-300">
          "{line}"
        </div>
      </div>
    ))}
  </div>
);

// Items Tab Component
const ItemsTab = ({ items }: { items: string[] }) => (
  <div className="space-y-3">
    {items.map((item, index) => (
      <div key={index} className="bg-gray-50 rounded-lg p-3 dark:bg-gray-700">
        <p className="text-gray-700 dark:text-gray-300">{item}</p>
      </div>
    ))}
  </div>
);

export default function ResultsStep({ onNext, isGenerating }: ResultsStepProps) {
  const router = useRouter();
  const { character, downloadCharacterJSON, saveToLibrary, formData } = useCharacter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToLibrary = async () => {
    if (!character) return;
    setIsSaving(true);
    try {
      await saveToLibrary();
      // Navigate to library after saving
      router.push('/library');
    } catch (error) {
      console.error('Error saving character:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleViewLibrary = () => {
    router.push('/library');
  };

  if (!character) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          No character generated yet.
        </div>
      </div>
    );
  }

  // Check if this is a fallback example character
  const isFallbackExample = character.added_traits?.fallback_note;

  // Get character traits - filtering out appearance, personality, backstory
  const traits = getCharacterTraitsArray(character);

  // Create tabs based on what was included
  const tabs: Tab[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      content: <ProfileTab character={character} />
    }
  ];

  if (character.quests && character.quests.length > 0) {
    tabs.push({
      id: 'quests',
      label: 'Quests',
      icon: <Target className="h-4 w-4" />,
      content: <QuestsTab quests={character.quests} />
    });
  }

  if (character.dialogue_lines && character.dialogue_lines.length > 0) {
    tabs.push({
      id: 'dialogue',
      label: 'Dialogue',
      icon: <MessageSquare className="h-4 w-4" />,
      content: <DialogueTab dialogueLines={character.dialogue_lines} />
    });
  }

  if (character.items && character.items.length > 0) {
    tabs.push({
      id: 'items',
      label: 'Items',
      icon: <Package className="h-4 w-4" />,
      content: <ItemsTab items={character.items} />
    });
  }

  // Check if we have an image (either data or URL) to display
  const hasPortrait = !!(character.image_data || character.image_url);

  return (
    <div className="p-6">
      {/* Fallback Notice - Only shown for example characters used as fallbacks */}
      {isFallbackExample && (
        <div className="mb-6 p-4 border border-amber-200 bg-amber-50 rounded-lg dark:bg-amber-900/20 dark:border-amber-700">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-300">
                Example Character Displayed
              </h3>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                Due to API rate limits, an example character is being shown instead of generating a new one. 
                This helps keep the app responsive during high usage. Try again later for a custom character!
              </p>
              {character.added_traits?.original_request && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-500">
                  <strong>Your request:</strong> "{character.added_traits.original_request}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adjust layout based on whether portrait is present */}
      <div className={`grid grid-cols-1 ${hasPortrait ? 'lg:grid-cols-3' : ''} gap-6`}>
        {/* Left Column - Portrait and Character Info */}
        <div className={`${hasPortrait ? 'lg:col-span-1' : ''} space-y-4`}>
          {/* Character Name */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {character.name}
          </h2>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              onClick={handleSaveToLibrary}
              leftIcon={<Save className="h-4 w-4" />}
              isLoading={isSaving}
              size="sm"
            >
              Save to Library
            </Button>
            
            <Button
              variant="secondary"
              onClick={downloadCharacterJSON}
              leftIcon={<FileJson className="h-4 w-4" />}
              size="sm"
            >
              JSON
            </Button>
            
            {/* Only show portrait download button if we have a portrait */}
            {hasPortrait && (
              <Button
                variant="secondary"
                onClick={() => {
                  const imageData = character.image_data || character.image_url;
                  if (imageData) {
                    const link = document.createElement('a');
                    link.href = imageData;
                    link.download = `${character.name.replace(/\s+/g, '_').toLowerCase()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
                leftIcon={<Download className="h-4 w-4" />}
                size="sm"
              >
                Portrait
              </Button>
            )}
            
            {/* New button to view library */}
            <Button
              variant="secondary"
              onClick={handleViewLibrary}
              leftIcon={<Library className="h-4 w-4" />}
              size="sm"
            >
              View Library
            </Button>
          </div>

          {/* Portrait - Only show if there's image data or URL */}
          {hasPortrait && (
            <div className="aspect-square w-full max-w-sm mx-auto">
              <img
                src={character.image_data || character.image_url}
                alt={character.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
          
          {/* Character Traits Tags */}
          {traits.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Traits</h4>
              <div className="flex flex-wrap gap-2">
                {traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Content Tabs - Adjust column span based on portrait presence */}
        <div className={`${hasPortrait ? 'lg:col-span-2' : ''}`}>
          <TabInterface 
            tabs={tabs}
            defaultTabId="profile"
          />
        </div>
      </div>
    </div>
  );
}