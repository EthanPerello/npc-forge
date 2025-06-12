'use client';

import React, { useState } from 'react';
import { Character } from '@/lib/types';
import { FormSection } from './shared';
import { PlusCircle, Trash2, RotateCcw, Sparkles } from 'lucide-react';
import Button from '@/components/ui/button';

interface AdditionalTraitsSectionProps {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
  onRegenerate?: (field: string) => void;
  isRegenerating?: boolean;
}

export const AdditionalTraitsSection = ({
  character,
  setCharacter,
  onRegenerate,
  isRegenerating = false
}: AdditionalTraitsSectionProps) => {
  const [regeneratingTrait, setRegeneratingTrait] = useState<string | null>(null);

  // Get all displayable additional traits (matching what shows in character modal)
  const getDisplayableTraits = () => {
    if (!character.added_traits) {
      return {};
    }
    
    const filtered: Record<string, string> = {};
    
    Object.entries(character.added_traits).forEach(([key, value]) => {
      // Skip system/error traits and main profile fields
      const isSystemTrait = key.includes('error') || 
                           key.includes('fallback') || 
                           key.includes('api') ||
                           key.includes('portrait_') ||
                           key === 'original_request' ||
                           key === 'appearance' || 
                           key === 'personality' || 
                           key === 'backstory_hook';
      
      // Only include string values that aren't system traits and aren't empty after formatting
      if (!isSystemTrait && typeof value === 'string' && value.trim().length > 0) {
        // Apply the same formatting/filtering logic as the character modal
        const formattedValue = value
          .replace(/["""'']/g, '"')
          .replace(/—/g, '-')
          .replace(/…/g, '...')
          .replace(/[^\w\s-.,!?]/g, '')
          .trim();
        
        // Only include if it's not too long (same logic as character modal)
        if (formattedValue.length <= 25 && 
            !formattedValue.includes('.') && 
            !formattedValue.includes(',') && 
            formattedValue.split(' ').length <= 4) {
          
          // Capitalize properly
          const capitalizedValue = formattedValue
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          filtered[key] = capitalizedValue;
        }
      }
    });
    
    return filtered;
  };

  const displayableTraits = getDisplayableTraits();

  const handleAddTrait = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create a unique key for the new trait
    const existingKeys = Object.keys(character.added_traits || {});
    let counter = 1;
    let newTraitKey = `custom_trait_${counter}`;
    
    // Ensure the key is unique
    while (existingKeys.includes(newTraitKey)) {
      counter++;
      newTraitKey = `custom_trait_${counter}`;
    }
    
    setCharacter({
      ...character,
      added_traits: {
        ...character.added_traits,
        [newTraitKey]: "New Trait"
      }
    });
  };

  const handleAddGeneratedTrait = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onRegenerate) {
      onRegenerate('add_single_trait');
    }
  };

  const handleRegenerateTrait = (traitKey: string) => {
    if (onRegenerate) {
      setRegeneratingTrait(traitKey);
      onRegenerate(`regenerate_trait_${traitKey}`);
    }
  };

  const handleTraitKeyChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return;
    
    // Create a new object without the old key but with the new key
    const newTraits = { ...character.added_traits };
    const oldValue = newTraits[oldKey];
    delete newTraits[oldKey];
    
    // Only add the new key if it's not empty and doesn't already exist
    if (newKey.trim() && !newTraits[newKey]) {
      newTraits[newKey] = oldValue;
    } else if (newKey.trim()) {
      // If key exists, append a number
      let counter = 1;
      let uniqueKey = `${newKey}_${counter}`;
      while (newTraits[uniqueKey]) {
        counter++;
        uniqueKey = `${newKey}_${counter}`;
      }
      newTraits[uniqueKey] = oldValue;
    } else {
      // If new key is empty, use a default
      newTraits['trait'] = oldValue;
    }
    
    setCharacter({
      ...character,
      added_traits: newTraits
    });
  };

  const handleTraitValueChange = (key: string, newValue: string) => {
    setCharacter({
      ...character,
      added_traits: {
        ...character.added_traits,
        [key]: newValue
      }
    });
  };

  const handleRemoveTrait = (keyToRemove: string) => {
    const newTraits = { ...character.added_traits };
    delete newTraits[keyToRemove];
    setCharacter({
      ...character,
      added_traits: newTraits
    });
  };

  // Clear regenerating state when regeneration completes
  React.useEffect(() => {
    if (!isRegenerating) {
      setRegeneratingTrait(null);
    }
  }, [isRegenerating]);

  return (
    <FormSection title="Additional Traits">
      <p className="text-sm text-muted mb-4">
        These are additional traits that were generated by AI or that you can add yourself. You can edit, add, or remove traits as needed.
      </p>
      
      <div className="space-y-3">
        {/* List of existing additional traits */}
        {Object.entries(displayableTraits).length > 0 ? (
          Object.entries(displayableTraits).map(([key, value], index) => (
            <div key={`${key}-${index}`} className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
              <div className="w-1/4">
                <input
                  type="text"
                  value={key.replace(/_/g, ' ')} // Display with spaces for readability
                  onChange={(e) => {
                    const newKey = e.target.value.replace(/\s+/g, '_').toLowerCase(); // Convert back to underscore format
                    handleTraitKeyChange(key, newKey);
                  }}
                  placeholder="Trait name"
                  className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleTraitValueChange(key, e.target.value)}
                  placeholder="Trait value"
                  className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRegenerateTrait(key)}
                disabled={regeneratingTrait === key}
                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors disabled:opacity-50"
                title="Regenerate this trait"
              >
                <RotateCcw className={`h-4 w-4 ${regeneratingTrait === key ? 'animate-spin' : ''}`} />
              </button>
              <button
                type="button"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveTrait(key);
                }}
                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                title="Remove trait"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            No additional traits found. Add custom traits or generate new ones using the buttons below.
          </div>
        )}
        
        {/* Action buttons */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <Button
            variant="secondary"
            onClick={handleAddTrait}
            leftIcon={<PlusCircle className="h-4 w-4" />}
            type="button"
          >
            Add Custom Trait
          </Button>
          
          {onRegenerate && (
            <Button
              variant="secondary"
              onClick={handleAddGeneratedTrait}
              disabled={isRegenerating}
              leftIcon={<Sparkles className={`h-4 w-4 ${isRegenerating && regeneratingTrait === null ? 'animate-pulse' : ''}`} />}
              type="button"
            >
              {isRegenerating && regeneratingTrait === null ? 'Generating...' : 'Add Generated Trait'}
            </Button>
          )}
        </div>
      </div>
    </FormSection>
  );
};