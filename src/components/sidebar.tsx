'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BookOpen, 
  File, 
  Terminal, 
  Code, 
  Settings, 
  List, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  Shield,
  CalendarCheck,
  Rocket,
  Award,
  Scale,
  Menu,
  X,
  Sparkles,
  Library,
  Server,
  Database,
  MessageCircle
} from 'lucide-react';
import { ReactNode } from 'react';
import { isValidElement } from 'react';

// Define types for navigation items
interface NavItemType {
  title: string;
  path?: string;
  icon: ReactNode;
  items?: NavItemType[];
}

// Navigation structure for the sidebar
const navigationItems: NavItemType[] = [
  { 
    title: 'Character Generator', 
    path: '/',
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: 'Character Library',
    path: '/library',
    icon: <Library className="h-5 w-5" />
  },
  {
    title: 'Documentation',
    path: '/docs',
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      { title: 'How to Use', path: '/docs/how-to-use', icon: <File className="h-4 w-4" /> },
      { title: 'Chat with Characters', path: '/docs/chat', icon: <MessageCircle className="h-4 w-4" /> },
      { title: 'Character Examples', path: '/docs/character-examples', icon: <File className="h-4 w-4" /> },
      { title: 'Generation Options', path: '/docs/generation-options', icon: <Settings className="h-4 w-4" /> },
      { title: 'Features', path: '/docs/features', icon: <List className="h-4 w-4" /> },
      { title: 'Library Guide', path: '/docs/library', icon: <Database className="h-4 w-4" /> },
      { title: 'Model Selection', path: '/docs/models', icon: <Server className="h-4 w-4" /> },
      { title: 'FAQ', path: '/docs/faq', icon: <HelpCircle className="h-4 w-4" /> },
      { 
        title: 'Developer Docs', 
        path: '/docs/developer',
        icon: <Terminal className="h-4 w-4" />,
        items: [
          { title: 'Dev Setup', path: '/docs/dev-setup', icon: <Code className="h-3 w-3" /> },
          { title: 'Architecture', path: '/docs/architecture', icon: <Code className="h-3 w-3" /> },
          { title: 'API', path: '/docs/api', icon: <Code className="h-3 w-3" /> },
          { title: 'Security', path: '/docs/security', icon: <Shield className="h-3 w-3" /> },
          { title: 'Contributing', path: '/docs/contributing', icon: <Code className="h-3 w-3" /> },
          { title: 'Testing', path: '/docs/testing', icon: <Code className="h-3 w-3" /> },
          { title: 'Deployment', path: '/docs/deployment', icon: <Rocket className="h-3 w-3" /> },
          { title: 'Roadmap', path: '/docs/roadmap', icon: <Rocket className="h-3 w-3" /> },
          { title: 'Credits', path: '/docs/credits', icon: <Award className="h-3 w-3" /> },
          { title: 'License', path: '/docs/license', icon: <Scale className="h-3 w-3" /> },
        ]
      }
    ]
  }
];

// Event to notify other components of sidebar state changes
const emitSidebarEvent = (expanded: boolean, mobileOpen?: boolean) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('sidebarStateChange', { 
      detail: { 
        expanded,
        mobileOpen // Pass mobile state as well
      }
    });
    window.dispatchEvent(event);
  }
};

// Props for the NavItem component
interface NavItemProps {
  item: NavItemType;
  depth?: number;
  isOpen?: boolean;
  toggleOpen: () => void;
  isFullSidebar: boolean;
  toggleSidebar: () => void;
}

// Recursive component to render navigation items
const NavItem = ({ item, depth = 0, isOpen = false, toggleOpen, isFullSidebar, toggleSidebar }: NavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = item.path === pathname || (pathname?.startsWith(item.path!) && item.path !== '/' && pathname !== '/');
  const hasChildren = item.items && item.items.length > 0;
  
  // Don't render anything if sidebar is collapsed and depth > 0
  if (!isFullSidebar && depth > 0) return null;
  
  // Handle item click
  const handleItemClick = (e: React.MouseEvent) => {
    if (!isFullSidebar) {
      // When sidebar is collapsed, expand it when any icon is clicked
      toggleSidebar();
      e.preventDefault(); // Prevent navigation
      return;
    }
    
    if (hasChildren) {
      // For parent items with both path and children
      if (item.path) {
        // If dropdown is currently open and item has a path, navigate to that path
        if (isOpen) {
          router.push(item.path);
        } else {
          // If dropdown is closed, open it first
          toggleOpen();
          e.preventDefault(); // Prevent navigation
        }
      } else {
        // For items with only children, just toggle the dropdown
        toggleOpen();
        e.preventDefault(); // Prevent navigation
      }
    }
    // For items with only a path, default link behavior will work
  };
  
  // Special handler for the book icon to always expand the sidebar
  const handleBookIconClick = (e: React.MouseEvent) => {
    // Fixed TypeScript error by properly checking if item.icon is a valid React element and has type property
    if (item.title === 'Documentation' || (depth === 0 && isValidElement(item.icon) && item.icon.type === BookOpen)) {
      if (!isFullSidebar) {
        toggleSidebar();
        e.preventDefault();
        return;
      }
    }
  };
  
  // If the sidebar is collapsed and it's a top-level item, just show the icon
  if (!isFullSidebar && depth === 0) {
    return (
      <div className="mb-2 flex justify-center">
        <div 
          className={`
            w-10 h-10 flex justify-center items-center rounded-md cursor-pointer
            ${isActive ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' : 'hover:bg-secondary text-muted'}
          `}
          onClick={(e) => {
            handleItemClick(e);
            handleBookIconClick(e);
          }}
          title={item.title}
        >
          {item.icon}
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div 
        className={`
          flex justify-between items-center w-full px-4 py-2 rounded-md mb-1
          ${isActive ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300' : 'hover:bg-secondary'}
          ${depth === 0 ? 'font-medium' : ''}
          ${depth === 2 ? 'text-sm' : ''}
        `}
      >
        <div className="flex items-center flex-1">
          <span className="mr-2 text-indigo-600 dark:text-indigo-400">{item.icon}</span>
          
          {item.path ? (
            <Link 
              href={item.path} 
              className="flex-1 cursor-pointer"
              onClick={e => {
                // If it has children and is not open, we want to open it first instead of navigating
                if (hasChildren && !isOpen) {
                  e.preventDefault();
                  toggleOpen();
                }
              }}
            >
              {item.title}
            </Link>
          ) : (
            <span 
              className="flex-1 cursor-pointer"
              onClick={(e) => {
                if (hasChildren) {
                  toggleOpen();
                }
                handleBookIconClick(e);
              }}
            >
              {item.title}
            </span>
          )}
        </div>
        
        {hasChildren && (
          <span 
            className="text-muted cursor-pointer p-1"
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
          >
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        )}
      </div>
      
      {isOpen && hasChildren && item.items && (
        <div className={`pl-4 ml-2 border-l border-theme ${depth === 1 ? 'ml-4' : ''}`}>
          {item.items.map((child, index) => (
            <NavItemWithState 
              key={index} 
              item={child} 
              depth={depth + 1} 
              isFullSidebar={isFullSidebar}
              toggleSidebar={toggleSidebar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Props for the NavItemWithState component
interface NavItemWithStateProps {
  item: NavItemType;
  depth?: number;
  isFullSidebar: boolean;
  toggleSidebar: () => void;
}

// Wrapper component that manages state for each nav item
const NavItemWithState = ({ item, depth = 0, isFullSidebar, toggleSidebar }: NavItemWithStateProps) => {
  const pathname = usePathname();
  
  // Check if we're on a specific documentation page (not the main docs page)
  const isInPath = (item: NavItemType): boolean => {
    if (item.path === pathname) return true;
    if (item.path !== '/' && pathname?.startsWith(item.path!)) return true;
    if (item.items) {
      return item.items.some(child => isInPath(child));
    }
    return false;
  };
  
  // For the Documentation section, only auto-expand if we're on a specific docs page
  // (not the main /docs page), otherwise start closed
  // For Developer Docs, auto-expand if we're on any developer docs page
  const shouldStartOpen = () => {
    if (item.title === 'Documentation') {
      // Only auto-expand if we're on a specific docs page, not the main docs page
      return pathname !== '/docs' && pathname?.startsWith('/docs');
    }
    if (item.title === 'Developer Docs') {
      // Auto-expand if we're on any developer docs page (including the main developer page)
      return pathname === '/docs/developer' || 
             pathname?.startsWith('/docs/dev-setup') ||
             pathname?.startsWith('/docs/architecture') ||
             pathname?.startsWith('/docs/api') ||
             pathname?.startsWith('/docs/security') ||
             pathname?.startsWith('/docs/contributing') ||
             pathname?.startsWith('/docs/testing') ||
             pathname?.startsWith('/docs/deployment') ||
             pathname?.startsWith('/docs/roadmap') ||
             pathname?.startsWith('/docs/credits') ||
             pathname?.startsWith('/docs/license');
    }
    return isInPath(item);
  };
  
  const [isOpen, setIsOpen] = useState(shouldStartOpen());
  
  // Update the open state when pathname changes
  useEffect(() => {
    setIsOpen(shouldStartOpen());
  }, [pathname]);
  
  return (
    <NavItem 
      item={item} 
      depth={depth} 
      isOpen={isOpen} 
      toggleOpen={() => setIsOpen(!isOpen)} 
      isFullSidebar={isFullSidebar}
      toggleSidebar={toggleSidebar}
    />
  );
};

export default function Sidebar() {
  // Start collapsed by default
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Pathname for active detection
  const pathname = usePathname();
  
  // Toggle the sidebar expanded state
  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    emitSidebarEvent(newExpandedState);
  };
  
  // Toggle the mobile sidebar state
  const toggleMobileSidebar = () => {
    const newMobileState = !isMobileOpen;
    setIsMobileOpen(newMobileState);
    // Pass both states to the event
    emitSidebarEvent(isExpanded, newMobileState);
  };
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
    // Notify that mobile sidebar is closed
    emitSidebarEvent(isExpanded, false);
  }, [pathname, isExpanded]);
  
  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('main-sidebar');
      const mobileButton = document.getElementById('mobile-sidebar-toggle');
      const toggleButton = document.getElementById('sidebar-toggle-button');
      
      if (
        sidebar && 
        mobileButton && 
        toggleButton &&
        !sidebar.contains(event.target as Node) && 
        !mobileButton.contains(event.target as Node) &&
        !toggleButton.contains(event.target as Node) &&
        isMobileOpen
      ) {
        setIsMobileOpen(false);
        // Notify that mobile sidebar is closed
        emitSidebarEvent(isExpanded, false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileOpen, isExpanded]);
  
  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="block lg:hidden fixed top-4 left-4 z-50">
        <button
          id="mobile-sidebar-toggle"
          onClick={toggleMobileSidebar}
          className="flex items-center justify-center w-10 h-10 bg-card border border-theme rounded-md shadow-sm"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5 text-muted" />
          ) : (
            <Menu className="h-5 w-5 text-muted" />
          )}
        </button>
      </div>
      
      {/* Desktop Toggle Button - Separate from sidebar */}
      <div className="hidden lg:block fixed top-4 left-4 z-50">
        <button
          id="sidebar-toggle-button"
          onClick={toggleSidebar}
          className="flex items-center justify-center w-10 h-10 bg-card border border-theme rounded-md shadow-sm"
          aria-label="Toggle sidebar"
        >
          {isExpanded ? (
            <ChevronLeft className="h-5 w-5 text-muted" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted" />
          )}
        </button>
      </div>
      
      {/* Sidebar Container */}
      <div 
        id="main-sidebar"
        className={`
          fixed top-0 left-0 z-40 h-screen pt-16
          transition-all duration-300 ease-in-out
          bg-card border-r border-theme
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0
          ${isExpanded ? 'lg:w-64' : 'lg:w-16'}
        `}
      >
        <div className="h-full flex flex-col overflow-y-auto p-4">
          {/* Title - only show when expanded */}
          {isExpanded && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">
                NPC Forge
              </h2>
              <p className="text-sm text-muted">
                AI Character Creator
              </p>
            </div>
          )}
          
          <nav className="space-y-1 flex-1">
            {navigationItems.map((item, index) => (
              <NavItemWithState 
                key={index} 
                item={item} 
                isFullSidebar={isExpanded || isMobileOpen} 
                toggleSidebar={toggleSidebar}
              />
            ))}
          </nav>
          
          {/* Expand/Collapse button at bottom - only show in desktop expanded view */}
          {isExpanded && (
            <div className="pt-4 border-t border-theme mt-auto">
              <button
                onClick={toggleSidebar}
                className="w-full flex items-center justify-center p-2 text-muted hover:bg-secondary rounded-md"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                <span>Collapse</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
}