// src/app/docs/generation-options/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function GenerationOptionsPage() {
  const { content, title, description } = loadMarkdownContent('generation-options.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}