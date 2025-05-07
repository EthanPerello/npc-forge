import { Character, CharacterFormData } from './types';
import { exampleCharacters } from './example-characters';
import { compressImage, getBase64Size, isValidImageData } from './utils';

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
          resolve(characters);
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
 * Save an image to IndexedDB
 * @param characterId - ID of the character the image belongs to
 * @param imageData - Base64 string of the image data
 * @returns Promise that resolves when the image is saved
 */
export async function saveImage(characterId: string, imageData: string): Promise<void> {
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
          console.log(`Image for character ${characterId} saved to IndexedDB`);
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
 * Get an image from IndexedDB
 * @param characterId - ID of the character to get the image for
 * @returns Promise that resolves with the image data, or null if not found
 */
export async function getImage(characterId: string): Promise<string | null> {
  try {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
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
          resolve(imageData || null);
        };
        
        request.onerror = (event) => {
          console.error('Error getting image from IndexedDB:', event);
          reject('Failed to get image');
        };
        
        transaction.oncomplete = () => {
          // Don't close the database here to allow reuse
        };
      } catch (error) {
        console.error('Transaction error getting image:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error in getImage:', error);
    return null;
  }
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
 * Save a single character to IndexedDB
 * @param character - The character to save
 * @param formData - Optional form data used to generate the character
 * @param isExample - Whether this is an example character
 * @returns Promise with the stored character
 */
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
      if (sizeInMB > 2.0) { // 2MB threshold
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
      
      // Keep image_data in the character object temporarily to display on the current screen
      // We'll clone it before saving to remove the data
    } catch (error) {
      console.error('Error handling image:', error);
      // Continue without the image
      delete characterCopy.image_data;
    }
  }
  
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
  
  // Clone the character before removing image_data for storage
  const storageCharacter = JSON.parse(JSON.stringify(characterCopy)) as Character;
  
  // Remove image data from the storage character to save space
  if (hasStoredImage && storageCharacter.image_data) {
    delete storageCharacter.image_data;
  }
  
  // Create a new stored character object
  const newStoredCharacter: StoredCharacter = {
    id: characterId,
    character: storageCharacter,
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
          console.log(`Character ${characterId} saved to IndexedDB`);
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
    
    // Return the character with image data if it was saved
    // This is important for showing the image on the current screen
    const returnCharacter = {
      ...newStoredCharacter,
      character: characterCopy  // Use the version that might still have image_data
    };
    
    return returnCharacter;
  } catch (error) {
    console.error('Error saving character:', error);
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
 * Update an existing character in IndexedDB
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
    
    // Create a deep copy of the updated character
    const characterCopy = JSON.parse(JSON.stringify(updatedChar)) as Character;
    
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
          console.log(`Character ${id} updated in IndexedDB`);
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
 * Load a character with its image from IndexedDB
 * @param id - ID of the character to load
 * @returns Promise with the complete character or null if not found
 */
export async function loadCharacterWithImage(id: string): Promise<Character | null> {
  try {
    // Get the character from IndexedDB
    const storedChar = await getCharacterById(id);
    
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
  } catch (error) {
    console.error('Error in loadCharacterWithImage:', error);
    return null;
  }
}

/**
 * Generate a unique ID for a character
 * @param character - The character to generate an ID for
 * @returns A unique ID string
 */
function generateCharacterId(character: Character): string {
  return `${character.name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
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