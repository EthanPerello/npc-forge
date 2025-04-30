'use client';

import { useState, useEffect } from 'react';

interface DelayedLoadingMessageProps {
  isLoading: boolean;
  delayMs?: number;
  message?: string;
}

export default function DelayedLoadingMessage({
  isLoading,
  delayMs = 3000,
  message = "Character generation may take a second..."
}: DelayedLoadingMessageProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isLoading) {
      // Set a timeout to show the message after the specified delay
      timeoutId = setTimeout(() => {
        setShowMessage(true);
      }, delayMs);
    } else {
      // Hide the message immediately when loading stops
      setShowMessage(false);
    }
    
    // Clean up the timeout when the component unmounts or isLoading changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, delayMs]);

  if (!showMessage) {
    return null;
  }

  return (
    <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm dark:bg-yellow-900/30 dark:text-yellow-300 animate-pulse">
      <p className="flex items-center">
        <svg className="w-4 h-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {message}
      </p>
    </div>
  );
}