'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DocsNavigationProps {
  className?: string;
}

export default function DocsNavigation({ className = '' }: DocsNavigationProps) {
  const pathname = usePathname();
  
  // Determine if we're on the docs home page
  const isDocsHome = pathname === '/docs';
  const isDeveloperDocsHome = pathname === '/docs/developer';
  
  // Extract the current doc section, like "how-to-use" or "features"
  const currentSection = pathname.split('/').pop();
  
  // Check if we're on a developer docs page
  const isDeveloperDocsPage = pathname.startsWith('/docs/dev-setup') || 
                             pathname.startsWith('/docs/architecture') || 
                             pathname.startsWith('/docs/api') || 
                             pathname.startsWith('/docs/security') || 
                             pathname.startsWith('/docs/contributing') || 
                             pathname.startsWith('/docs/testing') ||
                             pathname === '/docs/developer';
  
  return (
    <nav className={`flex items-center text-sm font-medium mb-6 ${className}`}>
      <Link 
        href="/" 
        className="text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
      >
        Home
      </Link>
      
      <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
      
      {isDocsHome ? (
        <span className="text-indigo-600 dark:text-indigo-400">Documentation</span>
      ) : isDeveloperDocsHome ? (
        <>
          <Link 
            href="/docs" 
            className="text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Documentation
          </Link>
          
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          
          <span className="text-indigo-600 dark:text-indigo-400">
            Developer Docs
          </span>
        </>
      ) : isDeveloperDocsPage ? (
        <>
          <Link 
            href="/docs" 
            className="text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Documentation
          </Link>
          
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          
          <Link 
            href="/docs/developer" 
            className="text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Developer Docs
          </Link>
          
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          
          <span className="text-indigo-600 dark:text-indigo-400">
            {formatSectionName(currentSection || '')}
          </span>
        </>
      ) : (
        <>
          <Link 
            href="/docs" 
            className="text-gray-900 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
          >
            Documentation
          </Link>
          
          <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
          
          <span className="text-indigo-600 dark:text-indigo-400">
            {formatSectionName(currentSection || '')}
          </span>
        </>
      )}
    </nav>
  );
}

// Helper function to format section names for display
function formatSectionName(section: string): string {
  // Handle special cases for developer docs
  if (section === 'dev-setup') return 'Development Setup';
  if (section === 'api') return 'API Reference';
  
  // Replace hyphens with spaces and capitalize each word
  return section
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}