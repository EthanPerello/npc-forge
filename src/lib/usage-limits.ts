/**
 * Utility for tracking and managing character generation usage limits
 * Uses localStorage to track generations on a per-model basis
 */

import { OpenAIModel, ImageModel } from './types';
import { getModelConfig, DEFAULT_MODEL, MODEL_CONFIGS } from './models';
import { getImageModelConfig, DEFAULT_IMAGE_MODEL, IMAGE_MODEL_CONFIGS } from './image-models';

// Constants
const STORAGE_KEY_PREFIX = 'npc-forge-usage';

// Define usage data structure
interface UsageData {
  count: number;         // Number of generations this month
  monthKey: string;      // Current month identifier (YYYY-MM format)
  lastUpdated: string;   // ISO date string of last update
}

// Map to store usage data for each model
interface AllUsageData {
  [modelId: string]: UsageData;
}

/**
 * Check if the app is running in development mode
 */
function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Get the current month key in YYYY-MM format
 */
function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Get the storage key for a specific model
 */
function getStorageKey(model: string): string {
  return `${STORAGE_KEY_PREFIX}-${model}`;
}

/**
 * Check if localStorage is available and accessible
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }
  
  try {
    // Test localStorage access
    const testKey = '__npc_forge_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn('localStorage is not accessible:', error);
    return false;
  }
}

/**
 * Safe localStorage operations with error handling
 */
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (!isLocalStorageAvailable()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Error getting localStorage item ${key}:`, error);
      return null;
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    if (!isLocalStorageAvailable()) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Error setting localStorage item ${key}:`, error);
      return false;
    }
  },
  
  removeItem: (key: string): boolean => {
    if (!isLocalStorageAvailable()) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing localStorage item ${key}:`, error);
      return false;
    }
  }
};

/**
 * Get the current usage data for a specific model from localStorage
 */
export function getUsageData(model: OpenAIModel | ImageModel = DEFAULT_MODEL): UsageData {
  // Default data for new users
  const defaultData: UsageData = {
    count: 0,
    monthKey: getCurrentMonthKey(),
    lastUpdated: new Date().toISOString()
  };
  
  // Check if localStorage is available (will not be in SSR)
  if (!isLocalStorageAvailable()) {
    return defaultData;
  }
  
  try {
    // Try to get and parse stored data for the specific model
    const storageKey = getStorageKey(model);
    const storedData = safeLocalStorage.getItem(storageKey);
    if (!storedData) return defaultData;
    
    const parsedData: UsageData = JSON.parse(storedData);
    
    // Validate parsed data structure
    if (!parsedData || typeof parsedData !== 'object' || 
        typeof parsedData.count !== 'number' || 
        typeof parsedData.monthKey !== 'string' ||
        typeof parsedData.lastUpdated !== 'string') {
      console.warn(`Invalid usage data structure for model ${model}, using defaults`);
      return defaultData;
    }
    
    const currentMonthKey = getCurrentMonthKey();
    
    // Reset count if it's a new month
    if (parsedData.monthKey !== currentMonthKey) {
      const resetData: UsageData = {
        count: 0,
        monthKey: currentMonthKey,
        lastUpdated: new Date().toISOString()
      };
      safeLocalStorage.setItem(storageKey, JSON.stringify(resetData));
      return resetData;
    }
    
    return parsedData;
  } catch (error) {
    console.error(`Error reading usage data for model ${model}:`, error);
    return defaultData;
  }
}

/**
 * Get usage data for all models
 */
export function getAllUsageData(): AllUsageData {
  const allData: AllUsageData = {};
  
  try {
    // Get data for each configured model
    MODEL_CONFIGS.forEach(config => {
      allData[config.id] = getUsageData(config.id);
    });
    
    // Get data for image models too
    IMAGE_MODEL_CONFIGS.forEach(config => {
      allData[config.id] = getUsageData(config.id);
    });
  } catch (error) {
    console.error('Error getting all usage data:', error);
  }
  
  return allData;
}

/**
 * Increment the usage count for a specific model
 */
export function incrementUsage(model: OpenAIModel | ImageModel = DEFAULT_MODEL): UsageData {
  // In development mode, don't actually increment the count
  if (isDevMode()) {
    console.log(`[DEV MODE] Skipping usage increment for model ${model}`);
    return getUsageData(model);
  }
  
  const currentData = getUsageData(model);
  const updatedData: UsageData = {
    ...currentData,
    count: currentData.count + 1,
    lastUpdated: new Date().toISOString()
  };
  
  // Save to localStorage if available
  if (isLocalStorageAvailable()) {
    const storageKey = getStorageKey(model);
    const success = safeLocalStorage.setItem(storageKey, JSON.stringify(updatedData));
    if (!success) {
      console.warn(`Failed to save usage data for model ${model}`);
    }
  }
  
  return updatedData;
}

/**
 * Check if the user has reached their monthly limit for a specific model
 */
export function hasReachedLimit(model: OpenAIModel | ImageModel = DEFAULT_MODEL): boolean {
  // In development mode, never reach the limit
  if (isDevMode()) {
    console.log(`[DEV MODE] Bypassing usage limits for model ${model}`);
    return false;
  }
  
  try {
    // Check if model is a text model or image model
    const isTextModel = MODEL_CONFIGS.some(config => config.id === model);
    const isImageModel = IMAGE_MODEL_CONFIGS.some(config => config.id === model);
    
    // Get the monthly limit based on model type
    let monthlyLimit: number;
    if (isTextModel) {
      const config = getModelConfig(model as OpenAIModel);
      monthlyLimit = config ? config.monthlyLimit : 15; // Default fallback
    } else if (isImageModel) {
      const config = getImageModelConfig(model as ImageModel);
      monthlyLimit = config ? config.monthlyLimit : 5; // Default fallback
    } else {
      // Default to a reasonable limit if model not found
      monthlyLimit = 15;
    }
    
    const { count } = getUsageData(model);
    return count >= monthlyLimit;
  } catch (error) {
    console.error(`Error checking usage limit for model ${model}:`, error);
    // Fail open - allow usage if we can't check limits
    return false;
  }
}

/**
 * Get the number of remaining generations for the current month for a specific model
 */
export function getRemainingGenerations(model: OpenAIModel | ImageModel = DEFAULT_MODEL): number | string {
  // In development mode, return "Unlimited" for UI display
  if (isDevMode()) {
    return "Unlimited";
  }
  
  try {
    // Check if model is a text model or image model
    const isTextModel = MODEL_CONFIGS.some(config => config.id === model);
    const isImageModel = IMAGE_MODEL_CONFIGS.some(config => config.id === model);
    
    // Get the monthly limit based on model type
    let monthlyLimit: number;
    if (isTextModel) {
      const config = getModelConfig(model as OpenAIModel);
      monthlyLimit = config ? config.monthlyLimit : 15; // Default fallback
    } else if (isImageModel) {
      const config = getImageModelConfig(model as ImageModel);
      monthlyLimit = config ? config.monthlyLimit : 5; // Default fallback
    } else {
      // Default to a low limit if model not found
      monthlyLimit = 10;
    }
    
    const { count } = getUsageData(model);
    return Math.max(0, monthlyLimit - count);
  } catch (error) {
    console.error(`Error getting remaining generations for model ${model}:`, error);
    return 0;
  }
}

/**
 * Get the monthly limit for a specific model
 */
export function getMonthlyLimit(model: OpenAIModel | ImageModel = DEFAULT_MODEL): number | string {
  // In development mode, return "Unlimited" for UI display
  if (isDevMode()) {
    return "Unlimited";
  }
  
  try {
    // Check if model is a text model or image model
    const isTextModel = MODEL_CONFIGS.some(config => config.id === model);
    const isImageModel = IMAGE_MODEL_CONFIGS.some(config => config.id === model);
    
    // Get the monthly limit based on model type
    let monthlyLimit: number;
    if (isTextModel) {
      const config = getModelConfig(model as OpenAIModel);
      monthlyLimit = config ? config.monthlyLimit : 15; // Default fallback
    } else if (isImageModel) {
      const config = getImageModelConfig(model as ImageModel);
      monthlyLimit = config ? config.monthlyLimit : 5; // Default fallback
    } else {
      // Default to a low limit if model not found
      monthlyLimit = 10;
    }
    
    return monthlyLimit;
  } catch (error) {
    console.error(`Error getting monthly limit for model ${model}:`, error);
    return 10; // Safe default
  }
}

/**
 * Clear usage data (for testing purposes)
 */
export function clearUsageData(model?: OpenAIModel | ImageModel): void {
  if (!isLocalStorageAvailable()) {
    console.warn('Cannot clear usage data: localStorage not available');
    return;
  }
  
  try {
    if (model) {
      // Clear for specific model
      safeLocalStorage.removeItem(getStorageKey(model));
    } else {
      // Clear for all models
      MODEL_CONFIGS.forEach(config => {
        safeLocalStorage.removeItem(getStorageKey(config.id));
      });
      IMAGE_MODEL_CONFIGS.forEach(config => {
        safeLocalStorage.removeItem(getStorageKey(config.id));
      });
    }
  } catch (error) {
    console.error('Error clearing usage data:', error);
  }
}