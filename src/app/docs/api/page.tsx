// src/app/docs/api/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function ApiPage() {
  const { content, title, description } = loadMarkdownContent('api.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}