// Fixed character-wizard.tsx with reduced bottom spacing

'use client';

import { useState, useEffect } from 'react';
import { useCharacter } from '@/contexts/character-context';
import ConceptStep from './wizard-steps/concept-step';
import OptionsStep from './wizard-steps/options-step';
import ModelStep from './wizard-steps/model-step';
import ResultsStep from './wizard-steps/results-step';
import StickyFooter from './sticky-footer';
import DelayedLoadingMessage from './delayed-loading-message';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/button';

const STEPS = [
  { id: 'concept', label: 'Concept' },
  { id: 'options', label: 'Options' },
  { id: 'model', label: 'Model' },
  { id: 'generate', label: 'Generate' }
];

export default function CharacterWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRandomGenerating, setIsRandomGenerating] = useState(false);
  const { formData, generateCharacter, character, resetFormData } = useCharacter();

  // Handle step navigation - allow navigation to any step if description exists
  const goToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= STEPS.length) return;
    
    // Only require description for steps beyond the first step
    if (stepIndex > 0 && !formData.description) {
      return;
    }
    
    setCurrentStep(stepIndex);
  };

  const goToNext = async () => {
    if (currentStep === STEPS.length - 1) {
      // On last step, create new character
      handleNewCharacter();
    } else if (currentStep === STEPS.length - 2) {
      // On model step, generate character
      setIsGenerating(true);
      await generateCharacter();
      setIsGenerating(false);
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNewCharacter = () => {
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

  // Handle random character generation from concept step
  const handleRandomGeneration = async () => {
    setIsRandomGenerating(true);
    setIsGenerating(true);
    
    try {
      // The random generation is handled in the concept step
      // After generation completes, navigate to results
      setCurrentStep(3); // Skip to results step
    } catch (error) {
      console.error('Error with random generation navigation:', error);
    } finally {
      setIsRandomGenerating(false);
      setIsGenerating(false);
    }
  };

  // Listen for character updates to know when random generation is complete
  useEffect(() => {
    if (character && isRandomGenerating) {
      // Character was generated via random button, go to results
      setCurrentStep(3);
      setIsRandomGenerating(false);
      setIsGenerating(false);
    }
  }, [character, isRandomGenerating]);

  // Navigate directly to results (for random generation)
  const goToResults = () => {
    setCurrentStep(3);
  };

  // Render the current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return <ConceptStep onNext={goToNext} onNavigateToResults={goToResults} isGenerating={isGenerating} />;
      case 1: return <OptionsStep onNext={goToNext} isGenerating={isGenerating} />;
      case 2: return <ModelStep onNext={goToNext} isGenerating={isGenerating} />;
      case 3: return <ResultsStep onNext={goToNext} isGenerating={isGenerating} />;
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
        nextLabel: isGenerating ? 'Generating...' : 'Generate',
        nextDisabled: !formData.description || isGenerating,
        isLoading: isGenerating
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
      {/* Sticky Progress Header */}
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
                <span className={`ml-2 text-sm ${index <= currentStep ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {step.label}
                </span>
                {index < STEPS.length - 1 && (
                  <ChevronRight className="mx-3 h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content - FIXED: Reduced bottom margin from mb-24 to mb-16 */}
      <div className="px-4 mb-16"> {/* Reduced bottom padding for sticky footer */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {renderStepContent()}
        </div>
      </div>

      {/* Loading message for generation */}
      {isGenerating && (
        <DelayedLoadingMessage 
          isLoading={isGenerating} 
          message="Character generation may take a second... Creating your unique NPC with AI."
        />
      )}

      {/* Sticky Footer with Navigation */}
      <StickyFooter {...getStickyFooterProps()} />
    </div>
  );
}