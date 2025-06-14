'use client';

import React from 'react';
import { Character, OpenAIModel } from '@/lib/types';
import Select from '@/components/ui/select';
import { FormSection, RegenerateButton } from './shared';
import { GENRE_TEMPLATES } from '@/lib/templates';

interface BasicInfoSectionProps {
  character: Character;
  onInputChange: (field: string, value: string) => void;
  onRegenerateField: (field: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  onGenreChange: (section: 'selected_traits' | 'added_traits', field: string, value: string) => void;
  currentGenre: string;
  subGenres: {value: string, label: string}[];
  isFieldRegenerating: (field: string, index?: number, subField?: string) => boolean;
  regeneratingFields: Set<string>;
}

export const BasicInfoSection = ({
  character,
  onInputChange,
  onRegenerateField,
  onGenreChange,
  currentGenre,
  subGenres,
  isFieldRegenerating,
  regeneratingFields
}: BasicInfoSectionProps) => {
  
  // Check if any basic info field is regenerating
  const hasBasicInfoLoading = regeneratingFields.has('name') || 
                              regeneratingFields.has('appearance') || 
                              regeneratingFields.has('personality') || 
                              regeneratingFields.has('backstory_hook');

  return (
    <FormSection title="Basic Information">
      {/* Loading overlay when any field is regenerating */}
      {hasBasicInfoLoading && (
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Regenerating character information...
            </p>
          </div>
        </div>
      )}

      <div className={`mb-4 ${isFieldRegenerating('name') ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800' : ''}`}>
        <label className="block text-sm font-medium mb-1">
          Name
        </label>
        <div className="flex">
          <input
            type="text"
            value={character.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            disabled={isFieldRegenerating('name')}
          />
          <RegenerateButton
            field="name"
            onClick={(e) => onRegenerateField('name', e)}
            isLoading={isFieldRegenerating('name')}
          />
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
          onChange={(e) => onGenreChange('selected_traits', 'genre', e.target.value)}
        />
        
        <Select
          label="Sub-Genre"
          options={subGenres}
          value={character.selected_traits.sub_genre || ''}
          onChange={(e) => onGenreChange('selected_traits', 'sub_genre', e.target.value)}
        />
      </div>
      
      <div className={`mb-4 ${isFieldRegenerating('appearance') ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800' : ''}`}>
        <label className="block text-sm font-medium mb-1">
          Appearance
        </label>
        <div className="flex">
          <textarea
            value={character.appearance}
            onChange={(e) => onInputChange('appearance', e.target.value)}
            rows={4}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            disabled={isFieldRegenerating('appearance')}
          />
          <RegenerateButton
            field="appearance"
            onClick={(e) => onRegenerateField('appearance', e)}
            isLoading={isFieldRegenerating('appearance')}
          />
        </div>
      </div>
      
      <div className={`mb-4 ${isFieldRegenerating('personality') ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800' : ''}`}>
        <label className="block text-sm font-medium mb-1">
          Personality
        </label>
        <div className="flex">
          <textarea
            value={character.personality}
            onChange={(e) => onInputChange('personality', e.target.value)}
            rows={4}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            disabled={isFieldRegenerating('personality')}
          />
          <RegenerateButton
            field="personality"
            onClick={(e) => onRegenerateField('personality', e)}
            isLoading={isFieldRegenerating('personality')}
          />
        </div>
      </div>
      
      <div className={`mb-4 ${isFieldRegenerating('backstory_hook') ? 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800' : ''}`}>
        <label className="block text-sm font-medium mb-1">
          Backstory Hook
        </label>
        <div className="flex">
          <textarea
            value={character.backstory_hook}
            onChange={(e) => onInputChange('backstory_hook', e.target.value)}
            rows={2}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            disabled={isFieldRegenerating('backstory_hook')}
          />
          <RegenerateButton
            field="backstory_hook"
            onClick={(e) => onRegenerateField('backstory_hook', e)}
            isLoading={isFieldRegenerating('backstory_hook')}
          />
        </div>
      </div>
    </FormSection>
  );
};