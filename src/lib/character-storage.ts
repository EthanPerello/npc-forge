import { Character, CharacterFormData } from './types';
import { exampleCharacters } from './example-characters';

const STORAGE_KEY = 'npc-forge-characters';

// Interface for stored character with additional metadata
export interface StoredCharacter {
  id: string;
  character: Character;
  createdAt: string;
  isExample: boolean;
  formData?: CharacterFormData; // Store original form data for regeneration
}

// Get all characters from storage
export function getStoredCharacters(): StoredCharacter[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load characters from storage', error);
    return [];
  }
}

// Save a single character to storage
export function saveCharacter(character: Character, formData?: CharacterFormData, isExample = false): StoredCharacter {
  const stored = getStoredCharacters();
  
  // Make sure selected traits are properly saved in the character
  if (formData) {
    // Save main genre and subgenre
    if (formData.genre && !character.selected_traits.genre) {
      character.selected_traits.genre = formData.genre;
    }
    
    if (formData.sub_genre && !character.selected_traits.sub_genre) {
      character.selected_traits.sub_genre = formData.sub_genre;
    }
    
    // Save other traits if not already present
    if (formData.gender && !character.selected_traits.gender) {
      character.selected_traits.gender = formData.gender;
    }
    
    if (formData.age_group && !character.selected_traits.age_group) {
      character.selected_traits.age_group = formData.age_group;
    }
    
    if (formData.moral_alignment && !character.selected_traits.moral_alignment) {
      character.selected_traits.moral_alignment = formData.moral_alignment;
    }
    
    if (formData.relationship_to_player && !character.selected_traits.relationship_to_player) {
      character.selected_traits.relationship_to_player = formData.relationship_to_player;
    }
    
    // Advanced options
    if (formData.advanced_options) {
      if (formData.advanced_options.species && !character.selected_traits.species) {
        character.selected_traits.species = formData.advanced_options.species;
      }
      
      if (formData.advanced_options.occupation && !character.selected_traits.occupation) {
        character.selected_traits.occupation = formData.advanced_options.occupation;
      }
      
      if (formData.advanced_options.personality_traits && 
          formData.advanced_options.personality_traits.length > 0 && 
          !character.selected_traits.personality_traits) {
        character.selected_traits.personality_traits = [...formData.advanced_options.personality_traits];
      }
      
      if (formData.advanced_options.social_class && !character.selected_traits.social_class) {
        character.selected_traits.social_class = formData.advanced_options.social_class;
      }
    }
  }
  
  // Create a new stored character object
  const newStoredCharacter: StoredCharacter = {
    id: generateCharacterId(character),
    character,
    createdAt: new Date().toISOString(),
    isExample,
    formData
  };
  
  // Add to stored characters and save
  const updated = [...stored, newStoredCharacter];
  saveCharacters(updated);
  
  return newStoredCharacter;
}

// Delete a character from storage - now allows deleting examples
export function deleteCharacter(id: string): boolean {
  const stored = getStoredCharacters();
  const updated = stored.filter(char => char.id !== id);
  
  if (updated.length === stored.length) {
    return false; // Character not found
  }
  
  saveCharacters(updated);
  return true;
}

// Update an existing character - now allows updating examples
export function updateCharacter(id: string, updatedCharacter: Character, updatedFormData?: CharacterFormData): boolean {
  const stored = getStoredCharacters();
  const index = stored.findIndex(char => char.id === id);
  
  if (index === -1) return false;
  
  // Update the character while preserving metadata
  stored[index] = {
    ...stored[index],
    character: updatedCharacter,
    formData: updatedFormData || stored[index].formData
  };
  
  saveCharacters(stored);
  return true;
}

// Save the full character array
function saveCharacters(characters: StoredCharacter[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

// Generate a unique ID for a character
function generateCharacterId(character: Character): string {
  return `${character.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
}

// Initialize the library with example characters immediately
export function initializeLibrary(): void {
  if (typeof window === 'undefined') return;
  
  // Get stored characters
  const stored = getStoredCharacters();
  
  // Check if we already have characters
  if (stored.length === 0) {
    // Add example characters immediately
    try {
      exampleCharacters.forEach(char => {
        saveCharacter(char as Character, undefined, true);
      });
      console.log('Initialized character library with example characters');
    } catch (error) {
      console.error('Failed to initialize example characters', error);
    }
  }
}