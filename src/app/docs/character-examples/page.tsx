// src/app/docs/character-examples/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function CharacterExamplesPage() {
  const { content, title, description } = loadMarkdownContent('character-examples.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}