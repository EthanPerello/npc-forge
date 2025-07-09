// src/contexts/character-context.tsx (UPDATED VERSION)
'use client';

import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  ReactNode, 
  useMemo,
  useEffect 
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
import { 
  deduplicateStoredCharacters, 
  validateCharacterUniqueness,
  getCharacterStats,
  checkLibraryHealth,
  type LibraryHealthCheck,
  type SyncStatus
} from '@/lib/character-utils';
import { StoredCharacter } from '@/lib/character-storage';

interface CharacterContextType {
  character: Character | null;
  formData: CharacterFormData;
  isLoading: boolean;
  error: string | null;
  
  // Library management
  characters: StoredCharacter[];
  isLoadingLibrary: boolean;
  libraryError: string | null;
  libraryHealth: LibraryHealthCheck | null;
  syncStatus: SyncStatus;
  
  // Actions
  updateFormData: (data: Partial<CharacterFormData>) => void;
  resetFormData: () => void;
  generateCharacter: (customFormData?: CharacterFormData) => Promise<void>;
  generateRandomCharacter: () => Promise<CharacterFormData>;
  downloadCharacterJSON: () => void;
  saveToLibrary: (customCharacter?: Character) => Promise<boolean>;
  setCharacter: (character: Character | null | ((prev: Character | null) => Character | null)) => void;
  
  // Library actions
  refreshLibrary: () => Promise<void>;
  deleteCharacterFromLibrary: (id: string) => Promise<boolean>;
  syncLibraryToCloud: () => Promise<{ success: number; failed: number; skipped: number }>;
  checkLibraryHealthStatus: () => void;
  emergencyFixDuplicates: () => Promise<void>;
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
  
  // Library state
  const [characters, setCharacters] = useState<StoredCharacter[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState<boolean>(false);
  const [libraryError, setLibraryError] = useState<string | null>(null);
  const [libraryHealth, setLibraryHealth] = useState<LibraryHealthCheck | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isAuthenticated: false,
    isSyncing: false
  });

  // Initialize hybrid storage and load characters on mount
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        await hybridCharacterStorage.initialize();
        await refreshLibrary();
        
        // Update sync status
        const status = hybridCharacterStorage.getSyncStatus();
        setSyncStatus({
          ...status,
          lastSyncTime: Date.now()
        });
      } catch (error) {
        console.error('Failed to initialize storage:', error);
        setLibraryError('Failed to initialize character storage');
      }
    };

    initializeStorage();

    // Listen for sync events
    const handleCharactersSynced = (event: CustomEvent) => {
      console.log('Characters synced:', event.detail);
      refreshLibrary(); // Refresh library after sync
    };

    const handleCharacterDeleted = (event: CustomEvent) => {
      console.log('Character deleted:', event.detail);
      refreshLibrary(); // Refresh library after deletion
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('characters-synced', handleCharactersSynced as EventListener);
      window.addEventListener('character-deleted', handleCharacterDeleted as EventListener);
      
      return () => {
        window.removeEventListener('characters-synced', handleCharactersSynced as EventListener);
        window.removeEventListener('character-deleted', handleCharacterDeleted as EventListener);
      };
    }
  }, []);

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

  // Refresh library with deduplication
  const refreshLibrary = useCallback(async () => {
    setIsLoadingLibrary(true);
    setLibraryError(null);
    
    try {
      console.log('Refreshing character library...');
      const rawCharacters = await hybridCharacterStorage.getCharacters();
      
      // Validate and deduplicate characters
      const validation = validateCharacterUniqueness(rawCharacters);
      
      let processedCharacters = rawCharacters;
      
      if (!validation.isValid) {
        console.warn('Found duplicate characters, deduplicating:', validation.duplicates);
        processedCharacters = deduplicateStoredCharacters(rawCharacters, {
          preferCloud: true,
          preferNewer: true,
          strictIdMatch: true,
          fuzzyNameMatch: false
        });
        
        console.log(`Deduplicated: ${rawCharacters.length} -> ${processedCharacters.length} characters`);
      }
      
      setCharacters(processedCharacters);
      
      // Update health check
      const health = checkLibraryHealth(processedCharacters);
      setLibraryHealth(health);
      
      if (!health.isHealthy) {
        console.warn('Library health issues detected:', health.issues);
      }
      
      // Update sync status
      const status = hybridCharacterStorage.getSyncStatus();
      setSyncStatus(prev => ({
        ...status,
        lastSyncTime: Date.now(),
        hasConflicts: !validation.isValid
      }));
      
      console.log(`Library refreshed: ${processedCharacters.length} characters loaded`);
    } catch (error) {
      console.error('Failed to refresh library:', error);
      setLibraryError(error instanceof Error ? error.message : 'Failed to load character library');
    } finally {
      setIsLoadingLibrary(false);
    }
  }, []);

  // Delete character from library
  const deleteCharacterFromLibrary = useCallback(async (id: string): Promise<boolean> => {
    try {
      console.log(`Deleting character from library: ${id}`);
      const success = await hybridCharacterStorage.deleteCharacter(id);
      
      if (success) {
        // Update local state immediately for better UX
        setCharacters(prev => prev.filter(char => char.id !== id));
        console.log('Character deleted successfully');
      }
      
      return success;
    } catch (error) {
      console.error('Failed to delete character:', error);
      return false;
    }
  }, []);

  // Sync library to cloud
  const syncLibraryToCloud = useCallback(async () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));
    
    try {
      const result = await hybridCharacterStorage.syncToCloud();
      
      // Refresh library after sync
      await refreshLibrary();
      
      setSyncStatus(prev => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: Date.now()
      }));
      
      return result;
    } catch (error) {
      console.error('Failed to sync to cloud:', error);
      setSyncStatus(prev => ({ ...prev, isSyncing: false }));
      throw error;
    }
  }, [refreshLibrary]);

  // Check library health
  const checkLibraryHealthStatus = useCallback(() => {
    const health = checkLibraryHealth(characters);
    setLibraryHealth(health);
    
    if (!health.isHealthy) {
      console.warn('Library health check failed:', health);
    }
    
    return health;
  }, [characters]);

  // Emergency fix for duplicates
  const emergencyFixDuplicates = useCallback(async () => {
    console.log('Starting emergency duplicate fix...');
    
    try {
      setIsLoadingLibrary(true);
      
      // Get current characters and deduplicate aggressively
      const rawCharacters = await hybridCharacterStorage.getCharacters();
      const deduplicatedCharacters = deduplicateStoredCharacters(rawCharacters, {
        preferCloud: true,
        preferNewer: true,
        strictIdMatch: true,
        fuzzyNameMatch: false
      });
      
      console.log(`Emergency fix: ${rawCharacters.length} -> ${deduplicatedCharacters.length} characters`);
      
      // Update state immediately
      setCharacters(deduplicatedCharacters);
      
      // Update health status
      const health = checkLibraryHealth(deduplicatedCharacters);
      setLibraryHealth(health);
      
      console.log('Emergency duplicate fix completed');
    } catch (error) {
      console.error('Emergency fix failed:', error);
      setLibraryError('Failed to fix duplicates');
    } finally {
      setIsLoadingLibrary(false);
    }
  }, []);

  // Generate random character data without updating state
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
      
      // Create random data object
      const randomData: CharacterFormData = {
        ...defaultFormData,
        description,
        genre: randomGenre.id as Genre,
        sub_genre: randomGenre.subGenres && randomGenre.subGenres.length > 0 
          ? randomGenre.subGenres[Math.floor(Math.random() * randomGenre.subGenres.length)].id 
          : undefined,
        gender,
        age_group: age,
        moral_alignment: alignment,
        relationship_to_player: relationship,
        model: 'gpt-4o-mini',
        portrait_options: {
          art_style: '',
          mood: '',
          framing: '',
          background: '',
          image_model: 'dall-e-2',
        }
      };
      
      console.log("Generated random character data with description:", description.substring(0, 30) + "...");
      console.log("Random character genre:", randomGenre.id);
      
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
      
      return fallbackData;
    }
  }, []);

  // Generate character with improved error handling
  const generateCharacter = useCallback(async (customFormData?: CharacterFormData) => {
    if (isLoading) {
      console.log("Generation already in progress, ignoring request");
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const dataToUse = customFormData || formData;
      
      if (customFormData) {
        console.log("Updating form data with custom data for generation");
        setFormData(customFormData);
      }
      
      if (!dataToUse.description || dataToUse.description.trim() === '') {
        throw new Error("Character description is required. Please describe your character or use random generation.");
      }
      
      console.log("Generating character with description:", dataToUse.description.substring(0, 50) + "...");
      
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
  
  // Save to library - Updated to use hybrid storage with deduplication safeguards
  const saveToLibrary = useCallback(async (customCharacter?: Character): Promise<boolean> => {
    const characterToSave = customCharacter || character;
    
    if (!characterToSave) {
      console.error('No character to save');
      return false;
    }
    
    console.log('Saving character to library:', characterToSave.name);
    
    try {
      // Check for potential duplicates by name before saving
      const existingChars = characters.filter(c => 
        c.character.name.toLowerCase().trim() === characterToSave.name.toLowerCase().trim()
      );
      
      if (existingChars.length > 0) {
        console.warn(`Found ${existingChars.length} existing characters with similar name: ${characterToSave.name}`);
        // Continue anyway - let the user decide if they want duplicates by name
      }
      
      const characterCopy = JSON.parse(JSON.stringify(characterToSave)) as Character;
      
      // Handle image fetching if needed
      if (!characterCopy.image_data && characterCopy.image_url && formData.include_portrait) {
        console.log('Character has image URL but no data, attempting to fetch');
        
        try {
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
        }
      }
      
      console.log('Saving character using hybrid storage...');
      const result = await hybridCharacterStorage.saveCharacter(characterCopy, formData);
      
      // Refresh library to show the new character and handle any deduplication
      await refreshLibrary();
      
      console.log('Character saved successfully');
      return !!result;
    } catch (error) {
      console.error('Error saving character to library:', error);
      return false;
    }
  }, [character, formData, characters, refreshLibrary]);

  // Create the context value
  const contextValue = useMemo(() => ({
    character,
    formData,
    isLoading,
    error,
    
    // Library state
    characters,
    isLoadingLibrary,
    libraryError,
    libraryHealth,
    syncStatus,
    
    // Actions
    updateFormData,
    resetFormData,
    generateRandomCharacter,
    generateCharacter,
    downloadCharacterJSON,
    saveToLibrary,
    setCharacter,
    
    // Library actions
    refreshLibrary,
    deleteCharacterFromLibrary,
    syncLibraryToCloud,
    checkLibraryHealthStatus,
    emergencyFixDuplicates,
  }), [
    character, 
    formData, 
    isLoading, 
    error,
    characters,
    isLoadingLibrary,
    libraryError,
    libraryHealth,
    syncStatus,
    updateFormData, 
    resetFormData,
    generateRandomCharacter,
    generateCharacter,
    downloadCharacterJSON,
    saveToLibrary,
    refreshLibrary,
    deleteCharacterFromLibrary,
    syncLibraryToCloud,
    checkLibraryHealthStatus,
    emergencyFixDuplicates
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