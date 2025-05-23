'use client';

import React from 'react';
import { Character, Quest } from '@/lib/types';
import Button from '@/components/ui/button';
import { FormSection, RegenerateButton } from './shared';
import { PlusCircle, Trash2, RefreshCw } from 'lucide-react';

interface QuestsSectionProps {
  character: Character;
  onArrayInputChange: <T extends unknown>(field: keyof Character, value: T[]) => void;
  onRegenerateField: (field: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  fieldLoadingStates: Record<string, boolean>;
}

export const QuestsSection = ({
  character,
  onArrayInputChange,
  onRegenerateField,
  fieldLoadingStates
}: QuestsSectionProps) => {
  
  // Add a new quest
  const handleAddQuest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const newQuest: Quest = {
      title: "New Quest",
      description: "Quest description goes here...",
      reward: "Quest reward goes here...",
      type: "any"
    };
    
    const updatedQuests = character.quests ? [...character.quests, newQuest] : [newQuest];
    onArrayInputChange('quests', updatedQuests);
  };
  
  // Remove a quest
  const handleRemoveQuest = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character || !character.quests) return;
    
    const updatedQuests = [...character.quests];
    updatedQuests.splice(index, 1);
    onArrayInputChange('quests', updatedQuests);
  };
  
  return (
    <FormSection title="Quests">
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="secondary" 
          onClick={handleAddQuest}
          leftIcon={<PlusCircle className="h-4 w-4" />}
          type="button"
        >
          Add Quest
        </Button>
      </div>
      
      {character.quests && character.quests.length > 0 ? (
        <div className="space-y-6">
          {character.quests.map((quest, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-theme last:border-0 last:mb-0 last:pb-0 bg-secondary p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Quest #{index + 1}</h3>
                <button
                  type="button"
                  onClick={handleRemoveQuest(index)}
                  className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                  title="Remove Quest"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Quest Title
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={quest.title}
                    onChange={(e) => {
                      const newQuests = [...character.quests!];
                      newQuests[index] = {...newQuests[index], title: e.target.value};
                      onArrayInputChange('quests', newQuests);
                    }}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <RegenerateButton
                    field={`quest_${index}_title`}
                    onClick={(e) => onRegenerateField(`quest_${index}_title`, e)}
                    isLoading={fieldLoadingStates[`quest_${index}_title`] || false}
                  />
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Quest Description
                </label>
                <div className="flex">
                  <textarea
                    value={quest.description}
                    onChange={(e) => {
                      const newQuests = [...character.quests!];
                      newQuests[index] = {...newQuests[index], description: e.target.value};
                      onArrayInputChange('quests', newQuests);
                    }}
                    rows={3}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <RegenerateButton
                    field={`quest_${index}_description`}
                    onClick={(e) => onRegenerateField(`quest_${index}_description`, e)}
                    isLoading={fieldLoadingStates[`quest_${index}_description`] || false}
                  />
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Quest Reward
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={quest.reward}
                    onChange={(e) => {
                      const newQuests = [...character.quests!];
                      newQuests[index] = {...newQuests[index], reward: e.target.value};
                      onArrayInputChange('quests', newQuests);
                    }}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <RegenerateButton
                    field={`quest_${index}_reward`}
                    onClick={(e) => onRegenerateField(`quest_${index}_reward`, e)}
                    isLoading={fieldLoadingStates[`quest_${index}_reward`] || false}
                  />
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="button"
                  onClick={(e) => onRegenerateField(`quest_${index}_whole`, e)}
                  className={`
                    w-full p-2 rounded-md flex items-center justify-center
                    ${fieldLoadingStates[`quest_${index}_whole`] 
                      ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' 
                      : 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300'
                    }
                  `}
                  disabled={fieldLoadingStates[`quest_${index}_whole`] || false}
                  title="Regenerate Entire Quest"
                >
                  {fieldLoadingStates[`quest_${index}_whole`] ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-300 mr-2"></div>
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2" />
                      Regenerate Entire Quest
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
          <p className="text-muted">No quests available. Add a quest to get started.</p>
        </div>
      )}
    </FormSection>
  );
};