'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode, 
  useMemo 
} from 'react';

// Updated character and form data types based on project design document
export interface Character {
  name: string;
  selected_traits: {
    genre?: string;
    sub_genre?: string; // Added for sub-genre tracking
    gender?: 'male' | 'female' | 'nonbinary' | 'unknown';
    age_group?: 'child' | 'teen' | 'adult' | 'elder';
    moral_alignment?: 'good' | 'neutral' | 'evil';
    relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
    species?: string;
    occupation?: string;
    social_class?: string;
    personality_traits?: string[];
    height?: string;
    build?: string;
    distinctive_features?: string;
    homeland?: string;
  };
  added_traits: {
    [key: string]: string; // Additional traits AI added that weren't selected
  };
  appearance: string; // Now a freeform paragraph
  personality: string; // Now a freeform paragraph
  backstory_hook: string; // 1-2 sentence hook
  special_ability?: string;
  items?: string[];
  dialogue_lines?: string[];
  quests?: Quest[];
  image_url?: string;
  portrait_options?: {
    art_style?: string;
    mood?: string;
    framing?: string;
    background?: string;
  };
}

export interface Quest {
  title: string;
  description: string;
  reward: string;
  type?: string;
}

export interface CharacterFormData {
  description: string;
  include_quests: boolean;
  include_dialogue: boolean;
  include_items: boolean;
  genre?: string;
  sub_genre?: string; // Added sub-genre field
  gender?: 'male' | 'female' | 'nonbinary' | 'unknown';
  age_group?: 'child' | 'teen' | 'adult' | 'elder';
  moral_alignment?: 'good' | 'neutral' | 'evil';
  relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
  advanced_options?: {
    species?: string;
    occupation?: string;
    personality_traits?: string[]; // Changed from personality_trait
    social_class?: string;
    height?: string;
    build?: string;
    distinctive_features?: string;
    homeland?: string;
  };
  quest_options?: {
    reward_type?: string;
    number_of_quests?: number;
    quest_type?: string;
  };
  dialogue_options?: {
    number_of_lines?: number;
    tone?: string;
    context?: string;
  };
  item_options?: {
    number_of_items?: number;
    rarity_distribution?: string;
    item_categories?: string[];
  };
  portrait_options?: {
    art_style?: string;
    mood?: string;
    framing?: string;
    background?: string;
  };
}

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
      
      // Check if user has reached their monthly limit
      if (hasReachedLimit()) {
        throw new Error('You have reached your monthly character generation limit. Limits will reset at the beginning of next month.');
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
      incrementUsage();
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