'use client';

import { useState, useEffect } from 'react';
import { ImageModel } from '@/lib/types';
import { IMAGE_MODEL_CONFIGS, DEFAULT_IMAGE_MODEL } from '@/lib/image-models';
import { getRemainingGenerations } from '@/lib/usage-limits';

interface ImageModelSelectorProps {
  value: ImageModel;
  onChange: (model: ImageModel) => void;
}

export default function ImageModelSelector({ value, onChange }: ImageModelSelectorProps) {
  const [remaining, setRemaining] = useState<Record<string, string | number>>({});
  
  // Initialize with default model if none selected
  const selectedModel = value || DEFAULT_IMAGE_MODEL;
  
  // Get remaining generations for each model when component mounts
  useEffect(() => {
    const remainingCounts: Record<string, string | number> = {};
    IMAGE_MODEL_CONFIGS.forEach(config => {
      const value = getRemainingGenerations(config.id);
      remainingCounts[config.id] = value;
    });
    setRemaining(remainingCounts);
  }, []);
  
  // Format the remaining count for display
  const formatRemaining = (count: string | number): string => {
    if (count === "Unlimited" || count === "∞") return "∞";
    return String(count);
  };
  
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Portrait Generation Model
      </label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {IMAGE_MODEL_CONFIGS.map((config) => (
          <div 
            key={config.id}
            onClick={() => onChange(config.id as ImageModel)}
            className={`
              cursor-pointer border rounded-lg p-3 transition-colors
              ${selectedModel === config.id 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'}
            `}
          >
            <div className="flex flex-wrap items-center justify-between mb-1 gap-2">
              <div className="flex items-center">
                <span className="mr-2 flex-shrink-0">{config.emoji}</span>
                <h3 className="font-medium">{config.label}</h3>
              </div>
              
              {/* Completely restructured badge styling with flex-end alignment */}
              <div className="flex-shrink-0">
                {selectedModel === config.id ? (
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-indigo-600 text-white inline-flex items-center whitespace-nowrap">
                    {formatRemaining(remaining[config.id])} left
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 inline-flex items-center whitespace-nowrap">
                    {formatRemaining(remaining[config.id])} left
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {config.description}
            </p>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
              Powered by {config.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}