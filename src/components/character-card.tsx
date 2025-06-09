// src/components/character-card.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Character } from '@/lib/types';
import { getCharacterTraitsArray } from '@/lib/utils';
import PortraitDisplay from './portrait-display';
import Button from './ui/button';
import { 
  Edit, 
  Download, 
  Trash2, 
  MessageCircle,
  Image as ImageIcon
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  id?: string;
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDownload?: (e: React.MouseEvent) => void;
  onDownloadImage?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function CharacterCard({
  character,
  id,
  onClick,
  onEdit,
  onDownload,
  onDownloadImage,
  onDelete
}: CharacterCardProps) {
  const router = useRouter();
  const [isChatNavigating, setIsChatNavigating] = useState(false);
  
  // Get character traits for display
  const traits = getCharacterTraitsArray(character);
  
  // Handle chat navigation
  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isChatNavigating || !id) return;
    
    setIsChatNavigating(true);
    
    // Navigate to chat page with proper encoding
    setTimeout(() => {
      router.push(`/chat/${encodeURIComponent(id)}`);
    }, 100);
  };

  // Check if character has a portrait
  const hasPortrait = !!(character.image_url || character.image_data);

  return (
    <div 
      className="character-card bg-card border border-theme rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      {/* Header with portrait and basic info - RESPONSIVE LAYOUT */}
      <div className="p-3 flex flex-col space-y-2 flex-1">
        {/* Portrait - RESPONSIVE SIZE */}
        <div className="flex justify-center mb-2">
          {hasPortrait ? (
            <div className="portrait-container w-full max-w-[200px] aspect-square">
              <PortraitDisplay
                imageUrl={character.image_url}
                imageData={character.image_data}
                characterId={id}
                name={character.name}
                size="large"
                className="w-full h-full object-cover rounded-lg library-portrait"
              />
            </div>
          ) : (
            <div className="w-full max-w-[200px] aspect-square bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {character.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        {/* Character name - COMPACT */}
        <div className="text-center">
          <h3 className="font-medium text-base mb-1 line-clamp-2">{character.name}</h3>
        </div>

        {/* Character Traits - COMPACT */}
        {traits.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1 justify-center">
              {traits.slice(0, 3).map((trait, index) => (
                <span 
                  key={index}
                  className="character-trait-tag text-xs px-2 py-1"
                >
                  {trait}
                </span>
              ))}
              {traits.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{traits.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Character Description Preview - COMPACT */}
        <p className="text-sm text-muted line-clamp-2 text-center flex-1">
          {character.appearance?.substring(0, 80)}
          {character.appearance && character.appearance.length > 80 ? '...' : ''}
        </p>
      </div>

      {/* Action Buttons - COMPACT AT BOTTOM */}
      <div className="p-3 pt-1 space-y-2 mt-auto">
        {/* Primary Action: Chat */}
        <Button
          variant="primary"
          onClick={handleChatClick}
          disabled={isChatNavigating || !id}
          leftIcon={<MessageCircle className="h-4 w-4" />}
          className="w-full"
          size="sm"
        >
          {isChatNavigating ? 'Opening...' : 'Chat'}
        </Button>
        
        {/* Secondary Actions Row 1 */}
        <div className="grid grid-cols-2 gap-2">
          {onEdit && (
            <Button
              variant="secondary"
              onClick={onEdit}
              leftIcon={<Edit className="h-3 w-3" />}
              size="sm"
              className="flex-1"
            >
              Edit
            </Button>
          )}
          
          {onDownload && (
            <Button
              variant="secondary"
              onClick={onDownload}
              leftIcon={<Download className="h-3 w-3" />}
              size="sm"
              className="flex-1"
            >
              JSON
            </Button>
          )}
        </div>
        
        {/* Secondary Actions Row 2 */}
        <div className="grid grid-cols-2 gap-2">
          {onDownloadImage && (
            <Button
              variant="secondary"
              onClick={onDownloadImage}
              leftIcon={<ImageIcon className="h-3 w-3" />}
              size="sm"
              className="flex-1"
              disabled={!hasPortrait}
            >
              Portrait
            </Button>
          )}
          
          {onDelete && (
            <Button
              variant="danger"
              onClick={onDelete}
              leftIcon={<Trash2 className="h-3 w-3" />}
              size="sm"
              className="flex-1"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}