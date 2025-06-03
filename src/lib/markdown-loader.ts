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
    const titleMatch = fileContent.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract description from first paragraph after title
    const lines = fileContent.split('\n');
    let description = '';
    let foundTitle = false;
    
    for (const line of lines) {
      if (line.startsWith('# ') && !foundTitle) {
        foundTitle = true;
        continue;
      }
      if (foundTitle && line.trim() && !line.startsWith('#') && !line.startsWith('**') && !line.startsWith('-')) {
        description = line.trim();
        break;
      }
    }
    
    return {
      content: fileContent,
      title,
      description
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