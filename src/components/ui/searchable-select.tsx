'use client';

import { useState, useRef, useEffect, useId } from 'react';

export interface SearchableOption {
  value: string;
  label: string;
  group?: string;
}

interface SearchableSelectProps {
  options: SearchableOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  label,
  placeholder = 'Search...',
  helperText,
  error,
  disabled = false
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();
  const inputId = `searchable-select-${uniqueId}`;

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

  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group options if they have group property
  const hasGroups = options.some(option => option.group);
  const groupedOptions = hasGroups
    ? filteredOptions.reduce((acc, option) => {
        const group = option.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, SearchableOption[]>)
    : {};

  // Display the selected option label
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      <div ref={wrapperRef} className="relative">
        <div 
          className={`
            flex items-center justify-between w-full px-4 py-2 border rounded-md cursor-pointer
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-200' : ''}
            dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600
          `}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              setSearchTerm('');
              // Focus input when opening
              if (!isOpen) {
                setTimeout(() => inputRef.current?.focus(), 0);
              }
            }
          }}
        >
          <span className={`truncate ${!selectedOption ? 'text-gray-400' : ''}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="p-2">
              <input
                id={inputId}
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              ) : hasGroups ? (
                // Render grouped options
                Object.entries(groupedOptions).map(([group, options]) => (
                  <div key={group}>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      {group}
                    </div>
                    {options.map(option => (
                      <div
                        key={option.value}
                        className={`
                          px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                          ${option.value === value ? 'bg-indigo-100 dark:bg-indigo-900/50' : ''}
                        `}
                        onClick={() => {
                          onChange(option.value);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                // Render flat options list
                filteredOptions.map(option => (
                  <div
                    key={option.value}
                    className={`
                      px-4 py-2 text-sm cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                      ${option.value === value ? 'bg-indigo-100 dark:bg-indigo-900/50' : ''}
                    `}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
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

      {/* Helper text or error message */}
      {(helperText || error) && (
        <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}