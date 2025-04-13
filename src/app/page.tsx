'use client';

import { useState } from 'react';
import CharacterForm from '@/components/character-form';
import CharacterCard from '@/components/character-card';
import { Character, CharacterFormData } from '@/lib/types';

export default function Home() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CharacterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate character');
      }

      setCharacter(result.character);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error generating character:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!character) return;

    // Create a blob from the character JSON
    const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link and trigger it
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">NPC Forge</h1>
          <p className="text-xl text-gray-600 mt-2 dark:text-gray-400">
            AI-Powered Character Generator for Games
          </p>
        </header>

        <div className="space-y-8">
          <CharacterForm onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <div className="w-full max-w-2xl mx-auto p-4 bg-red-50 text-red-600 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="w-full max-w-2xl mx-auto p-4 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Generating your character...</p>
            </div>
          )}

          {character && !isLoading && (
            <CharacterCard character={character} onDownload={handleDownload} />
          )}
        </div>
      </div>
    </main>
  );
}