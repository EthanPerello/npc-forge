// src/app/library/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCharacterById, updateCharacter, deleteCharacter, loadCharacterWithImage, saveImage } from '@/lib/character-storage';
import { Character, Quest, OpenAIModel, ImageModel } from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';
import { getSubGenres } from '@/lib/templates';

// Import components from the edit-page directory
import { FeedbackMessage } from '@/components/edit-page/shared';
import { HeaderSection } from '@/components/edit-page/header-section';
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
  const characterId = params.id as string;
  
  // Character state
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Track unsaved changes for portraits
  const [hasUnsavedPortraitChanges, setHasUnsavedPortraitChanges] = useState(false);
  
  // UI state
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [subGenres, setSubGenres] = useState<{value: string, label: string}[]>([]);
  
  // Regeneration state
  const [isRegeneratingPortrait, setIsRegeneratingPortrait] = useState(false);
  const [fieldLoadingStates, setFieldLoadingStates] = useState<Record<string, boolean>>({});
  const [feedbackMessage, setFeedbackMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
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
            
            // Set current genre for subgenres
            if (fullCharacter.selected_traits.genre) {
              setCurrentGenre(fullCharacter.selected_traits.genre);
              // Load sub-genres for the current genre
              const genreSubGenres = getSubGenres(fullCharacter.selected_traits.genre);
              setSubGenres([
                { value: '', label: 'Not specified' },
                ...genreSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
              ]);
            }
            
            // Set the model settings if they exist in the character data
            if (fullCharacter.portrait_options?.image_model) {
              setSelectedImageModel(fullCharacter.portrait_options.image_model);
            }
          } else {
            // Fallback to the stored character without image if needed
            console.log("Using stored character without image data");
            setCharacter(storedCharacter.character);
            
            // Set current genre for subgenres
            if (storedCharacter.character.selected_traits.genre) {
              setCurrentGenre(storedCharacter.character.selected_traits.genre);
              const genreSubGenres = getSubGenres(storedCharacter.character.selected_traits.genre);
              setSubGenres([
                { value: '', label: 'Not specified' },
                ...genreSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
              ]);
            }
            
            // Set the model settings if they exist in the character data
            if (storedCharacter.character.portrait_options?.image_model) {
              setSelectedImageModel(storedCharacter.character.portrait_options.image_model);
            }
            
            // If the character has form data with a model, use that
            if (storedCharacter.formData?.model) {
              setSelectedTextModel(storedCharacter.formData.model);
            }
          }
        } else {
          console.error(`Character not found with ID: ${characterId}`);
          setError('Character not found');
        }
      } catch (err) {
        console.error('Error loading character:', err);
        setError('Failed to load character');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCharacter();
  }, [characterId]);
  
  // Navigate back to library after a short delay
  const navigateToLibrary = () => {
    // Use a timeout to allow any state updates to complete first
    setTimeout(() => {
      router.push('/library');
    }, 50);
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
        
        // Clear message after 1.5 seconds and navigate
        setTimeout(() => {
          navigateToLibrary();
        }, 1500);
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
        setHasUnsavedPortraitChanges(false);
        
        setFeedbackMessage({
          type: 'success',
          text: 'Changes saved successfully!'
        });
        
        // Clear message after 1.5 seconds and navigate
        setTimeout(() => {
          setFeedbackMessage(null);
          navigateToLibrary();
        }, 1500);
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

  // Handle portrait regeneration - FIXED: No longer auto-saves to IndexedDB
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
        
        try {
          const errorData = await response.json();
          console.error("Portrait API error response:", errorData);
          errorMessage = errorData.error || errorMessage;
          
          // Handle specific error types
          if (errorData.type === 'rate_limit') {
            errorMessage = 'Rate limit exceeded. Please try again in a few minutes.';
          } else if (errorData.type === 'quota_exceeded') {
            errorMessage = 'Monthly quota exceeded for this model tier.';
          } else if (errorData.type === 'invalid_request') {
            errorMessage = 'Invalid request parameters. Please try different settings.';
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          errorMessage = `Server error (${response.status}). Please try again.`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`Portrait regeneration success: ${data.success}`);
      
      if (data.success && data.imageData) {
        console.log("Received new portrait data, length:", data.imageData.length);
        
        // FIXED: Only update component state, don't save to IndexedDB yet
        // The image will be saved when the user clicks "Save Changes"
        setCharacter((prevChar) => {
          if (!prevChar) return null;
          
          return {
            ...prevChar,
            image_data: data.imageData
          };
        });
        
        // Mark that there are unsaved portrait changes
        setHasUnsavedPortraitChanges(true);
        
        // Show success message with note about saving
        setFeedbackMessage({
          type: 'success',
          text: 'Portrait regenerated successfully! Click "Save Changes" to keep it.'
        });
        
        // Clear success message after a longer delay
        setTimeout(() => {
          setFeedbackMessage(null);
        }, 5000);
      } else {
        console.error("API returned invalid portrait data", data);
        throw new Error(data.error || 'Portrait regeneration failed - invalid response');
      }
    } catch (err) {
      console.error('Error regenerating portrait:', err);
      
      // Determine error type and provide appropriate message
      let errorMessage = 'Failed to regenerate portrait';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      // Show error message with more context
      setFeedbackMessage({
        type: 'error',
        text: `${errorMessage}. You can try again or upload a custom image instead.`
      });
      
      // Clear error message after a longer delay
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 7000);
    } finally {
      setIsRegeneratingPortrait(false);
    }
  };

  // Using consistent MouseEvent<HTMLButtonElement> for regenerateField handlers
  const handleRegenerateField = async (field: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) {
      console.error("Missing character data");
      setFeedbackMessage({
        type: 'error',
        text: 'Cannot regenerate: Missing character data'
      });
      return;
    }
    
    console.log(`Regenerating ${field} for character: ${character.name}`);
    
    // Set loading state for this specific field
    setFieldLoadingStates(prev => ({ ...prev, [field]: true }));
    
    try {
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: character,
          field,
          model: selectedTextModel,
        }),
      });

      if (!response.ok) {
        let errorMessage = `Failed to regenerate ${formatFieldName(field)}`;
        
        try {
          const errorData = await response.json();
          console.error("API error response:", errorData);
          errorMessage = errorData.error || errorMessage;
          
          // Handle specific error types
          if (errorData.type === 'rate_limit') {
            errorMessage = 'Rate limit exceeded. Please try again in a few minutes.';
          } else if (errorData.type === 'quota_exceeded') {
            errorMessage = 'Monthly quota exceeded for this model tier.';
          }
        } catch (parseError) {
          console.error("Failed to parse error response:", parseError);
          errorMessage = `Server error (${response.status}). Please try again.`;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(`Regeneration response:`, data);
      
      if (data.success) {
        // Handle different field types
        if (field === 'name' || field === 'appearance' || field === 'personality' || field === 'backstory_hook') {
          // Basic fields
          setCharacter({
            ...character,
            [field]: data.regeneratedContent
          });
        } else if (field.startsWith('quest_') && field.includes('_')) {
          // Quest parts
          const parts = field.split('_');
          const questIndex = parseInt(parts[1], 10);
          const questPart = parts[2] || 'whole';
          
          if (!isNaN(questIndex) && character.quests && questIndex < character.quests.length) {
            const updatedQuests = [...character.quests];
            
            if (questPart === 'whole') {
              // Replace the entire quest
              updatedQuests[questIndex] = data.regeneratedContent;
            } else if (questPart === 'title' || questPart === 'description' || questPart === 'reward') {
              // Update just one part of the quest
              updatedQuests[questIndex] = {
                ...updatedQuests[questIndex],
                [questPart]: data.regeneratedContent
              };
            }
            
            setCharacter({
              ...character,
              quests: updatedQuests
            });
          }
        } else if (field.startsWith('dialogue_')) {
          // Dialogue lines
          const parts = field.split('_');
          const index = parseInt(parts[1], 10);
          
          if (!isNaN(index) && character.dialogue_lines && index < character.dialogue_lines.length) {
            const updatedDialogue = [...character.dialogue_lines];
            updatedDialogue[index] = data.regeneratedContent;
            
            setCharacter({
              ...character,
              dialogue_lines: updatedDialogue
            });
          }
        } else if (field.startsWith('item_')) {
          // Items
          const parts = field.split('_');
          const index = parseInt(parts[1], 10);
          
          if (!isNaN(index) && character.items && index < character.items.length) {
            const updatedItems = [...character.items];
            updatedItems[index] = data.regeneratedContent;
            
            setCharacter({
              ...character,
              items: updatedItems
            });
          }
        }
        
        // Show success message
        setFeedbackMessage({
          type: 'success',
          text: `Successfully regenerated ${formatFieldName(field)}`
        });
        
        // Clear success message after a delay
        setTimeout(() => {
          setFeedbackMessage(null);
        }, 3000);
      } else {
        console.error("API returned success: false", data);
        throw new Error(data.error || 'Regeneration failed');
      }
    } catch (err) {
      console.error(`Error regenerating ${field}:`, err);
      
      // Show error message
      setFeedbackMessage({
        type: 'error',
        text: err instanceof Error ? err.message : `Failed to regenerate ${formatFieldName(field)}`
      });
      
      // Clear error message after a delay
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 5000);
    } finally {
      // Clear loading state
      setFieldLoadingStates(prev => ({ ...prev, [field]: false }));
    }
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
          ...genreSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
        ]);
      } else {
        setSubGenres([{ value: '', label: 'Not specified' }]);
        // Clear subgenre as well
        handleNestedChange('selected_traits', 'sub_genre', '');
      }
    }
  };
  
  // Handle image change from upload component
  const handleImageChange = (imageData: string | null) => {
    if (!character) return;
    
    if (imageData) {
      setCharacter({
        ...character,
        image_data: imageData
      });
      
      // Mark that there are unsaved portrait changes
      setHasUnsavedPortraitChanges(true);
    } else {
      // If image is removed, make a copy of character without image_data
      const { image_data, ...rest } = character;
      setCharacter(rest as Character);
      setHasUnsavedPortraitChanges(true);
    }
  };
  
  // Helper function to format field names for messages
  const formatFieldName = (field: string): string => {
    if (field === 'name' || field === 'appearance' || field === 'personality' || field === 'backstory_hook') {
      return field.replace('_', ' ');
    }
    
    if (field.startsWith('quest_') && field.includes('_')) {
      const parts = field.split('_');
      const questIndex = parseInt(parts[1], 10);
      const questPart = parts[2] || 'whole';
      
      if (questPart === 'whole') {
        return `quest #${questIndex + 1}`;
      } else {
        return `quest #${questIndex + 1} ${questPart}`;
      }
    }
    
    if (field.startsWith('dialogue_')) {
      const parts = field.split('_');
      const index = parseInt(parts[1], 10);
      return `dialogue line #${index + 1}`;
    }
    
    if (field.startsWith('item_')) {
      const parts = field.split('_');
      const index = parseInt(parts[1], 10);
      return `item #${index + 1}`;
    }
    
    return field;
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
      {hasUnsavedPortraitChanges && (
        <div className="bg-yellow-50 p-4 rounded-md text-yellow-700 mb-6 dark:bg-yellow-900/20 dark:text-yellow-400">
          ⚠️ You have unsaved portrait changes. Remember to click "Save Changes" to keep your modifications.
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      
      {/* Feedback message */}
      <FeedbackMessage message={feedbackMessage} />
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <BasicInfoSection
          character={character}
          onInputChange={handleInputChange}
          onRegenerateField={handleRegenerateField}
          onGenreChange={handleGenreChange}
          currentGenre={currentGenre}
          subGenres={subGenres}
          fieldLoadingStates={fieldLoadingStates}
          selectedTextModel={selectedTextModel}
          onModelChange={setSelectedTextModel}
        />
        
        {/* Portrait Section */}
        <PortraitSection
          character={character}
          characterId={characterId}
          isRegeneratingPortrait={isRegeneratingPortrait}
          selectedImageModel={selectedImageModel}
          onImageModelChange={setSelectedImageModel}
          onRegeneratePortrait={handleRegeneratePortrait}
          onImageChange={handleImageChange}
        />
        
        {/* Character Traits */}
        <CharacterTraitsSection
          character={character}
          onNestedChange={handleNestedChange}
        />
        
        {/* Added Traits */}
        <AdditionalTraitsSection
          character={character}
          setCharacter={setCharacter}
        />
        
        {/* Items */}
        <ItemsSection
          character={character}
          onArrayInputChange={handleArrayInputChange}
          onRegenerateField={handleRegenerateField}
          fieldLoadingStates={fieldLoadingStates}
        />
        
        {/* Dialogue Lines */}
        <DialogueSection
          character={character}
          onArrayInputChange={handleArrayInputChange}
          onRegenerateField={handleRegenerateField}
          fieldLoadingStates={fieldLoadingStates}
        />
        
        {/* Quests */}
        <QuestsSection
          character={character}
          onArrayInputChange={handleArrayInputChange}
          onRegenerateField={handleRegenerateField}
          fieldLoadingStates={fieldLoadingStates}
        />
      </form>
      
      {/* Sticky Footer */}
      <EditPageFooter
        isSaving={isSaving}
        onSave={handleSubmit}
      />
    </div>
  );
}