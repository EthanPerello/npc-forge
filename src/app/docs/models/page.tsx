// src/app/docs/models/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function ModelsPage() {
  const { content, title, description } = loadMarkdownContent('models.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}