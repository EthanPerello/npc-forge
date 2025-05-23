'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCharacterById, updateCharacter, deleteCharacter, loadCharacterWithImage, saveImage } from '@/lib/character-storage';
import { Character, Quest, OpenAIModel, ImageModel } from '@/lib/types';
import Button from '@/components/ui/button';
import Select from '@/components/ui/select';
import ImageUpload from '@/components/image-upload';
import PortraitDisplay from '@/components/portrait-display';
import { Save, ArrowLeft, Sparkles, PlusCircle, Trash2, RefreshCw } from 'lucide-react';
import ModelSelector from '@/components/model-selector';
import ImageModelSelector from '@/components/image-model-selector';
import { DEFAULT_MODEL } from '@/lib/models';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';

// Import components from the edit-page directory
import { FeedbackMessage, RegenerateButton, FormSection } from '@/components/edit-page/shared';

// Import the same options used in the CharacterTab
import { GENRE_TEMPLATES, getSubGenres } from '@/lib/templates';

// Gender options
const genderOptions = [
  { value: '', label: 'Not specified' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'unknown', label: 'Unknown/Other' },
];

// Age group options
const ageGroupOptions = [
  { value: '', label: 'Not specified' },
  { value: 'child', label: 'Child' },
  { value: 'teen', label: 'Teen/Young Adult' },
  { value: 'adult', label: 'Adult' },
  { value: 'elder', label: 'Elder' },
];

// Moral alignment options
const alignmentOptions = [
  { value: '', label: 'Not specified' },
  { value: 'good', label: 'Good' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'evil', label: 'Evil' },
];

// Relationship options
const relationshipOptions = [
  { value: '', label: 'Not specified' },
  { value: 'ally', label: 'Ally/Friend' },
  { value: 'enemy', label: 'Enemy/Antagonist' },
  { value: 'neutral', label: 'Neutral/Stranger' },
  { value: 'mentor', label: 'Mentor/Guide' },
  { value: 'rival', label: 'Rival/Competitor' },
  { value: 'betrayer', label: 'Betrayer/Double Agent' },
];

// Common species
const speciesOptions = [
  { value: '', label: 'Not specified' },
  { value: 'human', label: 'Human' },
  { value: 'elf', label: 'Elf' },
  { value: 'dwarf', label: 'Dwarf' },
  { value: 'halfling', label: 'Halfling' },
  { value: 'orc', label: 'Orc' },
  { value: 'goblin', label: 'Goblin' },
  { value: 'android', label: 'Android' },
  { value: 'alien', label: 'Alien' },
  { value: 'mutant', label: 'Mutant' },
  { value: 'cyborg', label: 'Cyborg' },
  { value: 'ai', label: 'Artificial Intelligence' },
];

// Occupations
const occupationOptions = [
  { value: '', label: 'Not specified' },
  { value: 'wizard', label: 'Wizard/Mage' },
  { value: 'warrior', label: 'Warrior' },
  { value: 'knight', label: 'Knight' },
  { value: 'ranger', label: 'Ranger/Hunter' },
  { value: 'bard', label: 'Bard' },
  { value: 'merchant', label: 'Merchant' },
  { value: 'thief', label: 'Thief/Rogue' },
  { value: 'pilot', label: 'Pilot' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'scientist', label: 'Scientist' },
  { value: 'soldier', label: 'Soldier' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'artist', label: 'Artist' },
  { value: 'detective', label: 'Detective' },
];

// Personality traits
const personalityTraitOptions = [
  { value: 'brave', label: 'Brave' },
  { value: 'cautious', label: 'Cautious' },
  { value: 'cheerful', label: 'Cheerful' },
  { value: 'rude', label: 'Rude' },
  { value: 'loyal', label: 'Loyal' },
  { value: 'dishonest', label: 'Dishonest' },
  { value: 'kind', label: 'Kind' },
  { value: 'cruel', label: 'Cruel' },
  { value: 'proud', label: 'Proud' },
  { value: 'humble', label: 'Humble' },
  { value: 'optimistic', label: 'Optimistic' },
  { value: 'pessimistic', label: 'Pessimistic' },
  { value: 'shy', label: 'Shy' },
  { value: 'outgoing', label: 'Outgoing' },
  { value: 'intelligent', label: 'Intelligent' },
  { value: 'foolish', label: 'Foolish' },
];

// Social class options
const socialClassOptions = [
  { value: '', label: 'Not specified' },
  { value: 'lower_class', label: 'Lower Class/Poor' },
  { value: 'working_class', label: 'Working Class' },
  { value: 'middle_class', label: 'Middle Class' },
  { value: 'upper_class', label: 'Upper Class/Wealthy' },
  { value: 'nobility', label: 'Nobility/Aristocracy' },
  { value: 'royalty', label: 'Royalty' },
  { value: 'outcast', label: 'Outcast/Exile' },
];

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
  
  // UI state
  const [currentGenre, setCurrentGenre] = useState<string>('');
  const [subGenres, setSubGenres] = useState<{value: string, label: string}[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  
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
    
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const success = await deleteCharacter(characterId);
      
      if (success) {
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
  
  // Cancel delete confirmation
  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteConfirm(false);
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
      
      // Create form data with the selected text model - FIX: Include include_portrait
      const formData = {
        model: selectedTextModel,
        description: `${character.name} - ${character.appearance?.substring(0, 50)}...`,
        include_quests: true,
        include_dialogue: true,
        include_items: true,
        include_portrait: !!(character.image_data || character.image_url), // FIX: Add this required field
      };
      
      console.log("Saving character updates...");
      const success = await updateCharacter(characterId, updatedCharacter, formData);
      
      if (success) {
        console.log("Character saved successfully");
        setFeedbackMessage({
          type: 'success',
          text: 'Changes saved successfully!'
        });
        
        // Clear message after 3 seconds and navigate
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
  
  // Generic function to prevent form submission from buttons
  const handleButtonClick = (callback: (e: React.MouseEvent) => void) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    };
  };
  
  // Handle text input changes for simple string fields
  const handleInputChange = (field: string, value: string) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      [field]: value
    });
  };

 // Handle portrait regeneration with better error handling and logging
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
          character: character, // Send the full character object instead of just the ID
          field: 'portrait',
          portraitOptions: {
            ...character.portrait_options,
            image_model: selectedImageModel
          }
        }),
      });

      console.log(`Portrait API response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Portrait API error response:", errorData);
        throw new Error(errorData.error || `Failed to regenerate portrait (${response.status})`);
      }

      const data = await response.json();
      console.log(`Portrait regeneration success: ${data.success}`);
      
      if (data.success && data.imageData) {
        console.log("Received new portrait data, length:", data.imageData.length);
        
        // Store the image data in IndexedDB immediately
        try {
          // Import needed functions directly
          const { saveImage } = await import('@/lib/character-storage');
          
          // Save image to IndexedDB right away
          await saveImage(characterId, data.imageData);
          console.log("Portrait saved to IndexedDB successfully");
        } catch (dbError) {
          console.error("Failed to save portrait to IndexedDB:", dbError);
          // Continue even if IndexedDB save fails - we'll still update the state
        }
        
        // Update the state with the new image data in an immutable way
        setCharacter((prevChar) => {
          if (!prevChar) return null;
          
          // Create a new character object with the same properties
          const updatedChar: Character = {
            ...prevChar,
            // Add the image data
            image_data: data.imageData
          };
          
          // Force a state refresh with setTimeout
          setTimeout(() => {
            console.log("Forcing portrait display refresh");
            const portraitElement = document.querySelector('.portrait-container img');
            if (portraitElement) {
              // Force the image to reload
              (portraitElement as HTMLImageElement).src = data.imageData;
              // Also update the key to force a React re-render
              if (portraitElement.hasAttribute('key')) {
                const newKey = `portrait-${Date.now()}`;
                portraitElement.setAttribute('key', newKey);
              }
            }
          }, 100);
          
          return updatedChar;
        });
        
        // Show success message
        setFeedbackMessage({
          type: 'success',
          text: 'Successfully regenerated portrait'
        });
        
        // Clear success message after a delay
        setTimeout(() => {
          setFeedbackMessage(null);
        }, 3000);
      } else {
        console.error("API returned invalid portrait data", data);
        throw new Error(data.error || 'Portrait regeneration failed');
      }
    } catch (err) {
      console.error('Error regenerating portrait:', err);
      
      // Show error message
      setFeedbackMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to regenerate portrait'
      });
      
      // Clear error message after a delay
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 5000);
    } finally {
      setIsRegeneratingPortrait(false);
    }
  };

  const handleRegenerateField = async (field: string, e: React.MouseEvent) => {
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
          character: character, // Send the full character object instead of just the ID
          field,
          model: selectedTextModel,
        }),
      });

      // Log response status for debugging
      console.log(`API response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API error response:", errorData);
        throw new Error(errorData.error || `Failed to regenerate field (${response.status})`);
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
        text: err instanceof Error ? err.message : 'Failed to regenerate content'
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
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = e.target.value;
    handleNestedChange('selected_traits', 'genre', newGenre);
    
    // Update subgenres list
    if (newGenre) {
      setCurrentGenre(newGenre);
      const genreSubGenres = getSubGenres(newGenre);
      setSubGenres([
        { value: '', label: 'Not specified' },
        ...genreSubGenres.map(sg => ({ value: sg.id, label: sg.label }))
      ]);
    } else {
      setSubGenres([{ value: '', label: 'Not specified' }]);
      // Clear subgenre as well
      handleNestedChange('selected_traits', 'sub_genre', '');
    }
  };
  
  // Handle personality traits selection - removed limit
  const handlePersonalityTraitsChange = (traits: string[]) => {
    if (!character) return;
    
    setCharacter({
      ...character,
      selected_traits: {
        ...character.selected_traits,
        personality_traits: traits
      }
    });
  };
  
  // Handle portrait upload toggle
  const handleToggleImageUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowImageUpload(!showImageUpload);
  };
  
  // Handle image change from upload component
  const handleImageChange = (imageData: string | null) => {
    if (!character) return;
    
    if (imageData) {
      setCharacter({
        ...character,
        image_data: imageData
      });
      
      // Also save to IndexedDB
      try {
        saveImage(characterId, imageData);
      } catch (err) {
        console.error("Failed to save uploaded image to IndexedDB:", err);
      }
    } else {
      // If image is removed, make a copy of character without image_data
      const { image_data, ...rest } = character;
      setCharacter(rest as Character);
    }
    
    // Close image upload after change
    setShowImageUpload(false);
  };

  // Add a new quest
  const handleAddQuest = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const newQuest: Quest = {
      title: "New Quest",
      description: "Quest description goes here...",
      reward: "Quest reward goes here...",
      type: "any"
    };
    
    const updatedQuests = character.quests ? [...character.quests, newQuest] : [newQuest];
    handleArrayInputChange('quests', updatedQuests);
  };
  
  // Remove a quest
  const handleRemoveQuest = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character || !character.quests) return;
    
    const updatedQuests = [...character.quests];
    updatedQuests.splice(index, 1);
    handleArrayInputChange('quests', updatedQuests);
  };
  
  // Add a new item
  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const newItem = "New item description";
    const updatedItems = character.items ? [...character.items, newItem] : [newItem];
    handleArrayInputChange('items', updatedItems);
  };
  
  // Remove an item
  const handleRemoveItem = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character || !character.items) return;
    
    const updatedItems = [...character.items];
    updatedItems.splice(index, 1);
    handleArrayInputChange('items', updatedItems);
  };
  
  // Add new dialogue
  const handleAddDialogue = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const newDialogue = "New dialogue line...";
    const updatedDialogue = character.dialogue_lines ? [...character.dialogue_lines, newDialogue] : [newDialogue];
    handleArrayInputChange('dialogue_lines', updatedDialogue);
  };
  
  // Remove dialogue
  const handleRemoveDialogue = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character || !character.dialogue_lines) return;
    
    const updatedDialogue = [...character.dialogue_lines];
    updatedDialogue.splice(index, 1);
    handleArrayInputChange('dialogue_lines', updatedDialogue);
  };
  
  // Toggle personality trait
  const handleTogglePersonalityTrait = (trait: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!character) return;
    
    const currentTraits = character.selected_traits.personality_traits || [];
    
    if (currentTraits.includes(trait)) {
      // Remove trait
      handlePersonalityTraitsChange(currentTraits.filter(t => t !== trait));
    } else {
      // Add trait - no limit anymore
      handlePersonalityTraitsChange([...currentTraits, trait]);
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
    return <div className="container mx-auto px-4 py-8 text-center">Loading character data...</div>;
  }
  
  // Error state
  if (error && !character) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
        <Button
          variant="secondary"
          onClick={handleButtonClick(() => router.push('/library'))}
          type="button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </Button>
      </div>
    );
  }
  
  if (!character) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      {/* Header with back button and delete controls */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="secondary"
            onClick={handleButtonClick(() => router.push('/library'))}
            className="mr-4"
            type="button"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Edit Character: {character.name}</h1>
        </div>
        
        {/* Delete Character Button */}
        {showDeleteConfirm ? (
          <div className="flex items-center">
            <span className="mr-2 text-sm text-red-600 dark:text-red-400">Confirm delete?</span>
            <Button
              variant="secondary"
              onClick={handleCancelDelete}
              className="mr-2"
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteCharacter}
              isLoading={isDeleting}
              type="button"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        ) : (
          <Button
            variant="danger"
            onClick={handleDeleteCharacter}
            type="button"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete Character
          </Button>
        )}
      </div>
      
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
        <FormSection title="Basic Information">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <div className="flex">
              <input
                type="text"
                value={character.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <RegenerateButton
                field="name"
                onClick={(e) => handleRegenerateField('name', e)}
                isLoading={fieldLoadingStates['name'] || false}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Select
              label="Genre"
              options={[
                { value: '', label: 'Not specified' },
                ...GENRE_TEMPLATES.map(template => ({
                  value: template.id,
                  label: template.label
                }))
              ]}
              value={character.selected_traits.genre || ''}
              onChange={handleGenreChange}
            />
            
            <Select
              label="Sub-Genre"
              options={subGenres}
              value={character.selected_traits.sub_genre || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'sub_genre', e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Appearance
            </label>
            <div className="flex">
              <textarea
                value={character.appearance}
                onChange={(e) => handleInputChange('appearance', e.target.value)}
                rows={4}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <RegenerateButton
                field="appearance"
                onClick={(e) => handleRegenerateField('appearance', e)}
                isLoading={fieldLoadingStates['appearance'] || false}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Personality
            </label>
            <div className="flex">
              <textarea
                value={character.personality}
                onChange={(e) => handleInputChange('personality', e.target.value)}
                rows={4}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <RegenerateButton
                field="personality"
                onClick={(e) => handleRegenerateField('personality', e)}
                isLoading={fieldLoadingStates['personality'] || false}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Backstory Hook
            </label>
            <div className="flex">
              <textarea
                value={character.backstory_hook}
                onChange={(e) => handleInputChange('backstory_hook', e.target.value)}
                rows={2}
                className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
              />
              <RegenerateButton
                field="backstory_hook"
                onClick={(e) => handleRegenerateField('backstory_hook', e)}
                isLoading={fieldLoadingStates['backstory_hook'] || false}
              />
            </div>
          </div>

          {/* Text Model Selector */}
          <div className="mb-6 mt-6 p-4 bg-secondary rounded-lg border border-theme">
            <h3 className="text-lg font-semibold mb-4">Text Generation Model</h3>
            <p className="text-sm text-muted mb-4">
              Select which model to use for regenerating any text content in this character.
            </p>
            <ModelSelector 
              value={selectedTextModel}
              onChange={setSelectedTextModel}
            />
          </div>
        </FormSection>
        
        {/* Portrait Section */}
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
                    onClick={handleToggleImageUpload}
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
                    onRegenerate={handleRegeneratePortrait}
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
                  onChange={setSelectedImageModel}
                />
              </div>
            </div>
          </div>
        </FormSection>
        
        {/* Character Traits */}
        <FormSection title="Character Traits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Gender"
              options={genderOptions}
              value={character.selected_traits.gender || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'gender', e.target.value as any)}
            />
            
            <Select
              label="Age Group"
              options={ageGroupOptions}
              value={character.selected_traits.age_group || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'age_group', e.target.value as any)}
            />
            
            <Select
              label="Moral Alignment"
              options={alignmentOptions}
              value={character.selected_traits.moral_alignment || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'moral_alignment', e.target.value as any)}
            />
            
            <Select
              label="Relationship to Player"
              options={relationshipOptions}
              value={character.selected_traits.relationship_to_player || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'relationship_to_player', e.target.value as any)}
            />
            
            <Select
              label="Species"
              options={speciesOptions}
              value={character.selected_traits.species || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'species', e.target.value)}
            />
            
            <Select
              label="Occupation"
              options={occupationOptions}
              value={character.selected_traits.occupation || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'occupation', e.target.value)}
            />
            
            <Select
              label="Social Class"
              options={socialClassOptions}
              value={character.selected_traits.social_class || ''}
              onChange={(e) => handleNestedChange('selected_traits', 'social_class', e.target.value)}
            />
          </div>
          
          {/* Personality Traits - No more limit */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Personality Traits</label>
            <div className="flex flex-wrap gap-2">
              {personalityTraitOptions.map((trait) => (
                <button
                  key={trait.value}
                  type="button"
                  onClick={handleTogglePersonalityTrait(trait.value)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    character.selected_traits.personality_traits?.includes(trait.value)
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700 font-medium shadow-sm'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'
                  }`}
                >
                  {trait.label}
                </button>
              ))}
            </div>
          </div>
        </FormSection>
        
        {/* Added Traits */}
        <FormSection title="Additional Traits">
          <p className="text-sm text-muted mb-4">
            These are additional traits that were generated by AI or that you can add yourself. You can edit, add, or remove traits as needed.
          </p>
          
          <div className="space-y-3">
            {/* List of existing AI-added traits */}
            {Object.entries(character.added_traits).map(([key, value], index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                <div className="w-1/3">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => {
                      // Create a new object without the old key but with the new key
                      const newTraits = { ...character.added_traits };
                      const oldValue = newTraits[key];
                      delete newTraits[key];
                      newTraits[e.target.value] = oldValue;
                      
                      setCharacter({
                        ...character,
                        added_traits: newTraits
                      });
                    }}
                    placeholder="Trait name"
                    className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleNestedChange('added_traits', key, e.target.value)}
                    placeholder="Trait value"
                    className="w-full p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newTraits = { ...character.added_traits };
                    delete newTraits[key];
                    setCharacter({
                      ...character,
                      added_traits: newTraits
                    });
                  }}
                  className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  title="Remove trait"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            
            {/* Add new trait button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Create a unique key for the new trait
                  const newTraitKey = `custom_trait_${Object.keys(character.added_traits).length + 1}`;
                  setCharacter({
                    ...character,
                    added_traits: {
                      ...character.added_traits,
                      [newTraitKey]: "New trait value"
                    }
                  });
                }}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800 flex items-center"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Custom Trait
              </button>
            </div>
          </div>
        </FormSection>
        
        {/* Items */}
        <FormSection title="Items">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="secondary" 
              onClick={handleAddItem}
              leftIcon={<PlusCircle className="h-4 w-4" />}
              type="button"
            >
              Add Item
            </Button>
          </div>
          
          {character.items && character.items.length > 0 ? (
            <div className="space-y-3">
              {character.items.map((item, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...character.items!];
                      newItems[index] = e.target.value;
                      handleArrayInputChange('items', newItems);
                    }}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <RegenerateButton
                    field={`item_${index}`}
                    onClick={(e) => handleRegenerateField(`item_${index}`, e)}
                    isLoading={fieldLoadingStates[`item_${index}`] || false}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveItem(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove Item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
              <p className="text-muted">No items available. Add an item to get started.</p>
            </div>
          )}
        </FormSection>
        
        {/* Dialogue Lines */}
        <FormSection title="Dialogue Lines">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="secondary" 
              onClick={handleAddDialogue}
              leftIcon={<PlusCircle className="h-4 w-4" />}
              type="button"
            >
              Add Dialogue
            </Button>
          </div>
          
          {character.dialogue_lines && character.dialogue_lines.length > 0 ? (
            <div className="space-y-3">
              {character.dialogue_lines.map((line, index) => (
                <div key={index} className="mb-2 flex">
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => {
                      const newLines = [...character.dialogue_lines!];
                      newLines[index] = e.target.value;
                      handleArrayInputChange('dialogue_lines', newLines);
                    }}
                    className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                  />
                  <RegenerateButton
                    field={`dialogue_${index}`}
                    onClick={(e) => handleRegenerateField(`dialogue_${index}`, e)}
                    isLoading={fieldLoadingStates[`dialogue_${index}`] || false}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveDialogue(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                    title="Remove Dialogue"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
              <p className="text-muted">No dialogue available. Add dialogue to get started.</p>
            </div>
          )}
        </FormSection>
        
        {/* Quests */}
        <FormSection title="Quests">
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="secondary" 
              onClick={handleAddQuest}
              leftIcon={<PlusCircle className="h-4 w-4" />}
              type="button"
            >
              Add Quest
            </Button>
          </div>
          
          {character.quests && character.quests.length > 0 ? (
            <div className="space-y-6">
              {character.quests.map((quest, index) => (
                <div key={index} className="mb-6 pb-6 border-b border-theme last:border-0 last:mb-0 last:pb-0 bg-secondary p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Quest #{index + 1}</h3>
                    <button
                      type="button"
                      onClick={handleRemoveQuest(index)}
                      className="p-2 text-red-600 hover:text-red-800 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400 dark:hover:text-red-300"
                      title="Remove Quest"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Quest Title
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={quest.title}
                        onChange={(e) => {
                          const newQuests = [...character.quests!];
                          newQuests[index] = {...newQuests[index], title: e.target.value};
                          handleArrayInputChange('quests', newQuests);
                        }}
                        className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      />
                      <RegenerateButton
                        field={`quest_${index}_title`}
                        onClick={(e) => handleRegenerateField(`quest_${index}_title`, e)}
                        isLoading={fieldLoadingStates[`quest_${index}_title`] || false}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Quest Description
                    </label>
                    <div className="flex">
                      <textarea
                        value={quest.description}
                        onChange={(e) => {
                          const newQuests = [...character.quests!];
                          newQuests[index] = {...newQuests[index], description: e.target.value};
                          handleArrayInputChange('quests', newQuests);
                        }}
                        rows={3}
                        className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      />
                      <RegenerateButton
                        field={`quest_${index}_description`}
                        onClick={(e) => handleRegenerateField(`quest_${index}_description`, e)}
                        isLoading={fieldLoadingStates[`quest_${index}_description`] || false}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Quest Reward
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={quest.reward}
                        onChange={(e) => {
                          const newQuests = [...character.quests!];
                          newQuests[index] = {...newQuests[index], reward: e.target.value};
                          handleArrayInputChange('quests', newQuests);
                        }}
                        className="flex-grow p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
                      />
                      <RegenerateButton
                        field={`quest_${index}_reward`}
                        onClick={(e) => handleRegenerateField(`quest_${index}_reward`, e)}
                        isLoading={fieldLoadingStates[`quest_${index}_reward`] || false}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={(e) => handleRegenerateField(`quest_${index}_whole`, e)}
                      className={`
                        w-full p-2 rounded-md flex items-center justify-center
                        ${fieldLoadingStates[`quest_${index}_whole`] 
                          ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' 
                          : 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300'
                        }
                      `}
                      disabled={fieldLoadingStates[`quest_${index}_whole`] || false}
                      title="Regenerate Entire Quest"
                    >
                      {fieldLoadingStates[`quest_${index}_whole`] ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-300 mr-2"></div>
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2" />
                          Regenerate Entire Quest
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-secondary rounded-lg border border-dashed border-theme">
              <p className="text-muted">No quests available. Add a quest to get started.</p>
            </div>
          )}
        </FormSection>
        
        {/* Form controls */}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={handleButtonClick(() => router.push('/library'))}
            className="mr-2"
            type="button"
          >
            Cancel
          </Button>
          
          <Button
            variant="primary"
            type="submit"
            disabled={isSaving}
            isLoading={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}