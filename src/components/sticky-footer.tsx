'use client';

import { useRouter } from 'next/navigation';
import { useCharacter } from '@/contexts/character-context';
import Button from '@/components/ui/button';
import { Sparkles, RotateCcw, AlertCircle, Library, RefreshCw, Plus, Upload, Download, ArrowUp } from 'lucide-react';
import { ReactNode, useEffect, useState, useRef } from 'react';

type ButtonConfig = {
  label: string;
  icon: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  disabled?: boolean;
  isLoading?: boolean;
};

type StickyFooterProps = {
  pageType?: 'creator' | 'library';
  showBackToTop?: boolean;
  customButtons?: ButtonConfig[];
  libraryFilterCount?: number;
  onClearFilters?: () => void;
  showImport?: boolean;
  onImport?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StickyFooter({
  pageType = 'creator',
  showBackToTop = false,
  customButtons,
  libraryFilterCount = 0,
  onClearFilters,
  showImport = false,
  onImport
}: StickyFooterProps) {
  const router = useRouter();
  
  // Handle lack of CharacterProvider by using local state as fallback
  const [contextAvailable, setContextAvailable] = useState(true);
  const [localLoading, setLocalLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Try to use context, catch error if not available
  let characterContext;
  try {
    characterContext = useCharacter();
  } catch (error) {
    // If useCharacter fails, we're likely outside a CharacterProvider
    if (contextAvailable) setContextAvailable(false);
  }
  
  // Safely access context values or use defaults
  const { 
    generateCharacter = async () => {}, 
    isLoading = localLoading, 
    resetFormData = () => {}, 
    formData = { description: '' } 
  } = contextAvailable && characterContext ? characterContext : {};
  
  // Handle scrolling to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const handleRandomize = (e: React.MouseEvent) => {
    // Prevent any form submission
    e.preventDefault();
    e.stopPropagation();
    
    // This will trigger the randomize function in CharacterTab
    const randomizeButton = document.getElementById('randomize-button');
    if (randomizeButton) {
      // Create and dispatch a mouse event
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      randomizeButton.dispatchEvent(clickEvent);
    }
  };
  
  const handleGenerateClick = async (e: React.MouseEvent) => {
    // Prevent default form submission behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Call the generate function directly
    await generateCharacter();
  };
  
  const handleResetClick = (e: React.MouseEvent) => {
    // Prevent form submission
    e.preventDefault();
    e.stopPropagation();
    
    // Call the reset function
    resetFormData();
  };
  
  const handleClearFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClearFilters) {
      onClearFilters();
    }
  };
  
  const handleCreateNew = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/');
  };
  
  // Handle file upload
  const handleFileUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onImport) {
      onImport(e);
    }
  };
  
  return (
    <>
      {/* Hidden file input for importing */}
      {showImport && (
        <input 
          type="file" 
          accept=".json" 
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
      )}
      
      <div className="sticky-footer">
        <div className="container mx-auto px-4 max-w-6xl">
          {pageType === 'creator' ? (
            <>
              {/* Creator Footer - Mobile */}
              <div className="md:hidden flex flex-col space-y-3">
                <Button
                  variant="primary"
                  onClick={handleGenerateClick}
                  disabled={!formData.description || isLoading}
                  isLoading={isLoading}
                  leftIcon={<Sparkles className="h-5 w-5" />}
                  fullWidth
                  type="button"
                >
                  {isLoading ? 'Generating...' : 'Generate Character'}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleResetClick}
                    leftIcon={<RotateCcw className="h-4 w-4" />}
                    disabled={isLoading}
                    fullWidth
                    type="button"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleRandomize}
                    leftIcon={<AlertCircle className="h-4 w-4" />}
                    disabled={isLoading}
                    fullWidth
                    type="button"
                  >
                    Randomize
                  </Button>
                </div>
              </div>
              
              {/* Creator Footer - Desktop */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={handleResetClick}
                    leftIcon={<RotateCcw className="h-4 w-4" />}
                    disabled={isLoading}
                    size="sm"
                    type="button"
                  >
                    Clear Options
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleRandomize}
                    leftIcon={<AlertCircle className="h-4 w-4" />}
                    disabled={isLoading}
                    size="sm"
                    type="button"
                  >
                    Randomize
                  </Button>
                </div>
                
                <Button
                  variant="primary"
                  onClick={handleGenerateClick}
                  disabled={!formData.description || isLoading}
                  isLoading={isLoading}
                  leftIcon={<Sparkles className="h-5 w-5" />}
                  size="lg"
                  type="button"
                >
                  {isLoading ? 'Generating...' : 'Generate Character'}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Library Footer - Mobile */}
              <div className="md:hidden flex flex-col space-y-3">
                <Button
                  variant="primary"
                  onClick={handleCreateNew}
                  leftIcon={<Plus className="h-5 w-5" />}
                  fullWidth
                  type="button"
                >
                  Create New Character
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  {libraryFilterCount > 0 && (
                    <Button
                      variant="secondary"
                      onClick={handleClearFilters}
                      leftIcon={<RefreshCw className="h-4 w-4" />}
                      fullWidth
                      type="button"
                    >
                      Clear Filters ({libraryFilterCount})
                    </Button>
                  )}
                  
                  {showImport && (
                    <Button
                      variant="secondary"
                      onClick={handleFileUploadClick}
                      leftIcon={<Upload className="h-4 w-4" />}
                      fullWidth
                      type="button"
                    >
                      Import
                    </Button>
                  )}
                  
                  {/* Custom buttons if provided */}
                  {customButtons && customButtons.map((btn, index) => (
                    <Button
                      key={index}
                      variant={btn.variant}
                      onClick={btn.onClick}
                      leftIcon={btn.icon}
                      disabled={btn.disabled}
                      isLoading={btn.isLoading}
                      fullWidth
                      type="button"
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Library Footer - Desktop */}
              <div className="hidden md:flex items-center justify-between">
                <div className="flex space-x-3">
                  {libraryFilterCount > 0 && (
                    <Button
                      variant="secondary"
                      onClick={handleClearFilters}
                      leftIcon={<RefreshCw className="h-4 w-4" />}
                      size="sm"
                      type="button"
                    >
                      Clear Filters ({libraryFilterCount})
                    </Button>
                  )}
                  
                  {showImport && (
                    <Button
                      variant="secondary"
                      onClick={handleFileUploadClick}
                      leftIcon={<Upload className="h-4 w-4" />}
                      size="sm"
                      type="button"
                    >
                      Import Character
                    </Button>
                  )}
                  
                  {/* Custom buttons if provided */}
                  {customButtons && customButtons.map((btn, index) => (
                    <Button
                      key={index}
                      variant={btn.variant}
                      onClick={btn.onClick}
                      leftIcon={btn.icon}
                      disabled={btn.disabled}
                      isLoading={btn.isLoading}
                      size="sm"
                      type="button"
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="primary"
                  onClick={handleCreateNew}
                  leftIcon={<Plus className="h-5 w-5" />}
                  size="lg"
                  type="button"
                >
                  Create New Character
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Back to top button - Available on both page types */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg"
          aria-label="Back to top"
          type="button"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}