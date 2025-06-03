// src/app/docs/license/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function LicensePage() {
  const { content, title, description } = loadMarkdownContent('license.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}