'use client';

import { Quest } from '@/lib/types';
import { useState } from 'react';

interface QuestsDisplayTabProps {
  quests: Quest[];
}

export default function QuestsDisplayTab({ quests }: QuestsDisplayTabProps) {
  const [activeQuest, setActiveQuest] = useState<number>(0);
  
  if (!quests.length) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
        <p className="text-gray-600 dark:text-gray-400">No quests available for this character.</p>
      </div>
    );
  }
  
  const currentQuest = quests[activeQuest];
  
  return (
    <div className="space-y-4">
      {/* Quest navigation for multiple quests */}
      {quests.length > 1 && (
        <div className="flex space-x-2 mb-4">
          {quests.map((quest, index) => (
            <button
              key={index}
              onClick={() => setActiveQuest(index)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                index === activeQuest 
                  ? 'bg-indigo-100 text-indigo-700 font-medium dark:bg-indigo-900 dark:text-indigo-300' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Quest {index + 1}
            </button>
          ))}
        </div>
      )}
      
      {/* Quest Display */}
      <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
        <h3 className="text-xl font-bold text-gray-800 mb-2 dark:text-gray-200">
          {currentQuest.title}
        </h3>
        
        {/* Quest Type Tag with GUARANTEED white text in light mode */}
        {currentQuest.type && (
          <div className="mb-3">
            <span className="inline-block bg-indigo-600 text-white text-xs px-2 py-1 rounded font-medium border border-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
              {currentQuest.type}
            </span>
          </div>
        )}
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            {currentQuest.description}
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-3 dark:border-gray-600">
          <h4 className="text-sm font-semibold text-gray-700 mb-1 dark:text-gray-300">
            Reward
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {currentQuest.reward}
          </p>
        </div>
      </div>
    </div>
  );
}