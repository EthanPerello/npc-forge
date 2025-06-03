// src/app/docs/contributing/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function ContributingPage() {
  const { content, title, description } = loadMarkdownContent('contributing.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}