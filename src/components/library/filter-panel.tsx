'use client';

import { useRef, useEffect } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Select from '@/components/ui/select';
import Button from '@/components/ui/button';

interface FilterPanelProps {
  genres: string[];
  alignments: string[];
  genders: string[];
  relationships: string[];
  selectedGenre: string;
  selectedAlignment: string;
  selectedGender: string;
  selectedRelationship: string;
  setSelectedGenre: (value: string) => void;
  setSelectedAlignment: (value: string) => void;
  setSelectedGender: (value: string) => void;
  setSelectedRelationship: (value: string) => void;
  resetFilters: () => void;
  isFilterExpanded: boolean;
  setIsFilterExpanded: (value: boolean) => void;
  activeFilterCount: number;
  formatFilterValue: (value: string) => string;
}

export default function FilterPanel({
  genres,
  alignments,
  genders,
  relationships,
  selectedGenre,
  selectedAlignment,
  selectedGender,
  selectedRelationship,
  setSelectedGenre,
  setSelectedAlignment,
  setSelectedGender,
  setSelectedRelationship,
  resetFilters,
  isFilterExpanded,
  setIsFilterExpanded,
  activeFilterCount,
  formatFilterValue
}: FilterPanelProps) {
  const filterPanelRef = useRef<HTMLDivElement>(null);

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
  }, [isFilterExpanded, setIsFilterExpanded]);

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

  // Toggle filter panel for mobile
  const toggleFilterPanel = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <>
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
            type="button"
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
          type="button"
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
                <Button
                  variant="secondary"
                  onClick={resetFilters}
                  leftIcon={<X className="h-4 w-4" />}
                  type="button"
                  size="sm"
                >
                  Clear All Filters
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setIsFilterExpanded(false)}
                  type="button"
                  size="sm"
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}