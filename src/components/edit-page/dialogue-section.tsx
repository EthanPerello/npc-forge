'use client';

import React from 'react';
import { Character } from '@/lib/types';
import Button from '@/components/ui/button';
import { FormSection, RegenerateButton } from './shared';
import { PlusCircle, Trash2 } from 'lucide-react';

interface DialogueSectionProps {
  character: Character;
  onArrayInputChange: <T extends unknown>(field: keyof Character, value: T[]) => void;
  onRegenerateField: (field: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  isFieldRegenerating: (field: string, index?: number, subField?: string) => boolean;
  regeneratingFields: Set<string>;
}

export const DialogueSection = ({
  character,
  onArrayInputChange,
  onRegenerateField,
  isFieldRegenerating,
  regeneratingFields
}: DialogueSectionProps) => {
  
  // Check if any dialogue field is loading
  const hasDialogueLoading = Array.from(regeneratingFields).some(field => 
    field.startsWith('dialogue_')
  );

  // Add new dialogue
  const handleAddDialogue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const newDialogue = "New dialogue line...";
    const updatedDialogue = character.dialogue_lines ? [...character.dialogue_lines, newDialogue] : [newDialogue];
    onArrayInputChange('dialogue_lines', updatedDialogue);
  };
  
  // Remove dialogue
  const handleRemoveDialogue = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character || !character.dialogue_lines) return;
    
    const updatedDialogue = [...character.dialogue_lines];
    updatedDialogue.splice(index, 1);
    onArrayInputChange('dialogue_lines', updatedDialogue);
  };
  
  return (
    <FormSection title="Dialogue Lines">
      {/* Loading overlay when any dialogue is regenerating */}
      {hasDialogueLoading && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Regenerating dialogue lines...
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="secondary" 
          onClick={handleAddDialogue}
          leftIcon={<PlusCircle className="h-4 w-4" />}
          type="button"
        >
          Add Dialogue
        </Button>
      </div>
      
      {character.dialogue_lines && character.dialogue_lines.length > 0 ? (
        <div className="space-y-3">
          {character.dialogue_lines.map((line, index) => {
            const isDialogueLoading = isFieldRegenerating('dialogue', index);
            
            return (
              <div 
                key={index} 
                className={`mb-2 flex ${
                  isDialogueLoading ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800' : ''
                }`}
              >
                <input
                  type="text"
                  value={line}
                  onChange={(e) => {
                    const newLines = [...character.dialogue_lines!];
                    newLines[index] = e.target.value;
                    onArrayInputChange('dialogue_lines', newLines);
                  }}
                  className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  disabled={isDialogueLoading}
                />
                <RegenerateButton
                  field={`dialogue_${index}`}
                  onClick={(e) => onRegenerateField(`dialogue_${index}`, e)}
                  isLoading={isDialogueLoading}
                />
                <button
                  type="button"
                  onClick={handleRemoveDialogue(index)}
                  className="ml-2 p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                  title="Remove Dialogue"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
          <p className="text-muted">No dialogue available. Add dialogue to get started.</p>
        </div>
      )}
    </FormSection>
  );
};