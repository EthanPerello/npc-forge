// Fixed model-step.tsx with side-by-side layout

'use client';

import { useCharacter } from '@/contexts/character-context';
import { OpenAIModel, ImageModel } from '@/lib/types';
import { MODEL_CONFIGS } from '@/lib/models';
import { IMAGE_MODEL_CONFIGS } from '@/lib/image-models';
import { useState, useEffect } from 'react';
import { getRemainingGenerations } from '@/lib/usage-limits';

interface ModelStepProps {
  onNext: () => void;
  isGenerating?: boolean;
}

export default function ModelStep({ onNext, isGenerating }: ModelStepProps) {
  const { formData, updateFormData } = useCharacter();
  const [remainingText, setRemainingText] = useState<Record<string, number | string>>({});
  const [remainingImage, setRemainingImage] = useState<Record<string, number | string>>({});

  // Get remaining generations for each model
  useEffect(() => {
    const textCounts: Record<string, number | string> = {};
    MODEL_CONFIGS.forEach(config => {
      textCounts[config.id] = getRemainingGenerations(config.id);
    });
    setRemainingText(textCounts);

    const imageCounts: Record<string, number | string> = {};
    IMAGE_MODEL_CONFIGS.forEach(config => {
      imageCounts[config.id] = getRemainingGenerations(config.id);
    });
    setRemainingImage(imageCounts);
  }, []);

  const handleTextModelChange = (model: OpenAIModel) => {
    updateFormData({ model });
  };

  const handleImageModelChange = (model: ImageModel) => {
    updateFormData({
      portrait_options: {
        ...formData.portrait_options,
        image_model: model
      }
    });
  };

  const selectedTextModel = formData.model || 'gpt-4o-mini';
  const selectedImageModel = formData.portrait_options?.image_model || 'dall-e-2';

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">
          Select Generation Models
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose the quality tier for your character and portrait
        </p>
      </div>

      {/* Side-by-side layout for character and portrait generation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Text Generation Model */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Character Generation
          </h3>
          <div className="space-y-2">
            {MODEL_CONFIGS.map((config) => (
              <button
                key={config.id}
                onClick={() => handleTextModelChange(config.id as OpenAIModel)}
                disabled={isGenerating}
                className={`
                  w-full text-left p-3 rounded-lg border transition-all
                  ${selectedTextModel === config.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {config.emoji} {config.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {config.description}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {config.id}
                    </div>
                  </div>
                  <div className="text-sm font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded dark:bg-indigo-900 dark:text-indigo-200">
                    {remainingText[config.id] === "Unlimited" ? "∞" : `${remainingText[config.id]}`} left
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Generation Model */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Portrait Generation
          </h3>
          <div className="space-y-2">
            {IMAGE_MODEL_CONFIGS.map((config) => (
              <button
                key={config.id}
                onClick={() => handleImageModelChange(config.id as ImageModel)}
                disabled={isGenerating}
                className={`
                  w-full text-left p-3 rounded-lg border transition-all
                  ${selectedImageModel === config.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {config.emoji} {config.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {config.description}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {config.id}
                    </div>
                  </div>
                  <div className="text-sm font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded dark:bg-indigo-900 dark:text-indigo-200">
                    {remainingImage[config.id] === "Unlimited" ? "∞" : `${remainingImage[config.id]}`} left
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generation Preferences - Full Width */}
      <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm">Generation Preferences</h4>
        <div className="space-y-2">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 mr-2" defaultChecked />
            <span className="text-gray-800 dark:text-gray-200">
              Allow AI creative interpretation of unspecified traits
            </span>
          </label>
          <p className="text-xs text-gray-600 dark:text-gray-400 ml-6">
            Lets the AI fill in details you haven't explicitly set, creating a more complete character
          </p>
        </div>
      </div>
    </div>
  );
}