'use client';

import { useCharacter } from '@/contexts/character-context';
import Button from '@/components/ui/button';
import { Sparkles, RotateCcw, AlertCircle } from 'lucide-react';

export default function StickyFooter() {
  const { generateCharacter, isLoading, resetFormData, formData } = useCharacter();
  
  const handleRandomize = () => {
    // This will trigger the randomize function in CharacterTab
    document.getElementById('randomize-button')?.click();
  };
  
  return (
    <div className="sticky-footer">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* For mobile: Stack vertically with full-width buttons */}
        <div className="md:hidden flex flex-col space-y-3">
          <Button
            variant="primary"
            onClick={generateCharacter}
            disabled={!formData.description || isLoading}
            isLoading={isLoading}
            leftIcon={<Sparkles className="h-5 w-5" />}
            fullWidth
          >
            {isLoading ? 'Generating...' : 'Generate Character'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={resetFormData}
              leftIcon={<RotateCcw className="h-4 w-4" />}
              disabled={isLoading}
              fullWidth
            >
              Clear
            </Button>
            <Button
              variant="secondary"
              onClick={handleRandomize}
              leftIcon={<AlertCircle className="h-4 w-4" />}
              disabled={isLoading}
              fullWidth
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
              onClick={resetFormData}
              leftIcon={<RotateCcw className="h-4 w-4" />}
              disabled={isLoading}
              size="sm"
            >
              Clear Options
            </Button>
            <Button
              variant="secondary"
              onClick={handleRandomize}
              leftIcon={<AlertCircle className="h-4 w-4" />}
              disabled={isLoading}
              size="sm"
            >
              Randomize
            </Button>
          </div>
          
          <Button
            variant="primary"
            onClick={generateCharacter}
            disabled={!formData.description || isLoading}
            isLoading={isLoading}
            leftIcon={<Sparkles className="h-5 w-5" />}
            size="lg"
          >
            {isLoading ? 'Generating...' : 'Generate Character'}
          </Button>
        </div>
      </div>
    </div>
  );
}