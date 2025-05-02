'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    className, 
    fullWidth = false, 
    containerClassName,
    labelClassName,
    ...props 
  }, ref) => {
    return (
      <div className={cn('mb-4', fullWidth ? 'w-full' : '', containerClassName)}>
        {label && (
          <label 
            htmlFor={props.id} 
            className={cn(
              'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200',
              labelClassName
            )}
          >
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        
        <input
          className={cn(
            'px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
            'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
            'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            fullWidth ? 'w-full' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{helperText}</p>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;