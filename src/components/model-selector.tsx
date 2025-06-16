// src/components/model-selector.tsx
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
  const [remaining, setRemaining] = useState<Record<string, string | number>>({});
  
  // Initialize with default model if none selected
  const selectedModel = value || DEFAULT_MODEL;
  
  // Get remaining generations for each model when component mounts
  useEffect(() => {
    const remainingCounts: Record<string, string | number> = {};
    MODEL_CONFIGS.forEach(config => {
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
  
  // Get tier color class
  const getTierColorClass = (tier: string, isSelected: boolean) => {
    if (isSelected) {
      return 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm ring-2 ring-indigo-200 dark:ring-indigo-700';
    }
    
    // Use neutral colors for all unselected items to make selection clearer
    return 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700';
  };
  
  // Get tier badge color
  const getTierBadgeClass = (tier: string, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-indigo-600 text-white';
    }
    
    switch (tier) {
      case 'cheap':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'mid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'premium':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Text Generation Model
      </label>
      <div className="grid grid-cols-1 gap-2">
        {MODEL_CONFIGS.map((config) => {
          const isSelected = selectedModel === config.id;
          const tierColorClass = getTierColorClass(config.tier, isSelected);
          const badgeClass = getTierBadgeClass(config.tier, isSelected);
          
          return (
            <div 
              key={config.id}
              onClick={() => onChange(config.id)}
              className={`
                cursor-pointer border rounded-lg p-3 transition-all duration-200 
                ${tierColorClass}
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="text-base flex-shrink-0">{config.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                      {config.id}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {config.description}
                    </p>
                  </div>
                </div>
                
                {/* Usage Badge */}
                <div className="ml-2 flex-shrink-0">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${badgeClass}
                  `}>
                    {formatRemaining(remaining[config.id] || 0)} left
                  </span>
                </div>
              </div>
              
              {/* Model Details - More compact */}
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-500 dark:text-gray-400 font-mono">
                  {config.label}
                </span>
                <span className={`
                  px-1.5 py-0.5 rounded text-xs font-medium
                  ${isSelected 
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }
                `}>
                  {config.tier === 'cheap' && '🟢 Standard'}
                  {config.tier === 'mid' && '🟡 Enhanced'}
                  {config.tier === 'premium' && '🔴 Premium'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Help text */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Higher tier models provide better quality but have usage limits. Usage resets monthly.
      </p>
    </div>
  );
}