'use client';

import { Character } from '@/lib/types';

interface ProfileTabProps {
  character: Character;
}

export default function ProfileTab({ character }: ProfileTabProps) {
  return (
    <div className="space-y-6">
      {/* Appearance */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">
          Appearance
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {character.appearance}
        </p>
      </div>
      
      {/* Personality */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">
          Personality
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {character.personality}
        </p>
      </div>
      
      {/* Backstory */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">
          Backstory Hook
        </h3>
        <p className="text-gray-600 dark:text-gray-400 italic">
          {character.backstory_hook}
        </p>
      </div>
      
      {/* Special Ability (if present) */}
      {character.special_ability && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2 dark:text-gray-300">
            Special Ability
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {character.special_ability}
          </p>
        </div>
      )}
    </div>
  );
}