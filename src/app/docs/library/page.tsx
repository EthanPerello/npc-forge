import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function LibraryPage() {
  const { content, title, description } = loadMarkdownContent('library.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}