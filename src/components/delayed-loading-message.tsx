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
  delay = 3000 
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
    <div className="fixed bottom-24 md:bottom-24 left-0 right-0 z-50 flex justify-center px-4">
      <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm font-bold dark:bg-yellow-900/30 dark:text-yellow-200 animate-pulse shadow-lg border border-yellow-200 dark:border-yellow-800">
        <p className="flex items-center">
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