import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Character } from './types';

/**
 * Combines class names with clsx and tailwind-merge for optimal Tailwind CSS usage
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Formats a character name for use in filenames or URLs
 */
export function formatNameForUrl(name: string): string {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

/**
 * Downloads a JSON object as a file
 */
export function downloadJson(data: any, filename: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const href = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}

/**
 * Handles API errors in a consistent way
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

/**
 * Creates a delay for a specified number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Filters out undefined or null values from an object
 */
export function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const cleanedNested = removeEmptyValues(value);
        if (Object.keys(cleanedNested).length > 0) {
          acc[key as keyof T] = cleanedNested as T[keyof T];
        }
      } else if (Array.isArray(value) && value.length > 0) {
        acc[key as keyof T] = value as T[keyof T];
      } else if (value !== '') {
        acc[key as keyof T] = value as T[keyof T];
      }
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * Format a trait key from snake_case or camelCase to Title Case with spaces
 */
export function formatTraitKey(key: string): string {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Format a trait value to be properly capitalized and without underscores
 */
export function formatTraitValue(value: string): string {
  return value
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get all character traits as a flat array of strings with consistent prefixes
 * This ensures all traits are displayed with their category prefix
 */
export function getCharacterTraitsArray(character: Character): string[] {
  const traits: string[] = [];
  
  // Define trait category mappings with user-friendly labels
  const traitCategoryLabels: Record<string, string> = {
    genre: 'Genre',
    sub_genre: 'Sub-genre',
    gender: 'Gender',
    age_group: 'Age',
    species: 'Species',
    moral_alignment: 'Alignment',
    relationship_to_player: 'Relation',
    occupation: 'Occupation',
    social_class: 'Social Class',
    height: 'Height',
    build: 'Build',
    distinctive_features: 'Features',
    homeland: 'Homeland',
    personality_traits: 'Personality',
    physical_traits: 'Physical',
    background_traits: 'Background',
    skills: 'Skills',
    abilities: 'Abilities',
    quirks: 'Quirks',
    flaws: 'Flaws',
    motivations: 'Motivations',
    fears: 'Fears',
    goals: 'Goals'
  };
  
  // Process selected traits - exclude appearance, personality, backstory_hook as they're displayed separately
  if (character.selected_traits) {
    Object.entries(character.selected_traits).forEach(([key, value]) => {
      // Skip these fields as they're displayed separately in the profile
      if (key === 'appearance' || key === 'personality' || key === 'backstory_hook') {
        return;
      }
      
      if (value) {
        const label = traitCategoryLabels[key] || formatTraitKey(key);
        
        if (key === 'personality_traits' && Array.isArray(value)) {
          // Handle personality_traits array - add each trait with Personality prefix
          value.forEach(trait => {
            if (trait) {
              traits.push(`Personality: ${formatTraitValue(trait)}`);
            }
          });
        } else if (Array.isArray(value)) {
          // Handle other array values
          value.forEach(item => {
            if (item && typeof item === 'string') {
              traits.push(`${label}: ${formatTraitValue(item)}`);
            }
          });
        } else if (typeof value === 'string') {
          traits.push(`${label}: ${formatTraitValue(value)}`);
        }
      }
    });
  }
  
  // Process AI-added traits (excluding appearance, personality, backstory_hook)
  if (character.added_traits) {
    Object.entries(character.added_traits).forEach(([key, value]) => {
      // Skip these fields as they're displayed separately
      if (key === 'appearance' || key === 'personality' || key === 'backstory_hook') {
        return;
      }
      
      // Skip if this trait was already added from selected_traits
      if (character.selected_traits && (character.selected_traits as any)[key]) {
        return;
      }
      
      const label = traitCategoryLabels[key] || formatTraitKey(key);
      
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item && typeof item === 'string') {
            traits.push(`${label}: ${formatTraitValue(item)}`);
          }
        });
      } else if (typeof value === 'string') {
        traits.push(`${label}: ${formatTraitValue(value)}`);
      }
    });
  }
  
  return traits;
}

/**
 * Get all traits from a character as a searchable string for filtering
 * This creates a comprehensive string that includes all trait data for searching
 */
export function getCharacterTraitsForSearch(character: Character): string {
  const searchableTraits: string[] = [];
  
  // Add basic character info
  searchableTraits.push(character.name.toLowerCase());
  
  // Add all traits from getCharacterTraitsArray (already includes prefixes)
  const formattedTraits = getCharacterTraitsArray(character);
  searchableTraits.push(...formattedTraits.map(trait => trait.toLowerCase()));
  
  // Add appearance, personality, and backstory for comprehensive search
  if (character.appearance) {
    searchableTraits.push(`appearance: ${character.appearance.toLowerCase()}`);
  }
  if (character.personality) {
    searchableTraits.push(`personality: ${character.personality.toLowerCase()}`);
  }
  if (character.backstory_hook) {
    searchableTraits.push(`backstory: ${character.backstory_hook.toLowerCase()}`);
  }
  
  // Add quest, dialogue, and item data for comprehensive search
  if (character.quests && character.quests.length > 0) {
    character.quests.forEach(quest => {
      searchableTraits.push(`quest: ${quest.title.toLowerCase()}`);
      searchableTraits.push(`quest: ${quest.description.toLowerCase()}`);
    });
  }
  
  if (character.dialogue_lines && character.dialogue_lines.length > 0) {
    character.dialogue_lines.forEach(line => {
      searchableTraits.push(`dialogue: ${line.toLowerCase()}`);
    });
  }
  
  if (character.items && character.items.length > 0) {
    character.items.forEach(item => {
      // Handle both string items and object items
      if (typeof item === 'string') {
        searchableTraits.push(`item: ${item.toLowerCase()}`);
      } else if (item && typeof item === 'object') {
        // Cast to any to handle unknown item object structure
        const itemObj = item as any;
        // If item is an object, try to access name and description properties
        if (itemObj.name) {
          searchableTraits.push(`item: ${String(itemObj.name).toLowerCase()}`);
        }
        if (itemObj.description) {
          searchableTraits.push(`item: ${String(itemObj.description).toLowerCase()}`);
        }
        // Also search the entire item as a string if it has a toString method
        searchableTraits.push(`item: ${String(item).toLowerCase()}`);
      }
    });
  }
  
  return searchableTraits.join(' ');
}

/**
 * Filter characters by trait search query
 * Supports partial matches, case-insensitive search, and prefix-aware filtering
 */
export function filterCharactersByTraits<T extends { character: Character }>(
  characters: T[], 
  searchQuery: string
): T[] {
  if (!searchQuery.trim()) return characters;
  
  const query = searchQuery.toLowerCase().trim();
  
  return characters.filter(stored => {
    const searchableContent = getCharacterTraitsForSearch(stored.character);
    
    // Support multiple search terms (space-separated)
    const searchTerms = query.split(/\s+/);
    
    // All search terms must match (AND logic)
    return searchTerms.every(term => {
      // Support both "trait:value" and "value" search patterns
      if (term.includes(':')) {
        // Direct prefix:value search
        return searchableContent.includes(term);
      } else {
        // Partial match search - matches anywhere in the content
        return searchableContent.includes(term);
      }
    });
  });
}

/**
 * Get unique trait values from characters for filter dropdowns
 * This extracts all possible values for each trait category
 */
export function getUniqueTraitValues<T extends { character: Character }>(characters: T[]): {
  [category: string]: string[]
} {
  const traitValues: { [category: string]: Set<string> } = {};
  
  characters.forEach(stored => {
    const traits = getCharacterTraitsArray(stored.character);
    
    traits.forEach(trait => {
      if (trait.includes(':')) {
        const [category, value] = trait.split(':', 2);
        const categoryKey = category.trim().toLowerCase();
        const categoryValue = value.trim();
        
        if (!traitValues[categoryKey]) {
          traitValues[categoryKey] = new Set();
        }
        traitValues[categoryKey].add(categoryValue);
      }
    });
  });
  
  // Convert Sets to sorted arrays
  const result: { [category: string]: string[] } = {};
  Object.entries(traitValues).forEach(([category, valueSet]) => {
    result[category] = Array.from(valueSet).sort();
  });
  
  return result;
}

/**
 * Normalize trait data to ensure consistent prefix format
 * This should be called when saving or updating character data
 */
export function normalizeCharacterTraits(character: Character): Character {
  const normalized = JSON.parse(JSON.stringify(character)) as Character;
  
  // Ensure selected_traits are properly formatted
  if (normalized.selected_traits) {
    // Process personality_traits to ensure they don't already have prefixes
    if (normalized.selected_traits.personality_traits && Array.isArray(normalized.selected_traits.personality_traits)) {
      normalized.selected_traits.personality_traits = normalized.selected_traits.personality_traits.map(trait => {
        if (typeof trait === 'string') {
          // Remove existing "Personality: " prefix if present
          return trait.replace(/^personality:\s*/i, '');
        }
        return trait;
      });
    }
  }
  
  // Ensure added_traits are properly formatted
  if (normalized.added_traits) {
    Object.entries(normalized.added_traits).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Remove any existing prefixes from array values
        (normalized.added_traits as any)[key] = value.map(item => {
          if (typeof item === 'string') {
            // Remove category prefix if it exists (e.g., "Skills: archery" -> "archery")
            const colonIndex = item.indexOf(':');
            return colonIndex !== -1 ? item.substring(colonIndex + 1).trim() : item;
          }
          return item;
        });
      } else if (typeof value === 'string') {
        // Remove category prefix if it exists
        const colonIndex = value.indexOf(':');
        (normalized.added_traits as any)[key] = colonIndex !== -1 ? value.substring(colonIndex + 1).trim() : value;
      }
    });
  }
  
  return normalized;
}

/**
 * Debounce function for limiting how often a function can be called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Sanitizes user input to remove potential control characters and normalize whitespace
 */
export function sanitizeUserInput(input: string): string {
    if (!input) return '';
    
    // Remove any control characters
    let sanitized = input.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
    
    // Normalize whitespace (but preserve paragraph breaks)
    sanitized = sanitized.replace(/[ \t\v\f]+/g, ' ');
    
    // Trim leading/trailing whitespace
    return sanitized.trim();
}

/**
 * Compresses a base64 image to a smaller size while maintaining reasonable quality
 * @param base64Image - The base64 image data URL to compress
 * @param maxWidth - Maximum width in pixels (maintains aspect ratio)
 * @param quality - JPEG quality (0-1)
 * @returns Promise with the compressed image as a data URL
 */
export async function compressImage(
  base64Image: string,
  maxWidth = 512, // Halve the image size from 1024
  quality = 0.6  // Medium-low quality is usually sufficient for character portraits
): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create an image to load the base64 data
    const img = new Image();
    
    // Set up load and error handlers
    img.onload = () => {
      try {
        // Calculate new dimensions while preserving aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * ratio);
        }
        
        // Create a canvas to draw the resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Get the 2D context and draw the image
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Draw the image with a white background to handle transparency
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG format with specified quality
        // JPEG has much better compression than PNG for photos
        const compressedImage = canvas.toDataURL('image/jpeg', quality);
        
        // Log compression results
        const originalSize = getBase64Size(base64Image);
        const compressedSize = getBase64Size(compressedImage);
        console.log(`Image compressed from ${originalSize.toFixed(2)}MB to ${compressedSize.toFixed(2)}MB (${Math.round((compressedSize/originalSize)*100)}% of original)`);
        
        resolve(compressedImage);
      } catch (error) {
        console.error('Error compressing image:', error);
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };
    
    // Start loading the image
    img.src = base64Image;
  });
}

/**
 * Estimates the size of a base64 string in megabytes
 */
export function getBase64Size(base64: string): number {
  // Remove the data URL prefix to get just the base64 data
  const base64Data = base64.split(',')[1];
  if (!base64Data) return 0;
  
  // Base64 represents 6 bits per character, while 1 byte is 8 bits
  // So 4 base64 characters represent 3 bytes (24 bits / 8 = 3)
  const sizeInBytes = (base64Data.length * 3) / 4;
  
  // Convert to megabytes
  return sizeInBytes / (1024 * 1024);
}

/**
 * Checks if a data URL contains valid image data
 */
export function isValidImageData(dataUrl: string): boolean {
  return !!dataUrl && 
    (dataUrl.startsWith('data:image/') || dataUrl.startsWith('data:application/octet-stream')) && 
    dataUrl.includes('base64');
}