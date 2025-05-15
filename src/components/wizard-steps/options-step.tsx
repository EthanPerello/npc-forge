// Fixed options-step.tsx - removed portrait generation options

'use client';

import { useState } from 'react';
import { useCharacter } from '@/contexts/character-context';
import { ChangeEvent } from 'react';
import Select from '../ui/select';
import SearchableSelect from '../ui/searchable-select';
import ExpandableSection from '../ui/expandable-section';
import QuestsTab from '../tabs/quests-tab';
import DialogueTab from '../tabs/dialogue-tab';
import ItemsTab from '../tabs/items-tab';
import { RotateCcw, Wand2 } from 'lucide-react';
import Button from '../ui/button';
import { getSubGenres } from '@/lib/templates';

interface OptionsStepProps {
  onNext: () => void;
  isGenerating?: boolean;
}

// Gender options
const genderOptions = [
  { value: '', label: 'Not specified' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'unknown', label: 'Unknown/Other' },
];

// Age group options
const ageGroupOptions = [
  { value: '', label: 'Not specified' },
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen/Young Adult' },
  { value: 'adult', label: 'Adult' },
  { value: 'elder', label: 'Elder' },
];

// Species options
const speciesOptions = [
  { value: '', label: 'Not specified' },
  { value: 'human', label: 'Human' },
  { value: 'elf', label: 'Elf' },
  { value: 'dwarf', label: 'Dwarf' },
  { value: 'halfling', label: 'Halfling' },
  { value: 'orc', label: 'Orc' },
  { value: 'goblin', label: 'Goblin' },
  { value: 'tiefling', label: 'Tiefling' },
  { value: 'dragonborn', label: 'Dragonborn' },
  { value: 'android', label: 'Android' },
  { value: 'alien', label: 'Alien' },
  { value: 'mutant', label: 'Mutant' },
  { value: 'cyborg', label: 'Cyborg' },
];

// Alignment options
const alignmentOptions = [
  { value: '', label: 'Not specified' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' },
];

// Relationship options
const relationshipOptions = [
  { value: '', label: 'Not specified' },
  { value: 'ally', label: 'Ally/Friend' },
  { value: 'enemy', label: 'Enemy/Antagonist' },
  { value: 'neutral', label: 'Neutral/Stranger' },
  { value: 'mentor', label: 'Mentor/Guide' },
  { value: 'rival', label: 'Rival/Competitor' },
  { value: 'betrayer', label: 'Betrayer/Double Agent' },
];

// Occupation options
const occupationOptions = [
  { value: 'wizard', label: 'Wizard/Mage' },
  { value: 'warrior', label: 'Warrior' },
  { value: 'knight', label: 'Knight' },
  { value: 'ranger', label: 'Ranger/Hunter' },
  { value: 'bard', label: 'Bard' },
  { value: 'cleric', label: 'Cleric/Priest' },
  { value: 'merchant', label: 'Merchant' },
  { value: 'blacksmith', label: 'Blacksmith' },
  { value: 'thief', label: 'Thief/Rogue' },
  { value: 'alchemist', label: 'Alchemist' },
  { value: 'pilot', label: 'Pilot' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'scientist', label: 'Scientist' },
  { value: 'hacker', label: 'Hacker' },
  { value: 'police', label: 'Police Officer' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'teacher', label: 'Teacher' },
];

// Personality traits
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
  { value: 'serious', label: 'Serious' },
  { value: 'playful', label: 'Playful' },
  { value: 'mystical', label: 'Mystical' },
  { value: 'practical', label: 'Practical' },
  { value: 'greedy', label: 'Greedy' },
  { value: 'generous', label: 'Generous' },
];

// Social class options
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

// Height options
const heightOptions = [
  { value: '', label: 'Not specified' },
  { value: 'very_short', label: 'Very Short' },
  { value: 'short', label: 'Short' },
  { value: 'average', label: 'Average' },
  { value: 'tall', label: 'Tall' },
  { value: 'very_tall', label: 'Very Tall' },
];

// Build options
const buildOptions = [
  { value: '', label: 'Not specified' },
  { value: 'thin', label: 'Thin/Slender' },
  { value: 'athletic', label: 'Athletic/Toned' },
  { value: 'average', label: 'Average' },
  { value: 'heavy', label: 'Heavy/Stocky' },
  { value: 'muscular', label: 'Muscular/Strong' },
];

export default function OptionsStep({ onNext, isGenerating }: OptionsStepProps) {
  const { formData, updateFormData } = useCharacter();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Get available sub-genres based on selected genre
  const availableSubGenres = formData.genre ? getSubGenres(formData.genre) : [];

  const handleBasicTraitChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    updateFormData({ [field]: value });
  };

  const handleAdvancedOptionChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        [field]: value
      }
    });
  };

  const handleOccupationChange = (value: string) => {
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        occupation: value || undefined
      }
    });
  };

  const togglePersonalityTrait = (trait: string) => {
    const currentTraits = formData.advanced_options?.personality_traits || [];
    let updatedTraits;
    
    if (currentTraits.includes(trait)) {
      updatedTraits = currentTraits.filter((t: string) => t !== trait);
    } else {
      updatedTraits = [...currentTraits, trait];
    }
    
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        personality_traits: updatedTraits
      }
    });
  };

  const handleDistinctiveFeaturesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        distinctive_features: e.target.value || undefined
      }
    });
  };

  const handleHomelandChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        homeland: e.target.value || undefined
      }
    });
  };

  const handleSubGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    updateFormData({ sub_genre: value });
  };

  const handleClearOptions = () => {
    updateFormData({
      gender: undefined,
      age_group: undefined,
      moral_alignment: undefined,
      relationship_to_player: undefined,
      sub_genre: undefined,
      advanced_options: {
        species: undefined,
        occupation: undefined,
        personality_traits: [],
        social_class: undefined,
        height: undefined,
        build: undefined,
        distinctive_features: undefined,
        homeland: undefined
      }
    });
  };

  const handleRandomizeOptions = () => {
    // Randomize basic traits
    const randomGender = genderOptions[Math.floor(Math.random() * (genderOptions.length - 1)) + 1].value;
    const randomAge = ageGroupOptions[Math.floor(Math.random() * (ageGroupOptions.length - 1)) + 1].value;
    const randomSpecies = speciesOptions[Math.floor(Math.random() * (speciesOptions.length - 1)) + 1].value;
    const randomAlignment = alignmentOptions[Math.floor(Math.random() * (alignmentOptions.length - 1)) + 1].value;
    const randomRelationship = relationshipOptions[Math.floor(Math.random() * (relationshipOptions.length - 1)) + 1].value;
    
    // Random personality traits (2-3)
    const numTraits = Math.floor(Math.random() * 2) + 2;
    const shuffledTraits = [...personalityTraitOptions].sort(() => 0.5 - Math.random());
    const randomTraits = shuffledTraits.slice(0, numTraits).map(t => t.value);

    // Random social class
    const randomSocialClass = socialClassOptions[Math.floor(Math.random() * (socialClassOptions.length - 1)) + 1].value;

    updateFormData({
      gender: randomGender as any,
      age_group: randomAge as any,
      moral_alignment: randomAlignment as any,
      relationship_to_player: randomRelationship as any,
      advanced_options: {
        ...formData.advanced_options,
        species: randomSpecies,
        personality_traits: randomTraits,
        social_class: randomSocialClass
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">
          Character Options
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Define key characteristics and appearance
        </p>
      </div>

      {/* Basic Traits */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Traits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            label="Gender"
            options={genderOptions}
            value={formData.gender || ''}
            onChange={handleBasicTraitChange('gender')}
            fullWidth={false}
          />
          
          <Select
            label="Age"
            options={ageGroupOptions}
            value={formData.age_group || ''}
            onChange={handleBasicTraitChange('age_group')}
            fullWidth={false}
          />
          
          <Select
            label="Alignment"
            options={alignmentOptions}
            value={formData.moral_alignment || ''}
            onChange={handleBasicTraitChange('moral_alignment')}
            fullWidth={false}
          />
          
          <Select
            label="Relationship to Player"
            options={relationshipOptions}
            value={formData.relationship_to_player || ''}
            onChange={handleBasicTraitChange('relationship_to_player')}
            fullWidth={false}
          />
        </div>
      </div>

      {/* Advanced Options */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          type="button"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Advanced Options
          </h3>
          <svg
            className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="mt-3 space-y-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
            {/* Sub-genre Selection */}
            {availableSubGenres.length > 0 && (
              <div>
                <Select
                  label="Sub-genre"
                  options={[
                    { value: '', label: 'Not specified' },
                    ...availableSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
                  ]}
                  value={formData.sub_genre || ''}
                  onChange={handleSubGenreChange}
                  fullWidth={true}
                />
              </div>
            )}

            {/* Physical Traits */}
            <div className="space-y-3">
              <h4 className="text-base font-medium text-gray-900 dark:text-gray-100">Physical Traits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Select
                  label="Species"
                  options={speciesOptions}
                  value={formData.advanced_options?.species || ''}
                  onChange={handleAdvancedOptionChange('species')}
                  fullWidth={false}
                />
                
                <Select
                  label="Social Class"
                  options={socialClassOptions}
                  value={formData.advanced_options?.social_class || ''}
                  onChange={handleAdvancedOptionChange('social_class')}
                  fullWidth={false}
                />
                
                <Select
                  label="Height"
                  options={heightOptions}
                  value={formData.advanced_options?.height || ''}
                  onChange={handleAdvancedOptionChange('height')}
                  fullWidth={false}
                />
                
                <Select
                  label="Build"
                  options={buildOptions}
                  value={formData.advanced_options?.build || ''}
                  onChange={handleAdvancedOptionChange('build')}
                  fullWidth={false}
                />
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Occupation
              </label>
              <SearchableSelect
                options={occupationOptions}
                value={formData.advanced_options?.occupation || ''}
                onChange={handleOccupationChange}
                placeholder="Select or search..."
              />
            </div>

            {/* Personality Traits */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Personality Traits
              </label>
              <div className="flex flex-wrap gap-1.5">
                {personalityTraitOptions.map((trait) => (
                  <button
                    key={trait.value}
                    type="button"
                    onClick={() => togglePersonalityTrait(trait.value)}
                    className={`
                      px-2 py-1 text-xs rounded-full transition-colors
                      ${formData.advanced_options?.personality_traits?.includes(trait.value)
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'}
                    `}
                  >
                    {trait.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Distinctive Features */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Distinctive Features (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.advanced_options?.distinctive_features || ''}
                onChange={handleDistinctiveFeaturesChange}
                placeholder="Scars, tattoos, unusual eye color, etc."
                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
            </div>

            {/* Homeland/Origin */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Homeland/Origin (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.advanced_options?.homeland || ''}
                onChange={handleHomelandChange}
                placeholder="Where they came from or grew up"
                className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
            </div>

            {/* Quest Options */}
            {formData.include_quests && (
              <div>
                <h4 className="text-base font-medium mb-2 text-gray-900 dark:text-gray-100">Quest Options</h4>
                <div className="bg-white rounded p-3 dark:bg-gray-800">
                  <QuestsTab />
                </div>
              </div>
            )}

            {/* Dialogue Options */}
            {formData.include_dialogue && (
              <div>
                <h4 className="text-base font-medium mb-2 text-gray-900 dark:text-gray-100">Dialogue Options</h4>
                <div className="bg-white rounded p-3 dark:bg-gray-800">
                  <DialogueTab />
                </div>
              </div>
            )}

            {/* Item Options */}
            {formData.include_items && (
              <div>
                <h4 className="text-base font-medium mb-2 text-gray-900 dark:text-gray-100">Item Options</h4>
                <div className="bg-white rounded p-3 dark:bg-gray-800">
                  <ItemsTab />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons - Always visible below advanced options */}
        <div className="flex justify-center space-x-3 mt-3">
          <Button
            variant="secondary"
            onClick={handleClearOptions}
            leftIcon={<RotateCcw className="h-4 w-4" />}
            disabled={isGenerating}
            size="sm"
          >
            Clear Options
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleRandomizeOptions}
            leftIcon={<Wand2 className="h-4 w-4" />}
            disabled={isGenerating}
            size="sm"
          >
            Randomize Options
          </Button>
        </div>
      </div>
    </div>
  );
}