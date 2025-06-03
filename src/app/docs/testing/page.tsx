// src/app/docs/testing/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function TestingPage() {
  const { content, title, description } = loadMarkdownContent('testing.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}