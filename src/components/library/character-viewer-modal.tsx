// src/components/library/character-viewer-modal.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Character } from '@/lib/types';
import { StoredCharacter } from '@/lib/character-storage';
import Button from '@/components/ui/button';
import PortraitDisplay from '@/components/portrait-display';
import { X, Trash2, Edit, Download, MessageCircle, Star } from 'lucide-react';
import { getCharacterTraitsArray } from '@/lib/utils';

// Profile Component for Modal
const ProfileSection = ({ character }: { character: Character }) => (
  <div className="space-y-4">
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
        Appearance
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {character.appearance}
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
        Personality
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        {character.personality}
      </p>
    </div>

    <div className="bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
        Backstory Hook
      </h3>
      <p className="text-gray-700 italic font-medium dark:text-gray-300 text-sm leading-relaxed bg-blue-50 p-3 rounded-md dark:bg-blue-900/20">
        {character.backstory_hook}
      </p>
    </div>
  </div>
);

interface CharacterViewerModalProps {
  selectedCharacter: StoredCharacter;
  fullCharacter: Character | null;
  imageLoading: boolean;
  activeTab: 'details' | 'json';
  setActiveTab: (tab: 'details' | 'json') => void;
  isNavigating: boolean;
  handleEditFromModal: () => void;
  handleDownloadFromModal: () => void;
  handleDownloadImage: () => void;
  closeModal: () => void;
  handleDeleteCharacter: (id: string) => Promise<void>;
}

export default function CharacterViewerModal({
  selectedCharacter,
  fullCharacter,
  imageLoading,
  activeTab,
  setActiveTab,
  isNavigating,
  handleEditFromModal,
  handleDownloadFromModal,
  handleDownloadImage,
  closeModal,
  handleDeleteCharacter
}: CharacterViewerModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [contentTab, setContentTab] = useState<'profile' | 'quests' | 'dialogue' | 'items'>('profile');
  const [isChatNavigating, setIsChatNavigating] = useState(false);

  // Use consistent character data - prefer fullCharacter but fallback to selectedCharacter
  const displayCharacter = fullCharacter || selectedCharacter.character;
  
  // NEW: Check if this is an example character
  const isExample = selectedCharacter.isExample || false;
  
  // Check if portrait exists - use the same logic as character card
  const hasPortrait = !!(displayCharacter.image_url || displayCharacter.image_data);

  // Handle chat navigation
  const handleChatWithCharacter = () => {
    if (isChatNavigating || isNavigating) return;
    
    setIsChatNavigating(true);
    
    // Close the modal first
    closeModal();
    
    // Navigate to chat page after a short delay with proper encoding
    setTimeout(() => {
      router.push(`/chat/${encodeURIComponent(selectedCharacter.id)}`);
    }, 100);
  };

  // Ensure modal padding doesn't overlap with footer
  useEffect(() => {
    if (modalRef.current) {
      const updateModalPadding = () => {
        const footerHeight = document.querySelector('.sticky-footer')?.clientHeight || 0;
        // Use fixed padding to avoid layout shifts - add to content area instead of container
        const contentArea = modalRef.current!.querySelector('.overflow-auto');
        if (contentArea) {
          contentArea.setAttribute('style', `padding-bottom: ${footerHeight + 16}px`);
        }
      };
      
      updateModalPadding();
      window.addEventListener('resize', updateModalPadding);
      
      return () => {
        window.removeEventListener('resize', updateModalPadding);
      };
    }
  }, []);

  // Get character traits
  const traits = getCharacterTraitsArray(displayCharacter);

  // Render content based on selected tab
  const renderTabContent = () => {
    switch(contentTab) {
      case 'profile':
        return (
          <div>
            <ProfileSection character={displayCharacter} />
            
            {/* Show traits below profile when no portrait */}
            {!hasPortrait && traits.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
                  Traits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className={`character-trait-tag ${
                        isExample 
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800' 
                          : ''
                      }`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'quests':
        return displayCharacter.quests && displayCharacter.quests.length > 0 ? (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Quests</h4>
            <div className="space-y-4">
              {displayCharacter.quests.map((quest, index) => (
                <div key={index} className="p-3 bg-secondary rounded-lg border border-theme">
                  <h5 className="font-medium mb-1">{quest.title}</h5>
                  <p className="text-sm mb-2">{quest.description}</p>
                  <div className="text-sm">
                    <span className="font-medium">Reward:</span> {quest.reward}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      case 'dialogue':
        return displayCharacter.dialogue_lines && displayCharacter.dialogue_lines.length > 0 ? (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Dialogue Lines</h4>
            <div className="space-y-2">
              {displayCharacter.dialogue_lines.map((line, index) => (
                <div key={index} className="p-2 bg-secondary rounded text-sm italic">"{line}"</div>
              ))}
            </div>
          </div>
        ) : null;
      case 'items':
        return displayCharacter.items && displayCharacter.items.length > 0 ? (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Items</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {displayCharacter.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null;
      default:
        return (
          <div>
            <ProfileSection character={displayCharacter} />
            
            {/* Show traits below profile when no portrait */}
            {!hasPortrait && traits.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
                  Traits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className={`character-trait-tag ${
                        isExample 
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800' 
                          : ''
                      }`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  const renderTwoColumnLayout = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column - Portrait and Character Info - RESPONSIVE with LARGER portrait */}
      <div className="xl:col-span-1 space-y-4">
        {/* FIXED: Much larger character image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <PortraitDisplay
              imageUrl={displayCharacter.image_url}
              imageData={displayCharacter.image_data}
              characterId={selectedCharacter.id}
              name={displayCharacter.name}
              size="large"
              className="w-full h-auto aspect-square object-cover rounded-lg modal-portrait"
              isLoading={imageLoading}
            />
          </div>
        </div>
        
        {/* Character traits tags */}
        {traits.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Traits
            </h4>
            <div className="flex flex-wrap gap-2">
              {traits.map((trait, index) => (
                <span 
                  key={index} 
                  className={`character-trait-tag ${
                    isExample 
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800' 
                      : ''
                  }`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Tabbed Content - RESPONSIVE */}
      <div className="xl:col-span-2">
        {/* Tab Navigation for Content */}
        <div className="border-b border-theme mb-4">
          <ul className="flex flex-wrap text-sm font-medium text-center">
            <li className="mr-2">
              <button 
                onClick={() => setContentTab('profile')}
                className={`inline-block p-3 border-b-2 rounded-t-lg ${
                  contentTab === 'profile' 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                type="button"
              >
                Profile
              </button>
            </li>
            {displayCharacter.quests && displayCharacter.quests.length > 0 && (
              <li className="mr-2">
                <button 
                  onClick={() => setContentTab('quests')}
                  className={`inline-block p-3 border-b-2 rounded-t-lg ${
                    contentTab === 'quests' 
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                  type="button"
                >
                  Quests
                </button>
              </li>
            )}
            {displayCharacter.dialogue_lines && displayCharacter.dialogue_lines.length > 0 && (
              <li className="mr-2">
                <button 
                  onClick={() => setContentTab('dialogue')}
                  className={`inline-block p-3 border-b-2 rounded-t-lg ${
                    contentTab === 'dialogue' 
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                  type="button"
                >
                  Dialogue
                </button>
              </li>
            )}
            {displayCharacter.items && displayCharacter.items.length > 0 && (
              <li className="mr-2">
                <button 
                  onClick={() => setContentTab('items')}
                  className={`inline-block p-3 border-b-2 rounded-t-lg ${
                    contentTab === 'items' 
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                  type="button"
                >
                  Items
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Content based on active content tab */}
        {renderTabContent()}
      </div>
    </div>
  );

  const renderSingleColumnLayout = () => (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation for Content */}
      <div className="border-b border-theme mb-4">
        <ul className="flex flex-wrap text-sm font-medium text-center">
          <li className="mr-2">
            <button 
              onClick={() => setContentTab('profile')}
              className={`inline-block p-3 border-b-2 rounded-t-lg ${
                contentTab === 'profile' 
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
              type="button"
            >
              Profile
            </button>
          </li>
          {displayCharacter.quests && displayCharacter.quests.length > 0 && (
            <li className="mr-2">
              <button 
                onClick={() => setContentTab('quests')}
                className={`inline-block p-3 border-b-2 rounded-t-lg ${
                  contentTab === 'quests' 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                type="button"
              >
                Quests
              </button>
            </li>
          )}
          {displayCharacter.dialogue_lines && displayCharacter.dialogue_lines.length > 0 && (
            <li className="mr-2">
              <button 
                onClick={() => setContentTab('dialogue')}
                className={`inline-block p-3 border-b-2 rounded-t-lg ${
                  contentTab === 'dialogue' 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                type="button"
              >
                Dialogue
              </button>
            </li>
          )}
          {displayCharacter.items && displayCharacter.items.length > 0 && (
            <li className="mr-2">
              <button 
                onClick={() => setContentTab('items')}
                className={`inline-block p-3 border-b-2 rounded-t-lg ${
                  contentTab === 'items' 
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                type="button"
              >
                Items
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Content based on active content tab */}
      {renderTabContent()}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
      <div 
        ref={modalRef}
        className="bg-card rounded-lg shadow-lg w-full max-w-7xl h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-3 sm:p-4 border-b border-theme flex justify-between items-center">
          <div className="flex-1"></div>
          <h3 className="text-lg font-medium text-center flex-1 flex items-center justify-center gap-2">
            {displayCharacter.name}
            {/* NEW: Example indicator in modal header */}
            {isExample && (
              <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Example
              </div>
            )}
          </h3>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              aria-label="Close"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Content area with scrolling */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'details' ? (
            hasPortrait ? renderTwoColumnLayout() : renderSingleColumnLayout()
          ) : (
            // JSON View
            <pre className="text-xs whitespace-pre-wrap bg-gray-100 p-4 rounded dark:bg-gray-800 dark:text-gray-300 text-gray-800 overflow-auto h-full">
              {JSON.stringify(displayCharacter, null, 2)}
            </pre>
          )}
        </div>
        
        {/* Bottom section with tabs and actions */}
        <div className="border-t border-theme">
          {/* Tabs */}
          <div className="border-b border-theme">
            <ul className="flex flex-wrap text-sm font-medium text-center">
              <li className="mr-2">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`inline-block p-3 sm:p-4 border-b-2 rounded-t-lg ${
                    activeTab === 'details' 
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                  aria-label="View Character Details"
                  type="button"
                >
                  Character Details
                </button>
              </li>
              <li className="mr-2">
                <button 
                  onClick={() => setActiveTab('json')}
                  className={`inline-block p-3 sm:p-4 border-b-2 rounded-t-lg ${
                    activeTab === 'json' 
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }`}
                  aria-label="View JSON"
                  type="button"
                >
                  View JSON
                </button>
              </li>
            </ul>
          </div>
          
          {/* Bottom action buttons - ADAPTIVE LAYOUT BASED ON EXAMPLE STATUS */}
          <div className="p-3 modal-footer-buttons">
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {/* Chat button (prominent) - always available */}
              <Button
                variant="primary"
                onClick={handleChatWithCharacter}
                disabled={isChatNavigating || isNavigating}
                leftIcon={<MessageCircle className="h-4 w-4" />}
                size="sm"
              >
                {isChatNavigating ? 'Opening...' : 'Chat'}
              </Button>
              
              {/* Edit button - only for user characters */}
              {!isExample && (
                <Button
                  variant="secondary"
                  onClick={handleEditFromModal}
                  disabled={isNavigating}
                  type="button"
                  leftIcon={<Edit className="h-4 w-4" />}
                  size="sm"
                >
                  Edit
                </Button>
              )}
                
              {/* Download JSON - always available */}
              <Button
                variant="secondary"
                onClick={handleDownloadFromModal}
                type="button"
                leftIcon={<Download className="h-4 w-4" />}
                size="sm"
              >
                JSON
              </Button>
                
              {/* Download Portrait - always available if portrait exists */}
              <Button
                variant="secondary"
                onClick={handleDownloadImage}
                type="button"
                leftIcon={<Download className="h-4 w-4" />}
                size="sm"
                disabled={!hasPortrait}
              >
                Portrait
              </Button>
              
              {/* Delete - only for user characters */}
              {!isExample && (
                <Button
                  variant="danger"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${displayCharacter.name}? This action cannot be undone.`)) {
                      handleDeleteCharacter(selectedCharacter.id);
                    }
                  }}
                  type="button"
                  leftIcon={<Trash2 className="h-4 w-4" />}
                  size="sm"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}