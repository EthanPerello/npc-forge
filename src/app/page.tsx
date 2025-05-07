'use client';

import { useState, useEffect } from 'react';
import { CharacterProvider, useCharacter } from '@/contexts/character-context';
import MainFormTabs from '@/components/main-form-tabs';
import CharacterDisplay from '@/components/character-display';
import UsageLimitsNotice from '@/components/usage-limits-notice';
import WelcomeGuide from '@/components/welcome-guide';
import StickyFooter from '@/components/sticky-footer';

// Main content area
function MainContent() {
  const { isLoading } = useCharacter();
  return <div className="mb-20"></div>;
}

// Global loading message component that appears above the footer
function FloatingLoadingMessage() {
  const { isLoading } = useCharacter();
  
  if (!isLoading) return null;
  
  return (
    <div className="fixed bottom-24 md:bottom-24 left-0 right-0 z-50 flex justify-center px-4">
      <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm font-bold dark:bg-yellow-900/30 dark:text-yellow-300 animate-pulse shadow-lg border border-red-200 dark:border-yellow-800">
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Character generation may take a second... Creating your unique NPC with AI.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  // State for whether the welcome guide is visible
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Check if welcome guide has been dismissed before
  useEffect(() => {
    // In dev mode, always show the guide
    if (process.env.NODE_ENV === 'development') {
      setShowWelcomeGuide(true);
      return;
    }
    
    // In production, check localStorage
    const guideDismissed = localStorage.getItem('npc-forge-guide-dismissed');
    if (guideDismissed === 'true') {
      setShowWelcomeGuide(false);
    } else {
      setShowWelcomeGuide(true);
    }
  }, []);

  // Track scrolling to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setHasScrolled(scrollTop > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle the welcome guide dismissal
  const handleWelcomeDismiss = () => {
    setShowWelcomeGuide(false);
    localStorage.setItem('npc-forge-guide-dismissed', 'true');
  };

  // Handle the get started button
  const handleGetStarted = () => {
    setShowWelcomeGuide(false);
    localStorage.setItem('npc-forge-guide-dismissed', 'true');
  };

  return (
    <CharacterProvider>
      <main className="min-h-screen py-8 px-4 pb-32 md:pb-24 bg-gradient-to-br from-indigo-50 via-indigo-50/30 to-blue-100 dark:from-gray-900 dark:via-indigo-950/30 dark:to-blue-950/20 pb-footer">
        <div className="container mx-auto max-w-full">
          <header className="relative w-full h-[200px] sm:h-[220px] lg:h-[240px] mb-12 overflow-hidden rounded-2xl shadow-lg">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 via-indigo-800/40 to-transparent blur-2xl" />

            {/* Fanned Cards Image */}
            <img
              src="/images/fanned-cards.png"
              alt="Fanned NPC character cards"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-0 animate-fade-in-up-slow drop-shadow-2xl"
            />

            {/* Title */}
            {/* Gradient behind text */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-indigo-900/80 via-indigo-800/30 to-transparent z-10 pointer-events-none rounded-b-2xl" />
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                NPC Forge
              </h1>
              <p className="mt-2 text-lg sm:text-xl lg:text-2xl font-medium text-white drop-shadow-sm">
                AI-powered character generator for games
              </p>
            </div>
          </header>

          {/* Welcome Guide - Only show if state is true */}
          {showWelcomeGuide && (
            <WelcomeGuide 
              onDismiss={handleWelcomeDismiss} 
              onGetStarted={handleGetStarted} 
            />
          )}
          
          {/* Usage Limits Notice - Always show */}
          <UsageLimitsNotice />
          
          {/* Character Creation Form - Always show, no conditional visibility */}
          <section className="mb-12">
            <MainFormTabs />
          </section>
          
          {/* MainContent - now just handles spacing */}
          <MainContent />
          
          {/* Character Display - Always show */}
          <section>
            <CharacterDisplay />
          </section>
          
          {/* Footer with improved styling - Removed usage banner */}
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
            </div>
          </footer>
        </div>
      </main>
      
      {/* Sticky Footer for main actions */}
      <StickyFooter pageType="creator" showBackToTop={hasScrolled} />
      
      {/* Floating loading message that appears above the footer */}
      <FloatingLoadingMessage />
    </CharacterProvider>
  );
}