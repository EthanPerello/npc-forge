// src/components/edit-page/portrait-section.tsx
'use client';

import React, { useState } from 'react';
import { Character } from '@/lib/types';
import PortraitDisplay from '@/components/portrait-display';
import ImageUpload from '@/components/image-upload';
import { FormSection } from './shared';
import Button from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Info, CheckCircle, Upload, RotateCcw } from 'lucide-react';

interface PortraitSectionProps {
  character: Character;
  characterId: string;
  isRegeneratingPortrait: boolean;
  onRegeneratePortrait: (e: React.MouseEvent) => void;
  onImageChange: (imageData: string | null) => void;
  hasUnsavedChanges?: boolean;
  portraitError?: string | null;
  portraitGenerationFailed?: boolean;
  portraitShouldRetry?: boolean;
  portraitErrorType?: 'quota_exceeded' | 'rate_limit' | 'timeout' | 'network' | 'server' | 'unknown' | null;
}

export function PortraitSection({
  character,
  characterId,
  isRegeneratingPortrait,
  onRegeneratePortrait,
  onImageChange,
  hasUnsavedChanges = false,
  portraitError,
  portraitGenerationFailed = false,
  portraitShouldRetry = false,
  portraitErrorType = null
}: PortraitSectionProps) {
  const [showImageUpload, setShowImageUpload] = useState(false);

  const handleToggleImageUpload = () => {
    setShowImageUpload(!showImageUpload);
  };

  const handleImageChange = (imageData: string | null) => {
    if (imageData) {
      onImageChange(imageData);
      setShowImageUpload(false);
    }
  };

  // Error info for enhanced display
  const getErrorInfo = (errorType: string | null) => {
    switch (errorType) {
      case 'quota_exceeded':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
          titleColor: 'text-amber-800 dark:text-amber-200',
          textColor: 'text-amber-700 dark:text-amber-300'
        };
      case 'rate_limit':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          titleColor: 'text-yellow-800 dark:text-yellow-200',
          textColor: 'text-yellow-700 dark:text-yellow-300'
        };
      case 'timeout':
      case 'network':
        return {
          icon: <RefreshCw className="h-4 w-4" />,
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          titleColor: 'text-blue-800 dark:text-blue-200',
          textColor: 'text-blue-700 dark:text-blue-300'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          titleColor: 'text-red-800 dark:text-red-200',
          textColor: 'text-red-700 dark:text-red-300'
        };
    }
  };

  const errorInfo = portraitGenerationFailed && portraitError ? getErrorInfo(portraitErrorType) : null;

  return (
    <FormSection title="Character Portrait">
      <div className="space-y-4">
        {/* Unsaved changes warning - more compact */}
        {hasUnsavedChanges && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Unsaved changes.</strong> Remember to save your modifications.
              </p>
            </div>
          </div>
        )}

        {/* Portrait Display with Action Buttons */}
        <div className="flex flex-col items-center space-y-4">
          {showImageUpload ? (
            <div className="w-full max-w-sm space-y-3">
              <ImageUpload
                initialImage={character.image_data || character.image_url}
                onImageChange={handleImageChange}
                className="w-full"
              />
              <Button
                variant="secondary"
                onClick={handleToggleImageUpload}
                fullWidth={true}
                type="button"
              >
                Cancel Upload
              </Button>
            </div>
          ) : (
            <>
              {/* Portrait Display */}
              <div className="w-full max-w-sm">
                <PortraitDisplay 
                  imageUrl={character.image_url} 
                  imageData={character.image_data}
                  characterId={characterId}
                  name={character.name}
                  size="large"
                  isLoading={isRegeneratingPortrait}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={onRegeneratePortrait}
                  disabled={isRegeneratingPortrait}
                  type="button"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {isRegeneratingPortrait ? 'Generating...' : 'Regenerate'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleToggleImageUpload}
                  type="button"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </>
          )}
        </div>
        
        {/* Status Messages */}
        {/* Generation Status */}
        {isRegeneratingPortrait && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Generating new portrait...
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {portraitGenerationFailed && errorInfo && (
          <div className={`p-3 rounded-lg border ${errorInfo.bgColor} ${errorInfo.borderColor}`}>
            <div className="flex items-start gap-2">
              <div className={`${errorInfo.titleColor} flex-shrink-0 mt-0.5`}>
                {errorInfo.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${errorInfo.titleColor} mb-1`}>
                  Portrait Generation Failed
                </p>
                <p className={`text-sm ${errorInfo.textColor}`}>
                  {portraitError}
                </p>
                {portraitErrorType === 'quota_exceeded' && (
                  <p className={`text-sm ${errorInfo.textColor} mt-1 font-medium`}>
                    💡 Try switching to a lower tier model above.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {!isRegeneratingPortrait && !portraitGenerationFailed && (character.image_data || character.image_url) && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Portrait ready to use
              </p>
            </div>
          </div>
        )}
      </div>
    </FormSection>
  );
}