// Fixed page.tsx with reduced wizard padding

'use client';

import { useState, useEffect } from 'react';
import { CharacterProvider } from '@/contexts/character-context';
import CharacterWizard from '@/components/character-wizard';
import WelcomePopup from '@/components/welcome-popup';
import UsageLimitsNotice from '@/components/usage-limits-notice';

export default function Home() {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Check if welcome popup should be shown
  useEffect(() => {
    // In dev mode, always show the popup for testing
    if (process.env.NODE_ENV === 'development') {
      setShowWelcomePopup(true);
      return;
    }
    
    // In production, check localStorage
    const welcomeDismissed = localStorage.getItem('npc-forge-welcome-dismissed');
    if (welcomeDismissed !== 'true') {
      setShowWelcomePopup(true);
    }
  }, []);

  // Track scrolling for back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWelcomeDismiss = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('npc-forge-welcome-dismissed', 'true');
  };

  return (
    <CharacterProvider>
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-50/30 to-blue-100 dark:from-gray-900 dark:via-indigo-950/30 dark:to-blue-950/20">
        {/* Welcome Popup */}
        {showWelcomePopup && (
          <WelcomePopup onDismiss={handleWelcomeDismiss} />
        )}

        <div className="container mx-auto max-w-full px-4">
          {/* Header - Fixed to show all character faces */}
          <header className="relative w-full h-48 sm:h-56 lg:h-64 mb-8 overflow-hidden rounded-xl shadow-lg">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-indigo-800/40 to-transparent blur-xl" />

            {/* Fanned Cards Image - Adjusted to show all faces */}
            <img
              src="/images/fanned-cards.png"
              alt="Fanned NPC character cards"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 animate-fade-in-up-slow drop-shadow-xl"
              style={{ objectPosition: 'center 25%' }}
            />

            {/* Title - Fixed to ensure white text */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-indigo-900/80 via-indigo-800/30 to-transparent z-10 pointer-events-none rounded-b-xl" />
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                NPC Forge
              </h1>
              <p className="mt-1 text-base sm:text-lg lg:text-xl font-medium text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                AI-powered character generator for games
              </p>
            </div>
          </header>

          {/* Usage Limits Notice */}
          <UsageLimitsNotice />
          
          {/* Character Creation Wizard - Reduced top margin */}
          <section className="mb-8">
            <CharacterWizard />
          </section>
          
          {/* Footer with reduced spacing */}
          <footer className="text-center border-t border-indigo-100 pt-4 pb-8 dark:border-indigo-900/50">
            <div className="mx-auto">
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                Created by{' '}
                <a 
                  href="https://github.com/EthanPerello" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                >
                  Ethan Perello
                </a>
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://github.com/EthanPerello/npc-forge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center text-sm"
                >
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub Repository
                </a>
                <a 
                  href="/docs" 
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center text-sm"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Documentation
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </CharacterProvider>
  );
}