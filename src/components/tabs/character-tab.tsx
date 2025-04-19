'use client';

import { useState } from 'react';
import { useCharacter } from '@/contexts/character-context';
import TemplateSelector from '@/components/template-selector';
import Select from '@/components/ui/select';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';
import Button from '@/components/ui/button';
import PortraitOptions from '@/components/tabs/portrait-options';
import SearchableSelect from '@/components/ui/searchable-select';
import { 
  GenderOption,
  AgeGroupOption,
  AlignmentOption,
  RelationshipOption,
  TemplateOption,
  SubGenreOption
} from '@/lib/types';

// Options for dropdown selects - all with "Not specified" as first option
const genderOptions: GenderOption[] = [
  { value: '' as any, label: 'Not specified' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Nonbinary' },
  { value: 'unknown', label: 'Unknown' }
];

const ageGroupOptions: AgeGroupOption[] = [
  { value: '' as any, label: 'Not specified' },
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen' },
  { value: 'adult', label: 'Adult' },
  { value: 'elder', label: 'Elder' }
];

const alignmentOptions: AlignmentOption[] = [
  { value: '' as any, label: 'Not specified' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' }
];

const relationshipOptions: RelationshipOption[] = [
  { value: '' as any, label: 'Not specified' },
  { value: 'ally', label: 'Ally' },
  { value: 'enemy', label: 'Enemy' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'rival', label: 'Rival' },
  { value: 'betrayer', label: 'Betrayer' }
];

// Physical trait options
const heightOptions = [
  { value: '', label: 'Not specified' },
  { value: 'very_short', label: 'Very Short' },
  { value: 'short', label: 'Short' },
  { value: 'average', label: 'Average Height' },
  { value: 'tall', label: 'Tall' },
  { value: 'very_tall', label: 'Very Tall' }
];

const buildOptions = [
  { value: '', label: 'Not specified' },
  { value: 'thin', label: 'Thin/Slender' },
  { value: 'athletic', label: 'Athletic/Toned' },
  { value: 'average', label: 'Average Build' },
  { value: 'sturdy', label: 'Sturdy/Solid' },
  { value: 'muscular', label: 'Muscular' },
  { value: 'heavy', label: 'Heavy/Large' }
];

// Social class options
const socialClassOptions = [
  { value: '', label: 'Not specified' },
  { value: 'lower', label: 'Lower Class' },
  { value: 'working', label: 'Working Class' },
  { value: 'middle', label: 'Middle Class' },
  { value: 'upper_middle', label: 'Upper-middle Class' },
  { value: 'upper', label: 'Upper Class/Nobility' },
  { value: 'outcast', label: 'Outcast/Outsider' }
];

// Updated occupation options (for searchable dropdown)
const occupationOptions = [
  // General occupations (applicable to most genres)
  { value: '', label: 'Not specified', group: 'General' },
  { value: 'merchant', label: 'Merchant/Trader', group: 'General' },
  { value: 'leader', label: 'Leader/Authority Figure', group: 'General' },
  { value: 'craftsperson', label: 'Craftsperson/Artisan', group: 'General' },
  { value: 'healer', label: 'Healer/Medic', group: 'General' },
  { value: 'scholar', label: 'Scholar/Academic', group: 'General' },
  { value: 'entertainer', label: 'Entertainer/Artist', group: 'General' },
  { value: 'criminal', label: 'Criminal/Outlaw', group: 'General' },
  { value: 'explorer', label: 'Explorer/Traveler', group: 'General' },
  { value: 'guard', label: 'Guard/Protector', group: 'General' },
  
  // Fantasy occupations
  { value: 'wizard', label: 'Wizard/Mage', group: 'Fantasy' },
  { value: 'knight', label: 'Knight/Warrior', group: 'Fantasy' },
  { value: 'ranger', label: 'Ranger/Hunter', group: 'Fantasy' },
  { value: 'blacksmith', label: 'Blacksmith', group: 'Fantasy' },
  { value: 'alchemist', label: 'Alchemist', group: 'Fantasy' },
  { value: 'bard', label: 'Bard/Minstrel', group: 'Fantasy' },
  { value: 'cleric', label: 'Cleric/Priest', group: 'Fantasy' },
  { value: 'druid', label: 'Druid/Nature Guardian', group: 'Fantasy' },
  { value: 'noble', label: 'Noble/Royalty', group: 'Fantasy' },
  { value: 'thief', label: 'Thief/Rogue', group: 'Fantasy' },
  { value: 'innkeeper', label: 'Innkeeper/Tavern Owner', group: 'Fantasy' },
  
  // Sci-Fi occupations
  { value: 'engineer', label: 'Engineer/Technician', group: 'Sci-Fi' },
  { value: 'pilot', label: 'Pilot/Navigator', group: 'Sci-Fi' },
  { value: 'scientist', label: 'Scientist/Researcher', group: 'Sci-Fi' },
  { value: 'bounty_hunter', label: 'Bounty Hunter', group: 'Sci-Fi' },
  { value: 'ai_specialist', label: 'AI Specialist', group: 'Sci-Fi' },
  { value: 'space_trader', label: 'Space Trader', group: 'Sci-Fi' },
  { value: 'colony_leader', label: 'Colony Leader', group: 'Sci-Fi' },
  { value: 'security', label: 'Security Officer', group: 'Sci-Fi' },
  { value: 'smuggler', label: 'Smuggler', group: 'Sci-Fi' },
  { value: 'medic', label: 'Medic/Doctor', group: 'Sci-Fi' },
  { value: 'hacker', label: 'Hacker/Netrunner', group: 'Sci-Fi' },
  
  // Historical occupations
  { value: 'farmer', label: 'Farmer', group: 'Historical' },
  { value: 'soldier', label: 'Soldier', group: 'Historical' },
  { value: 'sailor', label: 'Sailor/Mariner', group: 'Historical' },
  { value: 'priest', label: 'Priest/Clergy', group: 'Historical' },
  { value: 'scribe', label: 'Scribe/Record Keeper', group: 'Historical' },
  { value: 'servant', label: 'Servant/Attendant', group: 'Historical' },
  { value: 'hunter', label: 'Hunter/Trapper', group: 'Historical' },
  { value: 'diplomat', label: 'Diplomat/Emissary', group: 'Historical' },
  { value: 'explorer', label: 'Explorer', group: 'Historical' },
  { value: 'trade_master', label: 'Guild Master/Trade Leader', group: 'Historical' },
  
  // Contemporary occupations
  { value: 'doctor', label: 'Doctor', group: 'Contemporary' },
  { value: 'teacher', label: 'Teacher/Professor', group: 'Contemporary' },
  { value: 'police', label: 'Police Officer', group: 'Contemporary' },
  { value: 'chef', label: 'Chef/Cook', group: 'Contemporary' },
  { value: 'artist', label: 'Artist', group: 'Contemporary' },
  { value: 'programmer', label: 'Programmer/Developer', group: 'Contemporary' },
  { value: 'journalist', label: 'Journalist/Reporter', group: 'Contemporary' },
  { value: 'business', label: 'Business Owner', group: 'Contemporary' },
  { value: 'athlete', label: 'Athlete', group: 'Contemporary' },
  { value: 'lawyer', label: 'Lawyer', group: 'Contemporary' },
  { value: 'musician', label: 'Musician', group: 'Contemporary' },
  { value: 'driver', label: 'Driver/Pilot', group: 'Contemporary' }
];

// Personality trait options
const personalityTraitOptions = [
  { value: 'brave', label: 'Brave' },
  { value: 'cautious', label: 'Cautious' },
  { value: 'curious', label: 'Curious' },
  { value: 'determined', label: 'Determined' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'honest', label: 'Honest' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'loyal', label: 'Loyal' },
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'proud', label: 'Proud' },
  { value: 'reckless', label: 'Reckless' },
  { value: 'sarcastic', label: 'Sarcastic' },
  { value: 'shy', label: 'Shy' },
  { value: 'suspicious', label: 'Suspicious' },
  { value: 'wise', label: 'Wise' },
  { value: 'greedy', label: 'Greedy' },
  { value: 'ambitious', label: 'Ambitious' },
  { value: 'paranoid', label: 'Paranoid' },
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'pessimistic', label: 'Pessimistic' }
];

export default function CharacterTab() {
  const { formData, updateFormData } = useCharacter();
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedSubGenre, setSelectedSubGenre] = useState<SubGenreOption | undefined>(undefined);
  
  // Handle template and sub-genre selection
  const handleGenreChange = (template: TemplateOption | undefined, subGenre?: SubGenreOption) => {
    const genre = template?.id;
    setSelectedSubGenre(subGenre);
    
    // Update form data with main genre and sub-genre if applicable
    updateFormData({ 
      genre,
      sub_genre: subGenre?.id
    });
    
    // If a genre is selected and description is empty, suggest an example
    if (genre && !formData.description.trim()) {
      // Use sub-genre example if available, otherwise use main genre example
      if (subGenre?.example) {
        updateFormData({ description: subGenre.example });
      } else if (genre) {
        updateFormData({ description: getTemplateExample(genre) });
      }
    }
  };
  
  // Helper function to toggle personality traits (limit to 3)
  const togglePersonalityTrait = (trait: string) => {
    // Initialize the array if it doesn't exist
    const currentTraits = formData.advanced_options?.personality_traits || [];
    
    // Toggle the trait
    let updatedTraits;
    if (currentTraits.includes(trait)) {
      // Remove the trait if already selected
      updatedTraits = currentTraits.filter(t => t !== trait);
    } else {
      // Add the trait if not at limit
      if (currentTraits.length < 3) {
        updatedTraits = [...currentTraits, trait];
      } else {
        // At limit, don't add more
        updatedTraits = currentTraits;
        // Optional: Show a toast or notification about the limit
        return;
      }
    }
    
    updateFormData({
      advanced_options: {
        ...formData.advanced_options,
        personality_traits: updatedTraits
      }
    });
  };
  
  // Handle clear options function - preserves description and portrait options
  const handleClearOptions = () => {
    // Save portrait options and description to preserve them
    const portraitOptions = formData.portrait_options;
    const description = formData.description;
    
    // Reset character options
    updateFormData({
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
      },
      // Restore preserved values
      description: description,
      portrait_options: portraitOptions
    });
    
    // Reset sub-genre state
    setSelectedSubGenre(undefined);
  };
  
  // Get a random item from an array, skipping index 0
  const getRandomOption = (options: any[]) => {
    // +1 to skip the "Not specified" option at index 0
    const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
    return options[randomIndex].value;
  };
  
  // Handle randomize function - does NOT modify portrait options
  const handleRandomize = () => {
    // Save portrait options and description to restore them later
    const portraitOptions = formData.portrait_options;
    const description = formData.description;
    
    // Randomly select a main genre
    const randomIndex = Math.floor(Math.random() * GENRE_TEMPLATES.length);
    const randomGenre = GENRE_TEMPLATES[randomIndex];
    
    // Randomly select a sub-genre if available
    let randomSubGenre: SubGenreOption | undefined = undefined;
    if (randomGenre.subGenres && randomGenre.subGenres.length > 0) {
      const randomSubIndex = Math.floor(Math.random() * randomGenre.subGenres.length);
      randomSubGenre = randomGenre.subGenres[randomSubIndex];
    }
    
    // Apply the genre selection
    handleGenreChange(randomGenre, randomSubGenre);
    
    // Randomly select main options
    const randomGender = getRandomOption(genderOptions);
    const randomAge = getRandomOption(ageGroupOptions);
    const randomAlignment = getRandomOption(alignmentOptions);
    const randomRelationship = getRandomOption(relationshipOptions);
    
    // Randomly select advanced options too
    const randomHeight = getRandomOption(heightOptions);
    const randomBuild = getRandomOption(buildOptions);
    const randomSocialClass = getRandomOption(socialClassOptions);
    
    // Random occupation - getting a valid occupation by skipping the first option
    const validOccupations = occupationOptions.filter(option => 
      option.value !== '' && 
      (option.group === 'General' || option.group === randomGenre.id)
    );
    const randomOccupationIndex = Math.floor(Math.random() * validOccupations.length);
    const randomOccupation = validOccupations[randomOccupationIndex].value;
    
    // Random personality traits - select 1-3 traits
    const numTraits = Math.floor(Math.random() * 3) + 1; // 1 to 3 traits
    const shuffledTraits = [...personalityTraitOptions].sort(() => 0.5 - Math.random());
    const randomTraits = shuffledTraits.slice(0, numTraits).map(t => t.value);
    
    updateFormData({
      gender: randomGender,
      age_group: randomAge,
      moral_alignment: randomAlignment,
      relationship_to_player: randomRelationship,
      advanced_options: {
        occupation: randomOccupation,
        height: randomHeight,
        build: randomBuild,
        social_class: randomSocialClass,
        personality_traits: randomTraits,
        // Keep these fields as is or initialize them
        species: undefined,
        distinctive_features: undefined,
        homeland: undefined
      },
      // Restore description and portrait options
      description: description,
      portrait_options: portraitOptions
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
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Advanced Character Options
          </h3>
          
          {/* Physical Traits Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400">Physical Traits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                label="Height"
                options={heightOptions}
                value={formData.advanced_options?.height || ''}
                onChange={(e) => updateFormData({ 
                  advanced_options: { 
                    ...formData.advanced_options,
                    height: e.target.value || undefined 
                  } 
                })}
              />
              <Select
                label="Build"
                options={buildOptions}
                value={formData.advanced_options?.build || ''}
                onChange={(e) => updateFormData({ 
                  advanced_options: { 
                    ...formData.advanced_options,
                    build: e.target.value || undefined 
                  } 
                })}
              />
            </div>
            <textarea
              placeholder="Distinctive features (scars, tattoos, unusual characteristics)..."
              className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={formData.advanced_options?.distinctive_features || ''}
              onChange={(e) => updateFormData({ 
                advanced_options: { 
                  ...formData.advanced_options,
                  distinctive_features: e.target.value || undefined 
                } 
              })}
              rows={2}
            />
          </div>
          
          {/* Background Elements */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400">Background & Origin</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Select
                label="Social Class"
                options={socialClassOptions}
                value={formData.advanced_options?.social_class || ''}
                onChange={(e) => updateFormData({ 
                  advanced_options: { 
                    ...formData.advanced_options,
                    social_class: e.target.value || undefined 
                  } 
                })}
              />
              <input
                type="text"
                placeholder="Homeland/Origin"
                className="w-full p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.advanced_options?.homeland || ''}
                onChange={(e) => updateFormData({ 
                  advanced_options: { 
                    ...formData.advanced_options,
                    homeland: e.target.value || undefined 
                  } 
                })}
              />
            </div>
          </div>
          
          {/* Searchable Occupation Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Occupation
            </label>
            <SearchableSelect
              options={occupationOptions}
              value={formData.advanced_options?.occupation || ''}
              onChange={(value) => updateFormData({ 
                advanced_options: { 
                  ...formData.advanced_options,
                  occupation: value || undefined
                } 
              })}
              placeholder="Select or search for occupation..."
            />
          </div>
          
          {/* Personality Traits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Personality Traits (select up to 3)
            </label>
            <div className="flex flex-wrap gap-2">
              {personalityTraitOptions.map((trait) => (
                <button
                  key={trait.value}
                  type="button"
                  onClick={() => togglePersonalityTrait(trait.value)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    formData.advanced_options?.personality_traits?.includes(trait.value)
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700'
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
      
      {/* Character Options Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClearOptions}
        >
          Clear Options
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleRandomize}
        >
          Randomize Options
        </Button>
      </div>
      
      {/* Portrait Options */}
      <PortraitOptions />
    </div>
  );
}