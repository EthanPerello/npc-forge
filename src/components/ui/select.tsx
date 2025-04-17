'use client';

import { SelectHTMLAttributes, ReactNode, forwardRef, useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options,
    label,
    helperText,
    error,
    size = 'md',
    fullWidth = false,
    icon,
    className = '',
    id,
    ...props
  }, ref) => {
    // Generate a stable unique ID using useId hook
    const uniqueId = useId();
    const inputId = id || `select-${uniqueId}`;
    
    // Define sizes
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
    };
    
    return (
      <div className={`${fullWidth ? 'w-full' : 'w-auto'}`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        {/* Select container with positioning context */}
        <div className="relative">
          {/* Left icon if provided */}
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          
          {/* Select element - positioned to cover the entire area */}
          <select
            id={inputId}
            ref={ref}
            className={`
              block w-full ${sizeClasses[size]} 
              ${icon ? 'pl-10' : 'pl-4'} 
              pr-10
              border border-gray-300 
              rounded-md 
              bg-white
              text-gray-900
              appearance-none /* Hide default arrow in most browsers */
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
              ${props.disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
              dark:bg-gray-700 dark:border-gray-600 dark:text-white
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom arrow - positioned as overlay with pointer-events-none */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
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
);

Select.displayName = 'Select';

export default Select;