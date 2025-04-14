'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import { SelectOption } from './select';

interface SearchableSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  noOptionsMessage?: string;
  id?: string;
}

const SearchableSelect = forwardRef<HTMLDivElement, SearchableSelectProps>(
  ({
    options,
    value,
    onChange,
    placeholder = 'Select an option...',
    label,
    helperText,
    error,
    disabled = false,
    required = false,
    fullWidth = false,
    className = '',
    noOptionsMessage = 'No options found',
    id,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    
    // Get the selected option label
    const selectedOption = options.find(option => option.value === value);
    
    // Filter options based on search term
    useEffect(() => {
      const filtered = options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered);
    }, [searchTerm, options]);
    
    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          // Reset search when closing dropdown
          setSearchTerm('');
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    // Focus the input when opening the dropdown
    useEffect(() => {
      if (isOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen]);
    
    const handleToggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm('');
      }
    };
    
    const handleSelectOption = (option: SelectOption) => {
      onChange(option.value);
      setIsOpen(false);
      setSearchTerm('');
    };
    
    return (
      <div 
        className={`relative ${fullWidth ? 'w-full' : 'w-auto'} ${className}`} 
        ref={ref}
      >
        {label && (
          <label 
            htmlFor={selectId} 
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        
        <div 
          ref={dropdownRef} 
          className={`relative ${disabled ? 'opacity-70' : ''}`}
        >
          {/* Selected Value Display / Dropdown Toggle */}
          <div
            onClick={handleToggleDropdown}
            className={`
              flex items-center justify-between px-4 py-2 bg-white border rounded-md cursor-pointer
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-indigo-500'}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white
            `}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? selectId : undefined}
            id={selectId}
          >
            <span className={`truncate ${!value ? 'text-gray-500 dark:text-gray-400' : ''}`}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <svg 
              className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          {/* Dropdown Panel */}
          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
              {/* Search Input */}
              <div className="sticky top-0 bg-white p-2 dark:bg-gray-800">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              {/* Options List */}
              <ul 
                className="py-1" 
                role="listbox"
                aria-labelledby={selectId}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => !option.disabled && handleSelectOption(option)}
                      className={`
                        px-4 py-2 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900
                        ${option.value === value ? 'bg-indigo-100 dark:bg-indigo-800' : ''}
                        ${option.disabled ? 'text-gray-400 cursor-not-allowed dark:text-gray-600' : ''}
                      `}
                      role="option"
                      aria-selected={option.value === value}
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                    {noOptionsMessage}
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        {/* Helper Text or Error Message */}
        {(helperText || error) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

SearchableSelect.displayName = 'SearchableSelect';

export default SearchableSelect;