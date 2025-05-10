'use client';

import { Character, ImageModel } from '@/lib/types';
import PortraitDisplay from '@/components/portrait-display';
import ImageUpload from '@/components/image-upload';
import ImageModelSelector from '@/components/image-model-selector';
import { FormSection } from './shared';

interface PortraitSectionProps {
  character: Character;
  characterId: string;
  showImageUpload: boolean;
  isRegeneratingPortrait: boolean;
  selectedImageModel: ImageModel;
  onImageModelChange: (model: ImageModel) => void;
  onRegeneratePortrait: (e: React.MouseEvent) => void;
  onToggleImageUpload: (e: React.MouseEvent) => void;
  onImageChange: (imageData: string | null) => void;
}

export const PortraitSection = ({
  character,
  characterId,
  showImageUpload,
  isRegeneratingPortrait,
  selectedImageModel,
  onImageModelChange,
  onRegeneratePortrait,
  onToggleImageUpload,
  onImageChange
}: PortraitSectionProps) => {
  return (
    <FormSection title="Portrait">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          {showImageUpload ? (
            <div>
              <ImageUpload
                initialImage={character.image_data || character.image_url}
                onImageChange={onImageChange}
                className="mt-2"
              />
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
                onUpload={onToggleImageUpload}
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