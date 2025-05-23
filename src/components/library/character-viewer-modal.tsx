// Fixed character-viewer-modal.tsx with better traits layout and single column when no portrait

'use client';

import { useRef, useEffect, useState } from 'react';
import { Character } from '@/lib/types';
import { StoredCharacter } from '@/lib/character-storage';
import Button from '@/components/ui/button';
import PortraitDisplay from '@/components/portrait-display';
import { X, Trash2, Edit, Download } from 'lucide-react';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const [contentTab, setContentTab] = useState<'profile' | 'quests' | 'dialogue' | 'items'>('profile');

  // Check if portrait exists
  const hasPortrait = !!(fullCharacter?.image_url || fullCharacter?.image_data);

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
  const traits = getCharacterTraitsArray(selectedCharacter.character);

  // Render content based on selected tab
  const renderTabContent = () => {
    switch(contentTab) {
      case 'profile':
        return (
          <div>
            <ProfileSection character={selectedCharacter.character} />
            
            {/* Show traits below profile when no portrait */}
            {!hasPortrait && traits.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
                  Traits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <span key={index} className="character-trait-tag">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'quests':
        return selectedCharacter.character.quests && selectedCharacter.character.quests.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Quests</h4>
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
        );
      case 'dialogue':
        return selectedCharacter.character.dialogue_lines && selectedCharacter.character.dialogue_lines.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Dialogue Lines</h4>
            <div className="space-y-2">
              {selectedCharacter.character.dialogue_lines.map((line, index) => (
                <div key={index} className="p-2 bg-secondary rounded text-sm italic">"{line}"</div>
              ))}
            </div>
          </div>
        );
      case 'items':
        return selectedCharacter.character.items && selectedCharacter.character.items.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">Items</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {selectedCharacter.character.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <div>
            <ProfileSection character={selectedCharacter.character} />
            
            {/* Show traits below profile when no portrait */}
            {!hasPortrait && traits.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3 dark:text-blue-300">
                  Traits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {traits.map((trait, index) => (
                    <span key={index} className="character-trait-tag">
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
      <div 
        ref={modalRef}
        className="bg-card rounded-lg shadow-lg w-full max-w-5xl h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-3 sm:p-4 border-b border-theme flex justify-between items-center">
          <div className="flex-1"></div>
          <h3 className="text-lg font-medium text-center flex-1">
            {selectedCharacter.character.name}
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
            hasPortrait ? (
              /* Two Column Layout - With Portrait */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Portrait and Character Info */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Character image */}
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
                  
                  {/* Character traits tags */}
                  {traits.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Traits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {traits.map((trait, index) => (
                          <span key={index} className="character-trait-tag">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Tabbed Content */}
                <div className="lg:col-span-2">
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
                      {selectedCharacter.character.quests && selectedCharacter.character.quests.length > 0 && (
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
                      {selectedCharacter.character.dialogue_lines && selectedCharacter.character.dialogue_lines.length > 0 && (
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
                      {selectedCharacter.character.items && selectedCharacter.character.items.length > 0 && (
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
            ) : (
              /* Single Column Layout - No Portrait */
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
                    {selectedCharacter.character.quests && selectedCharacter.character.quests.length > 0 && (
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
                    {selectedCharacter.character.dialogue_lines && selectedCharacter.character.dialogue_lines.length > 0 && (
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
                    {selectedCharacter.character.items && selectedCharacter.character.items.length > 0 && (
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
            )
          ) : (
            // JSON View
            <pre className="text-xs whitespace-pre-wrap bg-gray-100 p-4 rounded dark:bg-gray-800 dark:text-gray-300 text-gray-800 overflow-auto h-full">
              {JSON.stringify(fullCharacter || selectedCharacter.character, null, 2)}
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
          
          {/* Bottom action buttons */}
          <div className="p-4 flex flex-wrap gap-2 justify-end modal-footer-buttons mt-auto">
            <Button
              variant="danger"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${selectedCharacter.character.name}? This action cannot be undone.`)) {
                  handleDeleteCharacter(selectedCharacter.id);
                }
              }}
              type="button"
              leftIcon={<Trash2 className="h-4 w-4" />}
              size="sm"
            >
              Delete
            </Button>
              
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
              
            <Button
              variant="primary"
              onClick={handleDownloadFromModal}
              type="button"
              leftIcon={<Download className="h-4 w-4" />}
              size="sm"
            >
              JSON
            </Button>
              
            <Button
              variant="secondary"
              onClick={handleDownloadImage}
              type="button"
              leftIcon={<Download className="h-4 w-4" />}
              size="sm"
            >
              Portrait
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}