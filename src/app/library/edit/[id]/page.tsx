// src/app/library/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCharacterById, updateCharacter, deleteCharacter, loadCharacterWithImage, saveImage } from '@/lib/character-storage';
import { Character, Quest, OpenAIModel, ImageModel, SubGenreOption } from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';
import { getSubGenres } from '@/lib/templates';

// Import components from the edit-page directory
import { FeedbackMessage } from '@/components/edit-page/shared';
import { HeaderSection } from '@/components/edit-page/header-section';
import ModelSelectorsSection from '@/components/edit-page/model-selectors-section';
import { BasicInfoSection } from '@/components/edit-page/basic-info-section';
import { PortraitSection } from '@/components/edit-page/portrait-section';
import { CharacterTraitsSection } from '@/components/edit-page/character-traits-section';
import { AdditionalTraitsSection } from '@/components/edit-page/additional-traits-section';
import { ItemsSection } from '@/components/edit-page/items-section';
import { DialogueSection } from '@/components/edit-page/dialogue-section';
import { QuestsSection } from '@/components/edit-page/quests-section';
import { EditPageFooter } from '@/components/edit-page/edit-page-footer';

export default function CharacterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const characterId = decodeURIComponent(params.id as string);
  
  // Character state
  const [character, setCharacter] = useState<Character | null>(null);
  const [originalCharacter, setOriginalCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track unsaved changes for all fields
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // UI state
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [subGenres, setSubGenres] = useState<{value: string, label: string}[]>([]);
  
  // Regeneration state - updated to track individual fields
  const [isRegeneratingPortrait, setIsRegeneratingPortrait] = useState(false);
  const [isRegeneratingField, setIsRegeneratingField] = useState<string | null>(null);
  const [fieldLoadingStates, setFieldLoadingStates] = useState<Record<string, boolean>>({});
  const [feedbackMessage, setFeedbackMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Portrait error tracking
  const [portraitError, setPortraitError] = useState<string | null>(null);
  const [portraitGenerationFailed, setPortraitGenerationFailed] = useState(false);
  const [portraitShouldRetry, setPortraitShouldRetry] = useState(false);
  const [portraitErrorType, setPortraitErrorType] = useState<'quota_exceeded' | 'rate_limit' | 'timeout' | 'network' | 'server' | 'unknown' | null>(null);
  
  // Model selections
  const [selectedTextModel, setSelectedTextModel] = useState<OpenAIModel>(DEFAULT_MODEL);
  const [selectedImageModel, setSelectedImageModel] = useState<ImageModel>(DEFAULT_IMAGE_MODEL);
  
  // Load character data
  useEffect(() => {
    if (!characterId) return;
    
    async function loadCharacter() {
      setIsLoading(true);
      try {
        console.log(`Loading character with ID: ${characterId}`);
        // Load the character with image from IndexedDB
        const storedCharacter = await getCharacterById(characterId);
        
        if (storedCharacter) {
          console.log(`Character found: ${storedCharacter.character.name}`);
          // Load the full character with image data
          const fullCharacter = await loadCharacterWithImage(characterId);
          
          if (fullCharacter) {
            console.log("Loaded character with image data");
            setCharacter(fullCharacter);
            setOriginalCharacter(JSON.parse(JSON.stringify(fullCharacter)));
            
            // Set current genre for subgenres
            if (fullCharacter.selected_traits.genre) {
              setCurrentGenre(fullCharacter.selected_traits.genre);
              // Load sub-genres for the current genre
              const genreSubGenres = getSubGenres(fullCharacter.selected_traits.genre);
              setSubGenres([
                { value: '', label: 'Not specified' },
                ...genreSubGenres.map((sg: SubGenreOption) => ({ value: sg.id, label: sg.label }))
              ]);
            }
            
            // Set selected models from character data
            if (fullCharacter.portrait_options?.image_model) {
              setSelectedImageModel(fullCharacter.portrait_options.image_model);
            }
            
            // Check for portrait error information
            if (fullCharacter.added_traits?.portrait_error_message) {
              setPortraitError(fullCharacter.added_traits.portrait_error_message);
              setPortraitGenerationFailed(fullCharacter.added_traits.portrait_generation_failed === 'true');
              setPortraitShouldRetry(fullCharacter.added_traits.portrait_should_retry === 'true');
              setPortraitErrorType(fullCharacter.added_traits.portrait_error_type as any);
            }
          } else {
            console.error("Failed to load character with image data");
            setError("Failed to load character data");
          }
        } else {
          console.error("Character not found");
          setError("Character not found");
        }
      } catch (err) {
        console.error("Error loading character:", err);
        setError("An error occurred while loading the character");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCharacter();
  }, [characterId]);
  
  // Track unsaved changes
  useEffect(() => {
    if (character && originalCharacter) {
      const hasChanges = JSON.stringify(character) !== JSON.stringify(originalCharacter);
      setHasUnsavedChanges(hasChanges);
    }
  }, [character, originalCharacter]);
  
  // Wrapper function for setCharacter to handle the portrait section's requirements
  const handleSetCharacter = (newCharacter: Character | ((prev: Character) => Character)) => {
    if (typeof newCharacter === 'function') {
      setCharacter((prevCharacter) => {
        if (prevCharacter === null) {
          console.error('Cannot update null character');
          return prevCharacter;
        }
        return newCharacter(prevCharacter);
      });
    } else {
      setCharacter(newCharacter);
    }
  };

  // Navigate back to library immediately
  const navigateToLibrary = () => {
    router.push('/library');
  };
  
  // Handle character deletion
  const handleDeleteCharacter = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!characterId) return;
    
    setIsDeleting(true);
    
    try {
      const success = await deleteCharacter(characterId);
      
      if (success) {
        setFeedbackMessage({
          type: 'success',
          text: 'Character deleted successfully'
        });
        
        // Navigate immediately
        navigateToLibrary();
      } else {
        setError('Failed to delete character');
      }
    } catch (err) {
      setError('An error occurred while deleting');
      console.error('Error deleting character:', err);
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    setIsSaving(true);
    
    try {
      // Update the character's portrait options with the selected image model
      const updatedCharacter = {
        ...character,
        portrait_options: {
          ...(character.portrait_options || {}),
          image_model: selectedImageModel
        }
      };
      
      // Create form data with the selected text model
      const formData = {
        model: selectedTextModel,
        description: `${character.name} - ${character.appearance?.substring(0, 50)}...`,
        include_quests: true,
        include_dialogue: true,
        include_items: true,
        include_portrait: !!(character.image_data || character.image_url),
      };
      
      console.log("Saving character updates...");
      const success = await updateCharacter(characterId, updatedCharacter, formData);
      
      if (success) {
        console.log("Character saved successfully");
        
        // Reset unsaved changes flag
        setHasUnsavedChanges(false);
        setOriginalCharacter(JSON.parse(JSON.stringify(updatedCharacter)));
        
        setFeedbackMessage({
          type: 'success',
          text: 'Changes saved successfully!'
        });
        
        // Navigate immediately
        navigateToLibrary();
      } else {
        setError('Failed to update character');
      }
    } catch (err) {
      setError('An error occurred while saving');
      console.error('Error saving character:', err);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle text input changes for simple string fields
  const handleInputChange = (field: string, value: string) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [field]: value
    });
  };

  // Handle portrait regeneration
  const handleRegeneratePortrait = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) {
      console.error("Missing character data for portrait regeneration");
      setFeedbackMessage({
        type: 'error',
        text: 'Cannot regenerate portrait: Missing character data'
      });
      return;
    }
    
    console.log(`Regenerating portrait for character: ${character.name}`);
    setIsRegeneratingPortrait(true);
    setPortraitError(null);
    setPortraitGenerationFailed(false);
    setPortraitShouldRetry(false);
    setPortraitErrorType(null);
    
    try {
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: character,
          field: 'portrait',
          portraitOptions: {
            ...character.portrait_options,
            image_model: selectedImageModel
          }
        }),
      });

      console.log(`Portrait API response status: ${response.status}`);

      if (!response.ok) {
        let errorMessage = 'Failed to regenerate portrait';
        let errorType: typeof portraitErrorType = 'unknown';
        let shouldRetry = false;
        
        try {
          const errorData = await response.json();
          console.error("Portrait API error response:", errorData);
          errorMessage = errorData.error || errorMessage;
          errorType = errorData.type || 'unknown';
          shouldRetry = errorData.shouldRetry || false;
          
          // Handle specific error types
          if (errorData.type === 'rate_limit') {
            errorMessage = 'Rate limit exceeded. Please try again in a few minutes.';
          } else if (errorData.type === 'quota_exceeded') {
            errorMessage = 'Monthly quota exceeded for this model tier.';
          } else if (errorData.type === 'invalid_request') {
            errorMessage = 'Invalid request parameters.';
          } else if (errorData.type === 'timeout') {
            errorMessage = 'Portrait generation timed out. Please try again.';
          } else if (errorData.type === 'network') {
            errorMessage = 'Network error. Please check your connection and try again.';
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
        }
        
        setPortraitError(errorMessage);
        setPortraitGenerationFailed(true);
        setPortraitShouldRetry(shouldRetry);
        setPortraitErrorType(errorType);
        
        setFeedbackMessage({
          type: 'error',
          text: errorMessage
        });
        
        return;
      }

      const result = await response.json();
      console.log("Portrait regeneration result:", result);

      if (result.character && result.character.image_data) {
        console.log("Portrait regenerated successfully");
        
        // Clear any previous error state
        setPortraitError(null);
        setPortraitGenerationFailed(false);
        setPortraitShouldRetry(false);
        setPortraitErrorType(null);
        
        // Update character with new portrait
        setCharacter({
          ...character,
          image_data: result.character.image_data,
          image_url: result.character.image_url || character.image_url,
        });
        
        setFeedbackMessage({
          type: 'success',
          text: 'Portrait regenerated successfully!'
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("Error regenerating portrait:", err);
      
      setPortraitError('An unexpected error occurred while regenerating the portrait.');
      setPortraitGenerationFailed(true);
      setPortraitShouldRetry(true);
      setPortraitErrorType('unknown');
      
      setFeedbackMessage({
        type: 'error',
        text: 'Failed to regenerate portrait. Please try again.'
      });
    } finally {
      setIsRegeneratingPortrait(false);
    }
  };

  // Handle image upload/change
  const handleImageChange = (imageData: string | null) => {
    if (!character) return;
    
    console.log("Handling image change:", !!imageData);
    
    // Clear any previous error state when uploading new image
    setPortraitError(null);
    setPortraitGenerationFailed(false);
    setPortraitShouldRetry(false);
    setPortraitErrorType(null);
    
    if (imageData) {
      setCharacter({
        ...character,
        image_data: imageData,
        // Clear image_url when setting custom image_data
        image_url: undefined,
      });
    } else {
      // Remove image_data if imageData is null
      const { image_data, ...rest } = character;
      setCharacter(rest as Character);
    }
  };

  // UPDATED: Enhanced field regeneration handler that supports individual trait regeneration
  const handleRegenerate = async (field: string, subField?: string, index?: number) => {
    if (!character) return;
    
    setIsRegeneratingField(field);
    
    try {
      let fieldToRegenerate = field;
      
      // Handle specific field formats for traits
      if (field === 'add_single_trait') {
        fieldToRegenerate = 'add_single_trait';
      } else if (field.startsWith('regenerate_trait_')) {
        fieldToRegenerate = field; // Keep the full field name with trait key
      } else if (subField && typeof index === 'number') {
        fieldToRegenerate = `${field}_${index}_${subField}`;
      } else if (typeof index === 'number') {
        fieldToRegenerate = `${field}_${index}`;
      }
      
      console.log(`Regenerating field: ${fieldToRegenerate}`);
      
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character,
          field: fieldToRegenerate,
          model: selectedTextModel,
          portraitOptions: field === 'portrait' ? {
            image_model: selectedImageModel,
            ...character.portrait_options
          } : undefined
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to regenerate ${field}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setCharacter(data.character);
        setHasUnsavedChanges(true);
        
        // Set appropriate success message
        let successMessage = '';
        if (field === 'add_single_trait') {
          successMessage = 'New trait added successfully!';
        } else if (field.startsWith('regenerate_trait_')) {
          const traitName = field.replace('regenerate_trait_', '').replace(/_/g, ' ');
          successMessage = `Trait "${traitName}" regenerated successfully!`;
        } else {
          successMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} regenerated successfully!`;
        }
        
        setFeedbackMessage({
          type: 'success',
          text: successMessage
        });
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setFeedbackMessage(null);
        }, 3000);
      } else {
        console.error('Regeneration failed:', data.error);
        setFeedbackMessage({
          type: 'error',
          text: data.error || `Failed to regenerate ${field}`
        });
      }
    } catch (error) {
      console.error('Error during regeneration:', error);
      setFeedbackMessage({
        type: 'error',
        text: error instanceof Error ? error.message : `Failed to regenerate ${field}. Please try again.`
      });
    } finally {
      setIsRegeneratingField(null);
    }
  };

  // Legacy handler for backwards compatibility with existing components
  const handleRegenerateField = async (field: string, e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Use the new handler
    await handleRegenerate(field);
  };

  // Handle array input changes
  const handleArrayInputChange = <T extends unknown>(field: keyof Character, value: T[]) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [field]: value
    });
  };
  
  // Handle nested field changes
  const handleNestedChange = (section: 'selected_traits' | 'added_traits', field: string, value: string | string[]) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [section]: {
        ...character[section],
        [field]: value
      }
    });
  };
  
  // Handle genre change to update subgenres
  const handleGenreChange = (section: 'selected_traits' | 'added_traits', field: string, value: string) => {
    handleNestedChange(section, field, value);
    
    // Update subgenres list if the genre changes
    if (field === 'genre') {
      if (value) {
        setCurrentGenre(value);
        const genreSubGenres = getSubGenres(value);
        setSubGenres([
          { value: '', label: 'Not specified' },
          ...genreSubGenres.map((sg: SubGenreOption) => ({ value: sg.id, label: sg.label }))
        ]);
      } else {
        setSubGenres([{ value: '', label: 'Not specified' }]);
        // Clear subgenre as well
        handleNestedChange('selected_traits', 'sub_genre', '');
      }
    }
  };
  
  // Loading state
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8 text-center pt-20">Loading character data...</div>;
  }
  
  // Error state
  if (error && !character) {
    return (
      <div className="container mx-auto px-4 py-8 text-center pt-20">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
        <button
          onClick={() => router.push('/library')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Library
        </button>
      </div>
    );
  }
  
  if (!character) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pb-32 pt-20">
      {/* Header with back button and delete controls */}
      <HeaderSection
        characterName={character.name}
        isDeleting={isDeleting}
        onDelete={handleDeleteCharacter}
      />
      
      {/* Unsaved changes warning */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md text-yellow-800 dark:text-yellow-200 mb-6">
          <div className="flex items-center">
            <div className="mr-3">⚠️</div>
            <div>
              <strong>You have unsaved changes.</strong> Remember to click "Save Changes" to keep your modifications.
            </div>
          </div>
        </div>
      )}
      
      {/* Feedback message */}
      <FeedbackMessage message={feedbackMessage} />
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      {/* Form sections */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Model Selectors Section */}
        <ModelSelectorsSection
          textModel={selectedTextModel}
          imageModel={selectedImageModel}
          onTextModelChange={setSelectedTextModel}
          onImageModelChange={setSelectedImageModel}
        />
        
        {/* Basic Info Section */}
        <BasicInfoSection
          character={character}
          onInputChange={handleInputChange}
          onRegenerateField={handleRegenerateField}
          onGenreChange={handleGenreChange}
          currentGenre={currentGenre}
          subGenres={subGenres}
          fieldLoadingStates={fieldLoadingStates}
        />
        
        {/* Portrait Section */}
        <PortraitSection
          character={character}
          characterId={characterId}
          isRegeneratingPortrait={isRegeneratingPortrait}
          onRegeneratePortrait={handleRegeneratePortrait}
          onImageChange={handleImageChange}
          hasUnsavedChanges={hasUnsavedChanges}
          portraitError={portraitError}
          portraitGenerationFailed={portraitGenerationFailed}
          portraitShouldRetry={portraitShouldRetry}
          portraitErrorType={portraitErrorType}
          selectedImageModel={selectedImageModel}
          setCharacter={handleSetCharacter}
        />
        
        {/* Character Traits Section */}
        <CharacterTraitsSection
          character={character}
          onNestedChange={handleNestedChange}
        />
        
        {/* Additional Traits Section - NOW WITH INDIVIDUAL REGENERATION SUPPORT */}
        <AdditionalTraitsSection
          character={character}
          setCharacter={setCharacter}
          onRegenerate={handleRegenerate}
          isRegenerating={!!isRegeneratingField}
        />
        
        {/* Quests Section */}
        <QuestsSection
          character={character}
          onArrayInputChange={handleArrayInputChange}
          onRegenerateField={handleRegenerateField}
          fieldLoadingStates={fieldLoadingStates}
        />
        
        {/* Dialogue Section */}
        <DialogueSection
          character={character}
          onArrayInputChange={handleArrayInputChange}
          onRegenerateField={handleRegenerateField}
          fieldLoadingStates={fieldLoadingStates}
        />
        
        {/* Items Section */}
        <ItemsSection
          character={character}
          onArrayInputChange={handleArrayInputChange}
          onRegenerateField={handleRegenerateField}
          fieldLoadingStates={fieldLoadingStates}
        />
        
      </form>
      
      {/* Footer with save/cancel buttons */}
      <EditPageFooter
        isSaving={isSaving}
        onSave={handleSubmit}
      />
    </div>
  );
}