'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Sparkles, Plus, Library } from 'lucide-react';
import { ReactNode } from 'react';

// Define the different page types
type StickyFooterProps = {
  // Wizard navigation
  pageType?: 'wizard' | 'wizard-results' | 'library' | 'creator';
  currentStep?: number;
  totalSteps?: number;
  onStepClick?: (step: number) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
  isLoading?: boolean;
  
  // Library page props
  libraryFilterCount?: number;
  onClearFilters?: () => void;
  showImport?: boolean;
  onImport?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  // General props
  showBackToTop?: boolean;
  customButtons?: Array<{
    label: string;
    icon: ReactNode;
    onClick: (e: React.MouseEvent) => void;
    variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
    disabled?: boolean;
    isLoading?: boolean;
  }>;
};

export default function StickyFooter(props: StickyFooterProps) {
  const router = useRouter();
  
  const {
    pageType = 'creator',
    currentStep = 0,
    totalSteps = 4,
    onStepClick,
    onPrevious,
    onNext,
    nextLabel = 'Continue',
    nextDisabled = false,
    prevDisabled = false,
    isLoading = false,
    libraryFilterCount = 0,
    onClearFilters,
    showImport = false,
    onImport,
    showBackToTop = false,
    customButtons = []
  } = props;

  // Render wizard navigation
  if (pageType === 'wizard' || pageType === 'wizard-results') {
    return (
      <div className="sticky-footer">
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between w-full">
            {/* Previous Button - Full width on mobile, fixed width on desktop */}
            <div className="flex-1 md:flex-initial">
              <Button
                variant="secondary"
                onClick={onPrevious}
                disabled={prevDisabled}
                leftIcon={<ChevronLeft className="h-4 w-4" />}
                size="sm"
                type="button"
                className="w-full md:w-auto"
              >
                Back
              </Button>
            </div>

            {/* Step Progress Dots - Center */}
            <div className="flex space-x-2 flex-1 justify-center">
              {Array.from({ length: totalSteps }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onStepClick?.(index)}
                  className={`
                    w-2 h-2 rounded-full transition-colors
                    ${index === currentStep 
                      ? 'bg-indigo-600' 
                      : index < currentStep 
                        ? 'bg-indigo-400' 
                        : 'bg-gray-300 dark:bg-gray-600'}
                  `}
                  type="button"
                />
              ))}
            </div>

            {/* Next Button - Full width on mobile, fixed width on desktop */}
            <div className="flex-1 md:flex-initial flex justify-end">
              <Button
                variant="primary"
                onClick={onNext}
                disabled={nextDisabled}
                isLoading={isLoading}
                rightIcon={pageType === 'wizard-results' ? undefined : <ChevronRight className="h-4 w-4" />}
                leftIcon={pageType === 'wizard-results' ? <Plus className="h-4 w-4" /> : undefined}
                size="sm"
                type="button"
                className="w-full md:w-auto"
              >
                {nextLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render library navigation
  if (pageType === 'library') {
    return (
      <div className="sticky-footer">
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex space-x-3 flex-1">
              {libraryFilterCount > 0 && (
                <Button
                  variant="secondary"
                  onClick={onClearFilters}
                  size="sm"
                  type="button"
                >
                  Clear Filters ({libraryFilterCount})
                </Button>
              )}
              
              {customButtons.map((btn, index) => (
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
              onClick={() => router.push('/')}
              leftIcon={<Plus className="h-5 w-5" />}
              size="sm"
              type="button"
            >
              Create New Character
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default creator page
  return (
    <div className="sticky-footer">
      <div className="container mx-auto px-4 max-w-full">
        <div className="flex items-center justify-center w-full">
          <Button
            variant="primary"
            onClick={() => router.push('/library')}
            leftIcon={<Library className="h-5 w-5" />}
            type="button"
          >
            View Character Library
          </Button>
        </div>
      </div>
    </div>
  );
}