'use client';

import { useState, useEffect } from 'react';
import { getRemainingGenerations } from '@/lib/usage-limits';
import { useCharacter } from '@/contexts/character-context';
import { getModelConfig } from '@/lib/models';
import { getImageModelConfig } from '@/lib/image-models';

export default function UsageLimitsNotice() {
  const { formData } = useCharacter();
  const [mostLimitedInfo, setMostLimitedInfo] = useState<{
    modelType: 'text' | 'image';
    modelId: string;
    remaining: number | string;
    label: string;
    emoji: string;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
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
        textRemaining = getRemainingGenerations(textModel);
        
        textModelInfo = {
          modelType: 'text' as const,
          modelId: textModel,
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
        imageRemaining = getRemainingGenerations(imageModel);
        
        imageModelInfo = {
          modelType: 'image' as const,
          modelId: imageModel,
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
        setMostLimitedInfo(null); // Both are unlimited, don't show any notice
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
    
    // Update when window gains focus
    const handleFocus = () => {
      updateUsage();
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [formData.model, formData.portrait_options?.image_model]);
  
  // Don't render during SSR or if we don't have info yet or if we have plenty of resources
  if (!isClient || !mostLimitedInfo) {
    return null;
  }
  
  // Don't show if more than 3 remaining
  if (mostLimitedInfo.remaining === "Unlimited" || 
      (typeof mostLimitedInfo.remaining === 'number' && mostLimitedInfo.remaining > 3)) {
    return null;
  }
  
  // Create a user-friendly label for the model
  const limitTypeLabel = mostLimitedInfo.modelType === 'text' ? 'character' : 'portrait';
  
  if (mostLimitedInfo.remaining === 0) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">{mostLimitedInfo.emoji} Generation Limit Reached</h3>
            <div className="mt-2 text-sm">
              <p>
                You've reached your monthly limit for {mostLimitedInfo.label} {limitTypeLabel} generations.
              </p>
              <p className="mt-2">
                Try selecting a different model tier or wait until next month.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{mostLimitedInfo.emoji} Generation Limit Warning</h3>
          <div className="mt-2 text-sm">
            <p>
              You have only <strong>{mostLimitedInfo.remaining}</strong> {mostLimitedInfo.label} {limitTypeLabel} generation{mostLimitedInfo.remaining === 1 ? '' : 's'} remaining.
            </p>
            <p className="mt-2">
              Consider selecting a different model tier or remember to save your characters as JSON files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}