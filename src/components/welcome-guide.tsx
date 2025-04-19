'use client';

import { useEffect, useState } from 'react';
import { Info, Target, MessageSquare, Bookmark, Download } from 'lucide-react';
import Button from '@/components/ui/button';

interface WelcomeGuideProps {
  onDismiss: () => void;
}

export default function WelcomeGuide({ onDismiss }: WelcomeGuideProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const dismissed = localStorage.getItem('npc-forge-guide-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
      onDismiss();
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('npc-forge-guide-dismissed', 'true');
    onDismiss();
  };

  if (!hasMounted || !isVisible) return null;

  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl shadow-md border border-indigo-200 mb-8 overflow-hidden dark:from-indigo-950 dark:to-blue-900 dark:border-indigo-800">
      <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center dark:bg-indigo-700">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Info className="mr-2 h-5 w-5" />
          Welcome to NPC Forge
        </h2>
        <button
          onClick={handleDismiss}
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss guide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <p className="text-gray-700 mb-4 dark:text-gray-300">
          Create detailed NPCs for your games with AI. Just describe your character concept or use our templates to generate complete characters with personalities, quests, dialogue, and AI-generated portraits.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-3 dark:text-indigo-300">How to Create a Character:</h3>
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
              <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 flex dark:bg-gray-800 dark:border-gray-700">
                <div className="mr-3 text-indigo-600 dark:text-indigo-400">{step.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-100 p-4 rounded-lg mb-4 dark:bg-indigo-900/30">
          <h3 className="text-sm font-medium text-indigo-800 mb-1 dark:text-indigo-300">Try This Example:</h3>
          <p className="text-sm text-indigo-700 italic dark:text-indigo-300">
            "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic."
          </p>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleDismiss} 
            variant="primary"
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
