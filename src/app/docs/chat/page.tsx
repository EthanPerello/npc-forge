// src/app/docs/chat/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function ChatPage() {
  const { content, title, description } = loadMarkdownContent('chat.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}