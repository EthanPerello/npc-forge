'use client';

import { useState, useEffect } from 'react';
import { useCharacter } from '@/contexts/character-context';
import { getRemainingGenerations } from '@/lib/usage-limits';
import { OpenAIModel } from '@/lib/types';
import { MODEL_CONFIGS } from '@/lib/models';
import { IMAGE_MODEL_CONFIGS } from '@/lib/image-models';
import { InfoIcon } from 'lucide-react';

export default function UsageLimitDisplay() {
  const { formData } = useCharacter();
  const [textRemaining, setTextRemaining] = useState<number | string>(0);
  const [imageRemaining, setImageRemaining] = useState<number | string>(0);
  const [textModel, setTextModel] = useState<string>('');
  const [imageModel, setImageModel] = useState<string>('');
  const [textTotal, setTextTotal] = useState<number | string>(0);
  const [imageTotal, setImageTotal] = useState<number | string>(0);
  const [isDevMode, setIsDevMode] = useState<boolean>(false);

  // Check if in development mode
  useEffect(() => {
    setIsDevMode(process.env.NODE_ENV === 'development');
  }, []);

  // Update values when form data changes
  useEffect(() => {
    // Get text model and remaining generations
    const currentTextModel = formData.model || MODEL_CONFIGS[0].id;
    const textConfig = MODEL_CONFIGS.find(config => config.id === currentTextModel);
    const remaining = getRemainingGenerations(currentTextModel);
    
    setTextRemaining(remaining);
    setTextModel(currentTextModel);
    setTextTotal(textConfig?.monthlyLimit || 30);
    
    // Get image model and remaining generations if include_portrait is true
    if (formData.include_portrait) {
      const currentImageModel = formData.portrait_options?.image_model || IMAGE_MODEL_CONFIGS[0].id;
      const imageConfig = IMAGE_MODEL_CONFIGS.find(config => config.id === currentImageModel);
      const imageRemaining = getRemainingGenerations(currentImageModel);
      
      setImageRemaining(imageRemaining);
      setImageModel(currentImageModel);
      setImageTotal(imageConfig?.monthlyLimit || 10);
    }
  }, [formData]);

  // Get emoji and label for a text model
  const getTextModelInfo = (modelId: OpenAIModel) => {
    const config = MODEL_CONFIGS.find(config => config.id === modelId);
    return {
      emoji: config?.emoji || '🟢',
      label: config?.label || 'Standard'
    };
  };
  
  // Function to get most constrained model (lowest remaining/total ratio)
  const getMostConstrainedModel = () => {
    // In development mode, always show unlimited
    if (isDevMode) {
      return {
        isText: true,
        emoji: getTextModelInfo(textModel as OpenAIModel).emoji,
        remaining: "∞",
        total: "∞"
      };
    }
    
    if (!formData.include_portrait) {
      // If portrait not included, only consider text model
      return {
        isText: true,
        emoji: getTextModelInfo(textModel as OpenAIModel).emoji,
        remaining: textRemaining,
        total: textTotal
      };
    }
    
    // If either value is "Unlimited", use the numeric one
    if (textRemaining === "Unlimited") {
      return {
        isText: false,
        emoji: IMAGE_MODEL_CONFIGS.find(config => config.id === imageModel)?.emoji || '🟢',
        remaining: imageRemaining,
        total: imageTotal
      };
    }
    
    if (imageRemaining === "Unlimited") {
      return {
        isText: true,
        emoji: getTextModelInfo(textModel as OpenAIModel).emoji,
        remaining: textRemaining,
        total: textTotal
      };
    }
    
    // Calculate constraint ratios (lower is more constrained)
    // Only if both are numeric values
    if (typeof textRemaining === 'number' && typeof imageRemaining === 'number' &&
        typeof textTotal === 'number' && typeof imageTotal === 'number') {
      const textRatio = textRemaining / textTotal;
      const imageRatio = imageRemaining / imageTotal;
      
      if (textRatio <= imageRatio) {
        // Text model is more constrained
        return {
          isText: true,
          emoji: getTextModelInfo(textModel as OpenAIModel).emoji,
          remaining: textRemaining,
          total: textTotal
        };
      } else {
        // Image model is more constrained
        const config = IMAGE_MODEL_CONFIGS.find(config => config.id === imageModel);
        return {
          isText: false,
          emoji: config?.emoji || '🟢',
          remaining: imageRemaining,
          total: imageTotal
        };
      }
    }
    
    // Default fallback
    return {
      isText: true,
      emoji: getTextModelInfo(textModel as OpenAIModel).emoji,
      remaining: textRemaining,
      total: textTotal
    };
  };
  
  // Get the most constrained model info
  const constrained = getMostConstrainedModel();
  
  // Determine text and classes based on remaining amount
  let statusText = '';
  let statusClass = '';
  
  if (isDevMode) {
    statusText = '∞ left';
    statusClass = 'text-green-600 dark:text-green-400';
  } else if (constrained.remaining === 0) {
    statusText = 'Limit reached';
    statusClass = 'text-red-600 dark:text-red-400';
  } else if (constrained.remaining === "Unlimited" || constrained.remaining === "∞") {
    statusText = '∞ left';
    statusClass = 'text-green-600 dark:text-green-400';
  } else if (typeof constrained.remaining === 'number' && typeof constrained.total === 'number') {
    // Only calculate percentages if both values are numeric
    if (constrained.remaining < constrained.total * 0.2) {
      statusText = `${constrained.remaining}/${constrained.total} left`;
      statusClass = 'text-red-600 dark:text-red-400';
    } else if (constrained.remaining < constrained.total * 0.5) {
      statusText = `${constrained.remaining}/${constrained.total} left`;
      statusClass = 'text-amber-600 dark:text-amber-400';
    } else {
      statusText = `${constrained.remaining}/${constrained.total} left`;
      statusClass = 'text-green-600 dark:text-green-400';
    }
  } else {
    // Default fallback for mixed types
    statusText = `${constrained.remaining} left`;
    statusClass = 'text-green-600 dark:text-green-400';
  }
  
  // Determine the message for the tooltip
  let messageText = '';
  
  // Format more human-readable messages
  if (isDevMode) {
    messageText = 'Development mode: Unlimited generations available for all models.';
  } else if (textRemaining === "Unlimited" || imageRemaining === "Unlimited") {
    messageText = 'Unlimited generations available in development mode.';
  } else if (typeof textRemaining === 'number' && typeof imageRemaining === 'number') {
    if (textRemaining > 20 && imageRemaining > 10) {
      messageText = `You have a good number of generations left for both text and images.`;
    } else if (textRemaining <= 5 || imageRemaining <= 3) {
      messageText = `You are running low on ${textRemaining <= 5 ? 'text' : ''}${textRemaining <= 5 && imageRemaining <= 3 ? ' and ' : ''}${imageRemaining <= 3 ? 'image' : ''} generations.`;
    } else {
      messageText = `You have ${textRemaining} text generations and ${formData.include_portrait ? `${imageRemaining} image generations` : "no portrait generation"} remaining this month.`;
    }
  } else {
    messageText = 'Check your remaining generations for each model type.';
  }

  return (
    <div className="flex items-center group relative">
      <div className={`mr-1 text-sm font-medium ${statusClass}`}>
        {constrained.emoji} {statusText}
      </div>
      
      <InfoIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 cursor-help" />
      
      <div className="absolute bottom-full mb-2 right-0 w-64 p-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <p className="text-gray-700 dark:text-gray-300">{messageText}</p>
        
        {!isDevMode && (
          <div className="mt-1.5 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600 dark:text-gray-400">Text ({getTextModelInfo(textModel as OpenAIModel).label}):</span>
              <span className={typeof textRemaining === 'number' && textRemaining < 5 ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}>
                {textRemaining === "Unlimited" ? "∞" : textRemaining}/{textTotal === "Unlimited" ? "∞" : textTotal}
              </span>
            </div>
            {formData.include_portrait && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Image:</span>
                <span className={typeof imageRemaining === 'number' && imageRemaining < 3 ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}>
                  {imageRemaining === "Unlimited" ? "∞" : imageRemaining}/{imageTotal === "Unlimited" ? "∞" : imageTotal}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}