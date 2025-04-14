'use client';

import { useState } from 'react';
import { TemplateOption } from '@/lib/types';

interface TemplateSelectorProps {
  templates: TemplateOption[];
  selectedId?: string;
  onChange: (template: TemplateOption | undefined) => void;
  className?: string;
}

export default function TemplateSelector({
  templates,
  selectedId,
  onChange,
  className = ''
}: TemplateSelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  const handleSelect = (template: TemplateOption) => {
    // If already selected, deselect it
    if (selectedId === template.id) {
      onChange(undefined);
    } else {
      onChange(template);
    }
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              relative p-3 text-center rounded-lg cursor-pointer border transition-all
              ${selectedId === template.id 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20'}
            `}
            onClick={() => handleSelect(template)}
            onMouseEnter={() => setHoveredId(template.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="text-lg mb-1">
              {getGenreEmoji(template.id)}
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {template.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Description panel */}
      {(hoveredId || selectedId) && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-700">
          {templates.find(t => t.id === (hoveredId || selectedId))?.description}
        </div>
      )}
    </div>
  );
}

// Helper function to get emoji based on genre ID
function getGenreEmoji(id: string): string {
  const emojis: Record<string, string> = {
    'fantasy': '🧙‍♂️',
    'sci-fi': '🚀',
    'cyberpunk': '🤖',
    'western': '🤠',
    'modern': '🏙️',
    'horror': '👻',
    'post-apocalyptic': '☢️',
    'steampunk': '⚙️',
    'superhero': '🦸‍♀️',
    'historical': '📜',
    'mystery': '🔍',
    'military': '🪖',
    'pirate': '🏴‍☠️'
  };
  
  return emojis[id] || '📖';
}