// src/lib/character-storage.ts
import { Character, CharacterFormData } from './types';
import { exampleCharacters } from './example-characters';
import { compressImage, getBase64Size, isValidImageData, normalizeCharacterTraits, sanitizeUserInput } from './utils';

const DB_NAME = 'npc-forge-db';
const DB_VERSION = 1;
const CHARACTER_STORE = 'characters';
const IMAGE_STORE = 'character-images';
const EXAMPLE_FLAG_KEY = 'npc-forge-examples-loaded';

// Interface for stored character with additional metadata
export interface StoredCharacter {
  id: string;
  character: Character;
  createdAt: string;
  isExample: boolean;
  formData?: CharacterFormData; // Store original form data for regeneration
  hasStoredImage?: boolean; // Flag to indicate if image is stored in IndexedDB
}

// Global reference to the database to avoid reopening it
let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Initialize the IndexedDB database
 * @returns Promise that resolves when the database is ready
 */
async function initDB(): Promise<IDBDatabase> {
  // Return the existing promise if we already have one
  if (dbPromise) return dbPromise;
  
  dbPromise = new Promise((resolve, reject) => {
    console.log("Opening IndexedDB database...");
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event);
      dbPromise = null; // Reset the promise so we can try again
      reject('Could not open IndexedDB');
    };

    request.onsuccess = (event) => {
      console.log("IndexedDB opened successfully");
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      console.log("Upgrading IndexedDB schema...");
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
        console.log(`Creating object store: ${CHARACTER_STORE}`);
        db.createObjectStore(CHARACTER_STORE, { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        console.log(`Creating object store: ${IMAGE_STORE}`);
        db.createObjectStore(IMAGE_STORE);
      }
    };
  });
  
  return dbPromise;
}

/**
 * Get all characters from IndexedDB
 * @returns Promise with array of stored characters
 */
export async function getStoredCharacters(): Promise<StoredCharacter[]> {
  if (typeof window === 'undefined') return [];
  
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
          console.error(`Object store ${CHARACTER_STORE} not found. Available stores:`, 
                        Array.from(db.objectStoreNames));
          
          // Try to recreate the database
          db.close();
          dbPromise = null;
          
          // Return empty array instead of failing
          resolve([]);
          return;
        }
        
        const transaction = db.transaction([CHARACTER_STORE], 'readonly');
        const store = transaction.objectStore(CHARACTER_STORE);
        const request = store.getAll();
        
        request.onsuccess = () => {
          const characters = request.result || [];
          
          // Filter out corrupted characters and normalize their data
          const validCharacters = characters.filter(stored => {
            if (!stored || !stored.character || !stored.character.name) {
              console.warn('Filtering out corrupted character:', stored);
              return false;
            }
            
            // Normalize character data
            stored.character = normalizeCharacterTraits(stored.character);
            
            return true;
          });
          
          console.log(`Loaded ${validCharacters.length} valid characters from IndexedDB`);
          resolve(validCharacters);
        };
        
        request.onerror = (event) => {
          console.error('Error getting characters from IndexedDB:', event);
          reject('Failed to get characters');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Failed to load characters from IndexedDB', error);
    
    // In case of critical error, try to recreate the database
    try {
      // Delete and recreate the database
      if (indexedDB && indexedDB.deleteDatabase) {
        console.log("Attempting to recreate the database...");
        const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
        deleteRequest.onsuccess = () => {
          console.log("Database deleted successfully, will be recreated on next access");
          dbPromise = null; // Reset the promise
        };
      }
    } catch (e) {
      console.error("Error during database reset:", e);
    }
    
    return [];
  }
}

/**
 * Save an image to IndexedDB with better error handling and logging
 * @param characterId - ID of the character the image belongs to
 * @param imageData - Base64 string of the image data
 * @returns Promise that resolves when the image is saved
 */
export async function saveImage(characterId: string, imageData: string): Promise<void> {
  if (!characterId) {
    console.error("Cannot save image: Missing character ID");
    throw new Error("Character ID is required to save image");
  }
  
  if (!imageData) {
    console.error("Cannot save image: Missing image data");
    throw new Error("Image data is required");
  }
  
  console.log(`Saving image for character ${characterId} (data length: ${imageData.length})`);
  
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(IMAGE_STORE)) {
          console.error(`Object store ${IMAGE_STORE} not found. Available stores:`, 
                      Array.from(db.objectStoreNames));
          reject('Image store not found');
          return;
        }
        
        const transaction = db.transaction([IMAGE_STORE], 'readwrite');
        const store = transaction.objectStore(IMAGE_STORE);
        
        // Use the character ID as the key
        const request = store.put(imageData, characterId);
        
        request.onsuccess = () => {
          console.log(`Image for character ${characterId} saved to IndexedDB successfully`);
          resolve();
        };
        
        request.onerror = (event) => {
          console.error('Error saving image to IndexedDB:', event);
          reject('Failed to save image');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error saving image:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error in saveImage:', error);
    throw error;
  }
}

/**
 * FIXED: Get an image from IndexedDB with retry logic for consistency
 * @param characterId - ID of the character to get the image for
 * @returns Promise that resolves with the image data, or null if not found
 */
export async function getImage(characterId: string): Promise<string | null> {
  // Try multiple times to handle temporary issues
  const maxRetries = 3;
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const db = await initDB();
      
      const result = await new Promise<string | null>((resolve, reject) => {
        try {
          // Verify the object store exists
          if (!db.objectStoreNames.contains(IMAGE_STORE)) {
            console.error(`Object store ${IMAGE_STORE} not found. Available stores:`, 
                       Array.from(db.objectStoreNames));
            resolve(null); // Return null instead of failing
            return;
          }
          
          const transaction = db.transaction([IMAGE_STORE], 'readonly');
          const store = transaction.objectStore(IMAGE_STORE);
          
          const request = store.get(characterId);
          
          request.onsuccess = () => {
            const imageData = request.result;
            console.log(`Image retrieval attempt ${attempt + 1} for character ${characterId}: ${imageData ? 'found' : 'not found'}`);
            resolve(imageData || null);
          };
          
          request.onerror = (event) => {
            console.error(`Error getting image from IndexedDB (attempt ${attempt + 1}):`, event);
            reject('Failed to get image');
          };
          
          transaction.oncomplete = () => {
            // Don't close the database here to allow reuse
          };
          
          // Add timeout to prevent hanging
          setTimeout(() => {
            reject('Image retrieval timeout');
          }, 5000);
        } catch (error) {
          console.error(`Transaction error getting image (attempt ${attempt + 1}):`, error);
          reject(error);
        }
      });
      
      // If we got a result (even null), return it
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`Image retrieval attempt ${attempt + 1} failed for character ${characterId}:`, error);
      
      // Wait before retrying (with exponential backoff)
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)));
      }
    }
  }
  
  console.error(`All ${maxRetries} image retrieval attempts failed for character ${characterId}:`, lastError);
  return null;
}

/**
 * Delete an image from IndexedDB
 * @param characterId - ID of the character to delete the image for
 * @returns Promise that resolves when the image is deleted
 */
export async function deleteImage(characterId: string): Promise<void> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(IMAGE_STORE)) {
          console.error(`Object store ${IMAGE_STORE} not found. Available stores:`, 
                     Array.from(db.objectStoreNames));
          // Resolve anyway since we're deleting
          resolve();
          return;
        }
        
        const transaction = db.transaction([IMAGE_STORE], 'readwrite');
        const store = transaction.objectStore(IMAGE_STORE);
        
        const request = store.delete(characterId);
        
        request.onsuccess = () => {
          console.log(`Image for character ${characterId} deleted from IndexedDB`);
          resolve();
        };
        
        request.onerror = (event) => {
          console.error('Error deleting image from IndexedDB:', event);
          reject('Failed to delete image');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error deleting image:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw error;
  }
}

/**
 * Save a single character to IndexedDB with trait normalization
 * CRITICAL CHANGE: This function now normalizes trait data before saving
 * @param character - The character to save (WILL NOT BE MODIFIED)
 * @param formData - Optional form data used to generate the character
 * @param isExample - Whether this is an example character
 * @returns Promise with the stored character
 */
export async function saveCharacter(
  character: Character, 
  formData?: CharacterFormData, 
  isExample = false
): Promise<StoredCharacter> {
  console.log("Starting character save process with trait normalization...");
  
  // CRITICAL: Create a deep copy and normalize traits immediately
  const originalCharacter = JSON.parse(JSON.stringify(character)) as Character;
  const normalizedCharacter = normalizeCharacterTraits(originalCharacter);
  
  // Clean the character name to prevent ID issues
  if (normalizedCharacter.name) {
    normalizedCharacter.name = sanitizeUserInput(normalizedCharacter.name);
  }
  
  // Generate a unique ID for the character with special character handling
  const characterId = generateCharacterId(normalizedCharacter);
  
  // Create a copy specifically for storage (this one we can modify)
  const storageCharacter = JSON.parse(JSON.stringify(normalizedCharacter)) as Character;
  
  // Process image if available
  let hasStoredImage = false;
  
  if (storageCharacter.image_data && isValidImageData(storageCharacter.image_data)) {
    try {
      const sizeInMB = getBase64Size(storageCharacter.image_data);
      console.log(`Original image size: ${sizeInMB.toFixed(2)}MB`);
      
      // Create a copy of the image data for storage
      let imageDataForStorage = storageCharacter.image_data;
      
      // Compress large images before storing
      if (sizeInMB > 2.0) { // 2MB threshold
        console.log(`Image is large (${sizeInMB.toFixed(2)}MB), compressing...`);
        
        try {
          // Compress to 512px wide with medium quality
          const compressedImage = await compressImage(storageCharacter.image_data, 512, 0.6);
          imageDataForStorage = compressedImage;
          console.log(`Compressed size: ${getBase64Size(compressedImage).toFixed(2)}MB`);
        } catch (compressError) {
          console.error('Compression error:', compressError);
          // Continue with original if compression fails
        }
      }
      
      // Save the image to IndexedDB using the copy
      await saveImage(characterId, imageDataForStorage);
      hasStoredImage = true;
      
      // Remove image data from the STORAGE character only
      // The original character passed in remains completely unchanged
      delete storageCharacter.image_data;
      
      console.log('Image saved to IndexedDB and removed from storage character');
    } catch (error) {
      console.error('Error handling image:', error);
      // Continue without the image
      delete storageCharacter.image_data;
    }
  }
  
  // Make sure selected traits are properly saved in the storage character
  if (formData) {
    // Save main genre and subgenre
    if (formData.genre && !storageCharacter.selected_traits.genre) {
      storageCharacter.selected_traits.genre = formData.genre;
    }
    
    if (formData.sub_genre && !storageCharacter.selected_traits.sub_genre) {
      storageCharacter.selected_traits.sub_genre = formData.sub_genre;
    }
    
    // Save other traits if not already present
    const traitMappings = [
      { form: 'gender', storage: 'gender' },
      { form: 'age_group', storage: 'age_group' },
      { form: 'moral_alignment', storage: 'moral_alignment' },
      { form: 'relationship_to_player', storage: 'relationship_to_player' }
    ];
    
    traitMappings.forEach(({ form, storage }) => {
      if ((formData as any)[form] && !(storageCharacter.selected_traits as any)[storage]) {
        (storageCharacter.selected_traits as any)[storage] = (formData as any)[form];
      }
    });
    
    // Advanced options
    if (formData.advanced_options) {
      // Handle individual advanced options with proper type assertions
      if (formData.advanced_options.species && !storageCharacter.selected_traits.species) {
        (storageCharacter.selected_traits as any).species = formData.advanced_options.species;
      }
      if (formData.advanced_options.occupation && !storageCharacter.selected_traits.occupation) {
        (storageCharacter.selected_traits as any).occupation = formData.advanced_options.occupation;
      }
      if (formData.advanced_options.social_class && !storageCharacter.selected_traits.social_class) {
        (storageCharacter.selected_traits as any).social_class = formData.advanced_options.social_class;
      }
      if (formData.advanced_options.height && !storageCharacter.selected_traits.height) {
        (storageCharacter.selected_traits as any).height = formData.advanced_options.height;
      }
      if (formData.advanced_options.build && !storageCharacter.selected_traits.build) {
        (storageCharacter.selected_traits as any).build = formData.advanced_options.build;
      }
      if (formData.advanced_options.distinctive_features && !storageCharacter.selected_traits.distinctive_features) {
        (storageCharacter.selected_traits as any).distinctive_features = formData.advanced_options.distinctive_features;
      }
      if (formData.advanced_options.homeland && !storageCharacter.selected_traits.homeland) {
        (storageCharacter.selected_traits as any).homeland = formData.advanced_options.homeland;
      }
      
      // Handle personality traits array
      if (formData.advanced_options.personality_traits && 
          formData.advanced_options.personality_traits.length > 0 && 
          !storageCharacter.selected_traits.personality_traits) {
        storageCharacter.selected_traits.personality_traits = [...formData.advanced_options.personality_traits];
      }
    }
  }
  
  // Create a new stored character object using the normalized storage character
  const newStoredCharacter: StoredCharacter = {
    id: characterId,
    character: storageCharacter,  // This is the normalized copy without image_data
    createdAt: new Date().toISOString(),
    isExample,
    formData,
    hasStoredImage
  };
  
  try {
    const db = await initDB();
    
    await new Promise<void>((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
          console.error(`Object store ${CHARACTER_STORE} not found. Available stores:`, 
                       Array.from(db.objectStoreNames));
          reject('Character store not found');
          return;
        }
        
        const transaction = db.transaction([CHARACTER_STORE], 'readwrite');
        const store = transaction.objectStore(CHARACTER_STORE);
        
        const request = store.put(newStoredCharacter);
        
        request.onsuccess = () => {
          console.log(`Character ${characterId} saved to IndexedDB with normalized traits`);
          resolve();
        };
        
        request.onerror = (event) => {
          console.error('Error saving character to IndexedDB:', event);
          reject('Failed to save character');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error saving character:', error);
        reject(error);
      }
    });
    
    // CRITICAL: Return a stored character that references the NORMALIZED original character
    // This way the caller still has all the original data including image_data, but normalized
    const returnCharacter: StoredCharacter = {
      ...newStoredCharacter,
      character: normalizedCharacter  // Return with the complete normalized character
    };
    
    console.log('Character save complete - returning normalized character with image_data intact');
    return returnCharacter;
  } catch (error) {
    console.error('Error saving character:', error);
    
    // Provide more helpful error messages
    if (error instanceof Error) {
      if (error.message.includes('quota')) {
        throw new Error('Storage quota exceeded. Please delete some characters or clear browser data.');
      } else if (error.message.includes('character ID')) {
        throw new Error('Character name contains invalid characters. Please use only letters, numbers, and basic punctuation.');
      }
    }
    
    throw error;
  }
}

/**
 * Delete a character from IndexedDB
 * @param id - ID of the character to delete
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function deleteCharacter(id: string): Promise<boolean> {
  try {
    // First check if the character exists
    const db = await initDB();
    const character = await getCharacterById(id);
    
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
    
    // Delete the character from IndexedDB
    return new Promise((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
          console.error(`Object store ${CHARACTER_STORE} not found. Available stores:`, 
                       Array.from(db.objectStoreNames));
          resolve(false); // Fail silently
          return;
        }
        
        const transaction = db.transaction([CHARACTER_STORE], 'readwrite');
        const store = transaction.objectStore(CHARACTER_STORE);
        
        const request = store.delete(id);
        
        request.onsuccess = () => {
          console.log(`Character ${id} deleted from IndexedDB`);
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error('Error deleting character from IndexedDB:', event);
          reject('Failed to delete character');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error deleting character:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error in deleteCharacter:', error);
    return false;
  }
}

/**
 * Update an existing character in IndexedDB with trait normalization
 * @param id - ID of the character to update
 * @param updatedChar - Updated character data
 * @param updatedFormData - Optional updated form data
 * @returns Promise that resolves to true if successful
 */
export async function updateCharacter(
  id: string, 
  updatedChar: Character, 
  updatedFormData?: CharacterFormData
): Promise<boolean> {
  try {
    // Get the existing character
    const existingChar = await getCharacterById(id);
    
    if (!existingChar) {
      return false; // Character not found
    }
    
    // Create a deep copy and normalize the updated character
    const normalizedCharacter = normalizeCharacterTraits(updatedChar);
    const characterCopy = JSON.parse(JSON.stringify(normalizedCharacter)) as Character;
    
    // Clean the character name
    if (characterCopy.name) {
      characterCopy.name = sanitizeUserInput(characterCopy.name);
    }
    
    // Handle image updates
    let hasStoredImage = existingChar.hasStoredImage || false;
    
    if (characterCopy.image_data && isValidImageData(characterCopy.image_data)) {
      try {
        const sizeInMB = getBase64Size(characterCopy.image_data);
        
        // Compress large images
        if (sizeInMB > 2.0) {
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
        
        // Save the image URL if available, but remove the data
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
    
    // Save the updated character to IndexedDB
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
          console.error(`Object store ${CHARACTER_STORE} not found. Available stores:`, 
                       Array.from(db.objectStoreNames));
          resolve(false); // Fail silently
          return;
        }
        
        const transaction = db.transaction([CHARACTER_STORE], 'readwrite');
        const store = transaction.objectStore(CHARACTER_STORE);
        
        const request = store.put(updatedStoredChar);
        
        request.onsuccess = () => {
          console.log(`Character ${id} updated in IndexedDB with normalized traits`);
          resolve(true);
        };
        
        request.onerror = (event) => {
          console.error('Error updating character in IndexedDB:', event);
          reject('Failed to update character');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error updating character:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error in updateCharacter:', error);
    return false;
  }
}

/**
 * Get a character by ID
 * @param id - ID of the character to get
 * @returns Promise with the character or null if not found
 */
export async function getCharacterById(id: string): Promise<StoredCharacter | null> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      try {
        // Verify the object store exists
        if (!db.objectStoreNames.contains(CHARACTER_STORE)) {
          console.error(`Object store ${CHARACTER_STORE} not found. Available stores:`, 
                       Array.from(db.objectStoreNames));
          resolve(null); // Return null instead of failing
          return;
        }
        
        const transaction = db.transaction([CHARACTER_STORE], 'readonly');
        const store = transaction.objectStore(CHARACTER_STORE);
        
        const request = store.get(id);
        
        request.onsuccess = () => {
          const character = request.result;
          if (character) {
            // Normalize character data when loading
            character.character = normalizeCharacterTraits(character.character);
          }
          resolve(character || null);
        };
        
        request.onerror = (event) => {
          console.error('Error getting character from IndexedDB:', event);
          reject('Failed to get character');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error getting character:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error in getCharacterById:', error);
    return null;
  }
}

/**
 * FIXED: Load a character with its image from IndexedDB - ensures image consistency with retry logic
 * @param id - ID of the character to load
 * @returns Promise with the complete character or null if not found
 */
export async function loadCharacterWithImage(id: string): Promise<Character | null> {
  const maxRetries = 3;
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Loading character with image for ID: ${id} (attempt ${attempt + 1})`);
      
      // Get the character from IndexedDB
      const storedChar = await getCharacterById(id);
      
      if (!storedChar) {
        console.log(`No stored character found for ID: ${id}`);
        return null;
      }
      
      // Create a deep copy of the character
      const character = JSON.parse(JSON.stringify(storedChar.character)) as Character;
      
      // Load the image from IndexedDB if it exists
      if (storedChar.hasStoredImage) {
        try {
          console.log(`Loading image from IndexedDB for character: ${character.name} (attempt ${attempt + 1})`);
          const imageData = await getImage(id);
          if (imageData) {
            character.image_data = imageData;
            console.log(`Successfully loaded image for character: ${character.name} (${imageData.length} chars)`);
          } else {
            console.log(`No image data found in IndexedDB for character: ${character.name} on attempt ${attempt + 1}`);
            
            // If this isn't the last attempt, continue to retry
            if (attempt < maxRetries - 1) {
              lastError = new Error('Image not found');
              continue;
            }
          }
        } catch (error) {
          console.error(`Error loading image from IndexedDB (attempt ${attempt + 1}):`, error);
          lastError = error;
          
          // If this isn't the last attempt, continue to retry
          if (attempt < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)));
            continue;
          }
          // Continue without image if loading fails on final attempt
        }
      } else {
        console.log(`Character ${character.name} has no stored image flag`);
      }
      
      console.log(`Returning character: ${character.name} with image: ${!!(character.image_data || character.image_url)}`);
      return character;
    } catch (error) {
      lastError = error;
      console.error(`Error in loadCharacterWithImage (attempt ${attempt + 1}):`, error);
      
      // If this isn't the last attempt, wait and retry
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)));
      }
    }
  }
  
  console.error(`All ${maxRetries} attempts to load character with image failed for ID: ${id}`, lastError);
  return null;
}

/**
 * FIXED: Generate a unique ID for a character with special character handling
 * @param character - The character to generate an ID for
 * @returns A unique ID string safe for URLs and storage
 */
function generateCharacterId(character: Character): string {
  // Clean the character name of problematic characters
  const baseName = character.name || 'character';
  
  const cleanName = baseName
    .replace(/["""'']/g, '"') // Normalize quotes
    .replace(/—/g, '-') // Replace em dashes
    .replace(/[^\w\s-]/g, '') // Remove other special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase()
    .trim()
    .substring(0, 50); // Limit length
  
  // Ensure we have at least some valid characters
  const finalName = cleanName || 'character';
  
  // Add timestamp to ensure uniqueness
  const timestamp = Date.now();
  
  return `${finalName}-${timestamp}`;
}

/**
 * Check if example characters exist in the database
 */
async function checkExampleCharactersExist(): Promise<boolean> {
  try {
    const characters = await getStoredCharacters();
    return characters.some(char => char.isExample);
  } catch (error) {
    console.error('Error checking for example characters:', error);
    return false;
  }
}

/**
 * Initialize the character library with example characters
 */
export async function initializeLibrary(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  try {
    // Ensure the database is initialized
    const db = await initDB();
    
    // Verify the object stores exist
    const needsObjectStores = !db.objectStoreNames.contains(CHARACTER_STORE) || 
                              !db.objectStoreNames.contains(IMAGE_STORE);
    
    if (needsObjectStores) {
      console.log("Object stores missing, closing and reopening database");
      db.close();
      dbPromise = null;
      
      // Try to recreate the database with the object stores
      try {
        // Delete and recreate the database
        if (indexedDB && indexedDB.deleteDatabase) {
          const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
          deleteRequest.onsuccess = async () => {
            console.log("Database deleted, recreating...");
            // Now reinitialize
            await initDB();
            
            // Now try to load examples again
            await saveExampleCharacters();
          };
          return; // Return here, the callback will handle loading examples
        }
      } catch (e) {
        console.error("Error during database reset:", e);
      }
    } else {
      // Check if examples already exist in the database
      const examplesExist = await checkExampleCharactersExist();
      
      if (!examplesExist) {
        console.log("No example characters found, adding them now");
        await saveExampleCharacters();
      } else {
        console.log("Example characters already exist, skipping initialization");
      }
    }
  } catch (error) {
    console.error('Failed to initialize example characters', error);
  }
}

/**
 * Save example characters to the database
 */
async function saveExampleCharacters(): Promise<void> {
  console.log('Saving example characters...');
  
  try {
    // Process example characters one by one
    for (const char of exampleCharacters) {
      const existingCharacters = await getStoredCharacters();
      const isDuplicate = existingCharacters.some(
        existing => existing.isExample && existing.character.name === char.name
      );
      
      if (!isDuplicate) {
        await saveCharacter(char as Character, undefined, true);
      } else {
        console.log(`Example character ${char.name} already exists, skipping`);
      }
    }
    
    console.log('Example characters loaded successfully');
  } catch (error) {
    console.error('Error saving example characters:', error);
  }
}

// Helper function to reset the database if needed
export async function resetDatabase(): Promise<void> {
  if (typeof window === 'undefined') return;
  
  console.log("Manually resetting database...");
  
  try {
    // Close any existing DB connection
    if (dbPromise) {
      const db = await dbPromise;
      db.close();
      dbPromise = null;
    }
    
    // Delete the database
    return new Promise((resolve, reject) => {
      const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
      
      deleteRequest.onsuccess = () => {
        console.log("Database deleted successfully");
        resolve();
      };
      
      deleteRequest.onerror = (event) => {
        console.error("Error deleting database:", event);
        reject("Could not delete database");
      };
    });
  } catch (error) {
    console.error("Error resetting database:", error);
    throw error;
  }
}