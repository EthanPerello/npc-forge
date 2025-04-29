'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/contexts/theme-context';
import ThemeToggle from './ui/theme-toggle';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Listen for sidebar state changes
    const handleSidebarChange = (e: CustomEvent) => {
      setIsExpanded(e.detail.expanded);
    };
    
    window.addEventListener('sidebarStateChange' as any, handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebarStateChange' as any, handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <ThemeProvider>
      <div
        className={`min-h-screen transition-all duration-300 ${
          isExpanded ? 'lg:pl-64' : 'lg:pl-16'
        }`}
      >
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        {children}
      </div>
    </ThemeProvider>
  );
}