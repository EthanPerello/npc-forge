'use client';

import { CharacterProvider } from '@/contexts/character-context';
import MainFormTabs from '@/components/main-form-tabs';
import CharacterDisplay from '@/components/character-display';
import UsageLimitsNotice from '@/components/usage-limits-notice';

export default function Home() {
  return (
    <CharacterProvider>
      <main className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-300">
              NPC Forge
            </h1>
            <p className="text-gray-600 mt-2 dark:text-gray-400">
              AI-powered character generator for games
            </p>
          </header>
          
          {/* Usage Limits Notice */}
          <UsageLimitsNotice />
          
          {/* Character Creation Form */}
          <section className="mb-12">
            <MainFormTabs />
          </section>
          
          {/* Character Display */}
          <section>
            <CharacterDisplay />
          </section>
          
          {/* Footer */}
          <footer className="mt-16 text-center text-gray-500 text-sm dark:text-gray-400">
            <p>Created by Ethan Perello</p>
            <p className="mt-1">
              <a 
                href="https://github.com/EthanPerello/npc-forge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                GitHub Repository
              </a>
            </p>
            <p className="mt-3 text-xs">
              Limited to 15 character generations per month per device.
            </p>
          </footer>
        </div>
      </main>
    </CharacterProvider>
  );
}