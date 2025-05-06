'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStoredCharacters, updateCharacter } from '@/lib/character-storage';
import { Character, Quest } from '@/lib/types';
import Button from '@/components/ui/button';
import Select from '@/components/ui/select';
import SearchableSelect from '@/components/ui/searchable-select';
import { Save, ArrowLeft, Sparkles, PlusCircle, Trash2, RefreshCw, Image as ImageIcon } from 'lucide-react';

// Import the same options used in the CharacterTab
import { GENRE_TEMPLATES, getSubGenres } from '@/lib/templates';

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

// Moral alignment options
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

// Common species
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

// Occupations
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
  { value: 'foolish', label: 'Foolish' },
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

export default function CharacterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = params.id as string;
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [subGenres, setSubGenres] = useState<{value: string, label: string}[]>([]);
  
  // Load character data
  useEffect(() => {
    if (!characterId) return;
    
    const storedCharacters = getStoredCharacters();
    const storedCharacter = storedCharacters.find(char => char.id === characterId);
    
    if (storedCharacter) {
      setCharacter(storedCharacter.character);
      
      // Set current genre for subgenres
      if (storedCharacter.character.selected_traits.genre) {
        setCurrentGenre(storedCharacter.character.selected_traits.genre);
        // Load sub-genres for the current genre
        const genreSubGenres = getSubGenres(storedCharacter.character.selected_traits.genre);
        setSubGenres([
          { value: '', label: 'Not specified' },
          ...genreSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
        ]);
      }
    } else {
      setError('Character not found');
    }
    
    setIsLoading(false);
  }, [characterId]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!character) return;
    
    setIsSaving(true);
    
    try {
      const success = updateCharacter(characterId, character);
      
      if (success) {
        router.push('/library');
      } else {
        setError('Failed to update character');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error('Error saving character:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle text input changes for simple string fields
  const handleInputChange = (field: string, value: string) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [field]: value
    });
  };
  
  // Handle array input changes
  const handleArrayInputChange = <T extends unknown>(field: keyof Character, value: T[]) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [field]: value
    });
  };
  
  // Handle nested field changes
  const handleNestedChange = (section: 'selected_traits' | 'added_traits', field: string, value: string | string[]) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [section]: {
        ...character[section],
        [field]: value
      }
    });
  };
  
  // Handle genre change to update subgenres
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = e.target.value;
    handleNestedChange('selected_traits', 'genre', newGenre);
    
    // Update subgenres list
    if (newGenre) {
      setCurrentGenre(newGenre);
      const genreSubGenres = getSubGenres(newGenre);
      setSubGenres([
        { value: '', label: 'Not specified' },
        ...genreSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
      ]);
    } else {
      setSubGenres([{ value: '', label: 'Not specified' }]);
      // Clear subgenre as well
      handleNestedChange('selected_traits', 'sub_genre', '');
    }
  };
  
  // Handle personality traits selection
  const handlePersonalityTraitsChange = (traits: string[]) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      selected_traits: {
        ...character.selected_traits,
        personality_traits: traits
      }
    });
  };
  
  // Function to regenerate field with AI (placeholder for now)
  const handleRegenerateField = (field: string) => {
    // This will be implemented with OpenAI integration later
    alert(`Regenerating ${field} is not implemented yet.`);
  };

  // Add a new quest
  const handleAddQuest = () => {
    if (!character) return;
    
    const newQuest: Quest = {
      title: "New Quest",
      description: "Quest description goes here...",
      reward: "Quest reward goes here...",
      type: "any"
    };
    
    const updatedQuests = character.quests ? [...character.quests, newQuest] : [newQuest];
    handleArrayInputChange('quests', updatedQuests);
  };
  
  // Remove a quest
  const handleRemoveQuest = (index: number) => {
    if (!character || !character.quests) return;
    
    const updatedQuests = [...character.quests];
    updatedQuests.splice(index, 1);
    handleArrayInputChange('quests', updatedQuests);
  };
  
  // Add a new item
  const handleAddItem = () => {
    if (!character) return;
    
    const newItem = "New item description";
    const updatedItems = character.items ? [...character.items, newItem] : [newItem];
    handleArrayInputChange('items', updatedItems);
  };
  
  // Remove an item
  const handleRemoveItem = (index: number) => {
    if (!character || !character.items) return;
    
    const updatedItems = [...character.items];
    updatedItems.splice(index, 1);
    handleArrayInputChange('items', updatedItems);
  };
  
  // Add new dialogue
  const handleAddDialogue = () => {
    if (!character) return;
    
    const newDialogue = "New dialogue line...";
    const updatedDialogue = character.dialogue_lines ? [...character.dialogue_lines, newDialogue] : [newDialogue];
    handleArrayInputChange('dialogue_lines', updatedDialogue);
  };
  
  // Remove dialogue
  const handleRemoveDialogue = (index: number) => {
    if (!character || !character.dialogue_lines) return;
    
    const updatedDialogue = [...character.dialogue_lines];
    updatedDialogue.splice(index, 1);
    handleArrayInputChange('dialogue_lines', updatedDialogue);
  };
  
  // Regenerate portrait (placeholder)
  const handleRegeneratePortrait = () => {
    alert("Portrait regeneration will be implemented in a future update.");
  };
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading character data...</div>;
  }
  
  if (error && !character) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push('/library')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Button>
      </div>
    );
  }
  
  if (!character) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Button
          variant="secondary"
          onClick={() => router.push('/library')}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Character: {character.name}</h1>
      </div>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            Basic Information
          </h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <div className="flex">
              <input
                type="text"
                value={character.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <button
                type="button"
                onClick={() => handleRegenerateField('name')}
                className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Regenerate with AI"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Genre"
              options={[
                { value: '', label: 'Not specified' },
                ...GENRE_TEMPLATES.map(template => ({
                  value: template.id,
                  label: template.label
                }))
              ]}
              value={character.selected_traits.genre || ''}
              onChange={handleGenreChange}
            />
            
            <Select
              label="Sub-Genre"
              options={subGenres}
              value={character.selected_traits.sub_genre || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'sub_genre', e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Appearance
            </label>
            <div className="flex">
              <textarea
                value={character.appearance}
                onChange={(e) => handleInputChange('appearance', e.target.value)}
                rows={4}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <button
                type="button"
                onClick={() => handleRegenerateField('appearance')}
                className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Regenerate with AI"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Personality
            </label>
            <div className="flex">
              <textarea
                value={character.personality}
                onChange={(e) => handleInputChange('personality', e.target.value)}
                rows={4}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <button
                type="button"
                onClick={() => handleRegenerateField('personality')}
                className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Regenerate with AI"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Backstory Hook
            </label>
            <div className="flex">
              <textarea
                value={character.backstory_hook}
                onChange={(e) => handleInputChange('backstory_hook', e.target.value)}
                rows={2}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <button
                type="button"
                onClick={() => handleRegenerateField('backstory_hook')}
                className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                title="Regenerate with AI"
              >
                <Sparkles className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Portrait section */}
          {character.image_url && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Portrait</label>
              <div className="flex items-center">
                <div className="relative w-32 h-32 border border-theme rounded-md overflow-hidden bg-secondary">
                  <img 
                    src={character.image_url} 
                    alt={`Portrait of ${character.name}`} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <Button
                  variant="secondary"
                  onClick={handleRegeneratePortrait}
                  className="ml-4"
                  leftIcon={<RefreshCw className="h-4 w-4" />}
                >
                  Regenerate Portrait
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Character Traits */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <h2 className="text-xl font-bold mb-4">Character Traits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Gender"
              options={genderOptions}
              value={character.selected_traits.gender || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'gender', e.target.value as any)}
            />
            
            <Select
              label="Age Group"
              options={ageGroupOptions}
              value={character.selected_traits.age_group || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'age_group', e.target.value as any)}
            />
            
            <Select
              label="Moral Alignment"
              options={alignmentOptions}
              value={character.selected_traits.moral_alignment || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'moral_alignment', e.target.value as any)}
            />
            
            <Select
              label="Relationship to Player"
              options={relationshipOptions}
              value={character.selected_traits.relationship_to_player || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'relationship_to_player', e.target.value as any)}
            />
            
            <Select
              label="Species"
              options={speciesOptions}
              value={character.selected_traits.species || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'species', e.target.value)}
            />
            
            <Select
              label="Occupation"
              options={occupationOptions}
              value={character.selected_traits.occupation || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'occupation', e.target.value)}
            />
            
            <Select
              label="Social Class"
              options={socialClassOptions}
              value={character.selected_traits.social_class || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'social_class', e.target.value)}
            />
          </div>
          
          {/* Personality Traits */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Personality Traits (select up to 3)</label>
            <div className="flex flex-wrap gap-2">
              {personalityTraitOptions.map((trait) => (
                <button
                  key={trait.value}
                  type="button"
                  onClick={() => {
                    const currentTraits = character.selected_traits.personality_traits || [];
                    if (currentTraits.includes(trait.value)) {
                      // Remove trait
                      handlePersonalityTraitsChange(currentTraits.filter(t => t !== trait.value));
                    } else if (currentTraits.length < 3) {
                      // Add trait if under limit
                      handlePersonalityTraitsChange([...currentTraits, trait.value]);
                    }
                  }}
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
        </div>
        
        {/* Added Traits */}
        <div className="bg-card p-6 rounded-lg border border-theme">
        <h2 className="text-xl font-bold mb-4">Additional Traits</h2>
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
                    onChange={(e) => handleNestedChange('added_traits', key, e.target.value)}
                    placeholder="Trait value"
                    className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                />
                </div>
                <button
                type="button"
                onClick={() => {
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
            <button
                type="button"
                onClick={() => {
                // Create a unique key for the new trait
                const newTraitKey = `custom_trait_${Object.keys(character.added_traits).length + 1}`;
                setCharacter({
                    ...character,
                    added_traits: {
                    ...character.added_traits,
                    [newTraitKey]: "New trait value"
                    }
                });
                }}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800 flex items-center"
            >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Custom Trait
            </button>
            </div>
        </div>
        </div>
        
        {/* Items */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Items</h2>
            <Button 
              variant="secondary" 
              onClick={handleAddItem}
              leftIcon={<PlusCircle className="h-4 w-4" />}
            >
              Add Item
            </Button>
          </div>
          
          {character.items && character.items.length > 0 ? (
            <div className="space-y-3">
              {character.items.map((item, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...character.items!];
                      newItems[index] = e.target.value;
                      handleArrayInputChange('items', newItems);
                    }}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRegenerateField(`item_${index}`)}
                    className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Regenerate with AI"
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove Item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
              <p className="text-muted">No items available. Add an item to get started.</p>
            </div>
          )}
        </div>
        
        {/* Dialogue Lines */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Dialogue Lines</h2>
            <Button 
              variant="secondary" 
              onClick={handleAddDialogue}
              leftIcon={<PlusCircle className="h-4 w-4" />}
            >
              Add Dialogue
            </Button>
          </div>
          
          {character.dialogue_lines && character.dialogue_lines.length > 0 ? (
            <div className="space-y-3">
              {character.dialogue_lines.map((line, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => {
                      const newLines = [...character.dialogue_lines!];
                      newLines[index] = e.target.value;
                      handleArrayInputChange('dialogue_lines', newLines);
                    }}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <button
                    type="button"
                    onClick={() => handleRegenerateField(`dialogue_${index}`)}
                    className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Regenerate with AI"
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveDialogue(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove Dialogue"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
              <p className="text-muted">No dialogue available. Add dialogue to get started.</p>
            </div>
          )}
        </div>
        
        {/* Quests */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Quests</h2>
            <Button 
              variant="secondary" 
              onClick={handleAddQuest}
              leftIcon={<PlusCircle className="h-4 w-4" />}
            >
              Add Quest
            </Button>
          </div>
          
          {character.quests && character.quests.length > 0 ? (
            <div className="space-y-6">
              {character.quests.map((quest, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-theme last:border-0 last:mb-0 last:pb-0 bg-secondary p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Quest #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuest(index)}
                      className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                      title="Remove Quest"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                
                  <div className="mb-2">
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
                          handleArrayInputChange('quests', newQuests);
                        }}
                        className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => handleRegenerateField(`quest_${index}_title`)}
                        className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                        title="Regenerate Title"
                      >
                        <Sparkles className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Quest Description
                    </label>
                    <div className="flex">
                      <textarea
                        value={quest.description}
                        onChange={(e) => {
                          const newQuests = [...character.quests!];
                          newQuests[index] = {...newQuests[index], description: e.target.value};
                          handleArrayInputChange('quests', newQuests);
                        }}
                        rows={3}
                        className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => handleRegenerateField(`quest_${index}_description`)}
                        className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                        title="Regenerate Description"
                      >
                        <Sparkles className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-2">
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
                          handleArrayInputChange('quests', newQuests);
                        }}
                        className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => handleRegenerateField(`quest_${index}_reward`)}
                        className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                        title="Regenerate Reward"
                      >
                        <Sparkles className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => handleRegenerateField(`quest_${index}_whole`)}
                      className="w-full p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center justify-center"
                      title="Regenerate Entire Quest"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Regenerate Entire Quest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
              <p className="text-muted">No quests available. Add a quest to get started.</p>
            </div>
          )}
        </div>
        
        {/* Form controls */}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => router.push('/library')}
            className="mr-2"
          >
            Cancel
          </Button>
          
          <Button
            variant="primary"
            type="submit"
            disabled={isSaving}
            isLoading={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}