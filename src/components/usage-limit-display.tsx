'use client';

import { useState, useEffect, useRef } from 'react';
import { getUsageData, getMonthlyLimit, getRemainingGenerations } from '@/lib/usage-limits';
import { useCharacter } from '@/contexts/character-context';
import { getModelConfig } from '@/lib/models';
import { getImageModelConfig } from '@/lib/image-models';

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
  const { formData } = useCharacter();
  const [mostLimitedInfo, setMostLimitedInfo] = useState<{
    modelType: 'text' | 'image';
    modelId: string;
    modelName: string;
    count: number;
    limit: number | string;
    remaining: number | string;
    label: string;
    emoji: string;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const initialRender = useRef(true);
  
  // Update usage data on mount, refreshKey change, and when component is visible
  useEffect(() => {
    // Avoid state updates during initial server-side rendering
    if (typeof window === 'undefined') return;
    
    setIsClient(true);
    
    const updateUsage = () => {
      // Get the selected models
      const textModel = formData.model;
      const imageModel = formData.portrait_options?.image_model;
      
      if (!textModel && !imageModel) return;
      
      // Get text model info
      let textRemaining: number | string = Infinity;
      let textModelInfo = null;
      
      if (textModel) {
        const textModelConfig = getModelConfig(textModel);
        const textUsageData = getUsageData(textModel);
        const textLimit = getMonthlyLimit(textModel);
        textRemaining = getRemainingGenerations(textModel);
        
        textModelInfo = {
          modelType: 'text' as const,
          modelId: textModel,
          modelName: textModel,
          count: textUsageData.count,
          limit: textLimit,
          remaining: textRemaining,
          label: textModelConfig.label,
          emoji: textModelConfig.emoji
        };
      }
      
      // Get image model info
      let imageRemaining: number | string = Infinity;
      let imageModelInfo = null;
      
      if (imageModel) {
        const imageModelConfig = getImageModelConfig(imageModel);
        const imageUsageData = getUsageData(imageModel);
        const imageLimit = getMonthlyLimit(imageModel);
        imageRemaining = getRemainingGenerations(imageModel);
        
        imageModelInfo = {
          modelType: 'image' as const,
          modelId: imageModel,
          modelName: imageModel,
          count: imageUsageData.count,
          limit: imageLimit,
          remaining: imageRemaining,
          label: imageModelConfig.label,
          emoji: imageModelConfig.emoji
        };
      }
      
      // Compare to find the most limited option
      // If one is "Unlimited", use the other
      // If both are numbers, use the smaller one
      // If both are "Unlimited", use text model
      
      if (textRemaining === "Unlimited" && imageRemaining === "Unlimited") {
        setMostLimitedInfo(textModelInfo);
      }
      else if (textRemaining === "Unlimited") {
        setMostLimitedInfo(imageModelInfo);
      }
      else if (imageRemaining === "Unlimited") {
        setMostLimitedInfo(textModelInfo);
      }
      else if (typeof textRemaining === 'number' && typeof imageRemaining === 'number') {
        // Both are numbers, choose the smaller one
        setMostLimitedInfo(textRemaining <= imageRemaining ? textModelInfo : imageModelInfo);
      }
      else {
        // Fallback in case of unexpected types
        setMostLimitedInfo(textModelInfo || imageModelInfo);
      }
    };
    
    // Initial update
    updateUsage();
    
    // Update when window gains focus - but only attach listener after first render
    if (!initialRender.current) {
      const handleFocus = () => updateUsage();
      window.addEventListener('focus', handleFocus);
      
      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    }
    
    // Mark initial render complete
    initialRender.current = false;
    
  }, [refreshKey, formData.model, formData.portrait_options?.image_model]); // Add model dependencies
  
  // Call refresh callback in a separate effect to avoid infinite loops
  useEffect(() => {
    if (isClient && onRefresh && !initialRender.current) {
      onRefresh();
    }
  }, [isClient, onRefresh]);
  
  // Wait for client-side hydration or for most limited info to be determined
  if (!isClient || !mostLimitedInfo) return null;
  
  // Destructure the most limited info
  const { count, limit, remaining, modelType, modelName, label, emoji } = mostLimitedInfo;
  
  // Don't show anything if no usage and showWhenFull is false
  if (count === 0 && !showWhenFull) return null;
  
  // Calculate percentage for progress bar
  const usagePercentage = typeof limit === 'string' && limit === 'Unlimited' 
    ? 0 // If unlimited, show 0% used
    : Math.min(100, Math.round((count / (limit as number)) * 100));
  
  // Determine color based on usage percentage
  const getColorClass = () => {
    if (usagePercentage >= 90) return 'bg-red-500';
    if (usagePercentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Create a readable label for the limit message
  const limitTypeLabel = modelType === 'text' ? 'Characters' : 'Portraits';
  
  if (variant === 'compact') {
    // If unlimited, show a simpler message
    if (remaining === "Unlimited") {
      return (
        <div className={`text-sm flex items-center ${className}`}>
          <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
            <div 
              className="h-2.5 rounded-full bg-green-500" 
              style={{ width: '0%' }}
            ></div>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            {emoji} Unlimited {limitTypeLabel}
          </span>
        </div>
      );
    }
    
    return (
      <div className={`text-sm flex items-center ${className}`}>
        <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full ${getColorClass()}`} 
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <span className="text-gray-600 dark:text-gray-400">
          {emoji} {remaining} {limitTypeLabel} remaining
        </span>
      </div>
    );
  }
  
  // For detailed variant
  if (remaining === "Unlimited") {
    return (
      <div className={`p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ${className}`}>
        <h3 className="text-lg font-medium text-gray-800 mb-2 dark:text-white">
          {emoji} {label} {limitTypeLabel}
        </h3>
        
        <div className="mb-1 flex justify-between text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            Unlimited usage
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="h-2.5 rounded-full bg-green-500" style={{ width: '0%' }}></div>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
          Powered by {modelName}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 ${className}`}>
      <h3 className="text-lg font-medium text-gray-800 mb-2 dark:text-white">
        {emoji} {label} {limitTypeLabel}
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
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
        Powered by {modelName}
      </div>
      
      {remaining === 0 && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          You've reached your monthly limit. Try selecting a different model or wait until next month.
        </p>
      )}
      
      {remaining !== 0 && (typeof remaining === 'number' && remaining <= 3) && (
        <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
          You're approaching your monthly limit. Use your remaining generations wisely!
        </p>
      )}
    </div>
  );
}