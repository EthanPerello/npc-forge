'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Character } from '@/lib/types';
import { getCharacterTraitsArray } from '@/lib/utils';
import { getImage } from '@/lib/image-storage';

interface CharacterCardProps {
  character: Character;
  id?: string; // Character ID for loading image from IndexedDB
  onDownload: () => void;
}

export default function CharacterCard({ character, id, onDownload }: CharacterCardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'quest'>('profile');
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  if (!character) {
    return null;
  }

  // Load image from IndexedDB if we have an ID and no direct image data
  useEffect(() => {
    const loadImage = async () => {
      if (id && !character.image_data) {
        try {
          const imageData = await getImage(id);
          if (imageData) {
            setImageSrc(imageData);
          } else if (character.image_url) {
            setImageSrc(character.image_url);
          }
        } catch (error) {
          console.error('Error loading image from IndexedDB:', error);
          // Fallback to URL if available
          if (character.image_url) {
            setImageSrc(character.image_url);
          }
        }
      } else if (character.image_data) {
        // Use directly provided image data
        setImageSrc(character.image_data);
      } else if (character.image_url) {
        // Fallback to URL
        setImageSrc(character.image_url);
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
      <div className="md:flex">
        {/* Portrait Section */}
        <div className="md:w-1/3 p-4">
          {imageSrc && !imageError ? (
            <div className="relative w-full h-64">
              <Image 
                src={imageSrc} 
                alt={`Portrait of ${character.name}`} 
                className="rounded-lg shadow-md"
                fill
                style={{ objectFit: 'contain' }}
                onError={handleImageError}
                onLoad={handleImageLoad}
                unoptimized // For external URLs and base64
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 animate-pulse">
                  <span className="text-gray-500 dark:text-gray-400">Loading...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400">No portrait available</span>
            </div>
          )}
        </div>

        {/* Character Info Section */}
        <div className="md:w-2/3 p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 dark:text-white">{character.name}</h2>
          
          {/* Tab Navigation */}
          <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
            <button
              className={`py-2 px-4 ${activeTab === 'profile' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'quest' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'text-gray-600 dark:text-gray-400'}`}
              onClick={() => setActiveTab('quest')}
            >
              Quest
            </button>
          </div>

          {/* Profile Content */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Appearance</h3>
                <p className="text-gray-600 dark:text-gray-400">{character.appearance}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Personality</h3>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm dark:bg-gray-700 dark:text-gray-300"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              {character.items && character.items.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Inventory</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                    {character.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {character.dialogue_lines && character.dialogue_lines.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Dialogue</h3>
                  <div className="space-y-2">
                    {character.dialogue_lines.map((line, index) => (
                      <div key={index} className="italic text-gray-600 dark:text-gray-400">{line}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quest Content */}
          {activeTab === 'quest' && character.quests && character.quests.length > 0 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">{character.quests[0].title}</h3>
                <p className="text-gray-600 mt-2 dark:text-gray-400">{character.quests[0].description}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Reward</h3>
                <p className="text-gray-600 dark:text-gray-400">{character.quests[0].reward}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6">
            <button
              onClick={onDownload}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Download JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}