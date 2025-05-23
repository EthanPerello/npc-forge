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
  onRegeneratePortrait: (e: React.MouseEvent) => void; // More generic MouseEvent type
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
                onClick={handleToggleImageUpload as any} // Type assertion for Button component
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
          
          <p className="text-xs text-muted mt-2">
            Upload a custom portrait or regenerate using AI. The portrait will be saved with the character.
          </p>
        </div>
        
        {/* Image Model Selector */}
        <div className="md:w-1/2">
          <div className="bg-secondary p-4 rounded-lg border border-theme h-full">
            <h3 className="text-lg font-semibold mb-4">Portrait Generation Model</h3>
            <p className="text-sm text-muted mb-4">
              Select which model to use when regenerating this character's portrait.
            </p>
            <ImageModelSelector 
              value={selectedImageModel}
              onChange={onImageModelChange}
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};