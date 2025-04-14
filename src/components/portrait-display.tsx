'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PortraitDisplayProps {
  imageUrl?: string;
  name: string;
  isLoading?: boolean;
  onRetry?: () => void;
}

export default function PortraitDisplay({ 
  imageUrl, 
  name, 
  isLoading = false,
  onRetry
}: PortraitDisplayProps) {
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  // Reset states when image URL changes
  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [imageUrl]);

  const handleImageError = () => {
    setError(true);
    setLoaded(true);
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-700">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm text-center px-4">
            Generating portrait...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center px-4 mb-2">
            Failed to load portrait
          </p>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
            >
              Retry Generation
            </button>
          )}
        </div>
      )}

      {/* Placeholder when no image is available */}
      {!imageUrl && !isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500 text-5xl mb-2">👤</div>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center px-4">
            No portrait available
          </p>
        </div>
      )}

      {/* Actual image */}
      {imageUrl && !error && (
        <>
          {/* Show loading skeleton until image is loaded */}
          {!loaded && !isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
          )}
          <Image 
            src={imageUrl} 
            alt={`Portrait of ${name}`}
            className={`transition-opacity duration-300 w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
            fill
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={true}
            unoptimized // For external URLs
          />
        </>
      )}
    </div>
  );
}