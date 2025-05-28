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
  const manualNavRef = useRef<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const { 
    formData, 
    generateCharacter, 
    character, 
    resetFormData, 
    isLoading, 
    error, 
    generateRandomCharacter 
  } = useCharacter();

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
  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= STEPS.length) return;
    
    // Only require description for steps beyond the first step
    if (stepIndex > 0 && !formData.description) {
      return;
    }
    
    // Mark that this is a manual navigation
    manualNavRef.current = true;
    setCurrentStep(stepIndex);
  };

  const goToNext = async () => {
    if (currentStep === STEPS.length - 1) {
      // On last step, create new character
      handleNewCharacter();
    } else if (currentStep === STEPS.length - 2) {
      // On model step, generate character
      try {
        manualNavRef.current = true;
        await generateCharacter();
        setCurrentStep(currentStep + 1);
      } catch (error) {
        console.error("Error generating character:", error);
      } finally {
        manualNavRef.current = false;
      }
    } else {
      manualNavRef.current = true;
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      manualNavRef.current = true;
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNewCharacter = () => {
    manualNavRef.current = true;
    resetFormData();
    setCurrentStep(0);
  };

  // Check if a step should be disabled
  const isStepDisabled = (stepIndex: number) => {
    // The first step (concept) is never disabled
    if (stepIndex === 0) return false;
    
    // Other steps require description
    return !formData.description;
  };

  // Check if step is accessible (can be clicked)
  const isStepAccessible = (stepIndex: number) => {
    // Concept step is always accessible
    if (stepIndex === 0) return true;
    
    // Other steps require description
    return !!formData.description;
  };

  // FIXED: Random character generation that respects user content selections
  const handleRandomGeneration = useCallback(async () => {
    if (isLoading) return;
    
    try {
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
    }
  }, [generateRandomCharacter, generateCharacter, isLoading, formData]);

  // Direct navigation to results
  const goToResults = useCallback(() => {
    manualNavRef.current = true;
    setCurrentStep(3);
  }, []);

  // FIXED: Add navigation prevention for non-manual changes
  useEffect(() => {
    // Only auto-navigate if NOT a manual navigation AND there's a character
    // and we're on the model step
    if (!manualNavRef.current && character && currentStep === 2) {
      setCurrentStep(3);
    }
    
    // Reset the manual nav flag after use
    manualNavRef.current = false;
  }, [character, currentStep]);

  // Handle forced step navigation
  useEffect(() => {
    if (forceStep !== null) {
      setCurrentStep(forceStep);
      setForceStep(null);
    }
  }, [forceStep]);

  // Render the current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <ConceptStep 
                onNext={goToNext} 
                onNavigateToResults={goToResults} 
                isGenerating={isLoading}
                onRandomGenerate={handleRandomGeneration} />;
      case 1: return <OptionsStep onNext={goToNext} isGenerating={isLoading} />;
      case 2: return <ModelStep onNext={goToNext} isGenerating={isLoading} />;
      case 3: return <ResultsStep onNext={goToNext} isGenerating={isLoading} />;
      default: return null;
    }
  };

  // Determine sticky footer props
  const getStickyFooterProps = () => {
    if (currentStep === STEPS.length - 1) {
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
    } else if (currentStep === STEPS.length - 2) {
      return {
        pageType: 'wizard' as const,
        currentStep,
        totalSteps: STEPS.length,
        onStepClick: goToStep,
        onPrevious: goToPrevious,
        onNext: goToNext,
        nextLabel: isLoading ? 'Generating...' : 'Generate',
        nextDisabled: !formData.description || isLoading,
        isLoading: isLoading
      };
    } else {
      const isFirstStep = currentStep === 0;
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
  };

  return (
    <div className="max-w-full">
      {/* FIXED: Mobile-Responsive Sticky Progress Header */}
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
      {error && (
        <div className="fixed bottom-24 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
          <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm font-bold dark:bg-red-900/30 dark:text-red-200 shadow-lg border border-red-200 dark:border-red-800 w-full max-w-5xl mx-4">
            <p className="flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Loading message for generation */}
      <DelayedLoadingMessage 
        isLoading={isLoading} 
        message="Character generation may take a second... Creating your unique NPC with AI."
        delay={1000}
      />

      {/* Sticky Footer with Navigation */}
      <StickyFooter {...getStickyFooterProps()} />
    </div>
  );
}