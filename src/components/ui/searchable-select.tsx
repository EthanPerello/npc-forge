'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface SearchableOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: SearchableOption[];
  value: string | SearchableOption | null;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  label,
  placeholder = 'Search...',
  helperText,
  error,
  disabled = false,
  className = ''
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle value display
  const getSelectedValue = (): string => {
    // Handle different value formats
    if (typeof value === 'string') {
      // If it's a string, find the matching option
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
    } else if (value && typeof value === 'object' && 'label' in value) {
      // If it's an object with label, use that directly
      return value.label;
    }
    // Default to empty
    return '';
  };

  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div ref={wrapperRef} className="relative">
        {/* Selected value display */}
        <div 
          className={`
            flex items-center justify-between w-full px-4 py-2 
            bg-white border border-gray-300 rounded-md 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white
            ${isOpen ? 'ring-2 ring-indigo-500' : ''}
            ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className={!getSelectedValue() ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}>
            {getSelectedValue() || placeholder}
          </span>
          
          <div className="flex items-center">
            {getSelectedValue() && (
              <button
                type="button"
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
              >
                <X size={14} />
              </button>
            )}
            <svg 
              className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
            {/* Search input */}
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  autoFocus
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              ) : (
                filteredOptions.map(option => (
                  <div
                    key={option.value}
                    className={`
                      px-4 py-2 text-sm cursor-pointer 
                      hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                      ${option.value === (typeof value === 'string' ? value : value?.value) 
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200' 
                        : 'text-gray-800 dark:text-gray-200'}
                    `}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper text or error */}
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}