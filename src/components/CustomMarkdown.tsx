import { useEffect } from 'react';
import Markdown from 'react-markdown';
import mermaid from 'mermaid';

export default function CustomMarkdown({ content }: { content?: string }) {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'monospace',
    });
  }, []);

  useEffect(() => {
    mermaid.run({ querySelector: '.language-mermaid' });
  }, [content]);

  if (!content) return <></>;

  return (
    <div className='markdown-body'>
      <Markdown>{content}</Markdown>
    </div>
  );
}
