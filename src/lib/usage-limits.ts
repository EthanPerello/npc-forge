/**
 * Utility for tracking and managing character generation usage limits
 * Uses localStorage to track generations on a per-month basis
 */

// Constants
const STORAGE_KEY = 'npc-forge-usage';
const DEFAULT_MONTHLY_LIMIT = 15; // Default limit of 15 generations per month

// Define usage data structure
interface UsageData {
  count: number;         // Number of generations this month
  monthKey: string;      // Current month identifier (YYYY-MM format)
  lastUpdated: string;   // ISO date string of last update
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
 * Get the current usage data from localStorage
 */
export function getUsageData(): UsageData {
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
    // Try to get and parse stored data
    const storedData = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
      return resetData;
    }
    
    return parsedData;
  } catch (error) {
    console.error('Error reading usage data:', error);
    return defaultData;
  }
}

/**
 * Increment the usage count when a character is generated
 */
export function incrementUsage(): UsageData {
  // In development mode, don't actually increment the count
  if (isDevMode()) {
    console.log('[DEV MODE] Skipping usage increment');
    return getUsageData();
  }
  
  const currentData = getUsageData();
  const updatedData: UsageData = {
    ...currentData,
    count: currentData.count + 1,
    lastUpdated: new Date().toISOString()
  };
  
  // Save to localStorage if available
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  }
  
  return updatedData;
}

/**
 * Check if the user has reached their monthly limit
 */
export function hasReachedLimit(customLimit?: number): boolean {
  // In development mode, never reach the limit
  if (isDevMode()) {
    console.log('[DEV MODE] Bypassing usage limits');
    return false;
  }
  
  const { count } = getUsageData();
  const limit = customLimit || DEFAULT_MONTHLY_LIMIT;
  return count >= limit;
}

/**
 * Get the number of remaining generations for the current month
 */
export function getRemainingGenerations(customLimit?: number): number {
  // In development mode, always return a high number
  if (isDevMode()) {
    return 999;
  }
  
  const { count } = getUsageData();
  const limit = customLimit || DEFAULT_MONTHLY_LIMIT;
  return Math.max(0, limit - count);
}

/**
 * Get the current monthly limit
 */
export function getMonthlyLimit(): number {
  // In development mode, return a high number
  if (isDevMode()) {
    return 999;
  }
  
  return DEFAULT_MONTHLY_LIMIT;
}

/**
 * Clear usage data (for testing purposes)
 */
export function clearUsageData(): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}