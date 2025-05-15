// FILE: src/components/welcome-popup.tsx

'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import Button from './ui/button';

interface WelcomePopupProps {
  onDismiss: () => void;
}

export default function WelcomePopup({ onDismiss }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Small delay before calling onDismiss to allow fade-out animation
    setTimeout(onDismiss, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleDismiss}
      />
      
      {/* Popup Card */}
      <div 
        className={`
          relative bg-white rounded-lg shadow-xl max-w-lg w-full p-6 
          dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          transform transition-all duration-200
          ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
        `}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Welcome to NPC Forge!
            </h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Describe your character and we'll handle the rest — portraits, personality, and more. 
            You can customize or randomize everything along the way!
          </p>

          <div className="flex justify-between items-center pt-4">
            <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 mr-2"
                onChange={(e) => {
                  if (e.target.checked) {
                    localStorage.setItem('npc-forge-welcome-dismissed', 'true');
                  }
                }}
              />
              Don't show this again
            </label>
            
            <Button
              variant="primary"
              onClick={handleDismiss}
            >
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}