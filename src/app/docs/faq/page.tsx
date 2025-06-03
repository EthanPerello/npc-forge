// src/app/docs/faq/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function FaqPage() {
  const { content, title, description } = loadMarkdownContent('faq.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}