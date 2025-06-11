'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useCharacter } from '@/contexts/character-context';
import ConceptStep from './wizard-steps/concept-step';
import OptionsStep from './wizard-steps/options-step';
import ModelStep from './wizard-steps/model-step';
import ResultsStep from './wizard-steps/results-step';
import StickyFooter from './sticky-footer';
import DelayedLoadingMessage from './delayed-loading-message';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';

const STEPS = [
  { id: 'concept', label: 'Concept' },
  { id: 'options', label: 'Options' },
  { id: 'model', label: 'Model' },
  { id: 'generate', label: 'Generate' }
];

export default function CharacterWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [forceStep, setForceStep] = useState<number | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const manualNavRef = useRef<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { 
    formData, 
    generateCharacter, 
    character, 
    resetFormData, 
    isLoading, 
    error, 
    generateRandomCharacter 
  } = useCharacter();

  // Clear local error when context error changes
  useEffect(() => {
    if (error) {
      setLocalError(null);
    }
  }, [error]);

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (e: CustomEvent) => {
      // If mobile sidebar state is provided, update our state
      if (e.detail.mobileOpen !== undefined) {
        setIsMobileSidebarOpen(e.detail.mobileOpen);
      }
    };
    
    window.addEventListener('sidebarStateChange' as any, handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChange' as any, handleSidebarChange as EventListener);
    };
  }, []);

  // Handle step navigation - allow navigation to any step if description exists
  const goToStep = useCallback((stepIndex: number) => {
    try {
      if (stepIndex < 0 || stepIndex >= STEPS.length) return;
      
      // Only require description for steps beyond the first step
      if (stepIndex > 0 && !formData.description) {
        setLocalError('Please provide a character description before proceeding.');
        return;
      }
      
      // Clear any local errors
      setLocalError(null);
      
      // Mark that this is a manual navigation
      manualNavRef.current = true;
      setCurrentStep(stepIndex);
    } catch (error) {
      console.error('Error navigating to step:', error);
      setLocalError('Error navigating to step. Please try again.');
    }
  }, [formData.description]);

  const goToNext = useCallback(async () => {
    try {
      setLocalError(null);
      
      if (currentStep === STEPS.length - 1) {
        // On last step, create new character
        handleNewCharacter();
      } else if (currentStep === STEPS.length - 2) {
        // On model step, generate character
        if (!formData.description) {
          setLocalError('Please provide a character description before generating.');
          return;
        }
        
        setIsGenerating(true);
        manualNavRef.current = true;
        
        try {
          await generateCharacter();
          setCurrentStep(currentStep + 1);
        } catch (error) {
          console.error("Error generating character:", error);
          setLocalError('Failed to generate character. Please try again.');
        } finally {
          setIsGenerating(false);
          manualNavRef.current = false;
        }
      } else {
        // Navigate to next step
        if (currentStep === 0 && !formData.description) {
          setLocalError('Please provide a character description before proceeding.');
          return;
        }
        
        manualNavRef.current = true;
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Error in goToNext:', error);
      setLocalError('Error proceeding to next step. Please try again.');
      setIsGenerating(false);
    }
  }, [currentStep, formData.description, generateCharacter]);

  const goToPrevious = useCallback(() => {
    try {
      if (currentStep > 0) {
        setLocalError(null);
        manualNavRef.current = true;
        setCurrentStep(currentStep - 1);
      }
    } catch (error) {
      console.error('Error going to previous step:', error);
      setLocalError('Error going to previous step. Please try again.');
    }
  }, [currentStep]);

  const handleNewCharacter = useCallback(() => {
    try {
      setLocalError(null);
      manualNavRef.current = true;
      resetFormData();
      setCurrentStep(0);
    } catch (error) {
      console.error('Error creating new character:', error);
      setLocalError('Error resetting form. Please refresh the page.');
    }
  }, [resetFormData]);

  // Check if a step should be disabled
  const isStepDisabled = useCallback((stepIndex: number) => {
    // The first step (concept) is never disabled
    if (stepIndex === 0) return false;
    
    // Other steps require description
    return !formData.description;
  }, [formData.description]);

  // Check if step is accessible (can be clicked)
  const isStepAccessible = useCallback((stepIndex: number) => {
    // Concept step is always accessible
    if (stepIndex === 0) return true;
    
    // Other steps require description
    return !!formData.description;
  }, [formData.description]);

  // Enhanced random character generation with better error handling
  const handleRandomGeneration = useCallback(async () => {
    if (isLoading || isGenerating) return;
    
    try {
      setLocalError(null);
      setIsGenerating(true);
      
      console.log('Starting random character generation with user content preferences');
      
      // 1. Generate random data while preserving user content type selections
      const randomData = await generateRandomCharacter();
      
      // 2. Merge random data with current user selections for content types
      const mergedData = {
        ...randomData,
        // Preserve user's content type selections
        include_portrait: formData.include_portrait,
        include_quests: formData.include_quests,
        include_dialogue: formData.include_dialogue,
        include_items: formData.include_items,
        // Preserve user's model selections
        model: formData.model,
        portrait_options: formData.portrait_options,
        // Preserve user's content options if they exist
        quest_options: formData.quest_options,
        dialogue_options: formData.dialogue_options,
        item_options: formData.item_options
      };
      
      console.log('Merged random data with user preferences:', {
        include_portrait: mergedData.include_portrait,
        include_quests: mergedData.include_quests,
        include_dialogue: mergedData.include_dialogue,
        include_items: mergedData.include_items
      });
      
      // 3. Generate character with merged data (this will hit the API and count usage)
      await generateCharacter(mergedData);
      
      // 4. Force navigation to results
      manualNavRef.current = true;
      setCurrentStep(3);
    } catch (error) {
      console.error('Error in random generation:', error);
      setLocalError('Failed to generate random character. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [generateRandomCharacter, generateCharacter, isLoading, isGenerating, formData]);

  // Direct navigation to results
  const goToResults = useCallback(() => {
    try {
      manualNavRef.current = true;
      setCurrentStep(3);
    } catch (error) {
      console.error('Error navigating to results:', error);
      setLocalError('Error navigating to results. Please try again.');
    }
  }, []);

  // Auto-navigation to results after character generation
  useEffect(() => {
    // Only auto-navigate if NOT a manual navigation AND there's a character
    // and we're on the model step and not currently generating
    if (!manualNavRef.current && character && currentStep === 2 && !isGenerating) {
      setCurrentStep(3);
    }
    
    // Reset the manual nav flag after use
    if (manualNavRef.current) {
      manualNavRef.current = false;
    }
  }, [character, currentStep, isGenerating]);

  // Handle forced step navigation
  useEffect(() => {
    if (forceStep !== null) {
      setCurrentStep(forceStep);
      setForceStep(null);
    }
  }, [forceStep]);

  // Render the current step component with error boundaries
  const renderStepContent = () => {
    try {
      const commonProps = {
        isGenerating: isLoading || isGenerating
      };

      switch (currentStep) {
        case 0: 
          return (
            <ConceptStep 
              {...commonProps}
              onNext={goToNext} 
              onNavigateToResults={goToResults} 
              onRandomGenerate={handleRandomGeneration} 
            />
          );
        case 1: 
          return (
            <OptionsStep 
              {...commonProps}
              onNext={goToNext} 
            />
          );
        case 2: 
          return (
            <ModelStep 
              {...commonProps}
              onNext={goToNext} 
            />
          );
        case 3: 
          return (
            <ResultsStep 
              {...commonProps}
              onNext={goToNext} 
            />
          );
        default: 
          return (
            <div className="p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">Invalid step</p>
            </div>
          );
      }
    } catch (error) {
      console.error('Error rendering step content:', error);
      return (
        <div className="p-8 text-center">
          <p className="text-red-600 dark:text-red-400">Error loading step content. Please refresh the page.</p>
        </div>
      );
    }
  };

  // Determine sticky footer props with error handling
  const getStickyFooterProps = () => {
    try {
      const isLastStep = currentStep === STEPS.length - 1;
      const isModelStep = currentStep === STEPS.length - 2;
      const isFirstStep = currentStep === 0;
      const currentlyGenerating = isLoading || isGenerating;

      if (isLastStep) {
        return {
          pageType: 'wizard-results' as const,
          currentStep,
          totalSteps: STEPS.length,
          onStepClick: goToStep,
          onPrevious: goToPrevious,
          onNext: handleNewCharacter,
          nextLabel: 'New Character',
          nextDisabled: false
        };
      } else if (isModelStep) {
        return {
          pageType: 'wizard' as const,
          currentStep,
          totalSteps: STEPS.length,
          onStepClick: goToStep,
          onPrevious: goToPrevious,
          onNext: goToNext,
          nextLabel: currentlyGenerating ? 'Generating...' : 'Generate',
          nextDisabled: !formData.description || currentlyGenerating,
          isLoading: currentlyGenerating
        };
      } else {
        return {
          pageType: 'wizard' as const,
          currentStep,
          totalSteps: STEPS.length,
          onStepClick: goToStep,
          onPrevious: goToPrevious,
          onNext: goToNext,
          nextLabel: 'Continue',
          nextDisabled: isFirstStep && !formData.description,
          prevDisabled: isFirstStep
        };
      }
    } catch (error) {
      console.error('Error getting sticky footer props:', error);
      // Return safe defaults
      return {
        pageType: 'wizard' as const,
        currentStep: 0,
        totalSteps: STEPS.length,
        onStepClick: () => {},
        onPrevious: () => {},
        onNext: () => {},
        nextLabel: 'Continue',
        nextDisabled: true,
        prevDisabled: true
      };
    }
  };

  // Get the active error message (prioritize local errors)
  const activeError = localError || error;

  return (
    <div className="max-w-full">
      {/* Mobile-Responsive Sticky Progress Header */}
      {!isMobileSidebarOpen && (
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="max-w-full px-4 py-4">
            <div className="flex justify-center">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(index)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                      ${index <= currentStep 
                        ? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700' 
                        : isStepAccessible(index)
                          ? 'bg-gray-300 text-gray-700 cursor-pointer hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'}
                    `}
                    disabled={!isStepAccessible(index)}
                    title={!isStepAccessible(index) ? 'Complete previous steps first' : `Go to ${step.label}`}
                  >
                    {index + 1}
                  </button>
                  {/* Show step labels on larger screens, hide on mobile */}
                  <span className={`ml-2 text-sm hidden sm:inline ${index <= currentStep ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {step.label}
                  </span>
                  {index < STEPS.length - 1 && (
                    <ChevronRight className="mx-2 sm:mx-3 h-4 w-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="px-4 mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {renderStepContent()}
        </div>
      </div>

      {/* Display error message if there is one */}
      {activeError && (
        <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm font-bold dark:bg-red-900/30 dark:text-red-200 shadow-lg border border-red-200 dark:border-red-800 w-full max-w-5xl mx-4">
            <p className="flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-center">{activeError}</span>
            </p>
          </div>
        </div>
      )}

      {/* Loading message for generation */}
      <DelayedLoadingMessage 
        isLoading={isLoading || isGenerating} 
        message="Character generation may take a moment... Creating your unique NPC with AI."
        delay={1000}
      />

      {/* Sticky Footer with Navigation */}
      <StickyFooter {...getStickyFooterProps()} />
    </div>
  );
}