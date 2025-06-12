// src/components/edit-page/portrait-section.tsx
'use client';

import React, { useState } from 'react';
import { Character, ImageModel } from '@/lib/types';
import PortraitDisplay from '@/components/portrait-display';
import ImageUpload from '@/components/image-upload';
import { FormSection } from './shared';
import Button from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Info, CheckCircle, Upload, RotateCcw, Edit3, Wand2 } from 'lucide-react';

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
  selectedImageModel: ImageModel;
  setCharacter: (character: Character | ((prev: Character) => Character)) => void;
}

// Models that support image editing (according to OpenAI API docs)
// Note: DALL-E 2 editing is unreliable despite meeting all documented requirements
const EDIT_SUPPORTED_MODELS: ImageModel[] = ['gpt-image-1'];

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
  portraitErrorType = null,
  selectedImageModel,
  setCharacter
}: PortraitSectionProps) {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isEditingPortrait, setIsEditingPortrait] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const handleToggleImageUpload = () => {
    setShowImageUpload(!showImageUpload);
    if (showEditPrompt) setShowEditPrompt(false);
  };

  const handleToggleEditPrompt = () => {
    setShowEditPrompt(!showEditPrompt);
    if (showImageUpload) setShowImageUpload(false);
    setEditError(null);
  };

  const handleImageChange = (imageData: string | null) => {
    if (imageData) {
      onImageChange(imageData);
      setShowImageUpload(false);
    }
  };

  const handleEditPortrait = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!editPrompt.trim()) {
      setEditError('Please enter an edit prompt');
      return;
    }
    
    if (!character.image_data && !character.image_url) {
      setEditError('No existing portrait to edit');
      return;
    }

    // Check if selected model supports editing
    if (!EDIT_SUPPORTED_MODELS.includes(selectedImageModel)) {
      setEditError(`${selectedImageModel} doesn't support image editing. Please switch to dall-e-2 or gpt-image-1.`);
      return;
    }
    
    setIsEditingPortrait(true);
    setEditError(null);
    
    try {
      console.log(`Editing portrait with prompt: "${editPrompt}" using model: ${selectedImageModel}`);
      
      const response = await fetch('/api/edit-portrait', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: character,
          editPrompt: editPrompt.trim(),
          imageModel: selectedImageModel
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to edit portrait';
        try {
          const errorData = await response.json();
          console.error("Portrait edit API error response:", errorData);
          errorMessage = errorData.error || errorMessage;
          
          // Handle specific error types
          if (errorData.errorType === 'rate_limit') {
            errorMessage = 'Rate limit exceeded. Please try again in a few minutes.';
          } else if (errorData.errorType === 'quota_exceeded') {
            errorMessage = 'Monthly quota exceeded for this model tier.';
          } else if (errorData.errorType === 'invalid_request') {
            errorMessage = 'Invalid edit request. Please try a different prompt.';
          } else if (errorData.errorType === 'timeout') {
            errorMessage = 'Portrait editing timed out. Please try again.';
          } else if (errorData.errorType === 'unsupported_model') {
            errorMessage = `${selectedImageModel} doesn't support editing. Switch to dall-e-2 or gpt-image-1.`;
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
        }
        
        setEditError(errorMessage);
        return;
      }

      const result = await response.json();
      console.log("Portrait edit result:", result);

      if (result.success && result.character && result.character.image_data) {
        console.log("Portrait edited successfully");
        
        // Update character with edited portrait
        setCharacter(result.character);
        
        // Clear the edit prompt and hide the edit interface
        setEditPrompt('');
        setShowEditPrompt(false);
        
        console.log('Portrait editing completed successfully');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Error editing portrait:", err);
      setEditError('Failed to edit portrait. Please try again.');
    } finally {
      setIsEditingPortrait(false);
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
  const hasExistingPortrait = !!(character.image_data || character.image_url);
  const editSupported = EDIT_SUPPORTED_MODELS.includes(selectedImageModel);

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

        {/* Model compatibility warning for editing */}
        {!editSupported && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                  Portrait Editing Not Available
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>{selectedImageModel}</strong> doesn't support reliable image editing. Switch to <strong>gpt-image-1</strong> above to enable portrait editing.
                </p>
              </div>
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
          ) : showEditPrompt ? (
            <div className="w-full max-w-md space-y-3">
              <div className="space-y-2">
                <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Edit Portrait with OpenAI
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Uses OpenAI's image editing API to modify your existing portrait. Only works with dall-e-2 and gpt-image-1.
                </p>
                <textarea
                  id="edit-prompt"
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Describe what you want to change... (e.g., 'add a red hat', 'remove glasses', 'change hair color to blonde', 'add a beard')"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-y min-h-[80px]"
                  rows={3}
                  maxLength={selectedImageModel === 'gpt-image-1' ? 32000 : 1000}
                  disabled={isEditingPortrait}
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {editPrompt.length}/{selectedImageModel === 'gpt-image-1' ? '32,000' : '1,000'} characters
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleEditPortrait}
                  disabled={isEditingPortrait || !editPrompt.trim() || !hasExistingPortrait || !editSupported}
                  type="button"
                  className="flex-1"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isEditingPortrait ? 'Editing Image...' : 'Edit Portrait'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleToggleEditPrompt}
                  disabled={isEditingPortrait}
                  type="button"
                >
                  Cancel
                </Button>
              </div>
              
              {!hasExistingPortrait && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Upload or generate a portrait first to enable editing
                </p>
              )}

              {!editSupported && (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Switch to dall-e-2 or gpt-image-1 to enable editing
                </p>
              )}
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
                  isLoading={isRegeneratingPortrait || isEditingPortrait}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="secondary"
                  onClick={onRegeneratePortrait}
                  disabled={isRegeneratingPortrait || isEditingPortrait}
                  type="button"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {isRegeneratingPortrait ? 'Generating...' : 'Regenerate'}
                </Button>
                
                {hasExistingPortrait && (
                  <Button
                    variant="secondary"
                    onClick={handleToggleEditPrompt}
                    disabled={isRegeneratingPortrait || isEditingPortrait || !editSupported}
                    type="button"
                    title={!editSupported ? `${selectedImageModel} doesn't support editing. Use dall-e-2 or gpt-image-1.` : 'Edit existing portrait'}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Portrait
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  onClick={handleToggleImageUpload}
                  disabled={isRegeneratingPortrait || isEditingPortrait}
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
        {(isRegeneratingPortrait || isEditingPortrait) && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {isRegeneratingPortrait ? 'Generating new portrait...' : 'Editing portrait with OpenAI...'}
              </p>
            </div>
          </div>
        )}

        {/* Edit Error Display */}
        {editError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Portrait Editing Failed
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {editError}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Generation Error Display */}
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
        {!isRegeneratingPortrait && !isEditingPortrait && !portraitGenerationFailed && hasExistingPortrait && (
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