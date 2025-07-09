// src/app/library/page.tsx (FIXED)
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { StoredCharacter, loadCharacterWithImage, resetDatabase } from '@/lib/character-storage';
import { hybridCharacterStorage } from '@/lib/hybrid-storage';
import { Character } from '@/lib/types';
import CharacterCard from '@/components/character-card';
import Button from '@/components/ui/button';
import { Library, Search, Upload, X, RefreshCw, ArrowUp, Filter } from 'lucide-react';
import { downloadJson, filterCharactersByTraits, getUniqueTraitValues } from '@/lib/utils';
import StickyFooter from '@/components/sticky-footer';
import FilterPanel from '@/components/library/filter-panel';
import CharacterViewerModal from '@/components/library/character-viewer-modal';

export default function CharacterLibraryPage() {
  const router = useRouter();
  
  // State variables
  const [characters, setCharacters] = useState<StoredCharacter[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Single unified search
  
  // Basic filter state
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedAlignment, setSelectedAlignment] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');
  
  // Extended trait filter state
  const [selectedPersonality, setSelectedPersonality] = useState<string>('');
  const [selectedOccupation, setSelectedOccupation] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [selectedSocialClass, setSelectedSocialClass] = useState<string>('');
  const [selectedHeight, setSelectedHeight] = useState<string>('');
  const [selectedBuild, setSelectedBuild] = useState<string>('');
  const [selectedHomeland, setSelectedHomeland] = useState<string>('');
  
  // Other state
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<StoredCharacter | null>(null);
  const [fullCharacter, setFullCharacter] = useState<Character | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'json'>('details');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // References
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize library and load characters using hybrid storage
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        await hybridCharacterStorage.initialize();
        await loadCharacters();
      } catch (error) {
        console.error("Error initializing library:", error);
        setDbError("Failed to initialize database. Try refreshing the page.");
      } finally {
        setIsLoading(false);
      }
    }
    
    init();
  }, []);
  
  // Track scrolling to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // When a character is selected, load the full character with image from IndexedDB
  useEffect(() => {
    async function loadFullCharacter() {
      if (selectedCharacter) {
        setImageLoading(true);
        try {
          // Try up to 3 times to load the character with image
          let character: Character | null = null;
          let attempts = 0;
          const maxAttempts = 3;
          
          while (!character && attempts < maxAttempts) {
            attempts++;
            try {
              // Add a small delay on retry attempts
              if (attempts > 1) {
                await new Promise(r => setTimeout(r, 100 * attempts));
              }
              
              character = await hybridCharacterStorage.loadCharacterWithImage(selectedCharacter.id);
            } catch (attemptError: any) {
              console.warn(`Attempt ${attempts} failed:`, attemptError);
              // Continue to next attempt
            }
          }
          
          if (character) {
            // Ensure we update the fullCharacter state with all data including image
            setFullCharacter({...character});
          } else {
            // If no character with image could be loaded after all attempts, use the stored character
            console.warn("All attempts to load character with image failed, using stored character");
            setFullCharacter({...selectedCharacter.character});
          }
        } catch (error: any) {
          console.error('Error loading character with image:', error);
          // Fallback to stored character
          setFullCharacter({...selectedCharacter.character});
        } finally {
          setImageLoading(false);
        }
      } else {
        setFullCharacter(null);
      }
    }
    
    loadFullCharacter();
  }, [selectedCharacter]);
  
  // Load characters using hybrid storage
  const loadCharacters = async () => {
    try {
      const stored = await hybridCharacterStorage.getCharacters();
      setCharacters(stored);
      console.log(`Loaded ${stored.length} characters from hybrid storage`);
    } catch (error) {
      console.error('Error loading characters:', error);
      setDbError("Failed to load characters. Try refreshing the page.");
    }
  };
  
  // Reset database handler for error recovery
  const handleResetDatabase = async () => {
    setIsLoading(true);
    try {
      await resetDatabase();
      setDbError(null);
      await hybridCharacterStorage.initialize();
      await loadCharacters();
    } catch (error) {
      console.error("Error resetting database:", error);
      setDbError("Failed to reset database. Please try again or refresh the page.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedAlignment('');
    setSelectedGender('');
    setSelectedRelationship('');
    setSelectedPersonality('');
    setSelectedOccupation('');
    setSelectedSpecies('');
    setSelectedSocialClass('');
    setSelectedHeight('');
    setSelectedBuild('');
    setSelectedHomeland('');
  };
  
  // Extract unique values for all trait filters using enhanced utilities
  const traitValues = getUniqueTraitValues(characters);
  
  // Basic filter arrays (backwards compatibility)
  const genres = Array.from(new Set(characters.map(char => 
    char.character.selected_traits.genre || 'unknown'
  ).filter(g => g !== 'unknown')));
  
  const alignments = Array.from(new Set(characters
    .filter(char => char.character.selected_traits.moral_alignment)
    .map(char => char.character.selected_traits.moral_alignment as string)
  ));
  
  const genders = Array.from(new Set(characters
    .filter(char => char.character.selected_traits.gender)
    .map(char => char.character.selected_traits.gender as string)
  ));
  
  const relationships = Array.from(new Set(characters
    .filter(char => char.character.selected_traits.relationship_to_player)
    .map(char => char.character.selected_traits.relationship_to_player as string)
  ));
  
  // Extract comprehensive trait arrays
  const personalityTraits = traitValues.personality || [];
  const occupations = traitValues.occupation || [];
  const species = traitValues.species || [];
  const socialClasses = traitValues['social class'] || [];
  const heights = traitValues.height || [];
  const builds = traitValues.build || [];
  const homelands = traitValues.homeland || [];
  
  // COMPREHENSIVE: Enhanced filtering logic combining all search types and trait filters
  const filteredCharacters = (() => {
    let filtered = characters;

    // Apply basic dropdown filters
    if (selectedGenre) {
      filtered = filtered.filter(char => 
        char.character.selected_traits.genre === selectedGenre
      );
    }

    if (selectedAlignment) {
      filtered = filtered.filter(char => 
        char.character.selected_traits.moral_alignment === selectedAlignment
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(char => 
        char.character.selected_traits.gender === selectedGender
      );
    }

    if (selectedRelationship) {
      filtered = filtered.filter(char => 
        char.character.selected_traits.relationship_to_player === selectedRelationship
      );
    }

    // Apply comprehensive trait filters using trait search
    if (selectedPersonality) {
      filtered = filterCharactersByTraits(filtered, `personality: ${selectedPersonality}`);
    }

    if (selectedOccupation) {
      filtered = filterCharactersByTraits(filtered, `occupation: ${selectedOccupation}`);
    }

    if (selectedSpecies) {
      filtered = filterCharactersByTraits(filtered, `species: ${selectedSpecies}`);
    }

    if (selectedSocialClass) {
      filtered = filterCharactersByTraits(filtered, `social class: ${selectedSocialClass}`);
    }

    if (selectedHeight) {
      filtered = filterCharactersByTraits(filtered, `height: ${selectedHeight}`);
    }

    if (selectedBuild) {
      filtered = filterCharactersByTraits(filtered, `build: ${selectedBuild}`);
    }

    if (selectedHomeland) {
      filtered = filterCharactersByTraits(filtered, `homeland: ${selectedHomeland}`);
    }

    // Apply unified search - handles both basic and trait search intelligently
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      // Check if it looks like a trait search (contains colon)
      const isTraitSearch = query.includes(':');
      
      if (isTraitSearch) {
        // Use comprehensive trait filtering
        filtered = filterCharactersByTraits(filtered, searchQuery);
      } else {
        // Use combined basic + trait search
        filtered = filtered.filter(char => {
          // Basic search in name, genre, appearance
          const basicMatch = char.character.name.toLowerCase().includes(query) ||
            (char.character.selected_traits.genre && 
             char.character.selected_traits.genre.toLowerCase().includes(query)) ||
            (char.character.appearance && 
             char.character.appearance.toLowerCase().includes(query));
          
          // Also search in comprehensive traits (without prefix requirement)
          const traitMatch = filterCharactersByTraits([char], query).length > 0;
          
          return basicMatch || traitMatch;
        });
      }
    }

    return filtered;
  })();
  
  // Format filter value for display
  const formatFilterValue = (value: string): string => {
    if (!value) return 'Any';
    return value
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  // Handle character deletion using hybrid storage
  const handleDeleteConfirm = async (id: string) => {
    setDeletingId(id);
    
    try {
      const success = await hybridCharacterStorage.deleteCharacter(id);
      if (success) {
        await loadCharacters();
        
        // Clear selection if the deleted character was selected
        if (selectedCharacter?.id === id) {
          setIsJsonViewerOpen(false);
          setSelectedCharacter(null);
          setFullCharacter(null);
        }
        
        // Clear confirmation state
        setDeleteConfirmId(null);
      }
    } catch (error) {
      console.error('Error deleting character:', error);
    } finally {
      setDeletingId(null);
    }
  };
  
  // Handle request for delete confirmation
  const handleDeleteRequest = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Don't select the character when clicking delete
    setDeleteConfirmId(id);
  };
  
  // Handle canceling delete
  const handleCancelDelete = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setDeleteConfirmId(null);
  };
  
  // Handle character download
  const handleDownloadCharacter = (character: Character) => {
    downloadJson(character, `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`);
  };
  
  // Handle character download from modal
  const handleDownloadFromModal = async () => {
    if (!selectedCharacter) return;
    
    try {
      // Use full character with image if available
      if (fullCharacter) {
        handleDownloadCharacter(fullCharacter);
      } else {
        const character = await hybridCharacterStorage.loadCharacterWithImage(selectedCharacter.id);
        if (character) {
          handleDownloadCharacter(character);
        } else {
          handleDownloadCharacter(selectedCharacter.character);
        }
      }
    } catch (error) {
      console.error('Error downloading character:', error);
      handleDownloadCharacter(selectedCharacter.character);
    }
  };
  
  // Handle download image from modal
  const handleDownloadImage = async () => {
    if (!selectedCharacter) return;
    
    try {
      // Use full character with image if available
      let imageData: string | null = null;
      
      if (fullCharacter && fullCharacter.image_data) {
        imageData = fullCharacter.image_data;
      } else {
        // Try to load the image using hybrid storage
        const character = await hybridCharacterStorage.loadCharacterWithImage(selectedCharacter.id);
        if (character && character.image_data) {
          imageData = character.image_data;
        } else if (selectedCharacter.character.image_url) {
          imageData = selectedCharacter.character.image_url;
        }
      }
      
      if (!imageData) {
        alert('No image available to download');
        return;
      }
      
      // Create an anchor element and set its href to the image data
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `${selectedCharacter.character.name.replace(/\s+/g, '_').toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image');
    }
  };
  
  // Handle character edit with improved navigation
  const handleEditCharacter = (id: string) => {
    if (isNavigating) return; // Prevent double-clicks
    
    setIsNavigating(true);
    
    // Use a small timeout to ensure state is updated before navigation
    setTimeout(() => {
      router.push(`/library/edit/${encodeURIComponent(id)}`);
    }, 100);
  };
  
  // Handle editing from modal
  const handleEditFromModal = () => {
    if (!selectedCharacter || isNavigating) return;
    
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/library/edit/${encodeURIComponent(selectedCharacter.id)}`);
    }, 100);
  };
  
  // Handle JSON file upload using hybrid storage
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const characterData = JSON.parse(content) as Character;
        
        // Validate basic character structure
        if (!characterData.name || !characterData.appearance || !characterData.personality) {
          throw new Error('Invalid character file format');
        }
        
        // Import the character using hybrid storage
        await hybridCharacterStorage.saveCharacter(characterData);
        await loadCharacters();
        alert(`Character ${characterData.name} has been added to your library!`);
      } catch (error) {
        alert('Error importing character: Invalid JSON format');
        console.error('Error importing character:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };
  
  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Count of active filters (including all trait filters)
  const activeFilterCount = [
    selectedGenre, 
    selectedAlignment, 
    selectedGender, 
    selectedRelationship,
    selectedPersonality,
    selectedOccupation,
    selectedSpecies,
    selectedSocialClass,
    selectedHeight,
    selectedBuild,
    selectedHomeland
  ].filter(Boolean).length;

  // If there's a database error, show a reset option
  if (dbError) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center h-64">
        <div className="bg-red-50 p-4 rounded-md text-red-700 mb-6 dark:bg-red-900/20 dark:text-red-400 max-w-md text-center">
          <h2 className="text-lg font-bold mb-2">Database Error</h2>
          <p className="mb-4">{dbError}</p>
          <Button
            variant="primary"
            onClick={handleResetDatabase}
            isLoading={isLoading}
            type="button"
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Reset Database
          </Button>
        </div>
      </div>
    );
  }

  // Show loading spinner while initializing
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 pb-40 md:pb-32">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <Library className="h-6 w-6 md:h-8 md:w-8 mr-2 text-indigo-600 dark:text-indigo-400" />
          Character Library
        </h1>
        
        {/* Upload file input (hidden) */}
        <input 
          type="file" 
          ref={fileInputRef}
          accept=".json" 
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      
      {/* UPDATED SEARCH BAR - Simplified text */}
      <div className="mb-4 relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search characters..."
            className="w-full pl-10 pr-12 p-3 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary text-base"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              type="button"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      {/* COMPREHENSIVE Filter Panel with improved event handling */}
      <div onClick={(e) => e.stopPropagation()}>
        <FilterPanel
          genres={genres}
          alignments={alignments}
          genders={genders}
          relationships={relationships}
          personalityTraits={personalityTraits}
          occupations={occupations}
          species={species}
          socialClasses={socialClasses}
          heights={heights}
          builds={builds}
          homelands={homelands}
          selectedGenre={selectedGenre}
          selectedAlignment={selectedAlignment}
          selectedGender={selectedGender}
          selectedRelationship={selectedRelationship}
          selectedPersonality={selectedPersonality}
          selectedOccupation={selectedOccupation}
          selectedSpecies={selectedSpecies}
          selectedSocialClass={selectedSocialClass}
          selectedHeight={selectedHeight}
          selectedBuild={selectedBuild}
          selectedHomeland={selectedHomeland}
          traitSearchQuery="" // Not used in this version
          setSelectedGenre={setSelectedGenre}
          setSelectedAlignment={setSelectedAlignment}
          setSelectedGender={setSelectedGender}
          setSelectedRelationship={setSelectedRelationship}
          setSelectedPersonality={setSelectedPersonality}
          setSelectedOccupation={setSelectedOccupation}
          setSelectedSpecies={setSelectedSpecies}
          setSelectedSocialClass={setSelectedSocialClass}
          setSelectedHeight={setSelectedHeight}
          setSelectedBuild={setSelectedBuild}
          setSelectedHomeland={setSelectedHomeland}
          setTraitSearchQuery={() => {}} // Not used in this version
          resetFilters={resetFilters}
          isFilterExpanded={isFilterExpanded}
          setIsFilterExpanded={setIsFilterExpanded}
          activeFilterCount={activeFilterCount}
          formatFilterValue={formatFilterValue}
        />
      </div>
      
      {/* Character count and results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted">
          {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'} found
          {activeFilterCount > 0 || searchQuery.trim() ? (
            <span className="ml-2">
              <button
                onClick={resetFilters}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm underline"
                type="button"
              >
                Clear all filters
              </button>
            </span>
          ) : null}
        </p>
      </div>
      
      {/* Character grid - RESPONSIVE CARDS */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCharacters.map((storedChar) => (
            <div key={storedChar.id} className="relative h-full">
              <CharacterCard 
                character={storedChar.character}
                id={storedChar.id}
                isExample={storedChar.isExample} // ✅ FIXED: Now passing the isExample prop
                onDownload={(e) => {
                  e.stopPropagation();
                  hybridCharacterStorage.loadCharacterWithImage(storedChar.id).then((fullChar: Character | null) => {
                    if (fullChar) {
                      handleDownloadCharacter(fullChar);
                    } else {
                      handleDownloadCharacter(storedChar.character);
                    }
                  }).catch((error: any) => {
                    console.error('Error loading character for download:', error);
                    handleDownloadCharacter(storedChar.character);
                  });
                }}
                onDownloadImage={(e) => {
                  e.stopPropagation();
                  hybridCharacterStorage.loadCharacterWithImage(storedChar.id).then((fullChar: Character | null) => {
                    const imageData = fullChar?.image_data || storedChar.character.image_url;
                    if (imageData) {
                      const link = document.createElement('a');
                      link.href = imageData;
                      link.download = `${storedChar.character.name.replace(/\s+/g, '_').toLowerCase()}.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } else {
                      alert('No image available to download');
                    }
                  }).catch((error: any) => {
                    console.error('Error loading image for download:', error);
                    alert('Failed to download image');
                  });
                }}
                onEdit={(e) => {
                  e.stopPropagation();
                  handleEditCharacter(storedChar.id);
                }}
                onClick={() => {
                  // Don't select if we're confirming deletion
                  if (deleteConfirmId === storedChar.id) return;
                  
                  setSelectedCharacter(storedChar);
                  setIsJsonViewerOpen(true);
                  setActiveTab('details');
                }}
                onDelete={(e) => handleDeleteRequest(storedChar.id, e)}
              />
              
              {/* Delete confirmation tooltip */}
              {deleteConfirmId === storedChar.id && (
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 z-30 border border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Delete this character?
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={handleCancelDelete}
                      size="sm"
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteConfirm(storedChar.id)}
                      size="sm"
                      isLoading={deletingId === storedChar.id}
                      type="button"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg border border-theme">
          <Library className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No characters found</h3>
          <p className="text-muted mb-4">
            {searchQuery || activeFilterCount > 0
              ? "Try adjusting your search or filters" 
              : "Your character library is empty. Generate or import characters to get started."}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="primary"
              onClick={() => router.push('/')}
              type="button"
            >
              Create a Character
            </Button>
            {(searchQuery || activeFilterCount > 0) && (
              <Button
                variant="secondary"
                onClick={resetFilters}
                type="button"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Character Viewer Modal Component */}
      {isJsonViewerOpen && selectedCharacter && (
        <CharacterViewerModal
          selectedCharacter={selectedCharacter}
          fullCharacter={fullCharacter}
          imageLoading={imageLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isNavigating={isNavigating}
          handleEditFromModal={handleEditFromModal}
          handleDownloadFromModal={handleDownloadFromModal}
          handleDownloadImage={handleDownloadImage}
          closeModal={() => {
            setIsJsonViewerOpen(false);
            setSelectedCharacter(null);
            setFullCharacter(null);
          }}
          handleDeleteCharacter={handleDeleteConfirm}
        />
      )}
      
      {/* Back to top button - appears after scrolling */}
      {hasScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-40"
          aria-label="Scroll to top"
          type="button"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      
      {/* Sticky Footer */}
      <StickyFooter 
        pageType="library"
        libraryFilterCount={activeFilterCount + (searchQuery.trim() ? 1 : 0)}
        onClearFilters={resetFilters}
        showImport={true}
        onImport={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
      />
    </div>
  );
}