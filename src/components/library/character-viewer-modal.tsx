'use client';

import { useRef, useEffect } from 'react';
import { Character } from '@/lib/types';
import { StoredCharacter } from '@/lib/character-storage';
import Button from '@/components/ui/button';
import PortraitDisplay from '@/components/portrait-display';
import { X, Trash2, Edit, Download } from 'lucide-react';
import { getCharacterTraitsArray } from '@/lib/utils';

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
  const modalRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
      <div 
        ref={modalRef}
        className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-3 sm:p-4 border-b border-theme flex justify-between items-center">
          <h3 className="text-lg font-medium truncate pr-2">
            {selectedCharacter.character.name}
          </h3>
          <button 
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            aria-label="Close"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
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
        
        {/* Content area with scrolling */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Character image - Updated with key to force re-rendering */}
              <div className="flex justify-center">
                <PortraitDisplay
                  imageUrl={fullCharacter?.image_url}
                  imageData={fullCharacter?.image_data}
                  characterId={selectedCharacter.id}
                  name={selectedCharacter.character.name}
                  size="large"
                  className="mx-auto"
                  isLoading={imageLoading}
                  key={`portrait-${selectedCharacter.id}-${Date.now()}`}
                />
              </div>
              
              {/* Character traits display */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Character Traits</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {getCharacterTraitsArray(selectedCharacter.character).map((trait, index) => (
                    <span key={index} className="character-trait-tag">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Appearance */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Appearance</h4>
                <p className="text-sm">{selectedCharacter.character.appearance}</p>
              </div>
              
              {/* Personality */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Personality</h4>
                <p className="text-sm">{selectedCharacter.character.personality}</p>
              </div>
              
              {/* Backstory */}
              <div>
                <h4 className="text-lg font-semibold mb-2">Backstory Hook</h4>
                <p className="text-sm">{selectedCharacter.character.backstory_hook}</p>
              </div>
              
              {/* Dialogue Lines */}
              {selectedCharacter.character.dialogue_lines && selectedCharacter.character.dialogue_lines.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Dialogue Lines</h4>
                  <div className="space-y-2">
                    {selectedCharacter.character.dialogue_lines.map((line, index) => (
                      <div key={index} className="p-2 bg-secondary rounded text-sm italic">"{line}"</div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Items */}
              {selectedCharacter.character.items && selectedCharacter.character.items.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Items</h4>
                  <ul className="list-disc list-inside text-sm">
                    {selectedCharacter.character.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Quests */}
              {selectedCharacter.character.quests && selectedCharacter.character.quests.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold mb-2">Quests</h4>
                  <div className="space-y-4">
                    {selectedCharacter.character.quests.map((quest, index) => (
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
              )}
            </div>
          ) : (
            <pre className="text-xs whitespace-pre-wrap bg-gray-100 p-4 rounded dark:bg-gray-800 dark:text-gray-300 text-gray-800 overflow-auto h-full">
              {JSON.stringify(fullCharacter || selectedCharacter.character, null, 2)}
            </pre>
          )}
        </div>
        
        {/* Bottom action buttons with fixed height - updated class to remove default bottom margin/padding */}
        <div className="p-4 border-t border-theme flex flex-wrap gap-2 justify-end modal-footer-buttons mt-auto">
          <Button
            variant="danger"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${selectedCharacter.character.name}? This action cannot be undone.`)) {
                handleDeleteCharacter(selectedCharacter.id);
              }
            }}
            type="button"
            leftIcon={<Trash2 className="h-4 w-4" />}
          >
            Delete Character
          </Button>
            
          <Button
            variant="secondary"
            onClick={handleEditFromModal}
            disabled={isNavigating}
            type="button"
            leftIcon={<Edit className="h-4 w-4" />}
          >
            Edit Character
          </Button>
            
          <Button
            variant="primary"
            onClick={handleDownloadFromModal}
            type="button"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Download JSON
          </Button>
            
          <Button
            variant="secondary"
            onClick={handleDownloadImage}
            type="button"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Download Portrait
          </Button>
        </div>
      </div>
    </div>
  );
}