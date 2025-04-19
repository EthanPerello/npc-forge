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
 * Get character traits as a flat array of strings for display
 */
export function getCharacterTraitsArray(character: Character): string[] {
  const traits: string[] = [];
  
  // Add selected traits
  if (character.selected_traits) {
    Object.entries(character.selected_traits).forEach(([key, value]) => {
      if (value) {
        // Handle different key types
        if (key === 'genre') {
          // Handle genre which might be string or string[]
          if (typeof value === 'string') {
            traits.push(`Genre: ${formatTraitValue(value)}`);
          } else if (Array.isArray(value)) {
            traits.push(`Genre: ${value.map(v => formatTraitValue(v)).join(', ')}`);
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
        } else if (key === 'personality_traits' && Array.isArray(value)) {
          // Handle personality_traits array
          traits.push(`Traits: ${value.map(v => formatTraitValue(v)).join(', ')}`);
        } else if (typeof value === 'string') {
          // Handle any other string values
          traits.push(`${formatTraitKey(key)}: ${formatTraitValue(value)}`);
        }
      }
    });
  }
  
  // Add AI-added traits
  if (character.added_traits) {
    Object.entries(character.added_traits).forEach(([key, value]) => {
      if (typeof value === 'string') {
        traits.push(`${formatTraitKey(key)}: ${formatTraitValue(value)}`);
      }
    });
  }
  
  return traits;
}

/**
 * Capitalize the first letter of each word in a string
 */
export function capitalizeFirstLetter(string: string): string {
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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