'use client';

import { useState } from 'react';
import { Info, Target, MessageSquare, Bookmark, Download, X, Wand2, BookOpen, Package, Image } from 'lucide-react';
import Button from '@/components/ui/button';

interface WelcomeGuideProps {
  onDismiss: () => void;
  onGetStarted: () => void;
}

export default function WelcomeGuide({ onDismiss, onGetStarted }: WelcomeGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define the steps for the guide
  const steps = [
    {
      title: "Welcome to NPC Forge",
      description: "Create detailed NPCs for your games with AI. Just describe your character concept or use our templates to generate complete characters with personalities, quests, dialogue, and AI-generated portraits.",
      image: null,
    },
    {
      title: "1. Choose a Template",
      description: "Select a genre (fantasy, sci-fi, etc.) and sub-genre to get started, or write your own character description.",
      image: "/images/character-tab-selections.png",
    },
    {
      title: "2. Add Details and Generate",
      description: "Customize traits like gender, age, alignment, and personality, then click 'Generate Character' to bring your NPC to life.",
      image: "/images/portrait-character-tab-selections.png",
    },
    {
      title: "3. Generate Content",
      description: "Add quests, dialogue lines, and items to make your character more complete.",
      image: "/images/quest-tab-selections.png",
    },
    {
      title: "4. Save and Export",
      description: "Save your character to your library for later, or download as JSON to use in your game.",
      image: "/images/character-tab-results.png",
    }
  ];
  
  // Get the current step data
  const currentStepData = steps[currentStep];
  
  // Functions to navigate steps
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step, call the getStarted function
      onGetStarted();
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="welcome-guide w-full rounded-xl shadow-lg border border-indigo-300 mb-8 overflow-hidden bg-white dark:bg-gray-800 dark:border-indigo-800">
      <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center dark:bg-indigo-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Info className="mr-2 h-5 w-5" />
          {currentStepData.title}
        </h2>
        <button
          onClick={onDismiss}
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss guide"
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        {/* Step description */}
        <p className="mb-6 text-gray-900 dark:text-gray-200">
          {currentStepData.description}
        </p>

        {/* Step image if available */}
        {currentStepData.image && (
          <div className="mb-6">
            <img 
              src={currentStepData.image} 
              alt={`Step ${currentStep + 1} illustration`}
              className="rounded-lg border border-gray-200 dark:border-gray-700 w-full max-w-3xl mx-auto"
            />
          </div>
        )}

        {/* First step specific content */}
        {currentStep === 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-indigo-300">What you can create:</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex dark:bg-gray-700 dark:border-gray-600">
                <div className="mr-3 text-indigo-600 dark:text-indigo-400"><Target className="h-6 w-6" /></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">Complete Characters</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-300">Names, appearances, personalities and more</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex dark:bg-gray-700 dark:border-gray-600">
                <div className="mr-3 text-indigo-600 dark:text-indigo-400"><BookOpen className="h-6 w-6" /></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">Quests & Story Hooks</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-300">Engaging missions with rewards</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex dark:bg-gray-700 dark:border-gray-600">
                <div className="mr-3 text-indigo-600 dark:text-indigo-400"><MessageSquare className="h-6 w-6" /></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">Dialogue Lines</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-300">Character-specific phrases and interactions</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex dark:bg-gray-700 dark:border-gray-600">
                <div className="mr-3 text-indigo-600 dark:text-indigo-400"><Package className="h-6 w-6" /></div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">Item Inventories</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-300">Special items with descriptions and rarity</p>
                </div>
              </div>
            </div>

            {/* Example box with improved contrast */}
            <div className="bg-indigo-100 p-4 rounded-lg mt-6 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700">
              <h3 className="text-sm font-bold text-gray-800 mb-2 dark:text-indigo-100">
                Try This Example:
              </h3>
              <p className="text-sm font-medium text-gray-800 dark:text-indigo-100">
                "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic."
              </p>
            </div>
          </div>
        )}

        {/* Example for last step */}
        {currentStep === steps.length - 1 && (
          <div className="mt-4 bg-indigo-100 p-4 rounded-lg dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700">
            <h3 className="text-sm font-bold text-gray-800 mb-2 dark:text-indigo-100">
              Pro Tip:
            </h3>
            <p className="text-sm font-medium text-gray-800 dark:text-indigo-100">
              Visit the Character Library to view, edit, and manage all your saved characters at any time.
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <div>
            {currentStep > 0 && (
              <Button 
                variant="secondary"
                onClick={goToPrevStep}
                type="button"
              >
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="secondary"
              onClick={onDismiss} 
              type="button"
            >
              Skip
            </Button>
            
            <Button 
              variant="primary"
              onClick={goToNextStep} 
              type="button"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-center mt-6">
          {steps.map((_, index) => (
            <span 
              key={index}
              className={`inline-block h-2 w-2 rounded-full mx-1 ${
                index === currentStep ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}