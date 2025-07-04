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
  ImageModel,
  Genre
} from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';
import { hybridCharacterStorage } from '@/lib/hybrid-storage';
import { downloadJson } from '@/lib/utils';
import { GENRE_TEMPLATES, getTemplateExample } from '@/lib/templates';

interface CharacterContextType {
  character: Character | null;
  formData: CharacterFormData;
  isLoading: boolean;
  error: string | null;
  updateFormData: (data: Partial<CharacterFormData>) => void;
  resetFormData: () => void;
  generateCharacter: (customFormData?: CharacterFormData) => Promise<void>;
  generateRandomCharacter: () => Promise<CharacterFormData>;
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
  include_portrait: false,
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

  // Update form data with improved merging logic
  const updateFormData = useCallback((data: Partial<CharacterFormData>) => {
    setFormData(prevData => {
      const newData = { ...prevData };
      
      // Handle all top-level properties except for nested objects
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'advanced_options' && 
            key !== 'quest_options' && 
            key !== 'dialogue_options' && 
            key !== 'item_options' && 
            key !== 'portrait_options') {
          // @ts-ignore - We're checking the keys dynamically
          newData[key] = value;
        }
      });
      
      // Handle nested objects if they exist in the update
      if (data.advanced_options) {
        newData.advanced_options = {
          ...prevData.advanced_options,
          ...data.advanced_options
        };
      }
      
      if (data.quest_options) {
        newData.quest_options = {
          ...prevData.quest_options,
          ...data.quest_options
        };
      }
      
      if (data.dialogue_options) {
        newData.dialogue_options = {
          ...prevData.dialogue_options,
          ...data.dialogue_options
        };
      }
      
      if (data.item_options) {
        newData.item_options = {
          ...prevData.item_options,
          ...data.item_options
        };
      }
      
      if (data.portrait_options) {
        newData.portrait_options = {
          ...prevData.portrait_options,
          ...data.portrait_options
        };
      }
      
      return newData;
    });
  }, []);

  // Reset form to defaults
  const resetFormData = useCallback(() => {
    setFormData(defaultFormData);
    setCharacter(null);
    setError(null);
  }, []);

  // FIXED: Generate random character data without updating state
  // Returns pure random data that can be merged with user preferences
  const generateRandomCharacter = useCallback(async (): Promise<CharacterFormData> => {
    try {
      // Select a random genre template
      const randomGenreIndex = Math.floor(Math.random() * GENRE_TEMPLATES.length);
      const randomGenre = GENRE_TEMPLATES[randomGenreIndex];
      
      // Get example description for this genre
      const description = getTemplateExample(randomGenre.id);
      
      // Define typed arrays for random selections
      const genders: ('male' | 'female' | 'nonbinary' | 'unknown' | undefined)[] = [
        'male', 'female', 'nonbinary', 'unknown', undefined
      ];
      
      const ages: ('child' | 'teen' | 'adult' | 'elder' | undefined)[] = [
        'child', 'teen', 'adult', 'elder', undefined
      ];
      
      const alignments: ('good' | 'neutral' | 'evil' | undefined)[] = [
        'good', 'neutral', 'evil', undefined
      ];
      
      const relationships: ('ally' | 'neutral' | 'enemy' | 'mentor' | 'rival' | 'betrayer' | undefined)[] = [
        'ally', 'neutral', 'enemy', 'mentor', 'rival', 'betrayer', undefined
      ];
      
      // Select random values from arrays
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const age = ages[Math.floor(Math.random() * ages.length)];
      const alignment = alignments[Math.floor(Math.random() * alignments.length)];
      const relationship = relationships[Math.floor(Math.random() * relationships.length)];
      
      // Create random data object - NOTE: Don't include content type flags
      // These will be preserved from the user's current selections
      const randomData: CharacterFormData = {
        ...defaultFormData,
        description,  // The key random element - description and genre
        genre: randomGenre.id as Genre,
        sub_genre: randomGenre.subGenres && randomGenre.subGenres.length > 0 
          ? randomGenre.subGenres[Math.floor(Math.random() * randomGenre.subGenres.length)].id 
          : undefined,
        gender,
        age_group: age,
        moral_alignment: alignment,
        relationship_to_player: relationship,
        // Use standard model for random generation
        model: 'gpt-4o-mini',
        // DON'T set content type flags - these will be merged from user preferences
        // include_quests, include_dialogue, include_items, include_portrait will be preserved
        portrait_options: {
          art_style: '',
          mood: '',
          framing: '',
          background: '',
          image_model: 'dall-e-2',
        }
      };
      
      // DON'T update state here - let the caller handle merging and state updates
      // This prevents race conditions and preserves user selections properly
      
      console.log("Generated random character data with description:", description.substring(0, 30) + "...");
      console.log("Random character genre:", randomGenre.id);
      
      // Return the random data object for merging
      return randomData;
    } catch (error) {
      console.error("Error generating random character:", error);
      
      // Fallback random data
      const fallbackData: CharacterFormData = {
        ...defaultFormData,
        description: "A mysterious character with unique abilities and an interesting backstory.",
        genre: 'fantasy',
        model: 'gpt-4o-mini',
        portrait_options: {
          art_style: '',
          mood: '',
          framing: '',
          background: '',
          image_model: 'dall-e-2',
        }
      };
      
      // Return the fallback data (don't update state)
      return fallbackData;
    }
  }, []);

  // Generate character with improved error handling
  const generateCharacter = useCallback(async (customFormData?: CharacterFormData) => {
    // Prevent generating if already in progress
    if (isLoading) {
      console.log("Generation already in progress, ignoring request");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      // Use custom form data if provided, otherwise use current state
      const dataToUse = customFormData || formData;
      
      // Update form data state if custom data was provided
      // This ensures the UI reflects the data being used for generation
      if (customFormData) {
        console.log("Updating form data with custom data for generation");
        setFormData(customFormData);
      }
      
      // Extra validation for description field
      if (!dataToUse.description || dataToUse.description.trim() === '') {
        throw new Error("Character description is required. Please describe your character or use random generation.");
      }
      
      console.log("Generating character with description:", dataToUse.description.substring(0, 50) + "...");
      console.log("Content types enabled:", {
        portrait: dataToUse.include_portrait,
        quests: dataToUse.include_quests,
        dialogue: dataToUse.include_dialogue,
        items: dataToUse.include_items
      });
      
      // Call the API endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUse),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate character');
      }

      const data = await response.json();
      console.log('Generated character:', data.character?.name, 'with image data:', !!data.character?.image_data);
      setCharacter(data.character);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error generating character:', err);
    } finally {
      setIsLoading(false);
    }
  }, [formData, isLoading]);

  // Download character as JSON
  const downloadCharacterJSON = useCallback(() => {
    if (!character) return;
    downloadJson(character, `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`);
  }, [character]);
  
  // Save to library - Updated to use hybrid storage
  const saveToLibrary = useCallback(async (customCharacter?: Character): Promise<boolean> => {
    // Use the provided character if available, otherwise use state
    const characterToSave = customCharacter || character;
    
    if (!characterToSave) {
      console.error('No character to save');
      return false;
    }
    
    console.log('Saving character to library:', characterToSave.name);
    console.log('Character has image data:', !!characterToSave.image_data);
    
    try {
      // Create a copy of the character to avoid mutating the original
      const characterCopy = JSON.parse(JSON.stringify(characterToSave)) as Character;
      
      // If no image data but has image URL and include_portrait was true, try to fetch it
      if (!characterCopy.image_data && characterCopy.image_url && formData.include_portrait) {
        console.log('Character has image URL but no data, attempting to fetch');
        
        try {
          // Try to fetch the image through the proxy endpoint
          const response = await fetch(`/api/proxy-image?url=${encodeURIComponent(characterCopy.image_url)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.imageData) {
              console.log('Successfully fetched image data from URL');
              characterCopy.image_data = data.imageData;
            }
          }
        } catch (imgError) {
          console.error('Failed to fetch image from URL:', imgError);
          // Continue without the image data if fetch fails
        }
      }
      
      // Use hybrid storage instead of direct IndexedDB
      console.log('Saving character using hybrid storage...');
      const result = await hybridCharacterStorage.saveCharacter(characterCopy, formData);
      
      console.log('Character saved successfully with hybrid storage');
      
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
    generateRandomCharacter,
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
    generateRandomCharacter,
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