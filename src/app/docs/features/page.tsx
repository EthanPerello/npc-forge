// src/app/docs/features/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function FeaturesPage() {
  const { content, title, description } = loadMarkdownContent('features.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}