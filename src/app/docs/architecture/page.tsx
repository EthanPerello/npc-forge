// src/app/docs/architecture/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function ArchitecturePage() {
  const { content, title, description } = loadMarkdownContent('architecture.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}