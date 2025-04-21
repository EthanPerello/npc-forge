'use client';

import { useState, useEffect } from 'react';
import { CharacterProvider } from '@/contexts/character-context';
import MainFormTabs from '@/components/main-form-tabs';
import CharacterDisplay from '@/components/character-display';
import UsageLimitsNotice from '@/components/usage-limits-notice';
import WelcomeGuide from '@/components/welcome-guide';
import { BookOpen } from 'lucide-react';

export default function Home() {
  // Control visibility of the create character form
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Force reset the localStorage flag in dev mode on first page load
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      localStorage.removeItem('npc-forge-guide-dismissed');
    }
  }, []);

  // Handle the welcome guide dismissal
  const handleWelcomeDismiss = () => {
    setShowCreateForm(true);
  };

  return (
    <CharacterProvider>
      <main className="min-h-screen py-8 px-4 bg-gradient-to-br from-indigo-50 via-indigo-50/30 to-blue-100 dark:from-gray-900 dark:via-indigo-950/30 dark:to-blue-950/20">
        <div className="container mx-auto max-w-full">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-700 dark:from-indigo-400 dark:to-blue-500">
              NPC Forge
            </h1>
            <div className="flex items-center justify-center mt-2 text-gray-700 dark:text-gray-300">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-500" />
              <p>AI-powered character generator for games</p>
            </div>
          </header>
          
          {/* Welcome Guide for New Users */}
          <WelcomeGuide onDismiss={handleWelcomeDismiss} />
          
          {/* Usage Limits Notice */}
          <UsageLimitsNotice />
          
          {/* Character Creation Form - Only show when welcome guide is dismissed */}
          <section className={`mb-12 transition-all duration-500 ${showCreateForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none absolute'}`}>
            <MainFormTabs />
          </section>
          
          {/* Character Display */}
          <section>
            <CharacterDisplay />
          </section>
          
          {/* Footer with enhanced styling */}
          <footer className="mt-16 text-center border-t border-indigo-100 pt-8 dark:border-indigo-900/50">
            <div className="mx-auto">
              <p className="text-gray-700 dark:text-gray-300">
                Created by <a 
                  href="https://github.com/EthanPerello" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                >
                  Ethan Perello
                </a>
              </p>
              <div className="flex justify-center space-x-6 mt-3">
                <a 
                  href="https://github.com/EthanPerello/npc-forge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                >
                  <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub Repository
                </a>
              </div>
              <p className="mt-4 text-xs text-gray-600 dark:text-gray-400 bg-white/50 rounded-full px-3 py-1 inline-block dark:bg-gray-800/50">
                Limited to 15 character generations per month per device.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </CharacterProvider>
  );
}