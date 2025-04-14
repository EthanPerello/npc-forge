'use client';

import { useState } from 'react';
import { Genre, CharacterFormData } from '@/lib/types';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';

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

  const handleRandomize = () => {
    const randomIndex = Math.floor(Math.random() * GENRE_TEMPLATES.length);
    const randomGenre = GENRE_TEMPLATES[randomIndex].id as Genre;
    setGenre(randomGenre);
    setDescription(getTemplateExample(randomGenre));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        Create Your NPC
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Genre Selection */}
        <div>
          <label htmlFor="genre" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Genre (Optional)
          </label>
          <select
            id="genre"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {GENRE_TEMPLATES.find(t => t.id === genre)?.description}
            </p>
          )}
        </div>

        {/* Character Description */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Character Description
          </label>
          <textarea
            id="description"
            rows={5}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
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
      </form>
    </div>
  );
}