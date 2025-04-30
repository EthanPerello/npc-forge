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
  Quest, 
  OpenAIModel,
  PortraitOptions
} from '@/lib/types';
import { DEFAULT_MODEL } from '@/lib/models';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';

interface CharacterContextType {
  character: Character | null;
  formData: CharacterFormData;
  isLoading: boolean;
  error: string | null;
  updateFormData: (data: Partial<CharacterFormData>) => void;
  resetFormData: () => void;
  generateCharacter: () => Promise<void>;
  downloadCharacterJSON: () => void;
}

// Default form values using undefined instead of empty strings for enum types
const defaultFormData: CharacterFormData = {
  description: '',
  include_quests: true,
  include_dialogue: true,
  include_items: true,
  genre: undefined,
  sub_genre: undefined, // Added sub-genre field
  gender: undefined, // Changed from empty string
  age_group: undefined, // Changed from empty string
  moral_alignment: undefined, // Changed from empty string
  relationship_to_player: undefined, // Changed from empty string
  model: DEFAULT_MODEL, // Default model for text generation
  advanced_options: {
    species: undefined,
    occupation: undefined,
    personality_traits: [], // Initialize as empty array
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
    rarity_distribution: 'balanced',
    item_categories: [],
  },
  portrait_options: {
    art_style: '', // String fields can be empty
    mood: '',
    framing: '',
    background: '',
    image_model: DEFAULT_IMAGE_MODEL, // Default model for image generation
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

  // Update form data
  const updateFormData = useCallback((data: Partial<CharacterFormData>) => {
    setFormData(prev => ({
      ...prev,
      ...data,
      // Handle nested objects properly
      advanced_options: {
        ...prev.advanced_options,
        ...(data.advanced_options || {})
      },
      quest_options: {
        ...prev.quest_options,
        ...(data.quest_options || {})
      },
      dialogue_options: {
        ...prev.dialogue_options,
        ...(data.dialogue_options || {})
      },
      item_options: {
        ...prev.item_options,
        ...(data.item_options || {})
      },
      portrait_options: {
        ...prev.portrait_options,
        ...(data.portrait_options || {})
      }
    }));
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
      
      // Check if user has reached their monthly limit for the selected model
      const model = formData.model || DEFAULT_MODEL;
      if (hasReachedLimit(model)) {
        throw new Error(`You have reached your monthly limit for ${model} generations. Try a different model or wait until next month.`);
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
      
      // Increment usage count on successful generation
      incrementUsage(model);
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

    const jsonString = JSON.stringify(character, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [character]);

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
  }), [
    character, 
    formData, 
    isLoading, 
    error, 
    updateFormData, 
    resetFormData, 
    generateCharacter,
    downloadCharacterJSON
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