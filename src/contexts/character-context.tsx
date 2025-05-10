'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode, 
  useMemo 
} from 'react';
import { 
  Character, 
  CharacterFormData, 
  OpenAIModel,
  ImageModel
} from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';
import { saveCharacter } from '@/lib/character-storage';
import { downloadJson } from '@/lib/utils';

interface CharacterContextType {
  character: Character | null;
  formData: CharacterFormData;
  isLoading: boolean;
  error: string | null;
  updateFormData: (data: Partial<CharacterFormData>) => void;
  resetFormData: () => void;
  generateCharacter: () => Promise<void>;
  downloadCharacterJSON: () => void;
  saveToLibrary: (customCharacter?: Character) => Promise<boolean>;
  setCharacter: (character: Character | null | ((prev: Character | null) => Character | null)) => void;
}

// Default form values using undefined instead of empty strings for enum types
const defaultFormData: CharacterFormData = {
  description: '',
  include_quests: false,
  include_dialogue: false,
  include_items: false,
  genre: undefined,
  sub_genre: undefined,
  gender: undefined,
  age_group: undefined,
  moral_alignment: undefined,
  relationship_to_player: undefined,
  model: DEFAULT_MODEL,
  advanced_options: {
    species: undefined,
    occupation: undefined,
    personality_traits: [],
    social_class: undefined,
    height: undefined,
    build: undefined,
    distinctive_features: undefined,
    homeland: undefined
  },
  quest_options: {
    reward_type: undefined,
    number_of_quests: 1,
    quest_type: undefined,
  },
  dialogue_options: {
    number_of_lines: 3,
    tone: undefined,
    context: undefined,
  },
  item_options: {
    number_of_items: 3,
    rarity_distribution: 'any',
    item_categories: [],
  },
  portrait_options: {
    art_style: '',
    mood: '',
    framing: '',
    background: '',
    image_model: DEFAULT_IMAGE_MODEL,
  },
};

// Create the context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Context provider component
export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [formData, setFormData] = useState<CharacterFormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update form data - fixed to prevent infinite loop
  const updateFormData = useCallback((data: Partial<CharacterFormData>) => {
    setFormData(prev => {
      // Create a new state object
      const newState = { ...prev };
      
      // Directly assign top-level properties
      Object.keys(data).forEach(key => {
        if (key !== 'advanced_options' && 
            key !== 'quest_options' && 
            key !== 'dialogue_options' && 
            key !== 'item_options' && 
            key !== 'portrait_options') {
          // @ts-ignore
          newState[key] = data[key];
        }
      });
      
      // Handle nested objects without creating object literals in the handler
      if (data.advanced_options) {
        newState.advanced_options = {
          ...prev.advanced_options,
          ...data.advanced_options
        };
      }
      
      if (data.quest_options) {
        newState.quest_options = {
          ...prev.quest_options,
          ...data.quest_options
        };
      }
      
      if (data.dialogue_options) {
        newState.dialogue_options = {
          ...prev.dialogue_options,
          ...data.dialogue_options
        };
      }
      
      if (data.item_options) {
        newState.item_options = {
          ...prev.item_options,
          ...data.item_options
        };
      }
      
      if (data.portrait_options) {
        newState.portrait_options = {
          ...prev.portrait_options,
          ...data.portrait_options
        };
      }
      
      return newState;
    });
  }, []);

  // Reset form to defaults
  const resetFormData = useCallback(() => {
    setFormData(defaultFormData);
  }, []);

  // Generate character
  const generateCharacter = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Import usage limits (done inside the function to avoid SSR issues)
      const { hasReachedLimit, incrementUsage } = await import('@/lib/usage-limits');
      
      // Get selected models
      const textModel = formData.model || DEFAULT_MODEL;
      const imageModel = formData.portrait_options?.image_model || DEFAULT_IMAGE_MODEL;
      
      // Check if user has reached their monthly limit for either model
      if (hasReachedLimit(textModel)) {
        throw new Error(`You've reached your monthly limit for ${textModel} character generations. Try a different model tier or wait until next month.`);
      }
      
      if (hasReachedLimit(imageModel as ImageModel)) {
        throw new Error(`You've reached your monthly limit for ${imageModel} portrait generations. Try a different model tier or wait until next month.`);
      }

      // Call the API endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate character');
      }

      const data = await response.json();
      setCharacter(data.character);
      
      // Increment usage count for both models on successful generation
      incrementUsage(textModel);
      incrementUsage(imageModel as ImageModel);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error generating character:', err);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  // Download character as JSON
  const downloadCharacterJSON = useCallback(() => {
    if (!character) return;

    // Use the utility function to download the JSON
    downloadJson(character, `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`);
  }, [character]);
  
  // Save to library - updated to ensure image persistence
  const saveToLibrary = useCallback(async (customCharacter?: Character): Promise<boolean> => {
    // Use the provided character if available, otherwise use state
    const characterToSave = customCharacter || character;
    
    if (!characterToSave) {
      console.error('No character to save');
      return false;
    }
    
    console.log("Saving character to library:", characterToSave.name);
    
    try {
      // First make sure image data is properly set
      if (characterToSave.image_data) {
        console.log("Character has image data to save");
      } else if (characterToSave.image_url) {
        console.log("Character has image URL but no data, attempting to fetch");
        
        try {
          // Try to fetch the image through the proxy endpoint
          const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(characterToSave.image_url)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.imageData) {
              console.log("Successfully fetched image data from URL");
              // Modify the character object to include the image data
              characterToSave.image_data = data.imageData;
            }
          }
        } catch (imgError) {
          console.error("Failed to fetch image from URL:", imgError);
          // Continue without the image data if fetch fails
        }
      }
      
      // Save character with form data to IndexedDB
      console.log("Saving character to IndexedDB");
      const result = await saveCharacter(characterToSave, formData);
      
      // If we're on the main page (not editing), make sure the image stays visible
      if (result && result.character && result.character.image_data) {
        console.log("Setting image in current character state after save");
        // Update the current character in state to keep the image
        setCharacter(prevChar => {
          if (!prevChar) return result.character;
          return {
            ...prevChar,
            image_data: result.character.image_data
          };
        });
      }
      
      return !!result;
    } catch (error) {
      console.error('Error saving character to library:', error);
      return false;
    }
  }, [character, formData]);

  // Create the context value
  const contextValue = useMemo(() => ({
    character,
    formData,
    isLoading,
    error,
    updateFormData,
    resetFormData,
    generateCharacter,
    downloadCharacterJSON,
    saveToLibrary,
    setCharacter,
  }), [
    character, 
    formData, 
    isLoading, 
    error, 
    updateFormData, 
    resetFormData, 
    generateCharacter,
    downloadCharacterJSON,
    saveToLibrary
  ]);

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
}

// Custom hook to use the character context
export function useCharacter() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}