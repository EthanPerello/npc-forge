// src/app/docs/credits/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function CreditsPage() {
  const { content, title, description } = loadMarkdownContent('credits.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}