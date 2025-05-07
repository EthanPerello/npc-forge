// IndexedDB utility for storing and retrieving character portrait images
// This allows us to store large images without hitting localStorage limits

const DB_NAME = 'npc-forge-db';
const DB_VERSION = 1;
const STORE_NAME = 'character-images';

/**
 * Initialize the IndexedDB database
 * @returns Promise that resolves when the database is ready
 */
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event);
      reject('Could not open IndexedDB');
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create an object store for character images if it doesn't exist
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
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
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
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
        db.close();
      };
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
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
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
        db.close();
      };
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
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
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
        db.close();
      };
    });
  } catch (error) {
    console.error('Error in deleteImage:', error);
    throw error;
  }
}

/**
 * Generate a placeholder image for testing or when generation fails
 * @returns A simple SVG data URL
 */
export function generatePlaceholderImage(): string {
  // Generate a simple SVG placeholder with the character's initials
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="#4F46E5" />
      <circle cx="256" cy="180" r="120" fill="#E5E7EB" />
      <rect x="96" y="340" width="320" height="240" rx="20" fill="#E5E7EB" />
    </svg>
  `;
  
  // Convert SVG to a data URL
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Helper to check if IndexedDB is available in the current browser
 */
export function isIndexedDBAvailable(): boolean {
  return !!window.indexedDB;
}