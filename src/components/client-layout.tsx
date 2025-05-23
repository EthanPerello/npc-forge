'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/contexts/theme-context';
import ThemeToggle from './ui/theme-toggle';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Listen for sidebar state changes
    const handleSidebarChange = (e: CustomEvent) => {
      setIsExpanded(e.detail.expanded);
      
      // If mobile sidebar is opening, we'll track that separately
      if (e.detail.mobileOpen !== undefined) {
        setIsMobileSidebarOpen(e.detail.mobileOpen);
      }
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
        {/* Header - visible on all pages but collapses when mobile sidebar is open */}
        <header 
          className={`fixed z-40 top-0 right-0 left-0 bg-card border-b border-theme py-2 px-4 
            ${isMobileSidebarOpen ? 'lg:left-16 hidden' : 'lg:left-16'}
            ${isExpanded ? 'lg:left-64' : 'lg:left-16'}`}
        >
          <div className="flex justify-between items-center h-12">
            {/* Only show app title on medium+ screens or when sidebar is collapsed */}
            <div className={`${isExpanded ? 'hidden lg:flex' : 'flex'} items-center`}>
              <Link href="/" className="text-xl font-bold flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                NPC Forge
              </Link>
            </div>
            
            {/* Right side with theme toggle */}
            <div>
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        {/* Main content - add padding for header */}
        <div className="pt-16">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}