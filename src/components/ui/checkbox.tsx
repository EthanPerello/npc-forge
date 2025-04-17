'use client';

import { InputHTMLAttributes, forwardRef, useEffect, useRef, useId } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label, 
    helperText, 
    error, 
    indeterminate = false, 
    className = '', 
    id,
    disabled,
    ...props 
  }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const uniqueId = useId(); // Add useId hook
    const checkboxId = id || `checkbox-${uniqueId}`; // Use stable ID
    
    // Handle forwarded ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else if (ref) {
        ref.current = inputRef.current;
      }
    }, [ref]);
    
    // Set indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);
    
    return (
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={inputRef}
              id={checkboxId}
              type="checkbox"
              disabled={disabled}
              className={`
                w-4 h-4 text-indigo-600 border-gray-300 rounded
                focus:ring-indigo-500 focus:ring-2
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
                ${error ? 'border-red-500' : ''}
                ${className}
                dark:bg-gray-700 dark:border-gray-600
              `}
              {...props}
            />
          </div>
          
          {label && (
            <label
              htmlFor={checkboxId}
              className={`
                ml-2 text-sm font-medium
                ${disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300'}
              `}
            >
              {label}
            </label>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <p 
            className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;