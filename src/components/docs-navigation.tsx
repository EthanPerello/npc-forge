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
  
  // Extract the current doc section, like "how-to-use" or "features"
  const currentSection = pathname.split('/').pop();
  
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
  // Replace hyphens with spaces and capitalize each word
  return section
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}