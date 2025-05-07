import { Character, CharacterFormData } from './types';
import { exampleCharacters } from './example-characters';
import { saveImage, getImage, deleteImage, generatePlaceholderImage } from './image-storage';
import { compressImage, getBase64Size, isValidImageData } from './utils';

const STORAGE_KEY = 'npc-forge-characters';
const IMAGE_SIZE_WARNING_MB = 2.0; // Only compress if larger than this

// Interface for stored character with additional metadata
export interface StoredCharacter {
  id: string;
  character: Character;
  createdAt: string;
  isExample: boolean;
  formData?: CharacterFormData; // Store original form data for regeneration
  hasStoredImage?: boolean; // Flag to indicate if image is stored in IndexedDB
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
export async function saveCharacter(
  character: Character, 
  formData?: CharacterFormData, 
  isExample = false
): Promise<StoredCharacter> {
  console.log("Starting character save process...");
  
  // Create a deep copy of the character to avoid modifying the original object
  const characterCopy = JSON.parse(JSON.stringify(character)) as Character;
  
  // Generate a unique ID for the character
  const characterId = generateCharacterId(characterCopy);
  
  // Process image if available
  let hasStoredImage = false;
  
  if (characterCopy.image_data && isValidImageData(characterCopy.image_data)) {
    try {
      const sizeInMB = getBase64Size(characterCopy.image_data);
      console.log(`Original image size: ${sizeInMB.toFixed(2)}MB`);
      
      // Compress large images before storing
      if (sizeInMB > IMAGE_SIZE_WARNING_MB) {
        console.log(`Image is large (${sizeInMB.toFixed(2)}MB), compressing...`);
        
        try {
          // Compress to 512px wide with medium quality
          const compressedImage = await compressImage(characterCopy.image_data, 512, 0.6);
          characterCopy.image_data = compressedImage;
          console.log(`Compressed size: ${getBase64Size(compressedImage).toFixed(2)}MB`);
        } catch (compressError) {
          console.error('Compression error:', compressError);
          // Continue with original if compression fails
        }
      }
      
      // Save image to IndexedDB
      await saveImage(characterId, characterCopy.image_data);
      hasStoredImage = true;
      
      // Remove image data from the character object that will go to localStorage
      delete characterCopy.image_data;
      console.log("Image saved to IndexedDB and removed from character object");
      
    } catch (error) {
      console.error('Error handling image:', error);
      // Continue without the image
      delete characterCopy.image_data;
    }
  }
  
  const stored = getStoredCharacters();
  
  // Make sure selected traits are properly saved in the character
  if (formData) {
    // Save main genre and subgenre
    if (formData.genre && !characterCopy.selected_traits.genre) {
      characterCopy.selected_traits.genre = formData.genre;
    }
    
    if (formData.sub_genre && !characterCopy.selected_traits.sub_genre) {
      characterCopy.selected_traits.sub_genre = formData.sub_genre;
    }
    
    // Save other traits if not already present
    if (formData.gender && !characterCopy.selected_traits.gender) {
      characterCopy.selected_traits.gender = formData.gender;
    }
    
    if (formData.age_group && !characterCopy.selected_traits.age_group) {
      characterCopy.selected_traits.age_group = formData.age_group;
    }
    
    if (formData.moral_alignment && !characterCopy.selected_traits.moral_alignment) {
      characterCopy.selected_traits.moral_alignment = formData.moral_alignment;
    }
    
    if (formData.relationship_to_player && !characterCopy.selected_traits.relationship_to_player) {
      characterCopy.selected_traits.relationship_to_player = formData.relationship_to_player;
    }
    
    // Advanced options
    if (formData.advanced_options) {
      if (formData.advanced_options.species && !characterCopy.selected_traits.species) {
        characterCopy.selected_traits.species = formData.advanced_options.species;
      }
      
      if (formData.advanced_options.occupation && !characterCopy.selected_traits.occupation) {
        characterCopy.selected_traits.occupation = formData.advanced_options.occupation;
      }
      
      if (formData.advanced_options.personality_traits && 
          formData.advanced_options.personality_traits.length > 0 && 
          !characterCopy.selected_traits.personality_traits) {
        characterCopy.selected_traits.personality_traits = [...formData.advanced_options.personality_traits];
      }
      
      if (formData.advanced_options.social_class && !characterCopy.selected_traits.social_class) {
        characterCopy.selected_traits.social_class = formData.advanced_options.social_class;
      }
    }
  }
  
  // Create a new stored character object
  const newStoredCharacter: StoredCharacter = {
    id: characterId,
    character: characterCopy,
    createdAt: new Date().toISOString(),
    isExample,
    formData,
    hasStoredImage
  };
  
  // Add to stored characters and save
  const updated = [...stored, newStoredCharacter];
  saveCharacters(updated);
  
  // Return the character with image data if it was saved
  if (hasStoredImage && character.image_data) {
    // Restore the image data for the returned object
    newStoredCharacter.character.image_data = character.image_data;
  }
  
  return newStoredCharacter;
}

// Delete a character from storage - also deletes the image from IndexedDB
export async function deleteCharacter(id: string): Promise<boolean> {
  const stored = getStoredCharacters();
  const character = stored.find(char => char.id === id);
  
  if (!character) {
    return false; // Character not found
  }
  
  // Delete the image from IndexedDB if it exists
  if (character.hasStoredImage) {
    try {
      await deleteImage(id);
    } catch (error) {
      console.error('Error deleting image from IndexedDB:', error);
      // Continue with deletion even if image delete fails
    }
  }
  
  // Remove from localStorage
  const updated = stored.filter(char => char.id !== id);
  saveCharacters(updated);
  
  return true;
}

// Update an existing character - also updates the image in IndexedDB if needed
export async function updateCharacter(
  id: string, 
  updatedChar: Character, 
  updatedFormData?: CharacterFormData
): Promise<boolean> {
  const stored = getStoredCharacters();
  const index = stored.findIndex(char => char.id === id);
  
  if (index === -1) return false;
  
  // Get the existing stored character
  const existingChar = stored[index];
  
  // Create a deep copy of the updated character to avoid modifying the original
  const characterCopy = JSON.parse(JSON.stringify(updatedChar)) as Character;
  
  // Handle image updates
  let hasStoredImage = existingChar.hasStoredImage || false;
  
  if (characterCopy.image_data && isValidImageData(characterCopy.image_data)) {
    try {
      const sizeInMB = getBase64Size(characterCopy.image_data);
      
      // Compress large images
      if (sizeInMB > IMAGE_SIZE_WARNING_MB) {
        try {
          const compressedImage = await compressImage(characterCopy.image_data, 512, 0.6);
          characterCopy.image_data = compressedImage;
        } catch (compressError) {
          console.error('Compression error during update:', compressError);
          // Continue with original if compression fails
        }
      }
      
      // Save updated image to IndexedDB
      await saveImage(id, characterCopy.image_data);
      hasStoredImage = true;
      
      // Save the image URL if available, but remove the data from localStorage
      const imageUrl = characterCopy.image_url;
      delete characterCopy.image_data;
      characterCopy.image_url = imageUrl;
      
    } catch (error) {
      console.error('Error handling image during update:', error);
      delete characterCopy.image_data;
    }
  }
  
  // Create the updated stored character object
  const updatedStoredChar: StoredCharacter = {
    ...existingChar,
    character: characterCopy,
    formData: updatedFormData || existingChar.formData,
    hasStoredImage
  };
  
  // Update the stored characters
  const updatedStored = [...stored];
  updatedStored[index] = updatedStoredChar;
  saveCharacters(updatedStored);
  
  return true;
}

// Load a character with its image from IndexedDB if available
export async function loadCharacterWithImage(id: string): Promise<Character | null> {
  const stored = getStoredCharacters();
  const storedChar = stored.find(char => char.id === id);
  
  if (!storedChar) return null;
  
  // Create a deep copy of the character
  const character = JSON.parse(JSON.stringify(storedChar.character)) as Character;
  
  // Load the image from IndexedDB if it exists
  if (storedChar.hasStoredImage) {
    try {
      const imageData = await getImage(id);
      if (imageData) {
        character.image_data = imageData;
      }
    } catch (error) {
      console.error('Error loading image from IndexedDB:', error);
      // Continue without image if loading fails
    }
  }
  
  return character;
}

// Simple function to save the character array
function saveCharacters(characters: StoredCharacter[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
  } catch (error) {
    console.error('Error saving characters to localStorage:', error);
    throw error;
  }
}

// Generate a unique ID for a character
function generateCharacterId(character: Character): string {
  return `${character.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
}

// Initialize the library with example characters immediately
export async function initializeLibrary(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  // Get stored characters
  const stored = getStoredCharacters();
  
  // Check if we already have characters
  if (stored.length === 0) {
    // Add example characters immediately
    try {
      // Process example characters sequentially
      for (const char of exampleCharacters) {
        await saveCharacter(char as Character, undefined, true);
      }
      console.log('Initialized character library with example characters');
    } catch (error) {
      console.error('Failed to initialize example characters', error);
    }
  }
}