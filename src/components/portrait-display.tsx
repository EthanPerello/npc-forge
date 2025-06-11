// src/components/portrait-display.tsx
'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, AlertCircle, RefreshCw, User, Upload } from 'lucide-react';
import Button from '@/components/ui/button';
import { getImage } from '@/lib/image-storage';

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
  const [loadingFromDB, setLoadingFromDB] = useState<boolean>(false);

  // Enhanced image loading logic - includes IndexedDB fallback
  useEffect(() => {
    const loadImage = async () => {
      console.log(`Loading image for ${name} - imageData:`, !!imageData, 'imageUrl:', !!imageUrl, 'characterId:', !!characterId);
      
      setError(false);
      setLoaded(false);
      setImageSrc(null);
      setLoadingFromDB(false);

      // First priority: direct imageData (base64)
      if (imageData) {
        console.log(`Using imageData directly for ${name}`);
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
        console.log(`Using imageUrl for ${name}:`, imageUrl);
        setImageSrc(imageUrl);
        setLoaded(true);
        return;
      }

      // Third priority: Load from IndexedDB if characterId is available
      if (characterId) {
        console.log(`No direct image data, attempting to load from IndexedDB for ${name} (ID: ${characterId})`);
        setLoadingFromDB(true);
        
        try {
          const storedImage = await getImage(characterId);
          if (storedImage) {
            console.log(`Successfully loaded image from IndexedDB for ${name}`);
            
            // Ensure the image data is properly formatted
            if (storedImage.startsWith('data:')) {
              setImageSrc(storedImage);
            } else {
              setImageSrc(`data:image/png;base64,${storedImage}`);
            }
            setLoaded(true);
            setLoadingFromDB(false);
            return;
          } else {
            console.log(`No image found in IndexedDB for ${name} (ID: ${characterId})`);
          }
        } catch (error) {
          console.error(`Error loading image from IndexedDB for ${name}:`, error);
        }
        
        setLoadingFromDB(false);
      }

      // No image available from any source
      console.log(`No image available for ${name} from any source`);
      setLoaded(true);
    };

    loadImage();
  }, [imageData, imageUrl, characterId, name, forceRefresh]);

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
      container: 'w-full h-full', // Changed to be flexible for library cards
      text: 'text-4xl',
      fallback: 'text-4xl font-bold'
    }
  };

  const config = sizeConfig[size];

  const handleImageError = () => {
    console.log(`Image failed to load for ${name}`);
    setError(true);
    setLoaded(true);
  };

  const handleImageLoad = () => {
    console.log(`Image loaded successfully for ${name}`);
    setError(false);
    setLoaded(true);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Regenerating portrait for ${name}...`);
    setForceRefresh(prev => prev + 1);
    onRegenerate?.(e);
  };

  const handleUpload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Uploading portrait for ${name}...`);
    onUpload?.(e);
  };

  const firstInitial = name.charAt(0).toUpperCase();

  // Determine if we should show loading state
  const showLoading = isLoading || loadingFromDB;

  return (
    <div className={`portrait-container relative flex flex-col items-center space-y-2 ${className}`}>
      {/* Portrait Container with consistent sizing */}
      <div className={`portrait-container relative ${config.container} rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center ${size === 'large' ? '' : 'overflow-hidden'}`}>
        {showLoading ? (
          // Loading state (includes both API loading and IndexedDB loading)
          <div className="flex flex-col items-center justify-center space-y-2 text-gray-400 dark:text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            <span className="text-xs">
              {isLoading ? 'Generating...' : 'Loading...'}
            </span>
          </div>
        ) : imageSrc && !error ? (
          // Image display
          <img
            src={imageSrc}
            alt={`Portrait of ${name}`}
            className={`${size === 'large' ? 'max-w-full max-h-full object-contain' : 'w-full h-full object-contain'}`}
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
        {error && !showLoading && (
          <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 flex flex-col items-center justify-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-6 w-6 mb-1" />
            <span className="text-xs text-center px-1">Failed to load</span>
            {onRetry && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setForceRefresh(prev => prev + 1);
                  onRetry();
                }}
                className="mt-1 text-xs underline hover:no-underline"
              >
                Retry
              </button>
            )}
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
              leftIcon={showLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-300"></div>
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              disabled={showLoading}
              type="button"
            >
              {showLoading ? "Regenerating..." : "Regenerate"}
            </Button>
          )}
          
          {(onUpload || showUploadButton) && (
            <Button
              variant="secondary"
              onClick={handleUpload}
              size="sm"
              leftIcon={<Upload className="h-4 w-4" />}
              disabled={showLoading}
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