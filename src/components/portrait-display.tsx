'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, AlertCircle, RefreshCw, User } from 'lucide-react';
import Button from '@/components/ui/button';
import { getImage } from '@/lib/image-storage';

interface PortraitDisplayProps {
  imageUrl?: string;
  imageData?: string;
  characterId?: string;  // Added for IndexedDB lookup
  name: string;
  isLoading?: boolean;
  onRetry?: () => void;
  onRegenerate?: (e: React.MouseEvent) => void;
}

export default function PortraitDisplay({ 
  imageUrl, 
  imageData,
  characterId,
  name, 
  isLoading = false,
  onRetry,
  onRegenerate
}: PortraitDisplayProps) {
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Load image from various sources, with IndexedDB as a priority
  useEffect(() => {
    const loadImage = async () => {
      // Reset states when image source changes
      setError(false);
      setLoaded(false);

      // Try to load from IndexedDB first if we have a characterId
      if (characterId) {
        try {
          const dbImage = await getImage(characterId);
          if (dbImage) {
            setImageSrc(dbImage);
            return;
          }
        } catch (err) {
          console.error('Error loading image from IndexedDB:', err);
          // Continue to try other sources
        }
      }

      // If no IndexedDB image or error, fall back to provided sources
      if (imageData) {
        setImageSrc(imageData);
      } else if (imageUrl) {
        setImageSrc(imageUrl);
      } else {
        setImageSrc(null);
      }
    };

    loadImage();
  }, [imageUrl, imageData, characterId, isLoading]);

  const handleImageError = () => {
    console.error('Image failed to load');
    setError(true);
    setLoaded(true);
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  // Handle regenerate with proper event prevention
  const handleRegenerate = (e: React.MouseEvent) => {
    if (onRegenerate) {
      // Prevent form submission and propagation
      e.preventDefault();
      e.stopPropagation();
      onRegenerate(e);
    }
  };

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden transition-all duration-300 group">
      {/* Border overlay for visual appeal */}
      <div className="absolute inset-0 border-2 border-blue-200 rounded-lg pointer-events-none z-10 dark:border-blue-700"></div>
      
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"></div>

      {/* Loading state with animation */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-800/80 z-20">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mb-3"></div>
          <p className="text-blue-700 dark:text-blue-300 font-medium text-sm">
            Creating portrait...
          </p>
        </div>
      )}

      {/* Error state with improved styling */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-gray-800/90 z-20">
          <div className="text-red-500 mb-2">
            <AlertCircle className="h-10 w-10" />
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm text-center px-4 mb-3 font-medium">
            Unable to load portrait
          </p>
          {onRetry && (
            <button 
              type="button" // Explicitly set type to avoid form submission
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRetry();
              }}
              className="mt-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Retry
            </button>
          )}
        </div>
      )}

      {/* Placeholder when no image is available */}
      {!imageSrc && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
          <div className="text-blue-300 dark:text-blue-700 text-6xl mb-2">
            <User className="h-16 w-16" />
          </div>
          <p className="text-blue-500 dark:text-blue-400 text-sm text-center px-4 font-medium">
            No portrait available
          </p>
        </div>
      )}

      {/* Actual image with improved styling */}
      {imageSrc && !error && (
        <>
          {/* Show loading skeleton until image is loaded */}
          {!loaded && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse dark:from-gray-700 dark:to-gray-600"></div>
          )}
          <Image 
            src={imageSrc} 
            alt={`Portrait of ${name}`}
            className={`transition-all duration-500 w-full h-full object-cover z-0 ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-[1.02]`}
            fill
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={true}
            unoptimized // For external URLs and base64
          />
          
          {/* Image overlay with character name on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center">
              <ImageIcon className="h-4 w-4 text-white mr-1" />
              <p className="text-white text-sm font-medium truncate">{name}</p>
            </div>
          </div>
          
          {/* Regenerate button overlay */}
          {onRegenerate && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <Button
                variant="secondary"
                onClick={handleRegenerate}
                size="sm"
                leftIcon={<RefreshCw className="h-3 w-3" />}
                className="bg-white bg-opacity-75 hover:bg-opacity-100 dark:bg-gray-800 dark:bg-opacity-75 dark:hover:bg-opacity-100 shadow-md"
                type="button" // Explicitly set type to avoid form submission
              >
                Regenerate
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}