'use client';

import { useState, useEffect } from 'react';
import { getUsageData, getMonthlyLimit, getRemainingGenerations } from '@/lib/usage-limits';

interface UsageLimitDisplayProps {
  variant?: 'compact' | 'detailed';
  showWhenFull?: boolean;
  className?: string;
  refreshKey?: number; // Add a key to force refresh
  onRefresh?: () => void; // Optional callback after refresh
}

export default function UsageLimitDisplay({ 
  variant = 'compact', 
  showWhenFull = true,
  className = '',
  refreshKey = 0,
  onRefresh
}: UsageLimitDisplayProps) {
  const [count, setCount] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [limit, setLimit] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Update usage data on mount, refreshKey change, and when component is visible
  useEffect(() => {
    setIsClient(true);
    
    const updateUsage = () => {
      const { count } = getUsageData();
      const monthlyLimit = getMonthlyLimit();
      const remainingGens = getRemainingGenerations();
      
      setCount(count);
      setLimit(monthlyLimit);
      setRemaining(remainingGens);
      
      // Call refresh callback if provided
      if (onRefresh) {
        onRefresh();
      }
    };
    
    // Initial update
    updateUsage();
    
    // Update when window gains focus
    const handleFocus = () => updateUsage();
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshKey, onRefresh]);
  
  // Wait for client-side hydration
  if (!isClient) return null;
  
  // Don't show anything if no usage and showWhenFull is false
  if (count === 0 && !showWhenFull) return null;
  
  // Calculate percentage for progress bar
  const usagePercentage = Math.min(100, Math.round((count / limit) * 100));
  
  // Determine color based on usage percentage
  const getColorClass = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  if (variant === 'compact') {
    return (
      <div className={`text-sm flex items-center ${className}`}>
        <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full ${getColorClass()}`} 
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <span className="text-gray-600 dark:text-gray-400">
          {remaining} left
        </span>
      </div>
    );
  }
  
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ${className}`}>
      <h3 className="text-lg font-medium text-gray-800 mb-2 dark:text-white">
        Character Generation Limit
      </h3>
      
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-gray-700 dark:text-gray-300">
          {count} of {limit} used this month
        </span>
        <span className={remaining === 0 ? 'text-red-500 font-medium' : 'text-gray-600 dark:text-gray-400'}>
          {remaining} remaining
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className={`h-2.5 rounded-full ${getColorClass()}`} 
          style={{ width: `${usagePercentage}%` }}
        ></div>
      </div>
      
      {remaining === 0 && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          You've reached your monthly limit. Limits will reset at the beginning of next month.
        </p>
      )}
      
      {remaining <= 3 && remaining > 0 && (
        <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
          You're approaching your monthly limit. Use your remaining generations wisely!
        </p>
      )}
    </div>
  );
}