'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  type = 'button', // Set default type to 'button' to prevent accidental form submissions
  onClick,
  ...props
}: ButtonProps) {
  // Define styles based on variant
  const variantStyles = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm dark:bg-indigo-700 dark:hover:bg-indigo-600',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm dark:bg-red-700 dark:hover:bg-red-600',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm dark:bg-green-700 dark:hover:bg-green-600',
  };

  // Define styles based on size
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-2.5 text-lg',
  };

  // Enhanced onClick handler to ensure we don't get accidental form submissions
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If it's not explicitly a submit button, prevent form submission
    if (type !== 'submit') {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  // Combine all styles
  const buttonStyles = `
    rounded-md font-medium transition-colors duration-200 
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
    ${variantStyles[variant]} 
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button
      className={buttonStyles}
      disabled={disabled || isLoading}
      type={type}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </div>
      )}
    </button>
  );
}