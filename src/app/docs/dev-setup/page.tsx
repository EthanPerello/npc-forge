// src/app/docs/dev-setup/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function DevSetupPage() {
  const { content, title, description } = loadMarkdownContent('dev-setup.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}