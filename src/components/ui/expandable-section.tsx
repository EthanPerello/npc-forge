'use client';

import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export default function ExpandableSection({ 
  title, 
  children, 
  defaultExpanded = false,
  className = ''
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between p-4 text-left bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 expandable-section-title"
      >
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-200">
          {title}
        </h3>
        <span>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          )}
        </span>
      </button>
      
      {isExpanded && (
        <div className="p-4 bg-white dark:bg-gray-800 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}