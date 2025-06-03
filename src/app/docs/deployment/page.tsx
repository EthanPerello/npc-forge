// src/app/docs/deployment/page.tsx
import MarkdownRenderer from '@/components/markdown-renderer';
import { loadMarkdownContent } from '@/lib/markdown-loader';

export default function DeploymentPage() {
  const { content, title, description } = loadMarkdownContent('deployment.md');
  
  return <MarkdownRenderer content={content} title={title} description={description} />;
}