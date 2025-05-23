'use client';

import React from 'react';
import { Character, OpenAIModel } from '@/lib/types';
import Select from '@/components/ui/select';
import ModelSelector from '@/components/model-selector';
import { FormSection, RegenerateButton } from './shared';
import { GENRE_TEMPLATES } from '@/lib/templates';

interface BasicInfoSectionProps {
  character: Character;
  onInputChange: (field: string, value: string) => void;
  onRegenerateField: (field: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  onGenreChange: (section: 'selected_traits' | 'added_traits', field: string, value: string) => void;
  currentGenre: string;
  subGenres: {value: string, label: string}[];
  fieldLoadingStates: Record<string, boolean>;
  selectedTextModel: OpenAIModel;
  onModelChange: (model: OpenAIModel) => void;
}

export const BasicInfoSection = ({
  character,
  onInputChange,
  onRegenerateField,
  onGenreChange,
  currentGenre,
  subGenres,
  fieldLoadingStates,
  selectedTextModel,
  onModelChange
}: BasicInfoSectionProps) => {
  return (
    <FormSection title="Basic Information">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Name
        </label>
        <div className="flex">
          <input
            type="text"
            value={character.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
          />
          <RegenerateButton
            field="name"
            onClick={(e) => onRegenerateField('name', e)}
            isLoading={fieldLoadingStates['name'] || false}
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
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Appearance
        </label>
        <div className="flex">
          <textarea
            value={character.appearance}
            onChange={(e) => onInputChange('appearance', e.target.value)}
            rows={4}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
          />
          <RegenerateButton
            field="appearance"
            onClick={(e) => onRegenerateField('appearance', e)}
            isLoading={fieldLoadingStates['appearance'] || false}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Personality
        </label>
        <div className="flex">
          <textarea
            value={character.personality}
            onChange={(e) => onInputChange('personality', e.target.value)}
            rows={4}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
          />
          <RegenerateButton
            field="personality"
            onClick={(e) => onRegenerateField('personality', e)}
            isLoading={fieldLoadingStates['personality'] || false}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Backstory Hook
        </label>
        <div className="flex">
          <textarea
            value={character.backstory_hook}
            onChange={(e) => onInputChange('backstory_hook', e.target.value)}
            rows={2}
            className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
          />
          <RegenerateButton
            field="backstory_hook"
            onClick={(e) => onRegenerateField('backstory_hook', e)}
            isLoading={fieldLoadingStates['backstory_hook'] || false}
          />
        </div>
      </div>

      {/* Text Model Selector */}
      <div className="mb-6 mt-6 p-4 bg-secondary rounded-lg border border-theme">
        <h3 className="text-lg font-semibold mb-4">Text Generation Model</h3>
        <p className="text-sm text-muted mb-4">
          Select which model to use for regenerating any text content in this character.
        </p>
        <ModelSelector 
          value={selectedTextModel}
          onChange={onModelChange}
        />
      </div>
    </FormSection>
  );
};