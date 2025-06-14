'use client';

import React from 'react';
import { RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

// Feedback Message Component for showing success/error messages
export const FeedbackMessage = ({ message }: { message: {type: 'success' | 'error', text: string} | null }) => {
  if (!message) return null;
  
  const bgClass = message.type === 'success' 
    ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
    : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
  
  return (
    <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 p-4 rounded-lg border shadow-lg z-50 transition-opacity duration-300 ${bgClass}`}>
      <div className="flex items-center">
        {message.type === 'success' ? (
          <CheckCircle className="h-5 w-5 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 mr-2" />
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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, 
  isLoading: boolean 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`
        ml-2 p-2 rounded-md transition-all duration-200 relative
        ${isLoading 
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 cursor-not-allowed border border-blue-200 dark:border-blue-700' 
          : 'text-indigo-600 hover:text-indigo-800 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}
      `}
      title={isLoading ? "Regenerating..." : "Regenerate with AI"}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600 dark:border-blue-700 dark:border-t-blue-300"></div>
        </div>
      ) : (
        <RotateCcw className="h-5 w-5" />
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