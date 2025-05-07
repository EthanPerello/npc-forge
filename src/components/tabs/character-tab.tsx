'use client';

import { useState, useRef, useEffect } from 'react';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';
import { getSubGenres } from '@/lib/templates';
import { useCharacter } from '@/contexts/character-context';
import TemplateSelector from '@/components/template-selector';
import ModelSelector from '@/components/model-selector';
import PortraitOptions from '@/components/tabs/portrait-options';
import ExpandableSection from '@/components/ui/expandable-section';
import Select from '@/components/ui/select';
import SearchableSelect from '@/components/ui/searchable-select';
import { getModelByTier } from '@/lib/models';
import { 
  TemplateOption, 
  SubGenreOption, 
  OpenAIModel, 
  PersonalityOption,
} from '@/lib/types';
import { ChangeEvent } from 'react';

// Gender options with specific typings
const genderOptions = [
  { value: '', label: 'Not specified' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'unknown', label: 'Unknown/Other' },
];

// Age group options with specific typings
const ageGroupOptions = [
  { value: '', label: 'Not specified' },
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen/Young Adult' },
  { value: 'adult', label: 'Adult' },
  { value: 'elder', label: 'Elder' },
];

// Moral alignment options with specific typings
const alignmentOptions = [
  { value: '', label: 'Not specified' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' },
];

// Relationship to player options with specific typings
const relationshipOptions = [
  { value: '', label: 'Not specified' },
  { value: 'ally', label: 'Ally/Friend' },
  { value: 'enemy', label: 'Enemy/Antagonist' },
  { value: 'neutral', label: 'Neutral/Stranger' },
  { value: 'mentor', label: 'Mentor/Guide' },
  { value: 'rival', label: 'Rival/Competitor' },
  { value: 'betrayer', label: 'Betrayer/Double Agent' },
];

// Common species by genre
const speciesOptions = [
  // Fantasy species
  { value: 'human', label: 'Human', genre: ['fantasy', 'historical', 'contemporary'] },
  { value: 'elf', label: 'Elf', genre: ['fantasy'] },
  { value: 'dwarf', label: 'Dwarf', genre: ['fantasy'] },
  { value: 'halfling', label: 'Halfling', genre: ['fantasy'] },
  { value: 'orc', label: 'Orc', genre: ['fantasy'] },
  { value: 'goblin', label: 'Goblin', genre: ['fantasy'] },
  { value: 'tiefling', label: 'Tiefling', genre: ['fantasy'] },
  { value: 'dragonborn', label: 'Dragonborn', genre: ['fantasy'] },
  
  // Sci-fi species
  { value: 'android', label: 'Android', genre: ['sci-fi'] },
  { value: 'alien', label: 'Alien', genre: ['sci-fi'] },
  { value: 'mutant', label: 'Mutant', genre: ['sci-fi'] },
  { value: 'cyborg', label: 'Cyborg', genre: ['sci-fi'] },
  { value: 'ai', label: 'Artificial Intelligence', genre: ['sci-fi'] },
  { value: 'clone', label: 'Clone', genre: ['sci-fi'] },
];

// More occupations by genre
const occupationOptions = [
  // Fantasy occupations
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
  { value: 'druid', label: 'Druid' },
  { value: 'noble', label: 'Noble' },
  { value: 'farmer', label: 'Farmer' },
  { value: 'guard', label: 'Guard' },
  { value: 'healer', label: 'Healer' },
  { value: 'scholar', label: 'Scholar' },
  
  // Sci-fi occupations
  { value: 'pilot', label: 'Pilot' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'scientist', label: 'Scientist' },
  { value: 'hacker', label: 'Hacker' },
  { value: 'soldier', label: 'Soldier' },
  { value: 'medic', label: 'Medic/Doctor' },
  { value: 'bounty_hunter', label: 'Bounty Hunter' },
  { value: 'trader', label: 'Trader' },
  { value: 'explorer', label: 'Explorer' },
  { value: 'colonist', label: 'Colonist' },
  { value: 'diplomat', label: 'Diplomat' },
  { value: 'smuggler', label: 'Smuggler' },
  
  // Contemporary occupations
  { value: 'police', label: 'Police Officer' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'artist', label: 'Artist' },
  { value: 'businessman', label: 'Business Person' },
  { value: 'programmer', label: 'Programmer' },
  { value: 'athlete', label: 'Athlete' },
  { value: 'cook', label: 'Chef/Cook' },
  { value: 'journalist', label: 'Journalist' },
  { value: 'lawyer', label: 'Lawyer' },
];

// Personality traits
const personalityTraitOptions: PersonalityOption[] = [
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
  { value: 'lazy', label: 'Lazy' },
  { value: 'hardworking', label: 'Hardworking' },
  { value: 'intelligent', label: 'Intelligent' },
  { value: 'foolish', label: 'Foolish' },
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
  { value: 'varied', label: 'Varied/Complex' },
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

// Define valid gender types
type ValidGender = 'male' | 'female' | 'nonbinary' | 'unknown' | undefined;

// Define valid age group types
type ValidAgeGroup = 'child' | 'teen' | 'adult' | 'elder' | undefined;

// Define valid alignment types
type ValidAlignment = 'good' | 'neutral' | 'evil' | undefined;

// Define valid relationship types
type ValidRelationship = 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer' | undefined;

// These utility functions parse and validate values from form controls
function parseGender(value: string): ValidGender {
  if (value === '') return undefined;
  return ['male', 'female', 'nonbinary', 'unknown'].includes(value) 
    ? value as ValidGender 
    : undefined;
}

function parseAgeGroup(value: string): ValidAgeGroup {
  if (value === '') return undefined;
  return ['child', 'teen', 'adult', 'elder'].includes(value) 
    ? value as ValidAgeGroup 
    : undefined;
}

function parseAlignment(value: string): ValidAlignment {
  if (value === '') return undefined;
  return ['good', 'neutral', 'evil'].includes(value) 
    ? value as ValidAlignment 
    : undefined;
}

function parseRelationship(value: string): ValidRelationship {
  if (value === '') return undefined;
  return ['ally', 'enemy', 'neutral', 'mentor', 'rival', 'betrayer'].includes(value) 
    ? value as ValidRelationship 
    : undefined;
}

// Interfaces for structured options
interface OptionValue {
  value: string;
  label: string;
}

// CSS class to match the other form elements styling
const formElementClass = "bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600";

export default function CharacterTab() {
  const { formData, updateFormData } = useCharacter();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isDescriptionDefault, setIsDescriptionDefault] = useState(true);
  const [showAutoFillMessage, setShowAutoFillMessage] = useState(false);
  const initialDescription = useRef("");
  
  // Update when description changes
  useEffect(() => {
    if (formData.description && initialDescription.current === '') {
      initialDescription.current = formData.description;
    }
  }, [formData.description]);

  // Handle description field changes
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    updateFormData({ description: newValue });

    // If user has changed from the default, mark as not default
    if (newValue !== initialDescription.current) {
      setIsDescriptionDefault(false);
    } else {
      setIsDescriptionDefault(true);
    }
  };
  
  // Handle template change
  const handleTemplateChange = (template: TemplateOption | undefined, subGenre?: SubGenreOption) => {
    // Update genre and optionally sub-genre
    if (template) {
      updateFormData({ 
        genre: template.id,
        sub_genre: subGenre ? subGenre.id : undefined
      });
      
      // If the description field is empty or hasn't been modified, populate it with an example
      if (!formData.description || formData.description.trim() === '' || isDescriptionDefault) {
        const example = subGenre && subGenre.example 
          ? subGenre.example 
          : getTemplateExample(template.id);
        
        updateFormData({ description: example });
        initialDescription.current = example;
        setIsDescriptionDefault(true);
        setShowAutoFillMessage(true);
      }
    } else {
      updateFormData({ 
        genre: undefined,
        sub_genre: undefined
      });
    }
  };
  
  // Handle basic character fields
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === '') {
      updateFormData({ gender: undefined });
    } else if (isValidGender(value)) {
      updateFormData({ gender: value as 'male' | 'female' | 'nonbinary' | 'unknown' });
    }
  };
  
  const handleAgeGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === '') {
      updateFormData({ age_group: undefined });
    } else if (isValidAgeGroup(value)) {
      updateFormData({ age_group: value as 'child' | 'teen' | 'adult' | 'elder' });
    }
  };
  
  const handleAlignmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === '') {
      updateFormData({ moral_alignment: undefined });
    } else if (isValidAlignment(value)) {
      updateFormData({ moral_alignment: value as 'good' | 'neutral' | 'evil' });
    }
  };
  
  const handleRelationshipChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === '') {
      updateFormData({ relationship_to_player: undefined });
    } else if (isValidRelationship(value)) {
      updateFormData({ relationship_to_player: value as 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer' });
    }
  };
  
  // Handle advanced options
  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        species: e.target.value || undefined
      }
    });
  };
  
  // Updated for proper typing
  const handleOccupationChange = (option: OptionValue | null | string) => {
    let occupationValue: string | undefined;
    
    // Handle different possible input types
    if (typeof option === 'string') {
      occupationValue = option || undefined;
    } else if (option && typeof option === 'object' && 'value' in option) {
      occupationValue = option.value;
    } else {
      occupationValue = undefined;
    }
    
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        occupation: occupationValue
      }
    });
  };
  
  const handleSocialClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        social_class: e.target.value || undefined
      }
    });
  };
  
  const handleHeightChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        height: e.target.value || undefined
      }
    });
  };
  
  const handleBuildChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        build: e.target.value || undefined
      }
    });
  };
  
  const handleDistinctiveFeaturesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        distinctive_features: e.target.value || undefined
      }
    });
  };
  
  const handleHomelandChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        homeland: e.target.value || undefined
      }
    });
  };
  
  // Helper function to toggle personality traits - NO LIMIT
  const togglePersonalityTrait = (trait: string) => {
    // Initialize the array if it doesn't exist
    const currentTraits = formData.advanced_options?.personality_traits || [];
    
    // Toggle the trait
    let updatedTraits;
    if (currentTraits.includes(trait)) {
      // Remove the trait if already selected
      updatedTraits = currentTraits.filter(t => t !== trait);
    } else {
      // Add the trait - no limit imposed
      updatedTraits = [...currentTraits, trait];
    }
    
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        personality_traits: updatedTraits
      }
    });
  };
  
  const handleModelChange = (model: OpenAIModel) => {
    updateFormData({ model });
  };
  
  // Function to handle the randomize button click - IMPROVED VERSION
  const handleRandomize = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Get random values for the basic fields
    const randomGenderOption = getRandomOption(genderOptions.filter(option => option.value !== ''));
    const randomAgeOption = getRandomOption(ageGroupOptions.filter(option => option.value !== ''));
    const randomAlignmentOption = getRandomOption(alignmentOptions.filter(option => option.value !== ''));
    const randomRelationshipOption = getRandomOption(relationshipOptions.filter(option => option.value !== ''));
    
    // Parse the random values to ensure they're valid
    const gender = parseGender(randomGenderOption.value);
    const age_group = parseAgeGroup(randomAgeOption.value);
    const moral_alignment = parseAlignment(randomAlignmentOption.value);
    const relationship_to_player = parseRelationship(randomRelationshipOption.value);
    
    // Get a random genre
    const randomGenreTemplate = getRandomOption(GENRE_TEMPLATES);
    const randomGenre = randomGenreTemplate.id;
    
    // Potentially select a sub-genre if available
    const subGenres = getSubGenres(randomGenre);
    const randomSubGenre = subGenres.length > 0 ? getRandomOption(subGenres) : undefined;
    
    // Get genre-appropriate species
    const appropriateSpecies = speciesOptions.filter(
      species => !species.genre || species.genre.includes(randomGenre as any)
    );
    const randomSpecies = getRandomOption(appropriateSpecies);
    
    // Get random personality traits (2-3)
    const numTraits = Math.floor(Math.random() * 2) + 2; // 2-3 traits
    const shuffledTraits = [...personalityTraitOptions].sort(() => 0.5 - Math.random());
    const randomTraits = shuffledTraits.slice(0, numTraits);
    
    // Get other random values
    const randomSocialClass = getRandomOption(socialClassOptions.filter(option => option.value));
    const randomHeight = getRandomOption(heightOptions.filter(option => option.value));
    const randomBuild = getRandomOption(buildOptions.filter(option => option.value));
    
    // Get the description example for this genre/subgenre
    const exampleText = randomSubGenre && randomSubGenre.example 
      ? randomSubGenre.example 
      : getTemplateExample(randomGenre);
    
    // Important: Set the description DIRECTLY in this function instead of relying on effects
    // This single updateFormData call will update all fields at once including the description
    // Note: We're preserving the current model as requested
    updateFormData({
      description: exampleText,  // Set the example text directly
      genre: randomGenre,
      sub_genre: randomSubGenre ? randomSubGenre.id : undefined,
      gender,
      age_group,
      moral_alignment,
      relationship_to_player,
      model: formData.model, // Preserve the current model selection
      advanced_options: {
        species: randomSpecies.value,
        personality_traits: randomTraits.map(trait => trait.value),
        social_class: randomSocialClass.value,
        height: randomHeight.value,
        build: randomBuild.value,
        distinctive_features: '',
        homeland: '',
        occupation: ''
      }
    });
    
    // Update the initial description reference and mark as default
    initialDescription.current = exampleText;
    setIsDescriptionDefault(true);
    
    // Show the auto-fill message
    setShowAutoFillMessage(true);
    
    console.log("Randomized character with genre:", randomGenre, "and description:", exampleText);
  };
  
  // Clear all options and revert to defaults
  const handleClearOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    updateFormData({
      description: '',  // Also clear the description
      genre: undefined,
      sub_genre: undefined,
      gender: undefined,
      age_group: undefined, 
      moral_alignment: undefined,
      relationship_to_player: undefined,
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
    
    // Reset the initial description
    initialDescription.current = '';
    setIsDescriptionDefault(true);
    
    // Hide the auto-fill message since we're clearing everything
    setShowAutoFillMessage(false);
  };
  
  // Helper function to get a random option from an array
  function getRandomOption<T>(options: T[]): T {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  
  // Create option object for occupation to pass to SearchableSelect
  const createOccupationOption = () => {
    if (!formData.advanced_options?.occupation) return null;
    
    return {
      value: formData.advanced_options.occupation,
      label: formData.advanced_options.occupation
    };
  };
  
  // Selected personality traits for SearchableSelect
  const selectedPersonalityTraits = personalityTraitOptions.filter(option => 
    formData.advanced_options?.personality_traits?.includes(option.value)
  );
  
  // Type narrowing functions for options
  function isValidGender(value: string): boolean {
    return genderOptions.some(option => option.value === value);
  }
  
  function isValidAgeGroup(value: string): boolean {
    return ageGroupOptions.some(option => option.value === value);
  }
  
  function isValidAlignment(value: string): boolean {
    return alignmentOptions.some(option => option.value === value);
  }
  
  function isValidRelationship(value: string): boolean {
    return relationshipOptions.some(option => option.value === value);
  }
  
  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div>
        <h3 className="text-base font-medium mb-2 text-gray-900 dark:text-gray-200">Genre (Optional)</h3>
        <TemplateSelector 
          templates={GENRE_TEMPLATES} 
          selectedId={formData.genre}
          selectedSubGenreId={formData.sub_genre}
          onChange={handleTemplateChange}
        />
      </div>
      
      {/* Character Description - FIXED FOR LIGHT MODE */}
      <div>
        <label htmlFor="description" className="block text-base font-medium mb-2 text-gray-900 dark:text-gray-200">
          Character Description <span className="text-red-500">*</span>
        </label>
        
        {/* Auto-fill message */}
        {showAutoFillMessage && (
          <div className="autofill-message">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Description auto-filled based on selected genre. Feel free to edit it to customize your character!</span>
            </div>
          </div>
        )}
        
        {/* Helpful instruction text with better contrast */}
        <div className="mb-3">
          <p className="text-gray-800 dark:text-gray-300 text-sm">
            The free-text description field allows you to provide specific details about your character. More detailed descriptions typically result in more tailored characters.
          </p>
        </div>
        
        <textarea
          id="description"
          rows={6}
          value={formData.description || ''}
          onChange={handleDescriptionChange}
          placeholder="Describe your character or concept... (e.g., A wise old wizard with a mysterious past)"
          className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
      </div>
      
      {/* Basic Character Traits */}
      <div>
        <h3 className="text-base font-medium mb-3 text-gray-900 dark:text-gray-200">Basic Traits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="gender"
            label="Gender"
            options={genderOptions}
            value={formData.gender || ''}
            onChange={handleGenderChange}
          />
          
          <Select
            id="age-group"
            label="Age"
            options={ageGroupOptions}
            value={formData.age_group || ''}
            onChange={handleAgeGroupChange}
          />
          
          <Select
            id="moral-alignment"
            label="Moral Alignment"
            options={alignmentOptions}
            value={formData.moral_alignment || ''}
            onChange={handleAlignmentChange}
          />
          
          <Select
            id="relationship"
            label="Relationship to Player"
            options={relationshipOptions}
            value={formData.relationship_to_player || ''}
            onChange={handleRelationshipChange}
          />
        </div>
      </div>
      
      {/* Advanced Options Button */}
      <div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowAdvanced(!showAdvanced);
          }}
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center"
        >
          {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
          <svg
            className={`ml-1 h-5 w-5 transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {/* Advanced Options */}
      {showAdvanced && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 animate-fadeIn dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-base font-semibold mb-4 text-gray-900 dark:text-gray-200">Advanced Character Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              id="species"
              label="Species"
              options={[{ value: '', label: 'Not specified' }, ...speciesOptions]}
              value={formData.advanced_options?.species || ''}
              onChange={handleSpeciesChange}
            />
            
            <Select
              id="social-class"
              label="Social Class"
              options={socialClassOptions}
              value={formData.advanced_options?.social_class || ''}
              onChange={handleSocialClassChange}
            />

            <Select
              id="height"
              label="Height"
              options={heightOptions}
              value={formData.advanced_options?.height || ''}
              onChange={handleHeightChange}
            />
            
            <Select
              id="build"
              label="Build"
              options={buildOptions}
              value={formData.advanced_options?.build || ''}
              onChange={handleBuildChange}
            />
          </div>
          
          {/* Distinctive Features */}
          <div className="mb-4">
            <label htmlFor="distinctive-features" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">
              Distinctive Features (Optional)
            </label>
            <textarea
              id="distinctive-features"
              rows={3}
              value={formData.advanced_options?.distinctive_features || ''}
              onChange={handleDistinctiveFeaturesChange}
              placeholder="Scars, tattoos, unusual eye color, etc."
              className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          {/* Homeland/Origin */}
          <div className="mb-4">
            <label htmlFor="homeland" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">
              Homeland/Origin (Optional)
            </label>
            <textarea
              id="homeland"
              rows={3}
              value={formData.advanced_options?.homeland || ''}
              onChange={handleHomelandChange}
              placeholder="Where they came from or grew up"
              className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          {/* Occupation - Now in its own row */}
          <div className="mt-4">
            <label htmlFor="occupation" className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-300">
              Occupation
            </label>
            <div id="occupation" className="w-full">
              {/* @ts-ignore - Using improved SearchableSelect */}
              <SearchableSelect
                options={occupationOptions}
                value={formData.advanced_options?.occupation || ''}
                onChange={(value: string) => updateFormData({ 
                  advanced_options: { 
                    ...formData.advanced_options,
                    occupation: value || undefined 
                  } 
                })}
                placeholder="Select or search for an occupation..."
                className="w-full"
              />
            </div>
          </div>
          
          {/* Personality Traits - No Limit */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">
              Personality Traits
            </label>
            <div className="flex flex-wrap gap-2">
              {personalityTraitOptions.map((trait) => (
                <button
                  key={trait.value}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    togglePersonalityTrait(trait.value);
                  }}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    formData.advanced_options?.personality_traits?.includes(trait.value)
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700 font-medium shadow-sm'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                  }`}
                >
                  {trait.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Action Buttons with better contrast */}
      <div className="flex space-x-4">
        <button
          id="clear-options-button"
          type="button"
          onClick={handleClearOptions}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Clear Options
        </button>
        
        <button
          id="randomize-button"
          type="button"
          onClick={handleRandomize}
          className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Randomize Options
        </button>
      </div>
      
      {/* AI Model Selector */}
      <ModelSelector 
        value={formData.model || 'gpt-4o-mini'}
        onChange={handleModelChange}
      />
      
      {/* Portrait Options */}
      <PortraitOptions />
    </div>
  );
}