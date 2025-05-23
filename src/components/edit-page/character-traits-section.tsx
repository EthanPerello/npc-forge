'use client';

import React from 'react';
import { Character } from '@/lib/types';
import Select from '@/components/ui/select';
import { FormSection } from './shared';

// Options for character traits
const genderOptions = [
  { value: '', label: 'Not specified' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'unknown', label: 'Unknown/Other' },
];

const ageGroupOptions = [
  { value: '', label: 'Not specified' },
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen/Young Adult' },
  { value: 'adult', label: 'Adult' },
  { value: 'elder', label: 'Elder' },
];

const alignmentOptions = [
  { value: '', label: 'Not specified' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' },
];

const relationshipOptions = [
  { value: '', label: 'Not specified' },
  { value: 'ally', label: 'Ally/Friend' },
  { value: 'enemy', label: 'Enemy/Antagonist' },
  { value: 'neutral', label: 'Neutral/Stranger' },
  { value: 'mentor', label: 'Mentor/Guide' },
  { value: 'rival', label: 'Rival/Competitor' },
  { value: 'betrayer', label: 'Betrayer/Double Agent' },
];

const speciesOptions = [
  { value: '', label: 'Not specified' },
  { value: 'human', label: 'Human' },
  { value: 'elf', label: 'Elf' },
  { value: 'dwarf', label: 'Dwarf' },
  { value: 'halfling', label: 'Halfling' },
  { value: 'orc', label: 'Orc' },
  { value: 'goblin', label: 'Goblin' },
  { value: 'android', label: 'Android' },
  { value: 'alien', label: 'Alien' },
  { value: 'mutant', label: 'Mutant' },
  { value: 'cyborg', label: 'Cyborg' },
  { value: 'ai', label: 'Artificial Intelligence' },
];

const occupationOptions = [
  { value: '', label: 'Not specified' },
  { value: 'wizard', label: 'Wizard/Mage' },
  { value: 'warrior', label: 'Warrior' },
  { value: 'knight', label: 'Knight' },
  { value: 'ranger', label: 'Ranger/Hunter' },
  { value: 'bard', label: 'Bard' },
  { value: 'merchant', label: 'Merchant' },
  { value: 'thief', label: 'Thief/Rogue' },
  { value: 'pilot', label: 'Pilot' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'scientist', label: 'Scientist' },
  { value: 'soldier', label: 'Soldier' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'artist', label: 'Artist' },
  { value: 'detective', label: 'Detective' },
];

const personalityTraitOptions = [
  { value: 'brave', label: 'Brave' },
  { value: 'cautious', label: 'Cautious' },
  { value: 'cheerful', label: 'Cheerful' },
  { value: 'rude', label: 'Rude' },
  { value: 'loyal', label: 'Loyal' },
  { value: 'dishonest', label: 'Dishonest' },
  { value: 'kind', label: 'Kind' },
  { value: 'cruel', label: 'Cruel' },
  { value: 'proud', label: 'Proud' },
  { value: 'humble', label: 'Humble' },
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'pessimistic', label: 'Pessimistic' },
  { value: 'shy', label: 'Shy' },
  { value: 'outgoing', label: 'Outgoing' },
  { value: 'intelligent', label: 'Intelligent' },
  { value: 'foolish', label: 'Foolish' },
];

const socialClassOptions = [
  { value: '', label: 'Not specified' },
  { value: 'lower_class', label: 'Lower Class/Poor' },
  { value: 'working_class', label: 'Working Class' },
  { value: 'middle_class', label: 'Middle Class' },
  { value: 'upper_class', label: 'Upper Class/Wealthy' },
  { value: 'nobility', label: 'Nobility/Aristocracy' },
  { value: 'royalty', label: 'Royalty' },
  { value: 'outcast', label: 'Outcast/Exile' },
];

interface CharacterTraitsSectionProps {
  character: Character;
  onNestedChange: (section: 'selected_traits' | 'added_traits', field: string, value: string | string[]) => void;
}

export const CharacterTraitsSection = ({
  character,
  onNestedChange
}: CharacterTraitsSectionProps) => {
  // Toggle personality trait
  const handleTogglePersonalityTrait = (trait: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const currentTraits = character.selected_traits.personality_traits || [];
    
    if (currentTraits.includes(trait)) {
      // Remove trait
      onNestedChange(
        'selected_traits', 
        'personality_traits', 
        currentTraits.filter(t => t !== trait)
      );
    } else {
      // Add trait - no limit anymore
      onNestedChange(
        'selected_traits',
        'personality_traits',
        [...currentTraits, trait]
      );
    }
  };

  return (
    <FormSection title="Character Traits">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Gender"
          options={genderOptions}
          value={character.selected_traits.gender || ''}
          onChange={(e) => onNestedChange('selected_traits', 'gender', e.target.value)}
        />
        
        <Select
          label="Age Group"
          options={ageGroupOptions}
          value={character.selected_traits.age_group || ''}
          onChange={(e) => onNestedChange('selected_traits', 'age_group', e.target.value)}
        />
        
        <Select
          label="Moral Alignment"
          options={alignmentOptions}
          value={character.selected_traits.moral_alignment || ''}
          onChange={(e) => onNestedChange('selected_traits', 'moral_alignment', e.target.value)}
        />
        
        <Select
          label="Relationship to Player"
          options={relationshipOptions}
          value={character.selected_traits.relationship_to_player || ''}
          onChange={(e) => onNestedChange('selected_traits', 'relationship_to_player', e.target.value)}
        />
        
        <Select
          label="Species"
          options={speciesOptions}
          value={character.selected_traits.species || ''}
          onChange={(e) => onNestedChange('selected_traits', 'species', e.target.value)}
        />
        
        <Select
          label="Occupation"
          options={occupationOptions}
          value={character.selected_traits.occupation || ''}
          onChange={(e) => onNestedChange('selected_traits', 'occupation', e.target.value)}
        />
        
        <Select
          label="Social Class"
          options={socialClassOptions}
          value={character.selected_traits.social_class || ''}
          onChange={(e) => onNestedChange('selected_traits', 'social_class', e.target.value)}
        />
      </div>
      
      {/* Personality Traits - No more limit */}
      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Personality Traits</label>
        <div className="flex flex-wrap gap-2">
          {personalityTraitOptions.map((trait) => (
            <button
              key={trait.value}
              type="button"
              onClick={handleTogglePersonalityTrait(trait.value)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                character.selected_traits.personality_traits?.includes(trait.value)
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700 font-medium shadow-sm'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
              }`}
            >
              {trait.label}
            </button>
          ))}
        </div>
      </div>
    </FormSection>
  );
};