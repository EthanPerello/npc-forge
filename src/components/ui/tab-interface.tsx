'use client';

import { useState, useEffect, ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabInterfaceProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export default function TabInterface({
  tabs,
  defaultTabId,
  onChange,
  className = '',
  tabClassName = '',
  contentClassName = ''
}: TabInterfaceProps) {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || (tabs.length > 0 ? tabs[0].id : ''));

  // Find the first enabled tab if the current one becomes disabled
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.id === activeTabId);
    if (currentTab?.disabled) {
      const firstEnabledTab = tabs.find(tab => !tab.disabled);
      if (firstEnabledTab) {
        setActiveTabId(firstEnabledTab.id);
      }
    }
  }, [tabs, activeTabId]);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Handle case when tabs change and current tab no longer exists
  useEffect(() => {
    if (!tabs.some(tab => tab.id === activeTabId)) {
      const firstEnabledTab = tabs.find(tab => !tab.disabled);
      if (firstEnabledTab) {
        setActiveTabId(firstEnabledTab.id);
      }
    }
  }, [tabs, activeTabId]);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className="flex mb-4 border-b border-gray-200 overflow-x-auto no-scrollbar dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={`
              py-2 px-4 whitespace-nowrap transition-colors
              ${activeTabId === tab.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300'}
              ${tab.disabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'}
              ${tabClassName}
            `}
            disabled={tab.disabled}
            aria-selected={activeTabId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={`${contentClassName}`}>
        {tabs.find(tab => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
}