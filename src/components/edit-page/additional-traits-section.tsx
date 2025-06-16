'use client';

import React, { useState } from 'react';
import { Character } from '@/lib/types';
import { FormSection } from './shared';
import { PlusCircle, Trash2, RotateCcw } from 'lucide-react';
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

  // Traits that are handled by the character traits section selectors
  const characterTraitFields = [
    'gender',
    'age_group',
    'moral_alignment', 
    'relationship_to_player',
    'species',
    'occupation',
    'social_class'
  ];

  // Traits that are handled by the basic info section
  const basicInfoFields = [
    'genre',
    'sub_genre'
  ];

  // Predefined personality traits that are selectable in the character traits section
  const predefinedPersonalityTraits = [
    'brave', 'cautious', 'cheerful', 'rude', 'loyal', 'dishonest', 'kind', 'cruel',
    'proud', 'humble', 'optimistic', 'pessimistic', 'shy', 'outgoing', 'intelligent', 'foolish'
  ];

  // Get all displayable additional traits
  const getDisplayableTraits = () => {
    const filtered: Record<string, string> = {};
    
    // Process selected_traits - include traits not handled by selectors
    if (character.selected_traits) {
      Object.entries(character.selected_traits).forEach(([key, value]) => {
        // Skip traits handled by basic info or character traits sections
        if (basicInfoFields.includes(key) || characterTraitFields.includes(key)) {
          return;
        }
        
        // Handle personality_traits specially - include ones not in predefined list
        if (key === 'personality_traits' && Array.isArray(value)) {
          value.forEach((trait, index) => {
            if (typeof trait === 'string' && trait.trim().length > 0) {
              // Only include if it's NOT in the predefined list
              if (!predefinedPersonalityTraits.includes(trait.toLowerCase())) {
                const formattedValue = formatTraitValue(trait);
                if (formattedValue) {
                  filtered[`custom_personality_${index}`] = formattedValue;
                }
              }
            }
          });
          return;
        }
        
        // Include other non-handled traits from selected_traits
        if (value && typeof value === 'string') {
          const formattedValue = formatTraitValue(value);
          if (formattedValue) {
            filtered[key] = formattedValue;
          }
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item && typeof item === 'string') {
              const formattedValue = formatTraitValue(item);
              if (formattedValue) {
                filtered[`${key}_${index}`] = formattedValue;
              }
            }
          });
        }
      });
    }
    
    // Process AI-added traits
    if (character.added_traits) {
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
        
        // Skip traits already handled by selectors
        if (basicInfoFields.includes(key) || characterTraitFields.includes(key)) {
          return;
        }
        
        // Skip if this trait was already added from selected_traits
        if (character.selected_traits && (character.selected_traits as any)[key]) {
          return;
        }
        
        if (!isSystemTrait && value && typeof value === 'string') {
          const formattedValue = formatTraitValue(value);
          if (formattedValue && formattedValue.length > 0) {
            filtered[key] = formattedValue;
          }
        } else if (!isSystemTrait && Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item && typeof item === 'string') {
              const formattedValue = formatTraitValue(item);
              if (formattedValue) {
                filtered[`${key}_${index}`] = formattedValue;
              }
            }
          });
        }
      });
    }
    
    return filtered;
  };

  // Format trait value with proper cleaning and validation but preserve accented characters
  const formatTraitValue = (value: string): string => {
    if (!value || typeof value !== 'string') {
      return '';
    }
    
    // Clean special characters but preserve accented characters
    const cleaned = value
      .replace(/["""'']/g, '"') // Normalize quotes
      .replace(/—/g, '-') // Replace em dashes
      .replace(/…/g, '...') // Replace ellipsis
      .trim(); // Don't remove any other characters to preserve accents
    
    // EXCLUDE long traits entirely - don't truncate, just return empty string
    if (cleaned.length > 25 || cleaned.includes('.') || cleaned.includes(',') || cleaned.split(' ').length > 4) {
      return '';
    }
    
    // For proper short traits, capitalize properly
    return cleaned
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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
        These are additional traits that were generated by AI, custom traits you've added, or traits that don't fit into the standard categories above. You can edit, add, or remove traits as needed.
      </p>
      
      <div className="space-y-3">
        {/* Loading overlay when regenerating traits */}
        {isRegenerating && regeneratingTrait === null && (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Generating new trait...
              </p>
            </div>
          </div>
        )}
        
        {/* List of existing additional traits */}
        {Object.entries(displayableTraits).length > 0 ? (
          Object.entries(displayableTraits).map(([key, value], index) => (
            <div key={`${key}-${index}`} className={`flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0 ${regeneratingTrait === key ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3' : ''}`}>
              <div className="w-1/4">
                <input
                  type="text"
                  value={key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} // Display with spaces and proper capitalization
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
                className={`p-2 transition-colors disabled:opacity-50 ${
                  regeneratingTrait === key 
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded' 
                    : 'text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
                }`}
                title={regeneratingTrait === key ? "Regenerating..." : "Regenerate this trait"}
              >
                {regeneratingTrait === key ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )}
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
              leftIcon={
                isRegenerating && regeneratingTrait === null ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
                ) : (
                  <RotateCcw className="h-4 w-4" />
                )
              }
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