'use client';

import { useState, useEffect } from 'react';
import { TemplateOption, SubGenreOption } from '@/lib/types';
import { getSubGenres } from '@/lib/templates';
import GenreIcon from '@/components/ui/genre-icon';

interface TemplateSelectorProps {
  templates: TemplateOption[];
  selectedId?: string;
  onChange: (template: TemplateOption | undefined, subGenre?: SubGenreOption) => void;
  className?: string;
}

export default function TemplateSelector({
  templates,
  selectedId,
  onChange,
  className = ''
}: TemplateSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(selectedId);
  const [selectedSubGenre, setSelectedSubGenre] = useState<string | undefined>(undefined);
  const [availableSubGenres, setAvailableSubGenres] = useState<SubGenreOption[]>([]);
  
  // Update sub-genres when a main genre is selected
  useEffect(() => {
    if (selectedGenre) {
      const subGenres = getSubGenres(selectedGenre);
      setAvailableSubGenres(subGenres);
    } else {
      setAvailableSubGenres([]);
      setSelectedSubGenre(undefined);
    }
  }, [selectedGenre]);
  
  // Reset selections when selectedId changes externally
  useEffect(() => {
    setSelectedGenre(selectedId);
    setSelectedSubGenre(undefined);
  }, [selectedId]);
  
  const handleSelectGenre = (template: TemplateOption) => {
    // If already selected, deselect it
    if (selectedGenre === template.id) {
      setSelectedGenre(undefined);
      setSelectedSubGenre(undefined);
      onChange(undefined);
    } else {
      setSelectedGenre(template.id);
      setSelectedSubGenre(undefined);
      onChange(template);
    }
  };
  
  const handleSelectSubGenre = (subGenre: SubGenreOption) => {
    // Toggle selection
    if (selectedSubGenre === subGenre.id) {
      setSelectedSubGenre(undefined);
      // Revert to main genre
      const mainTemplate = templates.find(t => t.id === selectedGenre);
      if (mainTemplate) {
        onChange(mainTemplate);
      }
    } else {
      setSelectedSubGenre(subGenre.id);
      // Find the parent template
      const parentTemplate = templates.find(t => t.id === selectedGenre);
      if (parentTemplate) {
        onChange(parentTemplate, subGenre);
      }
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Genre Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              relative p-3 text-center rounded-lg cursor-pointer border transition-all
              ${selectedGenre === template.id 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20'}
            `}
            onClick={() => handleSelectGenre(template)}
            onMouseEnter={() => setHoveredId(template.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex justify-center mb-2">
              <GenreIcon 
                genre={template.id} 
                size="lg" 
                className={`text-indigo-600 dark:text-indigo-400 ${
                  selectedGenre === template.id ? 'opacity-100' : 'opacity-70'
                }`} 
              />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {template.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Sub-Genre Selection - Only show when a main genre is selected */}
      {selectedGenre && availableSubGenres.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            {templates.find(t => t.id === selectedGenre)?.label} Sub-genres
          </h4>
          <div className="flex flex-wrap gap-2">
            {availableSubGenres.map((subGenre) => (
              <button
                key={subGenre.id}
                className={`
                  px-2 py-1 text-xs rounded-full transition-colors border
                  ${selectedSubGenre === subGenre.id
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'}
                `}
                onClick={() => handleSelectSubGenre(subGenre)}
              >
                {subGenre.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Description panel */}
      {(hoveredId || selectedGenre || selectedSubGenre) && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-700">
          {/* Show sub-genre description if selected */}
          {selectedSubGenre && (
            availableSubGenres.find(s => s.id === selectedSubGenre)?.description
          )}
          {/* Show hovered genre description */}
          {!selectedSubGenre && hoveredId && (
            templates.find(t => t.id === hoveredId)?.description
          )}
          {/* Show selected genre description */}
          {!selectedSubGenre && !hoveredId && selectedGenre && (
            templates.find(t => t.id === selectedGenre)?.description
          )}
        </div>
      )}
    </div>
  );
}