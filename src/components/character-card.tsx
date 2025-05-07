'use client';

import { useState, useEffect } from 'react';
import { Character } from '@/lib/types';
import { getCharacterTraitsArray } from '@/lib/utils';
import { getImage } from '@/lib/character-storage';
import { User, Download, Edit, Trash2 } from 'lucide-react';
import Button from '@/components/ui/button';

interface CharacterCardProps {
  character: Character;
  id?: string; // Character ID for loading image from IndexedDB
  onDownload: (e: React.MouseEvent) => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export default function CharacterCard({ character, id, onDownload, onEdit, onDelete, onClick }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  if (!character) {
    return null;
  }

  // Load image from IndexedDB if we have an ID and no direct image data
  useEffect(() => {
    const loadImage = async () => {
      // Reset states
      setImageError(false);
      setImageLoaded(false);
      
      if (id) {
        try {
          const imageData = await getImage(id);
          if (imageData) {
            setImageSrc(imageData);
            return;
          }
        } catch (error) {
          console.error('Error loading image from IndexedDB:', error);
        }
      }
      
      // If no IndexedDB image or error, fall back to provided sources
      if (character.image_data) {
        setImageSrc(character.image_data);
      } else if (character.image_url) {
        setImageSrc(character.image_url);
      } else {
        setImageSrc(null);
      }
    };

    loadImage();
  }, [id, character.image_data, character.image_url]);

  // Extract traits for display
  const traits = getCharacterTraitsArray(character);
  
  // Handle image errors
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Handle image load success
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className="w-full rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border border-theme cursor-pointer"
      onClick={onClick}
    >
      {/* Portrait Section - Improved for consistent sizing and display */}
      <div className="relative w-full aspect-square">
        {imageSrc && !imageError ? (
          <>
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 animate-pulse">
                <span className="text-gray-500 dark:text-gray-400">Loading...</span>
              </div>
            )}
            
            {/* The image with object-contain to ensure full visibility */}
            <img 
              src={imageSrc} 
              alt={`Portrait of ${character.name}`} 
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
            <User className="h-20 w-20 text-blue-300 dark:text-blue-700" />
          </div>
        )}
        
        {/* Add a delete button in the top right */}
        {onDelete && (
          <button 
            onClick={onDelete}
            className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-800/60 z-10"
            title="Delete Character"
            type="button"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* Character Info Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 truncate">{character.name}</h2>
        
        {/* Traits */}
        <div className="flex flex-wrap gap-1 mb-3">
          {traits.slice(0, 3).map((trait, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs truncate
                        dark:bg-gray-700 dark:text-gray-300 max-w-[100px]"
            >
              {trait}
            </span>
          ))}
          {traits.length > 3 && (
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs
                          dark:bg-gray-700 dark:text-gray-300">
              +{traits.length - 3}
            </span>
          )}
        </div>
        
        {/* Description snippet */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {character.appearance}
        </p>
        
        {/* Action buttons */}
        <div className="mt-3 flex gap-2">
          {onEdit && (
            <Button
              variant="secondary"
              onClick={onEdit}
              type="button"
              size="sm"
              className="flex-1"
              leftIcon={<Edit size={16} />}
            >
              Edit
            </Button>
          )}
          
          <Button
            variant="primary"
            onClick={onDownload}
            type="button"
            size="sm"
            className="flex-1"
            leftIcon={<Download size={16} />}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}