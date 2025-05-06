'use client';

import { Character } from '@/lib/types';
import { User, Heart, Book } from 'lucide-react';

interface ProfileTabProps {
  character: Character;
}

export default function ProfileTab({ character }: ProfileTabProps) {
  return (
    <div className="space-y-6">
      {/* Appearance with enhanced styling */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center dark:text-blue-300">
          <User className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Appearance
        </h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {character.appearance}
        </p>
      </div>
      
      {/* Personality with enhanced styling */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center dark:text-blue-300">
          <Heart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Personality
        </h3>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
          {character.personality}
        </p>
      </div>
      
      {/* Backstory with enhanced styling */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center dark:text-blue-300">
          <Book className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Backstory Hook
        </h3>
        <p className="text-gray-700 italic font-medium dark:text-gray-300 whitespace-pre-line leading-relaxed bg-blue-50 p-3 rounded-md dark:bg-blue-900/20">
          {character.backstory_hook}
        </p>
      </div>
      
      {/* Usage tip */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-700 flex dark:bg-blue-900/20 dark:border-blue-800/50 dark:text-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>
          Character profiles can be used for game documents, RPG sessions, or creative writing. Download the JSON to save this character for later use.
        </p>
      </div>
    </div>
  );
}