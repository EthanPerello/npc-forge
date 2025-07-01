'use client';

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@/contexts/theme-context';
import { CharacterProvider } from '@/contexts/character-context';
import { ChatProvider } from '@/contexts/chat-context';
import Header from '@/components/header';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarStateChange = (event: CustomEvent) => {
      setSidebarExpanded(event.detail.expanded);
      if (event.detail.mobileOpen !== undefined) {
        setMobileOpen(event.detail.mobileOpen);
      }
    };

    window.addEventListener('sidebarStateChange', handleSidebarStateChange as EventListener);

    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarStateChange as EventListener);
    };
  }, []);

  return (
    <ThemeProvider>
      <CharacterProvider>
        <ChatProvider>
          {/* Header */}
          <Header />
          
          {/* Main content with sidebar offset */}
          <main 
            className={`
              min-h-screen pt-16 transition-all duration-300 ease-in-out
              ${sidebarExpanded ? 'lg:pl-64' : 'lg:pl-16'}
              ${mobileOpen ? 'pl-0' : 'pl-0 lg:pl-16'}
            `}
          >
            <div className="p-4 lg:p-8">
              {children}
            </div>
          </main>
        </ChatProvider>
      </CharacterProvider>
    </ThemeProvider>
  );
}