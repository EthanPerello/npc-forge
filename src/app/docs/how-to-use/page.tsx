// src/app/docs/how-to-use/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function HowToUsePage() {
  const { content, title, description } = loadMarkdownContent('how-to-use.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}