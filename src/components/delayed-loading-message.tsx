'use client';

import React, { useEffect } from 'react';

interface DelayedLoadingMessageProps {
  isLoading: boolean;
  message: string;
  delay?: number; // Delay in milliseconds, default 3000 (3 seconds)
}

export default function DelayedLoadingMessage({ 
  isLoading, 
  message, 
  delay = 1000 // Reduced default delay for faster feedback
}: DelayedLoadingMessageProps) {
  const [showMessage, setShowMessage] = React.useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading) {
      // Start the timer when loading begins
      timer = setTimeout(() => {
        setShowMessage(true);
      }, delay);
    } else {
      // Hide the message immediately when loading stops
      setShowMessage(false);
      // Clear any existing timer
      if (timer) {
        clearTimeout(timer);
      }
    }

    // Cleanup function to clear timer on unmount
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoading, delay]);

  // Don't render anything if not loading or message shouldn't show yet
  if (!isLoading || !showMessage) {
    return null;
  }

  return (
    <div className="fixed bottom-16 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm font-bold dark:bg-red-900/30 dark:text-red-200 animate-pulse shadow-lg border border-red-200 dark:border-red-800 w-full max-w-5xl mx-4">
        <p className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {message}
        </p>
      </div>
    </div>
  );
}