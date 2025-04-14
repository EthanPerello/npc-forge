'use client';

import { useState } from 'react';

interface JsonViewerProps {
  data: any;
  title?: string;
  collapsible?: boolean;
  initialCollapsed?: boolean;
  downloadable?: boolean;
  downloadFilename?: string;
}

export default function JsonViewer({
  data,
  title,
  collapsible = false,
  initialCollapsed = false,
  downloadable = false,
  downloadFilename = 'data.json'
}: JsonViewerProps) {
  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsed);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = href;
    link.download = downloadFilename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const formattedJson = JSON.stringify(data, null, 2);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      {/* Header with title and actions */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
        {title && (
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {title}
          </h3>
        )}
        
        <div className="flex space-x-2">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          
          {/* Download button */}
          {downloadable && (
            <button
              onClick={handleDownload}
              className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors"
            >
              Download
            </button>
          )}
          
          {/* Collapse toggle */}
          {collapsible && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-xs px-2 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          )}
        </div>
      </div>
      
      {/* JSON content */}
      {!collapsed && (
        <div className="p-4 overflow-auto max-h-96">
          <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {formattedJson}
          </pre>
        </div>
      )}
    </div>
  );
}