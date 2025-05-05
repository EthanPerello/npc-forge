'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStoredCharacters, updateCharacter } from '@/lib/character-storage';
import { Character, Quest } from '@/lib/types';
import Button from '@/components/ui/button';
import { Save, ArrowLeft, Sparkles } from 'lucide-react';

export default function CharacterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = params.id as string;
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load character data
  useEffect(() => {
    if (!characterId) return;
    
    const storedCharacters = getStoredCharacters();
    const storedCharacter = storedCharacters.find(char => char.id === characterId);
    
    if (storedCharacter) {
      setCharacter(storedCharacter.character);
      setIsExample(storedCharacter.isExample);
    } else {
      setError('Character not found');
    }
    
    setIsLoading(false);
  }, [characterId]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!character) return;
    if (isExample) {
      setError('Example characters cannot be edited');
      return;
    }
    
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
  
  // Function to regenerate field with AI (placeholder for now)
  const handleRegenerateField = (field: string) => {
    // This will be implemented with OpenAI integration later
    alert(`Regenerating ${field} is not implemented yet.`);
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
      
      {isExample && (
        <div className="bg-amber-50 p-4 rounded-md text-amber-700 mb-6 dark:bg-amber-900/20 dark:text-amber-400">
          This is an example character and cannot be edited.
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <h2 className="text-xl font-bold mb-4">Basic Information</h2>
          
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
                disabled={isExample}
              />
            </div>
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
                disabled={isExample}
              />
              {!isExample && (
                <button
                  type="button"
                  onClick={() => handleRegenerateField('appearance')}
                  className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                  title="Regenerate with AI"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              )}
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
                disabled={isExample}
              />
              {!isExample && (
                <button
                  type="button"
                  onClick={() => handleRegenerateField('personality')}
                  className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                  title="Regenerate with AI"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              )}
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
                disabled={isExample}
              />
              {!isExample && (
                <button
                  type="button"
                  onClick={() => handleRegenerateField('backstory_hook')}
                  className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                  title="Regenerate with AI"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Special Ability
            </label>
            <div className="flex">
              <input
                type="text"
                value={character.special_ability || ''}
                onChange={(e) => handleInputChange('special_ability', e.target.value)}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              />
              {!isExample && (
                <button
                  type="button"
                  onClick={() => handleRegenerateField('special_ability')}
                  className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                  title="Regenerate with AI"
                >
                  <Sparkles className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Character Traits */}
        <div className="bg-card p-6 rounded-lg border border-theme">
          <h2 className="text-xl font-bold mb-4">Character Traits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Genre
              </label>
              <select
                value={character.selected_traits.genre || ''}
                onChange={(e) => handleNestedChange('selected_traits', 'genre', e.target.value)}
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              >
                <option value="">Not specified</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="historical">Historical</option>
                <option value="contemporary">Contemporary</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Sub-Genre
              </label>
              <input
                type="text"
                value={character.selected_traits.sub_genre || ''}
                onChange={(e) => handleNestedChange('selected_traits', 'sub_genre', e.target.value)}
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                value={character.selected_traits.gender || ''}
                onChange={(e) => handleNestedChange('selected_traits', 'gender', e.target.value as any)}
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              >
                <option value="">Not specified</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Age Group
              </label>
              <select
                value={character.selected_traits.age_group || ''}
                onChange={(e) => handleNestedChange('selected_traits', 'age_group', e.target.value as any)}
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              >
                <option value="">Not specified</option>
                <option value="child">Child</option>
                <option value="teen">Teen</option>
                <option value="adult">Adult</option>
                <option value="elder">Elder</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Occupation
              </label>
              <input
                type="text"
                value={character.selected_traits.occupation || ''}
                onChange={(e) => handleNestedChange('selected_traits', 'occupation', e.target.value)}
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Species
              </label>
              <input
                type="text"
                value={character.selected_traits.species || ''}
                onChange={(e) => handleNestedChange('selected_traits', 'species', e.target.value)}
                className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                disabled={isExample}
              />
            </div>
          </div>
        </div>
        
        {/* Dialogue Lines */}
        {character.dialogue_lines && character.dialogue_lines.length > 0 && (
          <div className="bg-card p-6 rounded-lg border border-theme">
            <h2 className="text-xl font-bold mb-4">Dialogue Lines</h2>
            
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
                  disabled={isExample}
                />
                {!isExample && (
                  <button
                    type="button"
                    onClick={() => handleRegenerateField(`dialogue_${index}`)}
                    className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Regenerate with AI"
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Items */}
        {character.items && character.items.length > 0 && (
          <div className="bg-card p-6 rounded-lg border border-theme">
            <h2 className="text-xl font-bold mb-4">Items</h2>
            
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
                  disabled={isExample}
                />
                {!isExample && (
                  <button
                    type="button"
                    onClick={() => handleRegenerateField(`item_${index}`)}
                    className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Regenerate with AI"
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Quests */}
        {character.quests && character.quests.length > 0 && (
          <div className="bg-card p-6 rounded-lg border border-theme">
            <h2 className="text-xl font-bold mb-4">Quests</h2>
            
            {character.quests.map((quest, index) => (
              <div key={index} className="mb-6 pb-6 border-b border-theme last:border-0 last:mb-0 last:pb-0">
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Quest Title
                  </label>
                  <input
                    type="text"
                    value={quest.title}
                    onChange={(e) => {
                      const newQuests = [...character.quests!];
                      newQuests[index] = {...newQuests[index], title: e.target.value};
                      handleArrayInputChange('quests', newQuests);
                    }}
                    className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                    disabled={isExample}
                  />
                </div>
                
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">
                    Quest Description
                  </label>
                  <textarea
                    value={quest.description}
                    onChange={(e) => {
                      const newQuests = [...character.quests!];
                      newQuests[index] = {...newQuests[index], description: e.target.value};
                      handleArrayInputChange('quests', newQuests);
                    }}
                    rows={3}
                    className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                    disabled={isExample}
                  />
                </div>
                
                <div className="mb-2 flex">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium mb-1">
                      Quest Reward
                    </label>
                    <input
                      type="text"
                      value={quest.reward}
                      onChange={(e) => {
                        const newQuests = [...character.quests!];
                        newQuests[index] = {...newQuests[index], reward: e.target.value};
                        handleArrayInputChange('quests', newQuests);
                      }}
                      className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      disabled={isExample}
                    />
                  </div>
                  
                  {!isExample && (
                    <button
                      type="button"
                      onClick={() => handleRegenerateField(`quest_${index}`)}
                      className="ml-2 self-end p-2 text-indigo-600 hover:text-indigo-800 bg-indigo-50 rounded-md dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300"
                      title="Regenerate Quest with AI"
                    >
                      <Sparkles className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
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
            disabled={isExample || isSaving}
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