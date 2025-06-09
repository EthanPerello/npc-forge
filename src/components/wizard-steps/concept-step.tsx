// src/components/wizard-steps/concept-step.tsx
'use client';

import { useState, useEffect } from 'react';
import { useCharacter } from '@/contexts/character-context';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';
import { Genre, ImageModel, OpenAIModel } from '@/lib/types';
import { Zap } from 'lucide-react';
import Button from '../ui/button';

export interface ConceptStepProps {
  onNext: () => void;
  onNavigateToResults: () => void; // Navigation callback
  isGenerating: boolean;
  onRandomGenerate: () => Promise<void>; // Direct generation handler
}

export default function ConceptStep({ 
  onNext, 
  onNavigateToResults, 
  isGenerating,
  onRandomGenerate
}: ConceptStepProps) {
  const { formData, updateFormData } = useCharacter();
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(formData.genre as Genre | undefined);
  const [isRandomGenerating, setIsRandomGenerating] = useState(false);
  const [description, setDescription] = useState(formData.description || '');

  // Update local state when form data changes
  useEffect(() => {
    setDescription(formData.description || '');
    setSelectedGenre(formData.genre as Genre | undefined);
  }, [formData.description, formData.genre]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);
    updateFormData({ description: newValue });
  };

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
    updateFormData({ genre });
  };

  const handleIncludeChange = (type: 'quests' | 'dialogue' | 'items' | 'portrait', checked: boolean) => {
    if (type === 'portrait') {
      updateFormData({ include_portrait: checked });
    } else {
      updateFormData({ [`include_${type}`]: checked });
    }
  };

  // COMPLETELY REWRITTEN: Now calls the parent handler directly without additional logic
  const handleGenerateRandomCharacter = async () => {
    if (isRandomGenerating || isGenerating) return; // Prevent multiple clicks
    
    setIsRandomGenerating(true);
    
    try {
      // Just call the parent handler which now contains all the direct generation logic
      await onRandomGenerate();
    } catch (error) {
      console.error('Error in random character generation:', error);
    } finally {
      setIsRandomGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Who is your character?
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Describe your character concept or choose a genre to get started
        </p>
      </div>

      {/* Generate Random Character - MOVED TO TOP */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
              Generate Random Character
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Creates a complete character instantly using default settings
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleGenerateRandomCharacter}
            leftIcon={<Zap className="h-4 w-4" />}
            isLoading={isRandomGenerating || isGenerating}
            disabled={isRandomGenerating || isGenerating}
            size="sm"
          >
            {isRandomGenerating || isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>

      {/* Character Description - Full Width Row */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Character Description *
        </label>
        
        <textarea
          id="description"
          rows={2}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe your character here..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          disabled={isGenerating || isRandomGenerating}
        />
      </div>

      {/* Genre Selection - Full Width Row */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Genre (Optional)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {GENRE_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleGenreSelect(template.id as Genre)}
              disabled={isGenerating || isRandomGenerating}
              className={`
                p-3 text-center rounded-lg border-2 transition-all text-sm
                ${selectedGenre === template.id
                  ? 'border-indigo-500 bg-indigo-50 text-gray-900 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-400'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 text-gray-900 dark:text-gray-100'}
              `}
            >
              <div className="font-medium">{template.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Include Options - Full Width Row */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Include
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center p-2 bg-gray-50 rounded dark:bg-gray-700">
            <input
              type="checkbox"
              checked={true}
              disabled={true}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Personality
            </span>
          </label>
          
          {/* New Portrait option */}
          <label className="flex items-center p-2 bg-gray-50 rounded dark:bg-gray-700">
            <input
              type="checkbox"
              checked={formData.include_portrait}
              onChange={(e) => handleIncludeChange('portrait', e.target.checked)}
              disabled={isGenerating || isRandomGenerating}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Portrait
            </span>
          </label>
          
          <label className="flex items-center p-2 bg-gray-50 rounded dark:bg-gray-700">
            <input
              type="checkbox"
              checked={formData.include_quests}
              onChange={(e) => handleIncludeChange('quests', e.target.checked)}
              disabled={isGenerating || isRandomGenerating}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Quests
            </span>
          </label>
          
          <label className="flex items-center p-2 bg-gray-50 rounded dark:bg-gray-700">
            <input
              type="checkbox"
              checked={formData.include_dialogue}
              onChange={(e) => handleIncludeChange('dialogue', e.target.checked)}
              disabled={isGenerating || isRandomGenerating}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Dialogue
            </span>
          </label>
          
          <label className="flex items-center p-2 bg-gray-50 rounded dark:bg-gray-700">
            <input
              type="checkbox"
              checked={formData.include_items}
              onChange={(e) => handleIncludeChange('items', e.target.checked)}
              disabled={isGenerating || isRandomGenerating}
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Items
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}