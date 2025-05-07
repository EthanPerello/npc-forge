'use client';

import { useCharacter } from '@/contexts/character-context';
import Button from '@/components/ui/button';
import { Sparkles, RotateCcw, AlertCircle } from 'lucide-react';

export default function StickyFooter() {
  const { generateCharacter, isLoading, resetFormData, formData } = useCharacter();
  
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
  
  return (
    <div className="sticky-footer">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* For mobile: Stack vertically with full-width buttons */}
        <div className="md:hidden flex flex-col space-y-3">
          <Button
            variant="primary"
            onClick={handleGenerateClick}
            disabled={!formData.description || isLoading}
            isLoading={isLoading}
            leftIcon={<Sparkles className="h-5 w-5" />}
            fullWidth
            type="button" // Explicitly set type to button
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
              type="button" // Explicitly set type to button
            >
              Clear
            </Button>
            <Button
              variant="secondary"
              onClick={handleRandomize}
              leftIcon={<AlertCircle className="h-4 w-4" />}
              disabled={isLoading}
              fullWidth
              type="button" // Explicitly set type to button
            >
              Randomize
            </Button>
          </div>
        </div>
        
        {/* For desktop: Show side by side */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={handleResetClick}
              leftIcon={<RotateCcw className="h-4 w-4" />}
              disabled={isLoading}
              size="sm"
              type="button" // Explicitly set type to button
            >
              Clear Options
            </Button>
            <Button
              variant="secondary"
              onClick={handleRandomize}
              leftIcon={<AlertCircle className="h-4 w-4" />}
              disabled={isLoading}
              size="sm"
              type="button" // Explicitly set type to button
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
            type="button" // Explicitly set type to button
          >
            {isLoading ? 'Generating...' : 'Generate Character'}
          </Button>
        </div>
      </div>
    </div>
  );
}