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
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return defaultData;
  }
  
  try {
    // Try to get and parse stored data for the specific model
    const storageKey = getStorageKey(model);
    const storedData = localStorage.getItem(storageKey);
    if (!storedData) return defaultData;
    
    const parsedData: UsageData = JSON.parse(storedData);
    const currentMonthKey = getCurrentMonthKey();
    
    // Reset count if it's a new month
    if (parsedData.monthKey !== currentMonthKey) {
      const resetData: UsageData = {
        count: 0,
        monthKey: currentMonthKey,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify(resetData));
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
  
  // Get data for each configured model
  MODEL_CONFIGS.forEach(config => {
    allData[config.id] = getUsageData(config.id);
  });
  
  // Get data for image models too
  IMAGE_MODEL_CONFIGS.forEach(config => {
    allData[config.id] = getUsageData(config.id);
  });
  
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
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const storageKey = getStorageKey(model);
    localStorage.setItem(storageKey, JSON.stringify(updatedData));
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
  
  // Check if model is a text model or image model
  const isTextModel = MODEL_CONFIGS.some(config => config.id === model);
  const isImageModel = IMAGE_MODEL_CONFIGS.some(config => config.id === model);
  
  // Get the monthly limit based on model type
  let monthlyLimit: number;
  if (isTextModel) {
    monthlyLimit = getModelConfig(model as OpenAIModel).monthlyLimit;
  } else if (isImageModel) {
    monthlyLimit = getImageModelConfig(model as ImageModel).monthlyLimit;
  } else {
    // Default to a reasonable limit if model not found
    monthlyLimit = 15;
  }
  
  // If monthly limit is Infinity, the user never reaches the limit
  if (monthlyLimit === Infinity) {
    return false;
  }
  
  const { count } = getUsageData(model);
  return count >= monthlyLimit;
}

/**
 * Get the number of remaining generations for the current month for a specific model
 */
export function getRemainingGenerations(model: OpenAIModel | ImageModel = DEFAULT_MODEL): number | string {
  // In development mode, always return unlimited
  if (isDevMode()) {
    return "Unlimited";
  }
  
  // Check if model is a text model or image model
  const isTextModel = MODEL_CONFIGS.some(config => config.id === model);
  const isImageModel = IMAGE_MODEL_CONFIGS.some(config => config.id === model);
  
  // Get the monthly limit based on model type
  let monthlyLimit: number;
  if (isTextModel) {
    monthlyLimit = getModelConfig(model as OpenAIModel).monthlyLimit;
  } else if (isImageModel) {
    monthlyLimit = getImageModelConfig(model as ImageModel).monthlyLimit;
  } else {
    // Default to a reasonable limit if model not found
    monthlyLimit = 15;
  }
  
  // If monthly limit is Infinity, return "Unlimited"
  if (monthlyLimit === Infinity) {
    return "Unlimited";
  }
  
  const { count } = getUsageData(model);
  return Math.max(0, monthlyLimit - count);
}

/**
 * Get the monthly limit for a specific model
 */
export function getMonthlyLimit(model: OpenAIModel | ImageModel = DEFAULT_MODEL): number | string {
  // In development mode, return "Unlimited"
  if (isDevMode()) {
    return "Unlimited";
  }
  
  // Check if model is a text model or image model
  const isTextModel = MODEL_CONFIGS.some(config => config.id === model);
  const isImageModel = IMAGE_MODEL_CONFIGS.some(config => config.id === model);
  
  // Get the monthly limit based on model type
  let monthlyLimit: number;
  if (isTextModel) {
    monthlyLimit = getModelConfig(model as OpenAIModel).monthlyLimit;
  } else if (isImageModel) {
    monthlyLimit = getImageModelConfig(model as ImageModel).monthlyLimit;
  } else {
    // Default to a reasonable limit if model not found
    monthlyLimit = 15;
  }
  
  // If monthly limit is Infinity, return "Unlimited"
  if (monthlyLimit === Infinity) {
    return "Unlimited";
  }
  
  return monthlyLimit;
}

/**
 * Clear usage data (for testing purposes)
 */
export function clearUsageData(model?: OpenAIModel | ImageModel): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    if (model) {
      // Clear for specific model
      localStorage.removeItem(getStorageKey(model));
    } else {
      // Clear for all models
      MODEL_CONFIGS.forEach(config => {
        localStorage.removeItem(getStorageKey(config.id));
      });
      IMAGE_MODEL_CONFIGS.forEach(config => {
        localStorage.removeItem(getStorageKey(config.id));
      });
    }
  }
}