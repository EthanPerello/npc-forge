'use client';

import { useState, useEffect, useCallback } from 'react';
import { OpenAIModel, ImageModel } from '@/lib/types';
import { MODEL_CONFIGS, DEFAULT_MODEL, getModelConfig } from '@/lib/models';
import { IMAGE_MODEL_CONFIGS, DEFAULT_IMAGE_MODEL, getImageModelConfig } from '@/lib/image-models';
import { getRemainingGenerations } from '@/lib/usage-limits';
import { ChevronDown } from 'lucide-react';

interface ModelSelectorsSectionProps {
  textModel: OpenAIModel;
  imageModel: ImageModel;
  onTextModelChange: (model: OpenAIModel) => void;
  onImageModelChange: (model: ImageModel) => void;
}

export default function ModelSelectorsSection({
  textModel,
  imageModel,
  onTextModelChange,
  onImageModelChange
}: ModelSelectorsSectionProps) {
  const [textDropdownOpen, setTextDropdownOpen] = useState(false);
  const [imageDropdownOpen, setImageDropdownOpen] = useState(false);
  const [remaining, setRemaining] = useState<Record<string, string | number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with default models if none selected
  const selectedTextModel = textModel || DEFAULT_MODEL;
  const selectedImageModel = imageModel || DEFAULT_IMAGE_MODEL;

  // Get remaining generations for all models with error handling
  const updateRemainingCounts = useCallback(async () => {
    try {
      setIsLoading(true);
      const remainingCounts: Record<string, string | number> = {};
      
      // Text models
      for (const config of MODEL_CONFIGS) {
        try {
          const value = getRemainingGenerations(config.id);
          remainingCounts[config.id] = value;
        } catch (error) {
          console.warn(`Error getting remaining count for text model ${config.id}:`, error);
          remainingCounts[config.id] = 0;
        }
      }
      
      // Image models
      for (const config of IMAGE_MODEL_CONFIGS) {
        try {
          const value = getRemainingGenerations(config.id);
          remainingCounts[config.id] = value;
        } catch (error) {
          console.warn(`Error getting remaining count for image model ${config.id}:`, error);
          remainingCounts[config.id] = 0;
        }
      }
      
      setRemaining(remainingCounts);
    } catch (error) {
      console.error('Error updating remaining counts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    updateRemainingCounts();
  }, [updateRemainingCounts]);

  // Format the remaining count for display
  const formatRemaining = (count: string | number): string => {
    if (count === "Unlimited" || count === "∞") return "∞";
    return String(count);
  };

  // Get tier color class
  const getTierColorClass = (tier: string, isSelected: boolean) => {
    if (isSelected) {
      return 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30';
    }
    
    switch (tier) {
      case 'cheap':
        return 'border-green-200 hover:border-green-300 dark:border-green-700 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20';
      case 'mid':
        return 'border-yellow-200 hover:border-yellow-300 dark:border-yellow-700 dark:hover:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20';
      case 'premium':
        return 'border-purple-200 hover:border-purple-300 dark:border-purple-700 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20';
      default:
        return 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600';
    }
  };

  // Get tier badge color
  const getTierBadgeClass = (tier: string) => {
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Check if the click is outside any dropdown
      const isClickInsideDropdown = target.closest('[data-dropdown]');
      
      if (!isClickInsideDropdown) {
        setTextDropdownOpen(false);
        setImageDropdownOpen(false);
      }
    };

    if (textDropdownOpen || imageDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [textDropdownOpen, imageDropdownOpen]);

  // Handle model selection with error handling
  const handleTextModelSelect = (modelId: OpenAIModel) => {
    try {
      onTextModelChange(modelId);
      setTextDropdownOpen(false);
      updateRemainingCounts(); // Refresh counts after selection
    } catch (error) {
      console.error('Error selecting text model:', error);
    }
  };

  const handleImageModelSelect = (modelId: ImageModel) => {
    try {
      onImageModelChange(modelId);
      setImageDropdownOpen(false);
      updateRemainingCounts(); // Refresh counts after selection
    } catch (error) {
      console.error('Error selecting image model:', error);
    }
  };

  // Get model configurations with fallbacks
  const selectedTextConfig = (() => {
    try {
      return getModelConfig(selectedTextModel);
    } catch (error) {
      console.warn('Error getting text model config:', error);
      return MODEL_CONFIGS[0]; // Fallback to first config
    }
  })();

  const selectedImageConfig = (() => {
    try {
      return getImageModelConfig(selectedImageModel);
    } catch (error) {
      console.warn('Error getting image model config:', error);
      return IMAGE_MODEL_CONFIGS[0]; // Fallback to first config
    }
  })();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        AI Model Selection
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Text Model Dropdown */}
        <div className="relative" data-dropdown="text">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text Generation Model
          </label>
          <div
            className="relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setTextDropdownOpen(!textDropdownOpen);
              setImageDropdownOpen(false);
            }}
          >
            <div className={`
              border rounded-lg p-3 transition-all duration-200 
              ${getTierColorClass(selectedTextConfig.tier, true)}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-base">{selectedTextConfig.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {selectedTextConfig.label}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {selectedTextConfig.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${getTierBadgeClass(selectedTextConfig.tier)}
                  `}>
                    {isLoading ? '...' : formatRemaining(remaining[selectedTextModel] || 0)} left
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${textDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            {textDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                {MODEL_CONFIGS.map((config) => {
                  const isSelected = selectedTextModel === config.id;
                  return (
                    <div
                      key={config.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTextModelSelect(config.id);
                      }}
                      className={`
                        cursor-pointer p-3 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg
                        ${isSelected 
                          ? 'bg-indigo-50 dark:bg-indigo-900/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1">
                          <span className="text-base">{config.emoji}</span>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {config.label}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {config.description}
                            </p>
                          </div>
                        </div>
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${getTierBadgeClass(config.tier)}
                        `}>
                          {isLoading ? '...' : formatRemaining(remaining[config.id] || 0)} left
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Image Model Dropdown */}
        <div className="relative" data-dropdown="image">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Portrait Generation Model
          </label>
          <div
            className="relative cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setImageDropdownOpen(!imageDropdownOpen);
              setTextDropdownOpen(false);
            }}
          >
            <div className={`
              border rounded-lg p-3 transition-all duration-200 
              ${getTierColorClass(selectedImageConfig.tier, true)}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-1">
                  <span className="text-base">{selectedImageConfig.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                      {selectedImageConfig.label}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {selectedImageConfig.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${getTierBadgeClass(selectedImageConfig.tier)}
                  `}>
                    {isLoading ? '...' : formatRemaining(remaining[selectedImageModel] || 0)} left
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${imageDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>

            {/* Dropdown Menu */}
            {imageDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                {IMAGE_MODEL_CONFIGS.map((config) => {
                  const isSelected = selectedImageModel === config.id;
                  return (
                    <div
                      key={config.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageModelSelect(config.id);
                      }}
                      className={`
                        cursor-pointer p-3 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg
                        ${isSelected 
                          ? 'bg-indigo-50 dark:bg-indigo-900/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1">
                          <span className="text-base">{config.emoji}</span>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {config.label}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {config.description}
                            </p>
                          </div>
                        </div>
                        <span className={`
                          inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${getTierBadgeClass(config.tier)}
                        `}>
                          {isLoading ? '...' : formatRemaining(remaining[config.id] || 0)} left
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help text */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
        Higher tier models provide better quality but have usage limits. Usage resets monthly.
      </p>
    </div>
  );
}