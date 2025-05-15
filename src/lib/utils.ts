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
 * Get character traits as a flat array of strings for display - excludes appearance, personality, backstory
 */
export function getCharacterTraitsArray(character: Character): string[] {
  const traits: string[] = [];
  
  // Add selected traits - exclude appearance, personality, backstory_hook
  if (character.selected_traits) {
    Object.entries(character.selected_traits).forEach(([key, value]) => {
      // Skip these fields as they're displayed separately
      if (key === 'appearance' || key === 'personality' || key === 'backstory_hook') {
        return;
      }
      
      if (value) {
        // Handle different key types
        if (key === 'genre') {
          // Handle genre which might be string or string[]
          if (typeof value === 'string') {
            traits.push(`Genre: ${formatTraitValue(value)}`);
          } else if (Array.isArray(value)) {
            traits.push(`Genre: ${value.map(v => formatTraitValue(v)).join(', ')}`);
          }
        } else if (key === 'sub_genre') {
          // Handle sub_genre
          if (typeof value === 'string') {
            traits.push(`Sub-genre: ${formatTraitValue(value)}`);
          }
        } else if (key === 'gender') {
          // Handle gender which should be a string
          if (typeof value === 'string') {
            traits.push(`Gender: ${formatTraitValue(value)}`);
          }
        } else if (key === 'age_group') {
          // Handle age_group which should be a string
          if (typeof value === 'string') {
            traits.push(`Age: ${formatTraitValue(value)}`);
          }
        } else if (key === 'species') {
          // Handle species
          if (typeof value === 'string') {
            traits.push(`Species: ${formatTraitValue(value)}`);
          }
        } else if (key === 'moral_alignment') {
          // Handle moral_alignment which should be a string
          if (typeof value === 'string') {
            traits.push(`Alignment: ${formatTraitValue(value)}`);
          }
        } else if (key === 'relationship_to_player') {
          // Handle relationship_to_player which should be a string
          if (typeof value === 'string') {
            traits.push(`Relation: ${formatTraitValue(value)}`);
          }
        } else if (key === 'occupation') {
          // Handle occupation
          if (typeof value === 'string') {
            traits.push(`Occupation: ${formatTraitValue(value)}`);
          }
        } else if (key === 'social_class') {
          // Handle social class
          if (typeof value === 'string') {
            traits.push(`Social Class: ${formatTraitValue(value)}`);
          }
        } else if (key === 'height') {
          // Handle height
          if (typeof value === 'string') {
            traits.push(`Height: ${formatTraitValue(value)}`);
          }
        } else if (key === 'build') {
          // Handle build
          if (typeof value === 'string') {
            traits.push(`Build: ${formatTraitValue(value)}`);
          }
        } else if (key === 'distinctive_features') {
          // Handle distinctive features
          if (typeof value === 'string') {
            traits.push(`Features: ${value}`);
          }
        } else if (key === 'homeland') {
          // Handle homeland
          if (typeof value === 'string') {
            traits.push(`Homeland: ${value}`);
          }
        } else if (key === 'personality_traits' && Array.isArray(value)) {
          // Handle personality_traits array - add each trait individually
          value.forEach(trait => {
            if (trait) {
              traits.push(formatTraitValue(trait));
            }
          });
        } else if (typeof value === 'string') {
          // Handle any other string values
          traits.push(`${formatTraitKey(key)}: ${formatTraitValue(value)}`);
        }
      }
    });
  }
  
  // Add AI-added traits (excluding appearance, personality, backstory_hook)
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
      
      if (Array.isArray(value)) {
        value.forEach(item => {
          if (item && typeof item === 'string') {
            traits.push(formatTraitValue(item));
          }
        });
      } else if (typeof value === 'string') {
        traits.push(`${formatTraitKey(key)}: ${formatTraitValue(value)}`);
      }
    });
  }
  
  return traits;
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