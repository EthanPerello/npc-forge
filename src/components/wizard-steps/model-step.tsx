'use client';

import { useCharacter } from '@/contexts/character-context';
import { OpenAIModel, ImageModel } from '@/lib/types';
import ModelSelector from '../model-selector';
import ImageModelSelector from '../image-model-selector';

interface ModelStepProps {
  onNext: () => void;
  isGenerating?: boolean;
}

export default function ModelStep({ onNext, isGenerating }: ModelStepProps) {
  const { formData, updateFormData } = useCharacter();

  const handleModelChange = (model: OpenAIModel) => {
    updateFormData({ model });
  };

  const handleImageModelChange = (imageModel: ImageModel) => {
    updateFormData({
      portrait_options: {
        ...formData.portrait_options,
        image_model: imageModel
      }
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Choose AI Models
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select which models to use for generating your character
        </p>
      </div>

      {/* Text Generation Model */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Text Generation Model
        </h3>
        <ModelSelector value={formData.model || 'gpt-4o-mini'} onChange={handleModelChange} />
      </div>

      {/* Image Generation Model - Only show if portrait is included */}
      {formData.include_portrait && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Portrait Generation Model
          </h3>
          <ImageModelSelector 
            value={formData.portrait_options?.image_model || 'dall-e-2'} 
            onChange={handleImageModelChange} 
          />
        </div>
      )}

      {/* If portrait is not included, show a message */}
      {!formData.include_portrait && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Portrait generation is disabled. You can enable it in the first step if desired.
          </p>
        </div>
      )}
    </div>
  );
}