// src/app/docs/security/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function SecurityPage() {
  const { content, title, description } = loadMarkdownContent('security.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}