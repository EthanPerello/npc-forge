'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, AlertCircle, RefreshCw, User, ZoomIn, Upload } from 'lucide-react';
import Button from '@/components/ui/button';
import { getImage } from '@/lib/character-storage';

interface PortraitDisplayProps {
  imageUrl?: string;
  imageData?: string;
  characterId?: string;  // For IndexedDB lookup
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
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

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

  // Handle upload with proper event prevention
  const handleUpload = (e: React.MouseEvent) => {
    if (onUpload) {
      e.preventDefault();
      e.stopPropagation();
      onUpload(e);
    }
  };

  // Toggle zoom function
  const toggleZoom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  // Get dimensions based on size prop
  const getSizeClasses = () => {
    switch (size) {
      case 'small': 
        return 'w-full aspect-square max-w-[150px] max-h-[150px]';
      case 'large': 
        return 'w-full aspect-square max-w-[400px] max-h-[400px]';
      case 'medium':
      default: 
        return 'w-full aspect-square max-w-[300px] max-h-[300px]';
    }
  };

  return (
    <div className="flex flex-col items-center portrait-container">
      {/* Portrait Container */}
      <div 
        className={`relative ${getSizeClasses()} ${className} rounded-lg overflow-hidden transition-all duration-300 group mb-4`}
      >
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
            
            {/* Image container with object-fit to ensure the entire image is visible */}
            <div className="relative w-full h-full">
              <img 
                src={imageSrc} 
                alt={`Portrait of ${name}`}
                className={`
                  w-full h-full object-contain transition-all duration-500
                  ${loaded ? 'opacity-100' : 'opacity-0'}
                  ${isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in group-hover:scale-105'}
                `}
                onClick={toggleZoom}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </div>
            
            {/* Image overlay with character name on hover */}
            <div className={`
              absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3
              ${isZoomed ? 'opacity-0' : 'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}
              transition-all duration-300
            `}>
              <div className="flex items-center">
                <ImageIcon className="h-4 w-4 text-white mr-1" />
                <p className="text-white text-sm font-medium truncate">{name}</p>
              </div>
            </div>
            
            {/* Zoom button indicator (always visible but subtle) */}
            {!isZoomed && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <Button
                  variant="secondary"
                  onClick={toggleZoom}
                  size="sm"
                  leftIcon={<ZoomIn className="h-3 w-3" />}
                  className="bg-white/75 hover:bg-white dark:bg-gray-800/75 dark:hover:bg-gray-800 shadow-md"
                  type="button"
                >
                  Zoom
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Action buttons - Moved outside the image container for better positioning */}
      {(showRegenerateButton || showUploadButton || onRegenerate || onUpload) && (
        <div className="flex gap-2 mt-2 mb-2 justify-center w-full">
          {(onRegenerate || showRegenerateButton) && (
            <Button
              variant="secondary"
              onClick={handleRegenerate}
              size="sm"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              className="shadow-sm"
              type="button"
            >
              Regenerate
            </Button>
          )}
          
          {(onUpload || showUploadButton) && (
            <Button
              variant="secondary"
              onClick={handleUpload}
              size="sm"
              leftIcon={<Upload className="h-4 w-4" />}
              className="shadow-sm"
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