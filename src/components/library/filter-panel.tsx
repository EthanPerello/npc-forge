// src/components/library/filter-panel.tsx
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
  // New comprehensive trait filters
  personalityTraits: string[];
  occupations: string[];
  species: string[];
  socialClasses: string[];
  heights: string[];
  builds: string[];
  homelands: string[];
  // Current filter values
  selectedGenre: string;
  selectedAlignment: string;
  selectedGender: string;
  selectedRelationship: string;
  selectedPersonality: string;
  selectedOccupation: string;
  selectedSpecies: string;
  selectedSocialClass: string;
  selectedHeight: string;
  selectedBuild: string;
  selectedHomeland: string;
  traitSearchQuery: string;
  // Setters
  setSelectedGenre: (value: string) => void;
  setSelectedAlignment: (value: string) => void;
  setSelectedGender: (value: string) => void;
  setSelectedRelationship: (value: string) => void;
  setSelectedPersonality: (value: string) => void;
  setSelectedOccupation: (value: string) => void;
  setSelectedSpecies: (value: string) => void;
  setSelectedSocialClass: (value: string) => void;
  setSelectedHeight: (value: string) => void;
  setSelectedBuild: (value: string) => void;
  setSelectedHomeland: (value: string) => void;
  setTraitSearchQuery: (value: string) => void;
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
  personalityTraits,
  occupations,
  species,
  socialClasses,
  heights,
  builds,
  homelands,
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
  selectedHomeland,
  setSelectedGenre,
  setSelectedAlignment,
  setSelectedGender,
  setSelectedRelationship,
  setSelectedPersonality,
  setSelectedOccupation,
  setSelectedSpecies,
  setSelectedSocialClass,
  setSelectedHeight,
  setSelectedBuild,
  setSelectedHomeland,
  resetFilters,
  isFilterExpanded,
  setIsFilterExpanded,
  activeFilterCount,
  formatFilterValue
}: FilterPanelProps) {
  const filterPanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Add click outside listener with proper timing to prevent conflicts
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Don't close if clicking the toggle button or inside the filter panel
      if (
        (filterPanelRef.current && filterPanelRef.current.contains(target)) ||
        (toggleButtonRef.current && toggleButtonRef.current.contains(target))
      ) {
        return;
      }
      
      setIsFilterExpanded(false);
    }
    
    if (isFilterExpanded) {
      // Add a small delay to prevent immediate triggering
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterExpanded, setIsFilterExpanded]);

  // Helper function to create options array
  const createOptions = (items: string[], label: string) => [
    { value: '', label: `Any ${label}` },
    ...items.map(item => ({ 
      value: item, 
      label: formatFilterValue(item)
    }))
  ];

  // Toggle filter panel - simple toggle without extra event handling
  const toggleFilterPanel = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <div className="mb-4">
        <button
          ref={toggleButtonRef}
          onClick={toggleFilterPanel}
          className="flex items-center gap-2 px-4 py-2 bg-secondary border border-theme rounded-md text-sm hover:bg-opacity-80 transition-colors w-full sm:w-auto"
          type="button"
        >
          <Filter className="h-4 w-4 pointer-events-none" />
          <span className="pointer-events-none">Filter by Categories</span>
          {activeFilterCount > 0 && (
            <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-0.5 rounded-full text-xs pointer-events-none">
              {activeFilterCount}
            </span>
          )}
          {isFilterExpanded ? (
            <ChevronUp className="h-4 w-4 ml-auto pointer-events-none" />
          ) : (
            <ChevronDown className="h-4 w-4 ml-auto pointer-events-none" />
          )}
        </button>
      </div>

      {/* Comprehensive Filter Panel */}
      {isFilterExpanded && (
        <div 
          ref={filterPanelRef} 
          className="mb-6 p-4 bg-card border border-theme rounded-lg shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter by Character Traits
            </h3>
            {activeFilterCount > 0 && (
              <Button
                variant="secondary"
                onClick={resetFilters}
                leftIcon={<X className="h-4 w-4" />}
                size="sm"
                type="button"
              >
                Clear All ({activeFilterCount})
              </Button>
            )}
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Genre
                </label>
                <Select
                  options={createOptions(genres, 'Genre')}
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Gender
                </label>
                <Select
                  options={createOptions(genders, 'Gender')}
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Species
                </label>
                <Select
                  options={createOptions(species, 'Species')}
                  value={selectedSpecies}
                  onChange={(e) => setSelectedSpecies(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Alignment
                </label>
                <Select
                  options={createOptions(alignments, 'Alignment')}
                  value={selectedAlignment}
                  onChange={(e) => setSelectedAlignment(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>
            </div>
          </div>

          {/* Physical Traits */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Physical Traits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Height
                </label>
                <Select
                  options={createOptions(heights, 'Height')}
                  value={selectedHeight}
                  onChange={(e) => setSelectedHeight(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Build
                </label>
                <Select
                  options={createOptions(builds, 'Build')}
                  value={selectedBuild}
                  onChange={(e) => setSelectedBuild(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>
            </div>
          </div>

          {/* Background & Social */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Background & Social
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Occupation
                </label>
                <Select
                  options={createOptions(occupations, 'Occupation')}
                  value={selectedOccupation}
                  onChange={(e) => setSelectedOccupation(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Social Class
                </label>
                <Select
                  options={createOptions(socialClasses, 'Social Class')}
                  value={selectedSocialClass}
                  onChange={(e) => setSelectedSocialClass(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Homeland
                </label>
                <Select
                  options={createOptions(homelands, 'Homeland')}
                  value={selectedHomeland}
                  onChange={(e) => setSelectedHomeland(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Relationship
                </label>
                <Select
                  options={createOptions(relationships, 'Relationship')}
                  value={selectedRelationship}
                  onChange={(e) => setSelectedRelationship(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>
            </div>
          </div>

          {/* Personality */}
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Personality
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">
                  Personality Trait
                </label>
                <Select
                  options={createOptions(personalityTraits, 'Personality')}
                  value={selectedPersonality}
                  onChange={(e) => setSelectedPersonality(e.target.value)}
                  className="mb-0"
                  containerClassName="mb-0"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}