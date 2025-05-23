'use client';

import React from 'react';
import { Character } from '@/lib/types';
import { FormSection } from './shared';
import { PlusCircle, Trash2 } from 'lucide-react';
import Button from '@/components/ui/button';

interface AdditionalTraitsSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
}

export const AdditionalTraitsSection = ({
  character,
  setCharacter
}: AdditionalTraitsSectionProps) => {
  const handleAddTrait = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a unique key for the new trait
    const newTraitKey = `custom_trait_${Object.keys(character.added_traits).length + 1}`;
    
    setCharacter({
      ...character,
      added_traits: {
        ...character.added_traits,
        [newTraitKey]: "New trait value"
      }
    });
  };
  
  return (
    <FormSection title="Additional Traits">
      <p className="text-sm text-muted mb-4">
        These are additional traits that were generated by AI or that you can add yourself. You can edit, add, or remove traits as needed.
      </p>
      
      <div className="space-y-3">
        {/* List of existing AI-added traits */}
        {Object.entries(character.added_traits).map(([key, value], index) => (
          <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
            <div className="w-1/3">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  // Create a new object without the old key but with the new key
                  const newTraits = { ...character.added_traits };
                  const oldValue = newTraits[key];
                  delete newTraits[key];
                  newTraits[e.target.value] = oldValue;
                  
                  setCharacter({
                    ...character,
                    added_traits: newTraits
                  });
                }}
                placeholder="Trait name"
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setCharacter({
                    ...character,
                    added_traits: {
                      ...character.added_traits,
                      [key]: e.target.value
                    }
                  });
                }}
                placeholder="Trait value"
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
            </div>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                const newTraits = { ...character.added_traits };
                delete newTraits[key];
                setCharacter({
                  ...character,
                  added_traits: newTraits
                });
              }}
              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              title="Remove trait"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
        
        {/* Add new trait button */}
        <div className="mt-4">
          <Button
            variant="secondary"
            onClick={handleAddTrait}
            leftIcon={<PlusCircle className="h-4 w-4" />}
            type="button"
          >
            Add Custom Trait
          </Button>
        </div>
      </div>
    </FormSection>
  );
};