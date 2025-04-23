'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

// Function to get a readable name from a URL path segment
const getReadableName = (segment: string): string => {
  if (!segment) return 'Home';
  
  // Handle special cases
  if (segment === 'docs') return 'Documentation';
  
  // Replace hyphens with spaces and capitalize each word
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function DocsNavigation() {
  const pathname = usePathname();
  
  // Skip empty segments and create breadcrumb items
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const label = getReadableName(segment);
    
    return { href, label };
  });
  
  // Add home as the first item
  breadcrumbs.unshift({ href: '/', label: 'Home' });
  
  return (
    <nav className="flex py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="inline-flex items-center">
            {index === 0 ? (
              // Home item
              <Link 
                href={breadcrumb.href}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Home className="w-4 h-4 mr-2" />
                {breadcrumb.label}
              </Link>
            ) : (
              // Other items
              <>
                <ChevronRight className="w-5 h-5 text-gray-400" />
                <Link 
                  href={breadcrumb.href}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2 dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  {breadcrumb.label}
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}