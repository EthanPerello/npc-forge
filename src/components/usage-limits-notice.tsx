'use client';

import { useState, useEffect } from 'react';
import { getRemainingGenerations } from '@/lib/usage-limits';

export default function UsageLimitsNotice() {
  const [remaining, setRemaining] = useState<number | string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const remainingGenerations = getRemainingGenerations();
    setRemaining(remainingGenerations);
    
    // Update when window gains focus
    const handleFocus = () => {
      const remainingGenerations = getRemainingGenerations();
      setRemaining(remainingGenerations);
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
  
  // Don't render during SSR or if we have plenty of generations left or unlimited
  if (!isClient || remaining === null || remaining === "Unlimited" || (typeof remaining === 'number' && remaining > 3)) {
    return null;
  }
  
  if (remaining === 0) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">Generation Limit Reached</h3>
            <div className="mt-2 text-sm">
              <p>
                You've reached your monthly character generation limit. Limits will reset at the beginning of next month.
              </p>
              <p className="mt-2">
                Save your existing characters as JSON files and consider keeping your own character library.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">Generation Limit Warning</h3>
          <div className="mt-2 text-sm">
            <p>
              You have only <strong>{remaining}</strong> character generation{remaining === 1 ? '' : 's'} remaining this month.
            </p>
            <p className="mt-2">
              Remember to save your characters as JSON files to view them again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}