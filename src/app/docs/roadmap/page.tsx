// src/app/docs/roadmap/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function RoadmapPage() {
  const { content, title, description } = loadMarkdownContent('roadmap.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}