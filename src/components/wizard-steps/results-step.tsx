// Fixed results-step.tsx with proper layout and trait handling

'use client';

import { useState } from 'react';
import { useCharacter } from '@/contexts/character-context';
import { Character } from '@/lib/types';
import { Download, FileJson, Save, User, Heart, Book, Target, MessageSquare, Package } from 'lucide-react';
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
  const { character, downloadCharacterJSON, saveToLibrary, formData } = useCharacter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToLibrary = async () => {
    if (!character) return;
    setIsSaving(true);
    try {
      await saveToLibrary();
    } catch (error) {
      console.error('Error saving character:', error);
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div className="p-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Portrait and Character Info */}
        <div className="lg:col-span-1 space-y-4">
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
              Save
            </Button>
            
            <Button
              variant="secondary"
              onClick={downloadCharacterJSON}
              leftIcon={<FileJson className="h-4 w-4" />}
              size="sm"
            >
              JSON
            </Button>
            
            {(character.image_data || character.image_url) && (
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
          </div>

          {/* Portrait */}
          {(character.image_data || character.image_url) && (
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

        {/* Right Column - Content Tabs */}
        <div className="lg:col-span-2">
          <TabInterface 
            tabs={tabs}
            defaultTabId="profile"
          />
        </div>
      </div>
    </div>
  );
}