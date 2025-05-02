'use client';

import { useEffect, useState } from 'react';
import { Info, Target, MessageSquare, Bookmark, Download, X } from 'lucide-react';

interface WelcomeGuideProps {
  onDismiss: () => void;
  onGetStarted: () => void;
}

export default function WelcomeGuide({ onDismiss, onGetStarted }: WelcomeGuideProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [isDevEnvironment, setIsDevEnvironment] = useState(false);

  // First effect: detect environment and set mounted state
  useEffect(() => {
    setHasMounted(true);
    const isDev = process.env.NODE_ENV === 'development';
    setIsDevEnvironment(isDev);
  }, []);
  
  // Second effect: handle visibility based on environment
  useEffect(() => {
    if (!hasMounted) return;
    
    if (isDevEnvironment) {
      // Always show in dev mode (handled in Home component)
      setIsVisible(true);
    } else {
      // In production, check localStorage
      const dismissed = localStorage.getItem('npc-forge-guide-dismissed');
      if (dismissed === 'true') {
        setIsVisible(false);
        onDismiss();
      }
    }
  }, [hasMounted, isDevEnvironment, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    
    // Only save to localStorage in production mode
    if (!isDevEnvironment) {
      localStorage.setItem('npc-forge-guide-dismissed', 'true');
    }
    
    onDismiss();
  };

  const handleGetStarted = () => {
    setIsVisible(false);
    
    // Only save to localStorage in production mode
    if (!isDevEnvironment) {
      localStorage.setItem('npc-forge-guide-dismissed', 'true');
    }
    
    // Call the specific onGetStarted function
    onGetStarted();
  };

  // Early return if not mounted or not visible
  if (!hasMounted || !isVisible) return null;

  return (
    <div className="welcome-guide w-full rounded-xl shadow-md border border-indigo-300 mb-8 overflow-hidden bg-white dark:bg-gray-800 dark:border-indigo-800">
      <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center dark:bg-indigo-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Info className="mr-2 h-5 w-5" />
          Welcome to NPC Forge
          {isDevEnvironment && <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full">DEV MODE</span>}
        </h2>
        <button
          onClick={handleDismiss}
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss guide"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <p className="mb-4 text-gray-900 dark:text-gray-200">
          Create detailed NPCs for your games with AI. Just describe your character concept or use our templates to generate complete characters with personalities, quests, dialogue, and AI-generated portraits.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-indigo-300">How to Create a Character:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: <Target className="h-6 w-6" />,
                title: '1. Choose a Template',
                desc: 'Select a genre or enter your character description'
              },
              {
                icon: <MessageSquare className="h-6 w-6" />,
                title: '2. Customize Details',
                desc: 'Add specific traits, quests, dialogue, or items'
              },
              {
                icon: <Bookmark className="h-6 w-6" />,
                title: '3. Generate Character',
                desc: 'Click "Generate Character" to create your NPC'
              },
              {
                icon: <Download className="h-6 w-6" />,
                title: '4. Save or Export',
                desc: 'Download your character as JSON for your game'
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex dark:bg-gray-700 dark:border-gray-600">
                <div className="mr-3 text-indigo-600 dark:text-indigo-400">{step.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">{step.title}</h4>
                  <p className="text-sm text-gray-800 dark:text-gray-300">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example box with significantly improved contrast */}
        <div className="bg-indigo-100 p-4 rounded-lg mb-4 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700">
          <h3 className="text-sm font-bold text-gray-800 mb-2 dark:text-indigo-100">
            Try This Example:
          </h3>
          <p className="text-sm font-medium text-gray-800 dark:text-indigo-100">
            "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic."
          </p>
        </div>

        <div className="flex justify-between">
          <button 
            onClick={handleDismiss} 
            className="px-4 py-2 bg-transparent border border-indigo-200 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
          >
            Close
          </button>
          
          <button 
            onClick={handleGetStarted} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}