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
  Image as ImageIcon,
  Star
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  id?: string;
  isExample?: boolean; // NEW: Add explicit example indicator
  onClick?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDownload?: (e: React.MouseEvent) => void;
  onDownloadImage?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function CharacterCard({
  character,
  id,
  isExample = false,
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

  // FIXED: Always use PortraitDisplay - it can handle all image sources including IndexedDB
  // Don't check hasPortrait here since PortraitDisplay handles fallbacks
  const shouldShowDownloadImage = !!(character.image_url || character.image_data || id);

  return (
    <div 
      className="character-card bg-card border border-theme rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col relative"
      onClick={onClick}
    >
      {/* NEW: Example Character Badge */}
      {isExample && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-md">
            <Star className="h-3 w-3 fill-current" />
            Example
          </div>
        </div>
      )}

      {/* Header with portrait and basic info - RESPONSIVE LAYOUT */}
      <div className="p-3 flex flex-col space-y-2 flex-1">
        {/* Portrait - ALWAYS use PortraitDisplay (FIXED) */}
        <div className="flex justify-center mb-2">
          <div className="portrait-container w-full max-w-[200px] aspect-square">
            <PortraitDisplay
              imageUrl={character.image_url}
              imageData={character.image_data}
              characterId={id}
              name={character.name}
              size="large"
              className="w-full h-full rounded-lg library-portrait"
            />
          </div>
        </div>
        
        {/* Character name - COMPACT */}
        <div className="text-center">
          <h3 className="font-medium text-base mb-1 line-clamp-2">
            {character.name}
            {/* NEW: Small example indicator next to name */}
            {isExample && (
              <span className="ml-2 text-xs text-amber-600 dark:text-amber-400">
                (Example)
              </span>
            )}
          </h3>
        </div>

        {/* Character Traits - COMPACT */}
        {traits.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1 justify-center">
              {traits.slice(0, 3).map((trait, index) => (
                <span 
                  key={index}
                  className={`character-trait-tag text-xs px-2 py-1 ${
                    isExample 
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800' 
                      : ''
                  }`}
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
          {/* NEW: Conditional Edit button - hide for example characters */}
          {onEdit && !isExample && (
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
          
          {/* Show different button layout if example character */}
          {isExample && onDownload && (
            <Button
              variant="secondary"
              onClick={onDownload}
              leftIcon={<Download className="h-3 w-3" />}
              size="sm"
              className="col-span-2"
            >
              Download JSON
            </Button>
          )}
          
          {!isExample && onDownload && (
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
        
        {/* Secondary Actions Row 2 - Hide for example characters */}
        {!isExample && (
          <div className="grid grid-cols-2 gap-2">
            {onDownloadImage && (
              <Button
                variant="secondary"
                onClick={onDownloadImage}
                leftIcon={<ImageIcon className="h-3 w-3" />}
                size="sm"
                className="flex-1"
                disabled={!shouldShowDownloadImage}
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
        )}

        {/* Example character actions */}
        {isExample && onDownloadImage && shouldShowDownloadImage && (
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="secondary"
              onClick={onDownloadImage}
              leftIcon={<ImageIcon className="h-3 w-3" />}
              size="sm"
              className="w-full"
            >
              Download Portrait
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}