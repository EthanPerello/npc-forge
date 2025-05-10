'use client';

import { Sparkles } from 'lucide-react';

// Feedback Message Component for showing success/error messages
export const FeedbackMessage = ({ message }: { message: {type: 'success' | 'error', text: string} | null }) => {
  if (!message) return null;
  
  const bgClass = message.type === 'success' 
    ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
    : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
  
  return (
    <div className={`fixed bottom-5 right-5 p-4 rounded-lg border shadow-lg z-50 transition-opacity duration-300 ${bgClass}`}>
      <div className="flex items-center">
        {message.type === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        <span>{message.text}</span>
      </div>
    </div>
  );
};

// Regenerate Button Component with loading state
export const RegenerateButton = ({ 
  field, 
  onClick, 
  isLoading 
}: { 
  field: string, 
  onClick: (e: React.MouseEvent) => void, 
  isLoading: boolean 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`
        ml-2 p-2 rounded-md transition-colors
        ${isLoading 
          ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' 
          : 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300'}
      `}
      title={isLoading ? "Regenerating..." : "Regenerate with AI"}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-700 dark:border-t-indigo-300"></div>
      ) : (
        <Sparkles className="h-5 w-5" />
      )}
    </button>
  );
};

// Form Section Wrapper Component
export const FormSection = ({ 
  title, 
  children 
}: { 
  title: string, 
  children: React.ReactNode 
}) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-theme">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        {title}
      </h2>
      {children}
    </div>
  );
};