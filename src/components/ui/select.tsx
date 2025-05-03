'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    options,
    helperText,
    error,
    className,
    fullWidth = true, // Default to full-width
    containerClassName,
    labelClassName,
    onChange,
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

        <div className="relative">
          <select
            className={cn(
              'appearance-none w-full px-4 py-2.5 pr-10 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
              'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
              'dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            ref={ref}
            onChange={onChange}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

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

Select.displayName = 'Select';

export default Select;