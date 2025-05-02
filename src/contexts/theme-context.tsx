'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import defaultTheme from 'tailwindcss/defaultTheme';

// Define the theme options and context state type
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => null,
});

// Hook for components to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component that wraps the app
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize state with system or stored preference
  const [theme, setThemeState] = useState<Theme>('system');
  
  // Function to set theme in state and localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('npc-forge-theme', newTheme);
  };
  
  // Effect to initialize theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('npc-forge-theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
  }, []);
  
  // Effect to apply the theme to the document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove any previous theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on selection
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
  // Listen for system preference changes when using system theme
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}