// src/components/portrait-display.tsx
'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, AlertCircle, RefreshCw, User, Upload } from 'lucide-react';
import Button from '@/components/ui/button';

interface PortraitDisplayProps {
  imageUrl?: string;
  imageData?: string;
  characterId?: string;
  name: string;
  isLoading?: boolean;
  onRetry?: () => void;
  onRegenerate?: (e: React.MouseEvent) => void;
  onUpload?: (e: React.MouseEvent) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showUploadButton?: boolean;
  showRegenerateButton?: boolean;
}

export default function PortraitDisplay({ 
  imageUrl, 
  imageData,
  characterId,
  name, 
  isLoading = false,
  onRetry,
  onRegenerate,
  onUpload,
  size = 'medium',
  className = '',
  showUploadButton = false,
  showRegenerateButton = false,
}: PortraitDisplayProps) {
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [forceRefresh, setForceRefresh] = useState<number>(0);

  // Simplified image loading logic - prioritize image_data over everything else
  useEffect(() => {
    const loadImage = async () => {
      console.log('Loading image - imageData:', !!imageData, 'imageUrl:', !!imageUrl);
      
      setError(false);
      setLoaded(false);
      setImageSrc(null);

      // First priority: direct imageData (base64)
      if (imageData) {
        console.log('Using imageData directly');
        if (imageData.startsWith('data:')) {
          setImageSrc(imageData);
        } else {
          setImageSrc(`data:image/png;base64,${imageData}`);
        }
        setLoaded(true);
        return;
      }

      // Second priority: imageUrl
      if (imageUrl) {
        console.log('Using imageUrl:', imageUrl);
        setImageSrc(imageUrl);
        setLoaded(true);
        return;
      }

      // No image available
      console.log('No image available');
      setLoaded(true);
    };

    loadImage();
  }, [imageData, imageUrl, forceRefresh]);

  // Size configurations
  const sizeConfig = {
    small: {
      container: 'w-16 h-16',
      text: 'text-lg',
      fallback: 'text-lg font-semibold'
    },
    medium: {
      container: 'w-32 h-32',
      text: 'text-2xl',
      fallback: 'text-2xl font-semibold'
    },
    large: {
      container: 'w-64 h-64',
      text: 'text-4xl',
      fallback: 'text-4xl font-bold'
    }
  };

  const config = sizeConfig[size];

  const handleImageError = () => {
    console.log('Image failed to load');
    setError(true);
    setLoaded(true);
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully');
    setError(false);
    setLoaded(true);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Regenerating portrait...');
    setForceRefresh(prev => prev + 1);
    onRegenerate?.(e);
  };

  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Uploading portrait...');
    onUpload?.(e);
  };

  const firstInitial = name.charAt(0).toUpperCase();

  return (
    <div className={`portrait-container relative flex flex-col items-center space-y-2 ${className}`}>
      {/* Portrait Container with consistent sizing */}
      <div className={`portrait-container relative ${config.container} rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center`}>
        {isLoading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-400 dark:text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <span className="text-xs">Generating...</span>
          </div>
        ) : imageSrc && !error ? (
          // Image display
          <img
            src={imageSrc}
            alt={`Portrait of ${name}`}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          // Fallback to letter
          <div className={`${config.fallback} text-gray-500 dark:text-gray-400 flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900`}>
            {firstInitial}
          </div>
        )}

        {/* Error overlay */}
        {error && !isLoading && (
          <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 flex flex-col items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-6 w-6 mb-1" />
            <span className="text-xs text-center px-1">Failed to load</span>
          </div>
        )}
      </div>

      {/* Action buttons using your existing Button component */}
      {(showRegenerateButton || showUploadButton) && (
        <div className="flex space-x-2">
          {showRegenerateButton && onRegenerate && (
            <Button
              variant="secondary"
              onClick={handleRegenerate}
              size="sm"
              leftIcon={isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-300"></div>
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              disabled={isLoading}
              type="button"
            >
              {isLoading ? "Regenerating..." : "Regenerate"}
            </Button>
          )}
          
          {(onUpload || showUploadButton) && (
            <Button
              variant="secondary"
              onClick={handleUpload}
              size="sm"
              leftIcon={<Upload className="h-4 w-4" />}
              disabled={isLoading}
              type="button"
            >
              Upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
}