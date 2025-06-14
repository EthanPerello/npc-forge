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
  isFieldRegenerating: (field: string, index?: number, subField?: string) => boolean;
  regeneratingFields: Set<string>;
}

export const QuestsSection = ({
  character,
  onArrayInputChange,
  onRegenerateField,
  isFieldRegenerating,
  regeneratingFields
}: QuestsSectionProps) => {
  
  // Check if any quest-related field is loading
  const hasQuestLoading = Array.from(regeneratingFields).some(field => 
    field.startsWith('quest_')
  );

  // Add new quest
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
      {/* Loading overlay when any quest is regenerating */}
      {hasQuestLoading && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Regenerating quest content...
            </p>
          </div>
        </div>
      )}

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
          {character.quests.map((quest, index) => {
            const isQuestLoading = isFieldRegenerating('quest', index, 'whole');
            const isTitleLoading = isFieldRegenerating('quest', index, 'title');
            const isDescriptionLoading = isFieldRegenerating('quest', index, 'description');
            const isRewardLoading = isFieldRegenerating('quest', index, 'reward');
            
            return (
              <div 
                key={index} 
                className={`mb-6 pb-6 border-b border-theme last:border-0 last:mb-0 last:pb-0 bg-secondary p-4 rounded-lg ${
                  isQuestLoading ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''
                }`}
              >
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
              
                <div className={`mb-2 ${isTitleLoading ? 'bg-blue-50 dark:bg-blue-900/20 rounded p-2 border border-blue-200 dark:border-blue-800' : ''}`}>
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
                      disabled={isTitleLoading}
                    />
                    <RegenerateButton
                      field={`quest_${index}_title`}
                      onClick={(e) => onRegenerateField(`quest_${index}_title`, e)}
                      isLoading={isTitleLoading}
                    />
                  </div>
                </div>
                
                <div className={`mb-2 ${isDescriptionLoading ? 'bg-blue-50 dark:bg-blue-900/20 rounded p-2 border border-blue-200 dark:border-blue-800' : ''}`}>
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
                      disabled={isDescriptionLoading}
                    />
                    <RegenerateButton
                      field={`quest_${index}_description`}
                      onClick={(e) => onRegenerateField(`quest_${index}_description`, e)}
                      isLoading={isDescriptionLoading}
                    />
                  </div>
                </div>
                
                <div className={`mb-2 ${isRewardLoading ? 'bg-blue-50 dark:bg-blue-900/20 rounded p-2 border border-blue-200 dark:border-blue-800' : ''}`}>
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
                      disabled={isRewardLoading}
                    />
                    <RegenerateButton
                      field={`quest_${index}_reward`}
                      onClick={(e) => onRegenerateField(`quest_${index}_reward`, e)}
                      isLoading={isRewardLoading}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={(e) => onRegenerateField(`quest_${index}_whole`, e)}
                    className={`
                      w-full p-2 rounded-md flex items-center justify-center transition-all duration-200
                      ${isQuestLoading 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-700 cursor-not-allowed' 
                        : 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'
                      }
                    `}
                    disabled={isQuestLoading}
                    title="Regenerate Entire Quest"
                  >
                    {isQuestLoading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300 mr-2"></div>
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
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
          <p className="text-muted">No quests available. Add a quest to get started.</p>
        </div>
      )}
    </FormSection>
  );
};