'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredCharacters, deleteCharacter, initializeLibrary, StoredCharacter, loadCharacterWithImage, resetDatabase } from '@/lib/character-storage';
import { Character } from '@/lib/types';
import CharacterCard from '@/components/character-card';
import Button from '@/components/ui/button';
import { Library, Search, Upload, Filter, X, Download, Edit, Trash2, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { downloadJson } from '@/lib/utils';
import { getCharacterTraitsArray } from '@/lib/utils';
import PortraitDisplay from '@/components/portrait-display';
import StickyFooter from '@/components/sticky-footer';
import Select from '@/components/ui/select';

export default function CharacterLibraryPage() {
  const router = useRouter();
  // Define all state variables up front to maintain consistent order
  const [characters, setCharacters] = useState<StoredCharacter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedAlignment, setSelectedAlignment] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');
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
  
  // Define all refs up front
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize library and load characters
  useEffect(() => {
    async function init() {
      setIsLoading(true);
      try {
        await initializeLibrary();
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
  
  // Add click outside listener for mobile filter panel
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target as Node)) {
        setIsFilterExpanded(false);
      }
    }
    
    // Only add listener if filter is expanded
    if (isFilterExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterExpanded]);
  
  // Track scrolling to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Ensure modal padding doesn't overlap with footer
  useEffect(() => {
    if (isJsonViewerOpen && modalRef.current) {
      const updateModalPadding = () => {
        const footerHeight = document.querySelector('.sticky-footer')?.clientHeight || 0;
        modalRef.current!.style.paddingBottom = `${footerHeight + 16}px`;
      };
      
      updateModalPadding();
      window.addEventListener('resize', updateModalPadding);
      
      return () => {
        window.removeEventListener('resize', updateModalPadding);
      };
    }
  }, [isJsonViewerOpen]);
  
  // When a character is selected, load the full character with image from IndexedDB
  useEffect(() => {
    async function loadFullCharacter() {
      if (selectedCharacter) {
        setImageLoading(true);
        try {
          const character = await loadCharacterWithImage(selectedCharacter.id);
          if (character) {
            setFullCharacter(character);
          } else {
            // If no character with image could be loaded, use the stored character
            setFullCharacter(selectedCharacter.character);
          }
        } catch (error) {
          console.error('Error loading character with image:', error);
          // Fallback to stored character
          setFullCharacter(selectedCharacter.character);
        } finally {
          setImageLoading(false);
        }
      } else {
        setFullCharacter(null);
      }
    }
    
    loadFullCharacter();
  }, [selectedCharacter]);
  
  const loadCharacters = async () => {
    try {
      const stored = await getStoredCharacters();
      setCharacters(stored);
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
      await initializeLibrary();
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
  };
  
  // Extract unique values for filters
  const genres = Array.from(new Set(characters.map(char => 
    char.character.selected_traits.genre || 'unknown'
  )));
  
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
  
  // Filter characters based on search and all filters
  const filteredCharacters = characters.filter(char => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      char.character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (char.character.selected_traits.genre && 
       char.character.selected_traits.genre.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (char.character.appearance && 
       char.character.appearance.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Genre filter
    const matchesGenre = selectedGenre === '' || 
      char.character.selected_traits.genre === selectedGenre;
    
    // Alignment filter
    const matchesAlignment = selectedAlignment === '' || 
      char.character.selected_traits.moral_alignment === selectedAlignment;
    
    // Gender filter
    const matchesGender = selectedGender === '' || 
      char.character.selected_traits.gender === selectedGender;
    
    // Relationship filter
    const matchesRelationship = selectedRelationship === '' || 
      char.character.selected_traits.relationship_to_player === selectedRelationship;
    
    return matchesSearch && matchesGenre && matchesAlignment && matchesGender && matchesRelationship;
  });
  
  // Format filter value for display
  const formatFilterValue = (value: string): string => {
    if (!value) return 'Any';
    return value
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  // Handle character deletion with confirmation
  const handleDeleteConfirm = async (id: string) => {
    setDeletingId(id);
    
    try {
      const success = await deleteCharacter(id);
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
        const character = await loadCharacterWithImage(selectedCharacter.id);
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
        // Try to load the image from IndexedDB
        const character = await loadCharacterWithImage(selectedCharacter.id);
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
      router.push(`/library/edit/${id}`);
    }, 100);
  };
  
  // Handle editing from modal
  const handleEditFromModal = () => {
    if (!selectedCharacter || isNavigating) return;
    
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/library/edit/${selectedCharacter.id}`);
    }, 100);
  };
  
  // Handle JSON file upload
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
        
        // Import the character
        const { saveCharacter } = await import('@/lib/character-storage');
        await saveCharacter(characterData);
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
  
  // Toggle filter panel for mobile
  const toggleFilterPanel = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

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
          >
            <RefreshCw className="h-4 w-4 mr-2" />
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
  
  // Count of active filters
  const activeFilterCount = [
    selectedGenre, 
    selectedAlignment, 
    selectedGender, 
    selectedRelationship
  ].filter(Boolean).length;
  
  // Convert options for Select component
  const genreOptions = [
    { value: '', label: 'Any Genre' },
    ...genres.map(genre => ({ 
      value: genre, 
      label: genre.charAt(0).toUpperCase() + genre.slice(1)
    }))
  ];
  
  const alignmentOptions = [
    { value: '', label: 'Any Alignment' },
    ...alignments.map(alignment => ({ 
      value: alignment, 
      label: alignment.charAt(0).toUpperCase() + alignment.slice(1)
    }))
  ];
  
  const genderOptions = [
    { value: '', label: 'Any Gender' },
    ...genders.map(gender => ({ 
      value: gender, 
      label: gender.charAt(0).toUpperCase() + gender.slice(1)
    }))
  ];
  
  const relationshipOptions = [
    { value: '', label: 'Any Relationship' },
    ...relationships.map(relationship => ({ 
      value: relationship, 
      label: formatFilterValue(relationship)
    }))
  ];
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 pb-footer">
      {/* Header and search UI */}
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
      
      {/* Search bar - full width */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, genre, or description..."
            className="w-full pl-10 p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      {/* Filters - Desktop */}
      <div className="hidden md:flex items-center gap-3 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <span className="font-medium text-sm flex items-center">
          <Filter className="h-4 w-4 mr-1" /> Filters:
        </span>
        
        <Select
          options={genreOptions}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="mb-0 w-auto"
          containerClassName="mb-0 w-auto"
        />
        
        <Select
          options={alignmentOptions}
          value={selectedAlignment}
          onChange={(e) => setSelectedAlignment(e.target.value)}
          className="mb-0 w-auto"
          containerClassName="mb-0 w-auto"
        />
        
        <Select
          options={genderOptions}
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="mb-0 w-auto"
          containerClassName="mb-0 w-auto"
        />
        
        <Select
          options={relationshipOptions}
          value={selectedRelationship}
          onChange={(e) => setSelectedRelationship(e.target.value)}
          className="mb-0 w-auto"
          containerClassName="mb-0 w-auto"
        />
        
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
          >
            <X className="h-4 w-4 mr-1" /> 
            Clear {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'}
          </button>
        )}
      </div>
      
      {/* Filters - Mobile */}
      <div className="md:hidden mb-4 relative" ref={filterPanelRef}>
        <button
          onClick={toggleFilterPanel}
          className="w-full flex items-center justify-between p-3 bg-secondary border border-theme rounded-md shadow-sm"
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </span>
          {isFilterExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {isFilterExpanded && (
          <div className="absolute z-10 mt-1 w-full bg-card border border-theme rounded-md shadow-lg p-4 space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Genre</label>
              <Select
                options={genreOptions}
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Alignment</label>
              <Select
                options={alignmentOptions}
                value={selectedAlignment}
                onChange={(e) => setSelectedAlignment(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Select
                options={genderOptions}
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Relationship</label>
              <Select
                options={relationshipOptions}
                value={selectedRelationship}
                onChange={(e) => setSelectedRelationship(e.target.value)}
              />
            </div>
            
            <div className="pt-2 flex justify-end">
              {activeFilterCount > 0 ? (
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 flex items-center"
                >
                  <X className="h-4 w-4 mr-1" /> 
                  Clear All Filters
                </button>
              ) : (
                <button
                  onClick={() => setIsFilterExpanded(false)}
                  className="px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800 flex items-center"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Character count */}
      <p className="mb-4 text-muted">
        {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'} found
      </p>
      
      {/* Character grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredCharacters.map((storedChar) => (
            <div key={storedChar.id} className="relative">
              <CharacterCard 
                character={storedChar.character}
                id={storedChar.id}
                onDownload={(e) => {
                  e.stopPropagation();
                  loadCharacterWithImage(storedChar.id).then(fullChar => {
                    if (fullChar) {
                      handleDownloadCharacter(fullChar);
                    } else {
                      handleDownloadCharacter(storedChar.character);
                    }
                  }).catch(error => {
                    console.error('Error loading character for download:', error);
                    handleDownloadCharacter(storedChar.character);
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
            {searchQuery || selectedGenre || selectedAlignment || selectedGender || selectedRelationship 
              ? "Try adjusting your search or filters" 
              : "Your character library is empty. Generate or import characters to get started."}
          </p>
          <Button
            variant="primary"
            onClick={() => router.push('/')}
            type="button"
          >
            Create a Character
          </Button>
        </div>
      )}
      
      {/* Character Viewer Modal - Updated with better portrait display */}
      {isJsonViewerOpen && selectedCharacter && (
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
                onClick={() => {
                  setIsJsonViewerOpen(false);
                  setSelectedCharacter(null);
                  setFullCharacter(null);
                }}
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
            
            {/* Content area with scrolling - Updated portrait display */}
            <div className="flex-1 overflow-auto p-4">
              {activeTab === 'details' ? (
                <div className="space-y-6">
                  {/* Character image - Using the enhanced PortraitDisplay component */}
                  <div className="flex justify-center">
                    <PortraitDisplay
                      imageUrl={fullCharacter?.image_url || selectedCharacter.character.image_url}
                      imageData={fullCharacter?.image_data}
                      characterId={selectedCharacter.id}
                      name={selectedCharacter.character.name}
                      size="large"
                      className="mx-auto"
                      isLoading={imageLoading}
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
                  {/* Use fullCharacter for JSON view if available */}
                  {JSON.stringify(fullCharacter || selectedCharacter.character, null, 2)}
                </pre>
              )}
            </div>
            
            {/* Bottom action buttons - Added more actions */}
            <div className="p-4 border-t border-theme flex flex-wrap gap-2 justify-end">
            <Button
              variant="danger"
              className="w-full sm:w-auto"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${selectedCharacter.character.name}? This action cannot be undone.`)) {
                  handleDeleteConfirm(selectedCharacter.id);
                }
              }}
              type="button"
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Delete Character
            </Button>
              
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleEditFromModal}
                disabled={isNavigating}
                type="button"
                leftIcon={<Edit className="h-4 w-4" />}
              >
                Edit Character
              </Button>
              
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={handleDownloadFromModal}
                type="button"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Download JSON
              </Button>
              
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleDownloadImage}
                type="button"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Download Portrait
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Sticky Footer */}
      <StickyFooter 
        pageType="library"
        showBackToTop={hasScrolled}
        libraryFilterCount={activeFilterCount}
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