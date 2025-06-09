// src/lib/markdown-loader.ts
import fs from 'fs';
import path from 'path';

export interface MarkdownContent {
  content: string;
  title?: string;
  description?: string;
}

export function loadMarkdownContent(filename: string): MarkdownContent {
  try {
    const filePath = path.join(process.cwd(), 'docs', filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract title from first heading
    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Don't extract description to avoid duplication
    // Let the component handle showing the content naturally
    
    return {
      content: fileContent,
      title,
      description: undefined // Remove description to prevent duplication
    };
  } catch (error) {
    console.error(`Error loading markdown file ${filename}:`, error);
    return {
      content: `# Error\n\nCould not load content from ${filename}`,
      title: 'Error',
      description: 'Content could not be loaded'
    };
  }
}