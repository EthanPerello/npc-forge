'use client';

import { useState, useEffect } from 'react';
import { OpenAIModel } from '@/lib/types';
import { MODEL_CONFIGS, DEFAULT_MODEL } from '@/lib/models';
import { getRemainingGenerations } from '@/lib/usage-limits';

interface ModelSelectorProps {
  value: OpenAIModel;
  onChange: (model: OpenAIModel) => void;
}

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  const [remaining, setRemaining] = useState<Record<string, number | string>>({});
  
  // Initialize with default model if none selected
  const selectedModel = value || DEFAULT_MODEL;
  
  // Get remaining generations for each model when component mounts
  useEffect(() => {
    const remainingCounts: Record<string, number | string> = {};
    MODEL_CONFIGS.forEach(config => {
      remainingCounts[config.id] = getRemainingGenerations(config.id);
    });
    setRemaining(remainingCounts);
  }, []);
  
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Character Generation Model
      </label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {MODEL_CONFIGS.map((config) => (
          <div 
            key={config.id}
            onClick={() => onChange(config.id as OpenAIModel)}
            className={`
              cursor-pointer border rounded-lg p-3 transition-colors
              ${selectedModel === config.id 
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' 
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'}
            `}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium">
                {config.emoji} {config.label}
              </h3>
              {/* Use different classes to avoid the global CSS override */}
              {selectedModel === config.id ? (
                <span className="model-badge-selected text-xs px-2 py-1 rounded-full">
                  {remaining[config.id] === "Unlimited" ? "∞" : `${remaining[config.id]}`} left
                </span>
              ) : (
                <span className="model-badge-unselected text-xs px-2 py-1 rounded-full">
                  {remaining[config.id] === "Unlimited" ? "∞" : `${remaining[config.id]}`} left
                </span>
              )}
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