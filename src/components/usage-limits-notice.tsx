'use client';

import { useState, useEffect } from 'react';
import { useCharacter } from '@/contexts/character-context';
import { getRemainingGenerations } from '@/lib/usage-limits';
import { AlertTriangle } from 'lucide-react';

export default function UsageLimitsNotice() {
  const { formData } = useCharacter();
  // Fix type issues by explicitly declaring state types to handle both number and string
  const [textRemaining, setTextRemaining] = useState<number | string>(0);
  const [imageRemaining, setImageRemaining] = useState<number | string>(0);
  const [textModel, setTextModel] = useState<string>('');
  const [imageModel, setImageModel] = useState<string>('');
  const [isDevMode, setIsDevMode] = useState<boolean>(false);
  
  // Check if in development mode
  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === 'development');
  }, []);
  
  // Update values when form data changes
  useEffect(() => {
    // Skip usage checks in dev mode
    if (isDevMode) {
      setTextRemaining("Unlimited");
      setImageRemaining("Unlimited");
      return;
    }
    
    // Get text model and remaining generations
    const currentTextModel = formData.model;
    const remaining = getRemainingGenerations(currentTextModel);
    
    setTextRemaining(remaining);
    setTextModel(currentTextModel || '');
    
    // Get image model and remaining generations
    if (formData.include_portrait) {
      const currentImageModel = formData.portrait_options?.image_model;
      if (currentImageModel) {
        const imageRemaining = getRemainingGenerations(currentImageModel);
        setImageRemaining(imageRemaining);
        setImageModel(currentImageModel);
      }
    }
  }, [formData, isDevMode]);
  
  // Check if we should show a warning - never in dev mode
  const shouldShowWarning = () => {
    // Never show in dev mode
    if (isDevMode) return false;
    
    // If textRemaining is "Unlimited" or not a number, don't show warning
    if (textRemaining === "Unlimited" || typeof textRemaining !== 'number') {
      return false;
    }
    
    // If we have a low number of text generations left
    if (textRemaining < 5) {
      return true;
    }
    
    // If include_portrait is true and we have a low number of image generations left
    if (formData.include_portrait && 
        imageRemaining !== "Unlimited" && 
        typeof imageRemaining === 'number' && 
        imageRemaining < 3) {
      return true;
    }
    
    return false;
  };
  
  // If we don't need to show a warning, return null
  if (!shouldShowWarning()) {
    return null;
  }
  
  // Determine the message for the notice
  let warningMessage = '';
  
  // Check which ones are low - only for numeric values
  if (typeof textRemaining === 'number' && textRemaining < 5 && 
      formData.include_portrait && 
      typeof imageRemaining === 'number' && imageRemaining < 3) {
    warningMessage = `You're running low on both text (${textRemaining} left) and image (${imageRemaining} left) generations for this month.`;
  } else if (typeof textRemaining === 'number' && textRemaining < 5) {
    warningMessage = `You're running low on text generations (${textRemaining} left) for this month.`;
  } else if (formData.include_portrait && 
             typeof imageRemaining === 'number' && imageRemaining < 3) {
    warningMessage = `You're running low on image generations (${imageRemaining} left) for this month.`;
  }

  return (
    <div className="p-3 mb-4 rounded-md bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            {warningMessage}
          </p>
          <p className="text-amber-700 dark:text-amber-400 text-xs mt-1">
            Limits reset at the beginning of each month. To continue generating, consider using the Standard model tier.
          </p>
        </div>
      </div>
    </div>
  );
}