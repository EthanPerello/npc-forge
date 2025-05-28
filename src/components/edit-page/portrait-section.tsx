// src/components/edit-page/portrait-section.tsx
'use client';

import React, { useState } from 'react';
import { Character, ImageModel } from '@/lib/types';
import PortraitDisplay from '@/components/portrait-display';
import ImageUpload from '@/components/image-upload';
import ImageModelSelector from '@/components/image-model-selector';
import { FormSection } from './shared';
import Button from '@/components/ui/button';

interface PortraitSectionProps {
  character: Character;
  characterId: string;
  isRegeneratingPortrait: boolean;
  selectedImageModel: ImageModel;
  onImageModelChange: (model: ImageModel) => void;
  onRegeneratePortrait: (e: React.MouseEvent) => void;
  onImageChange: (imageData: string | null) => void;
}

export const PortraitSection = ({
  character,
  characterId,
  isRegeneratingPortrait,
  selectedImageModel,
  onImageModelChange,
  onRegeneratePortrait,
  onImageChange
}: PortraitSectionProps) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  
  // Use more generic MouseEvent type to match what PortraitDisplay expects
  const handleToggleImageUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowImageUpload(!showImageUpload);
  };
  
  const handleImageChange = (imageData: string | null) => {
    onImageChange(imageData);
    setShowImageUpload(false);
  };
  
  return (
    <FormSection title="Portrait">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {showImageUpload ? (
            <div>
              <ImageUpload
                initialImage={character.image_data || character.image_url}
                onImageChange={handleImageChange}
                className="mt-2"
              />
              <Button
                variant="secondary"
                onClick={handleToggleImageUpload as any}
                className="mt-2"
                type="button"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <PortraitDisplay 
                imageUrl={character.image_url} 
                imageData={character.image_data}
                characterId={characterId}
                name={character.name}
                size="medium"
                isLoading={isRegeneratingPortrait}
                onRegenerate={onRegeneratePortrait}
                onUpload={handleToggleImageUpload}
                showRegenerateButton={true}
                showUploadButton={true}
              />
            </div>
          )}
          
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
              💡 <strong>Portrait Changes:</strong>
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Upload a custom portrait or regenerate using AI. Changes will only be saved when you click "Save Changes" at the bottom of the page.
            </p>
          </div>
        </div>
        
        {/* Image Model Selector */}
        <div className="md:w-1/2">
          <div className="bg-secondary p-4 rounded-lg border border-theme h-full">
            <h3 className="text-lg font-semibold mb-4">Portrait Generation Model</h3>
            <p className="text-sm text-muted mb-4">
              Select which model to use when regenerating this character's portrait. Higher tiers provide better quality but have usage limits.
            </p>
            <ImageModelSelector 
              value={selectedImageModel}
              onChange={onImageModelChange}
            />
            
            {/* Model-specific tips */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {selectedImageModel === 'dall-e-2' && (
                  <>
                    <strong>DALL-E 2:</strong> Fast generation with good quality. Best for quick iterations and testing different styles.
                  </>
                )}
                {selectedImageModel === 'dall-e-3' && (
                  <>
                    <strong>DALL-E 3:</strong> Enhanced quality with better prompt understanding. Ideal for detailed character portraits.
                  </>
                )}
                {selectedImageModel === 'gpt-image-1' && (
                  <>
                    <strong>GPT Image 1:</strong> Premium quality with the most realistic and detailed results. Perfect for final character art.
                  </>
                )}
              </p>
              
              {isRegeneratingPortrait && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
                  🔄 Generating portrait... This may take 10-30 seconds depending on the model.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
};