'use client';

import { useState } from 'react';
import { useCharacter } from '@/contexts/character-context';
import TemplateSelector from '@/components/template-selector';
import Select from '@/components/ui/select';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';
import Button from '@/components/ui/button';
import { 
  GenderOption,
  AgeGroupOption,
  AlignmentOption,
  RelationshipOption,
  TemplateOption
} from '@/lib/types';

// Options for dropdown selects
const genderOptions: GenderOption[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Nonbinary' },
  { value: 'unknown', label: 'Unknown' }
];

const ageGroupOptions: AgeGroupOption[] = [
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen' },
  { value: 'adult', label: 'Adult' },
  { value: 'elder', label: 'Elder' }
];

const alignmentOptions: AlignmentOption[] = [
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' }
];

const relationshipOptions: RelationshipOption[] = [
  { value: 'ally', label: 'Ally' },
  { value: 'enemy', label: 'Enemy' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'rival', label: 'Rival' },
  { value: 'betrayer', label: 'Betrayer' }
];

export default function CharacterTab() {
  const { formData, updateFormData } = useCharacter();
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Handle template selection
  const handleGenreChange = (template: TemplateOption | undefined) => {
    const genre = template?.id;
    updateFormData({ genre });
    
    // If a genre is selected and description is empty, suggest an example
    if (genre && !formData.description.trim()) {
      updateFormData({ description: getTemplateExample(genre) });
    }
  };
  
  // Handle randomize function
  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * GENRE_TEMPLATES.length);
    const randomGenre = GENRE_TEMPLATES[randomIndex].id;
    const randomTemplate = GENRE_TEMPLATES.find(t => t.id === randomGenre);
    
    if (randomTemplate) {
      handleGenreChange(randomTemplate);
    }
    
    // Randomly select other options
    const randomGender = genderOptions[Math.floor(Math.random() * genderOptions.length)].value;
    const randomAge = ageGroupOptions[Math.floor(Math.random() * ageGroupOptions.length)].value;
    const randomAlignment = alignmentOptions[Math.floor(Math.random() * alignmentOptions.length)].value;
    const randomRelationship = relationshipOptions[Math.floor(Math.random() * relationshipOptions.length)].value;
    
    updateFormData({
      gender: randomGender,
      age_group: randomAge,
      moral_alignment: randomAlignment,
      relationship_to_player: randomRelationship
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Genre Selection */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Genre (Optional)
        </label>
        <TemplateSelector
          templates={GENRE_TEMPLATES}
          selectedId={formData.genre}
          onChange={handleGenreChange}
        />
      </div>
      
      {/* Character Description */}
      <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Character Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Describe your character or concept... (e.g., A wise old wizard with a mysterious past)"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
      </div>
      
      {/* Main Character Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender */}
        <Select
          label="Gender"
          options={genderOptions}
          value={formData.gender || ''}
          onChange={(e) => updateFormData({ 
            gender: e.target.value ? e.target.value as any : undefined 
          })}
        />
        
        {/* Age Group */}
        <Select
          label="Age"
          options={ageGroupOptions}
          value={formData.age_group || ''}
          onChange={(e) => updateFormData({ 
            age_group: e.target.value ? e.target.value as any : undefined 
          })}
        />
        
        {/* Moral Alignment */}
        <Select
          label="Moral Alignment"
          options={alignmentOptions}
          value={formData.moral_alignment || ''}
          onChange={(e) => updateFormData({ 
            moral_alignment: e.target.value ? e.target.value as any : undefined 
          })}
        />
        
        {/* Relationship to Player */}
        <Select
          label="Relationship to Player"
          options={relationshipOptions}
          value={formData.relationship_to_player || ''}
          onChange={(e) => updateFormData({ 
            relationship_to_player: e.target.value ? e.target.value as any : undefined 
          })}
        />
      </div>
      
      {/* Advanced Options Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <span>{showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options</span>
          <svg 
            className={`ml-1 h-4 w-4 transform transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </div>
      
      {/* Advanced Options Panel */}
      {showAdvancedOptions && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
            Advanced options are coming soon. These will include species, occupation, personality traits, and social class selectors.
          </p>
        </div>
      )}
      
      {/* Randomize Button */}
      <div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleRandomize}
        >
          Randomize Character Options
        </Button>
      </div>
    </div>
  );
}