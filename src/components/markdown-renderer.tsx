// src/components/markdown-renderer.tsx
import React from 'react';
import Link from 'next/link';
import { 
  Server, Code, AlertTriangle, Check, Database, Shield, 
  Book, Users, Settings, Download, Upload, Search,
  Globe, Monitor, Smartphone, Star, ArrowRight,
  FileText, Zap, Palette, Lock, TestTube, Info
} from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  title?: string;
  description?: string;
}

const iconMap: Record<string, any> = {
  'server': Server,
  'code': Code,
  'alert': AlertTriangle,
  'check': Check,
  'database': Database,
  'shield': Shield,
  'book': Book,
  'users': Users,
  'settings': Settings,
  'download': Download,
  'upload': Upload,
  'search': Search,
  'globe': Globe,
  'monitor': Monitor,
  'smartphone': Smartphone,
  'star': Star,
  'arrow-right': ArrowRight,
  'file-text': FileText,
  'zap': Zap,
  'palette': Palette,
  'lock': Lock,
  'test-tube': TestTube,
  'info': Info
};

function parseMarkdownToJSX(markdown: string): React.JSX.Element[] {
  const lines = markdown.split('\n');
  const elements: React.JSX.Element[] = [];
  let currentIndex = 0;

  while (currentIndex < lines.length) {
    const line = lines[currentIndex];
    
    // Skip empty lines
    if (!line.trim()) {
      currentIndex++;
      continue;
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={currentIndex} className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {line.substring(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      const headerText = line.substring(3);
      elements.push(
        <h2 key={currentIndex} className="text-2xl font-semibold mb-6 mt-10 text-gray-900 dark:text-white">
          {headerText}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      const headerText = line.substring(4);
      
      // API endpoint headers with better styling
      if (headerText.includes('POST ') || headerText.includes('GET ')) {
        const IconComponent = iconMap['server'] || Server;
        elements.push(
          <div key={currentIndex} className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 flex items-center mb-2">
              <IconComponent className="h-5 w-5 mr-2" />
              {headerText}
            </h3>
          </div>
        );
      } 
      // Character example sections (like "Elarion", "Kira-7")
      else if (headerText.match(/^[A-Z][a-z]+-?\d*$/) || headerText.includes('Fantasy') || headerText.includes('Sci-Fi') || headerText.includes('Contemporary')) {
        
        // Look ahead to group related character information
        const characterInfo: string[] = [];
        let nextIndex = currentIndex + 1;
        
        // Collect following paragraphs until next major header
        while (nextIndex < lines.length && !lines[nextIndex].startsWith('##') && !lines[nextIndex].startsWith('### ')) {
          if (lines[nextIndex].trim() && !lines[nextIndex].startsWith('#')) {
            characterInfo.push(lines[nextIndex]);
          }
          nextIndex++;
          if (lines[nextIndex] && lines[nextIndex].trim() === '') break; // Stop at double empty line
        }
        
        elements.push(
          <div key={currentIndex} className="mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg dark:bg-indigo-900/20 dark:border-indigo-800">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
              {headerText}
            </h3>
            <div className="space-y-3">
              {characterInfo.map((info, i) => {
                if (info.startsWith('**') && info.includes('**:')) {
                  return (
                    <div key={i} className="py-2 border-l-4 border-indigo-400 pl-4">
                      <p className="text-indigo-800 dark:text-indigo-200 font-semibold" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(info) }} />
                    </div>
                  );
                } else if (info.startsWith('> ')) {
                  return (
                    <blockquote key={i} className="italic text-indigo-700 dark:text-indigo-300 pl-4 border-l-2 border-indigo-400">
                      {info.substring(2)}
                    </blockquote>
                  );
                } else {
                  return (
                    <p key={i} className="text-indigo-800 dark:text-indigo-200" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(info) }} />
                  );
                }
              })}
            </div>
          </div>
        );
        
        // Skip the processed content
        currentIndex = nextIndex - 1;
      }
      // Feature sections and version headers
      else if (headerText.includes('Core Features') || headerText.includes('Wizard-Based') || headerText.includes('Character Library') || headerText.includes('Enhanced Filtering') || headerText.includes('v0.')) {
        
        // Look ahead to collect related content
        const sectionContent: string[] = [];
        let nextIndex = currentIndex + 1;
        
        // Collect following content until next major header
        while (nextIndex < lines.length && !lines[nextIndex].startsWith('##') && !lines[nextIndex].startsWith('### ')) {
          if (lines[nextIndex].trim()) {
            sectionContent.push(lines[nextIndex]);
          } else if (sectionContent.length > 0) {
            // Keep going through empty lines but stop at double empty
            if (lines[nextIndex + 1] && lines[nextIndex + 1].trim() === '') break;
          }
          nextIndex++;
        }
        
        // Process the collected content
        const processedContent: React.JSX.Element[] = [];
        let contentIndex = 0;
        
        while (contentIndex < sectionContent.length) {
          const contentLine = sectionContent[contentIndex];
          
          if (contentLine.startsWith('- ') || contentLine.startsWith('* ')) {
            // Collect list items with hierarchy support
            const listItems: {text: string, isNested: boolean}[] = [{text: contentLine.substring(2), isNested: false}];
            contentIndex++;
            
            while (contentIndex < sectionContent.length && (sectionContent[contentIndex].startsWith('- ') || sectionContent[contentIndex].startsWith('* ') || sectionContent[contentIndex].startsWith('  - ') || sectionContent[contentIndex].startsWith('  * '))) {
              const item = sectionContent[contentIndex];
              if (item.startsWith('  ')) {
                listItems.push({text: item.substring(4), isNested: true});
              } else {
                listItems.push({text: item.substring(2), isNested: false});
              }
              contentIndex++;
            }
            contentIndex--; // Back up one
            
            processedContent.push(
              <ul key={contentIndex} className="space-y-2 mt-4">
                {listItems.map((item, i) => (
                  <li key={i} className={`flex items-start ${item.isNested ? 'ml-6' : ''}`}>
                    <span className={`inline-block rounded-full mt-2 mr-3 flex-shrink-0 ${
                      item.isNested 
                        ? 'w-1.5 h-1.5 bg-gray-400' 
                        : 'w-2 h-2 bg-gray-600'
                    }`}></span>
                    <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item.text) }} />
                  </li>
                ))}
              </ul>
            );
          } else {
            // Regular paragraph
            processedContent.push(
              <p key={contentIndex} className="text-gray-700 dark:text-gray-300 mt-3" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(contentLine) }} />
            );
          }
          contentIndex++;
        }
        
        // Create grouped section
        elements.push(
          <div key={currentIndex} className="p-6 bg-gray-50 border border-gray-200 rounded-lg mb-6 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              {headerText}
            </h3>
            {processedContent}
          </div>
        );
        
        // Skip the processed content
        currentIndex = nextIndex - 1;
      }
      else {
        elements.push(
          <h3 key={currentIndex} className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            {headerText}
          </h3>
        );
      }
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={currentIndex} className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
          {line.substring(5)}
        </h4>
      );
    }
    
    // Code blocks with better formatting
    else if (line.startsWith('```')) {
      const language = line.substring(3);
      const codeLines: string[] = [];
      currentIndex++;
      while (currentIndex < lines.length && !lines[currentIndex].startsWith('```')) {
        codeLines.push(lines[currentIndex]);
        currentIndex++;
      }
      
      // Determine if this is a single-line command or multi-line code
      const isSingleCommand = codeLines.length === 1 && codeLines[0].length < 50;
      
      if (isSingleCommand) {
        // Single line commands get inline styling
        elements.push(
          <div key={currentIndex} className="mb-4 p-3 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-600">
            <code className="text-gray-800 dark:text-gray-200 font-mono text-sm">{codeLines[0]}</code>
          </div>
        );
      } else {
        // Multi-line code gets full block styling
        elements.push(
          <div key={currentIndex} className="mb-6 bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm font-mono border dark:bg-gray-950 dark:border-gray-700">
            <pre>{codeLines.join('\n')}</pre>
          </div>
        );
      }
    }
    
    // Tables
    else if (line.includes('|') && lines[currentIndex + 1]?.includes('|')) {
      const tableLines: string[] = [line];
      currentIndex++;
      while (currentIndex < lines.length && lines[currentIndex].includes('|')) {
        tableLines.push(lines[currentIndex]);
        currentIndex++;
      }
      currentIndex--; // Back up one
      
      const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
      const rows = tableLines.slice(2).map(row => 
        row.split('|').map(cell => cell.trim()).filter(cell => cell)
      );
      
      elements.push(
        <div key={currentIndex} className="overflow-x-auto mb-8 border border-gray-300 rounded-lg dark:border-gray-600">
          <table className="min-w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className="px-6 py-3 text-left font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600">
                    {processInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                  {row.map((cell, j) => (
                    <td key={j} className="px-6 py-4 text-gray-800 dark:text-gray-200">
                      <span dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cell) }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    // Enhanced lists with better styling and hierarchy detection
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [line.substring(2)];
      const isChecklistItem = line.includes('[ ]') || line.includes('[x]');
      let hasNestedItems = false;
      
      currentIndex++;
      while (currentIndex < lines.length && (lines[currentIndex].startsWith('- ') || lines[currentIndex].startsWith('* ') || lines[currentIndex].startsWith('  - ') || lines[currentIndex].startsWith('  * '))) {
        const item = lines[currentIndex];
        if (item.startsWith('  ')) {
          // Nested item
          listItems.push('NESTED:' + item.substring(4));
          hasNestedItems = true;
        } else {
          listItems.push(item.substring(2));
        }
        currentIndex++;
      }
      currentIndex--; // Back up one
      
      if (isChecklistItem) {
        // Render as checklist
        elements.push(
          <ul key={currentIndex} className="mb-6 space-y-3">
            {listItems.map((item, i) => {
              const isNested = item.startsWith('NESTED:');
              const cleanItem = isNested ? item.substring(7) : item;
              const isChecked = cleanItem.includes('[x]');
              const displayText = cleanItem.replace(/\[(x| )\]\s*/, '');
              
              return (
                <li key={i} className={`flex items-start ${isNested ? 'ml-6' : ''}`}>
                  <span className={`inline-flex items-center justify-center w-5 h-5 border-2 rounded mt-0.5 mr-3 flex-shrink-0 ${
                    isChecked 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-400 dark:border-gray-500'
                  }`}>
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(displayText) }} />
                </li>
              );
            })}
          </ul>
        );
      } else {
        // Regular list with hierarchy support
        elements.push(
          <ul key={currentIndex} className="mb-6 space-y-2">
            {listItems.map((item, i) => {
              const isNested = item.startsWith('NESTED:');
              const cleanItem = isNested ? item.substring(7) : item;
              
              return (
                <li key={i} className={`flex items-start ${isNested ? 'ml-6' : ''}`}>
                  <span className={`inline-block rounded-full mt-2 mr-3 flex-shrink-0 ${
                    isNested 
                      ? 'w-1.5 h-1.5 bg-indigo-400' 
                      : 'w-2 h-2 bg-indigo-600'
                  }`}></span>
                  <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cleanItem) }} />
                </li>
              );
            })}
          </ul>
        );
      }
    }
    
    // Numbered lists with better styling
    else if (/^\d+\. /.test(line)) {
      const listItems: string[] = [line.replace(/^\d+\. /, '')];
      let listNumber = 1;
      currentIndex++;
      while (currentIndex < lines.length && /^\d+\. /.test(lines[currentIndex])) {
        listItems.push(lines[currentIndex].replace(/^\d+\. /, ''));
        listNumber++;
        currentIndex++;
      }
      currentIndex--; // Back up one
      
      elements.push(
        <ol key={currentIndex} className="mb-6 space-y-2">
          {listItems.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-sm font-bold rounded-full mt-0.5 mr-3 flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }} />
            </li>
          ))}
        </ol>
      );
    }
    
    // Block quotes
    else if (line.startsWith('> ')) {
      const quoteLines: string[] = [line.substring(2)];
      currentIndex++;
      while (currentIndex < lines.length && lines[currentIndex].startsWith('> ')) {
        quoteLines.push(lines[currentIndex].substring(2));
        currentIndex++;
      }
      currentIndex--; // Back up one
      
      elements.push(
        <blockquote key={currentIndex} className="border-l-4 border-indigo-500 pl-6 py-2 mb-6 bg-gray-50 dark:bg-gray-800 rounded-r-lg">
          <p className="text-gray-700 dark:text-gray-300 italic text-lg">
            {quoteLines.join(' ')}
          </p>
        </blockquote>
      );
    }
    
    // Regular paragraphs with special formatting
    else if (line.trim()) {
      // Character trait sections (like "Genre:", "Created with:", etc.)
      if (line.startsWith('**') && line.includes('**:')) {
        elements.push(
          <div key={currentIndex} className="mb-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 dark:bg-indigo-900/20 dark:border-indigo-500">
            <p className="text-indigo-900 dark:text-indigo-200 font-semibold" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
          </div>
        );
      }
      // Success/Error response sections
      else if (line.toLowerCase().includes('success response') || line.toLowerCase().includes('200 ok')) {
        const CheckIcon = iconMap['check'] || Check;
        elements.push(
          <div key={currentIndex} className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-700">
            <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
            </div>
          </div>
        );
      } else if (line.toLowerCase().includes('error response') || line.toLowerCase().includes('400') || line.toLowerCase().includes('500')) {
        const AlertIcon = iconMap['alert'] || AlertTriangle;
        elements.push(
          <div key={currentIndex} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-700">
            <div className="flex items-center">
              <AlertIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
            </div>
          </div>
        );
      }
      // Related documentation sections
      else if (line.toLowerCase().includes('related documentation')) {
        elements.push(
          <div key={currentIndex} className="mt-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg dark:bg-indigo-900/20 dark:border-indigo-800">
            <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-4" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
          </div>
        );
      }
      // Regular paragraphs
      else {
        elements.push(
          <p key={currentIndex} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }} />
        );
      }
    }
    
    currentIndex++;
  }

  return elements;
}

function processInlineMarkdown(text: string): string {
  // Process inline code with better styling
  text = text.replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">$1</code>');
  
  // Process bold text
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
  
  // Process italic text
  text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');
  
  // Process internal documentation links
  text = text.replace(/\[([^\]]+)\]\(\/docs\/([^)]+)\)/g, '<a href="/docs/$2" class="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">$1</a>');
  
  // Process external links
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">$1</a>');
  
  // Process other internal links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\.md\)/g, '<a href="/docs/$2" class="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">$1</a>');
  
  // Process remaining links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">$1</a>');
  
  return text;
}

export default function MarkdownRenderer({ content, title, description }: MarkdownRendererProps) {
  const elements = parseMarkdownToJSX(content);

  return (
    <div className="max-w-none markdown-content">
      {description && (
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      )}
      <div className="space-y-1">
        {elements}
      </div>
    </div>
  );
}