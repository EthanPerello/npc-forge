// src/components/edit-page/portrait-section.tsx
'use client';

import React, { useState } from 'react';
import { Character, ImageModel } from '@/lib/types';
import PortraitDisplay from '@/components/portrait-display';
import ImageUpload from '@/components/image-upload';
import ImageModelSelector from '@/components/image-model-selector';
import { FormSection } from './shared';
import Button from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Info, CheckCircle } from 'lucide-react';

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
  
  // Check for portrait error information
  const portraitError = character.added_traits?.portrait_error_message;
  const portraitErrorType = character.added_traits?.portrait_error_type;
  const portraitShouldRetry = character.added_traits?.portrait_should_retry === 'true';
  const portraitGenerationFailed = character.added_traits?.portrait_generation_failed === 'true';
  
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
  
  // Function to get error display information
  const getErrorDisplayInfo = () => {
    if (!portraitError) return null;
    
    let icon = <AlertTriangle className="w-4 h-4" />;
    let bgColor = 'bg-red-50 dark:bg-red-900/20';
    let borderColor = 'border-red-200 dark:border-red-800';
    let textColor = 'text-red-700 dark:text-red-300';
    let titleColor = 'text-red-800 dark:text-red-200';
    
    if (portraitErrorType === 'rate_limit' || portraitErrorType === 'timeout') {
      icon = <RefreshCw className="w-4 h-4" />;
      bgColor = 'bg-yellow-50 dark:bg-yellow-900/20';
      borderColor = 'border-yellow-200 dark:border-yellow-800';
      textColor = 'text-yellow-700 dark:text-yellow-300';
      titleColor = 'text-yellow-800 dark:text-yellow-200';
    } else if (portraitErrorType === 'quota_exceeded') {
      icon = <Info className="w-4 h-4" />;
      bgColor = 'bg-blue-50 dark:bg-blue-900/20';
      borderColor = 'border-blue-200 dark:border-blue-800';
      textColor = 'text-blue-700 dark:text-blue-300';
      titleColor = 'text-blue-800 dark:text-blue-200';
    }
    
    return {
      icon,
      bgColor,
      borderColor,
      textColor,
      titleColor
    };
  };
  
  const errorInfo = getErrorDisplayInfo();
  
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
          
          {/* Enhanced error display */}
          {portraitGenerationFailed && errorInfo && (
            <div className={`mt-3 p-3 rounded-lg border ${errorInfo.bgColor} ${errorInfo.borderColor}`}>
              <div className="flex items-start gap-2">
                <div className={errorInfo.titleColor}>
                  {errorInfo.icon}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${errorInfo.titleColor} mb-1`}>
                    Portrait Generation Issue
                  </p>
                  <p className={`text-xs ${errorInfo.textColor} mb-1`}>
                    {portraitError}
                  </p>
                  {portraitShouldRetry && (
                    <p className={`text-xs ${errorInfo.textColor}`}>
                      You can try regenerating the portrait again, or upload a custom image instead.
                    </p>
                  )}
                  {portraitErrorType === 'quota_exceeded' && (
                    <p className={`text-xs ${errorInfo.textColor} mt-1`}>
                      💡 Try switching to a lower tier model in the settings below.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Standard tips when no error */}
          {!portraitGenerationFailed && (
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                💡 <strong>Portrait Changes:</strong>
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                Upload a custom portrait or regenerate using AI. Changes will only be saved when you click "Save Changes" at the bottom of the page.
              </p>
            </div>
          )}
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
            
            {/* Model-specific tips and status */}
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
              
              {/* Generation status indicators */}
              {isRegeneratingPortrait && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
                  <RefreshCw className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-spin" />
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                    Generating portrait... This may take 10-30 seconds depending on the model.
                  </p>
                </div>
              )}
              
              {/* Success indicator for recently generated portraits */}
              {!isRegeneratingPortrait && (character.image_data || character.image_url) && !portraitGenerationFailed && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Portrait ready! Remember to save your changes.
                  </p>
                </div>
              )}
            </div>
            
            {/* Additional tips based on error state */}
            {portraitErrorType === 'rate_limit' && (
              <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  <strong>💡 Rate Limit Tip:</strong> Try waiting a few minutes between generation attempts, or switch to a different model tier.
                </p>
              </div>
            )}
            
            {portraitErrorType === 'timeout' && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>🔄 Timeout Tip:</strong> The AI service may be busy. Try again in a moment, or use a simpler character description for the portrait.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormSection>
  );
};