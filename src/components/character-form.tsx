'use client';

import { useState } from 'react';
import { Genre, CharacterFormData } from '@/lib/types';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';
import DelayedLoadingMessage from '@/components/delayed-loading-message';

interface CharacterFormProps {
  onSubmit: (data: CharacterFormData) => void;
  isLoading: boolean;
}

export default function CharacterForm({ onSubmit, isLoading }: CharacterFormProps) {
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState<Genre | undefined>(undefined);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Please provide a character description');
      return;
    }

    // Create form data with required fields
    const formData: CharacterFormData = {
      description: description.trim(),
      genre,
      include_quests: true,
      include_dialogue: true,
      include_items: true
    };

    onSubmit(formData);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = e.target.value as Genre | '';
    setGenre(selectedGenre === '' ? undefined : selectedGenre as Genre);
    
    // If a genre is selected, suggest an example
    if (selectedGenre) {
      const example = getTemplateExample(selectedGenre);
      if (!description.trim()) {
        setDescription(example);
      }
    }
  };

  // Direct, forceful approach to ensure randomize works
  const handleRandomize = () => {
    // Get a random genre
    const randomIndex = Math.floor(Math.random() * GENRE_TEMPLATES.length);
    const randomGenre = GENRE_TEMPLATES[randomIndex].id as Genre;
    
    // Get example text for this genre
    const example = getTemplateExample(randomGenre);
    
    // Update both state values directly 
    setGenre(randomGenre);
    setDescription(example);
    
    // Debugging
    console.log(`Randomized: Genre=${randomGenre}, Example=${example}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Create Your NPC
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Genre Selection */}
        <div>
          <label htmlFor="genre" className="block mb-2 text-sm font-medium">
            Genre (Optional)
          </label>
          <select
            id="genre"
            className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            value={genre || ''}
            onChange={handleGenreChange}
          >
            <option value="">Select a genre (optional)</option>
            {GENRE_TEMPLATES.map((template) => (
              <option key={template.id} value={template.id}>
                {template.label}
              </option>
            ))}
          </select>
          {genre && (
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {GENRE_TEMPLATES.find(t => t.id === genre)?.description}
            </p>
          )}
        </div>

        {/* Character Description */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium">
            Character Description
          </label>
          <textarea
            id="description"
            rows={5}
            className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            placeholder="Describe your character or concept... (e.g., A wise old wizard with a mysterious past)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleRandomize}
            className="flex-1 py-2 px-4 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 
                      bg-secondary border border-theme dark:text-gray-200"
            disabled={isLoading}
          >
            Randomize
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Character'}
          </button>
        </div>
        
        {/* Delayed Loading Message - only shows after 3 seconds of loading */}
        <DelayedLoadingMessage 
          isLoading={isLoading} 
          message="Character generation may take a second... Creating your unique NPC with AI."
        />
      </form>
    </div>
  );
}