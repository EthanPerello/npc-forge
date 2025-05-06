'use client';

import { useState, useEffect } from 'react';
import { getStoredCharacters, deleteCharacter, initializeLibrary, StoredCharacter } from '@/lib/character-storage';
import { Character } from '@/lib/types';
import CharacterCard from '@/components/character-card';
import Button from '@/components/ui/button';
import { Library, Search, Upload, Filter, X, Download, Edit, Trash2, Eye } from 'lucide-react';
import { downloadJson } from '@/lib/utils';
import { getCharacterTraitsArray } from '@/lib/utils';

export default function CharacterLibraryPage() {
  const [characters, setCharacters] = useState<StoredCharacter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [isJsonViewerOpen, setIsJsonViewerOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<StoredCharacter | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'json'>('details');
  
  // Initialize library and load characters
  useEffect(() => {
    initializeLibrary();
    loadCharacters();
  }, []);
  
  const loadCharacters = () => {
    const stored = getStoredCharacters();
    setCharacters(stored);
  };
  
  // Filter characters based on search and genre
  const filteredCharacters = characters.filter(char => {
    const matchesSearch = searchQuery === '' || 
      char.character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (char.character.selected_traits.genre && 
       char.character.selected_traits.genre.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesGenre = selectedGenre === '' || 
      char.character.selected_traits.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });
  
  // Handle character deletion
  const handleDeleteCharacter = (id: string) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      if (deleteCharacter(id)) {
        loadCharacters();
        if (selectedCharacter?.id === id) {
          setIsJsonViewerOpen(false);
          setSelectedCharacter(null);
        }
      }
    }
  };
  
  // Handle character download
  const handleDownloadCharacter = (character: Character) => {
    downloadJson(character, `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`);
  };
  
  // Handle JSON file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const characterData = JSON.parse(content) as Character;
        
        // Validate basic character structure
        if (!characterData.name || !characterData.appearance || !characterData.personality) {
          throw new Error('Invalid character file format');
        }
        
        // Import the character storage function
        import('@/lib/character-storage').then(({ saveCharacter }) => {
          saveCharacter(characterData);
          loadCharacters();
          alert(`Character ${characterData.name} has been added to your library!`);
        });
      } catch (error) {
        alert('Error importing character: Invalid JSON format');
        console.error('Error importing character:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    event.target.value = '';
  };
  
  // Get unique genres for filter dropdown
  const genres = Array.from(new Set(characters.map(char => 
    char.character.selected_traits.genre || 'unknown'
  )));
  
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center">
          <Library className="h-6 w-6 md:h-8 md:w-8 mr-2 text-indigo-600 dark:text-indigo-400" />
          Character Library
        </h1>
        
        <div className="w-full md:w-auto">
          {/* Upload JSON button */}
          <label className="flex items-center justify-center w-full md:w-auto bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800">
            <Upload className="h-4 w-4 mr-2" />
            Import Character
            <input 
              type="file" 
              accept=".json" 
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>
      
      {/* Search and filter bar - Stack on mobile, side by side on desktop */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search characters..."
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
        
        <div className="relative w-full md:min-w-[200px] md:w-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="w-full pl-10 p-2 border border-theme rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-secondary appearance-none"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Character count */}
      <p className="mb-4 text-muted">
        {filteredCharacters.length} {filteredCharacters.length === 1 ? 'character' : 'characters'} found
      </p>
      
      {/* Character grid - 1 column on mobile, 2 on tablet, 3 on desktop */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCharacters.map((storedChar) => (
            <div 
              key={storedChar.id} 
              className="bg-card rounded-lg shadow-md overflow-hidden border border-theme relative transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              onClick={() => {
                setSelectedCharacter(storedChar);
                setIsJsonViewerOpen(true);
                setActiveTab('details');
              }}
            >
              {/* Character preview */}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 truncate">{storedChar.character.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {storedChar.character.selected_traits.genre && (
                    <span className="px-2 py-1 bg-indigo-600 text-white text-xs rounded-full">
                      {storedChar.character.selected_traits.genre.charAt(0).toUpperCase() + 
                       storedChar.character.selected_traits.genre.slice(1)}
                    </span>
                  )}
                  {storedChar.character.selected_traits.sub_genre && (
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                      {storedChar.character.selected_traits.sub_genre
                        .split('_')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </span>
                  )}
                  {storedChar.isExample && (
                    <span className="px-2 py-1 bg-amber-600 text-white text-xs rounded-full">
                      Example
                    </span>
                  )}
                </div>
                
                {/* Character image */}
                {storedChar.character.image_url && (
                  <div className="relative w-full h-40 sm:h-48 mb-3 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <img 
                      src={storedChar.character.image_url} 
                      alt={storedChar.character.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                {/* Character description - truncated */}
                <p className="text-sm mb-4 text-muted line-clamp-3">
                  {storedChar.character.appearance}
                </p>
                
                {/* Action buttons - Larger touch targets for mobile */}
                <div className="flex justify-between" onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-1 md:space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadCharacter(storedChar.character);
                      }}
                      className="p-2 md:p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 touch-manipulation"
                      title="Download JSON"
                      aria-label="Download JSON"
                    >
                      <Download className="h-5 w-5 md:h-5 md:w-5" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-1 md:space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/library/edit/${storedChar.id}`;
                      }}
                      className="p-2 md:p-2 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 touch-manipulation"
                      title="Edit Character"
                      aria-label="Edit Character"
                    >
                      <Edit className="h-5 w-5 md:h-5 md:w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCharacter(storedChar.id);
                      }}
                      className="p-2 md:p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 touch-manipulation"
                      title="Delete Character"
                      aria-label="Delete Character"
                    >
                      <Trash2 className="h-5 w-5 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-card rounded-lg border border-theme">
          <Library className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No characters found</h3>
          <p className="text-muted mb-4">
            {searchQuery || selectedGenre 
              ? "Try adjusting your search or filters" 
              : "Your character library is empty. Generate or import characters to get started."}
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/'}
          >
            Create a Character
          </Button>
        </div>
      )}
      
      {/* Character Viewer Modal - Full-screen on mobile */}
      {isJsonViewerOpen && selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-3 sm:p-4 border-b border-theme flex justify-between items-center">
              <h3 className="text-lg font-medium truncate pr-2">
                {selectedCharacter.character.name}
              </h3>
              <button 
                onClick={() => setIsJsonViewerOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                aria-label="Close"
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
                  {/* Character image */}
                  {selectedCharacter.character.image_url && (
                    <div className="flex justify-center">
                      <div className="w-32 h-32 sm:w-48 sm:h-48 relative">
                        <img 
                          src={selectedCharacter.character.image_url} 
                          alt={selectedCharacter.character.name}
                          className="object-cover w-full h-full rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Character traits */}
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
                  {JSON.stringify(selectedCharacter.character, null, 2)}
                </pre>
              )}
            </div>
            
            {/* Bottom action buttons - Full width on mobile */}
            <div className="p-4 border-t border-theme flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button
                variant="danger"
                className="w-full sm:w-auto"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${selectedCharacter.character.name}? This action cannot be undone.`)) {
                    if (deleteCharacter(selectedCharacter.id)) {
                      setIsJsonViewerOpen(false);
                      setSelectedCharacter(null);
                      loadCharacters();
                    }
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Character
              </Button>
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => window.location.href = `/library/edit/${selectedCharacter.id}`}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Character
              </Button>
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => handleDownloadCharacter(selectedCharacter.character)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}