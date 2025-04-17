'use client';

import { useState, ReactNode } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  titleClassName?: string;
  contentClassName?: string;
}

export default function ExpandableSection({
  title,
  children,
  defaultExpanded = false,
  titleClassName = '',
  contentClassName = ''
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border border-gray-200 rounded-lg dark:border-gray-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors ${titleClassName}`}
        aria-expanded={isExpanded}
      >
        <span className="font-medium text-gray-700 dark:text-gray-300">{title}</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 text-gray-500 dark:text-gray-400 ${isExpanded ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className={`p-4 bg-white dark:bg-gray-800 rounded-b-lg ${contentClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
}