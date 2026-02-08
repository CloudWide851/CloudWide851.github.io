import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import CodeRunner from './CodeRunner';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple custom parser for :::code-runner blocks
  // If we find a block like :::code-runner, we replace it with a placeholder
  // that we can then substitute with the React component.
  // However, since ReactMarkdown doesn't easily support custom components inside the tree without
  // writing a remark plugin, a simpler approach for this specific case is to
  // split the content by the delimiter and render parts separately.

  const parts = content.split(/:::code-runner\n([\s\S]*?)\n:::/g);

  return (
    <div className="markdown-body">
      {parts.map((part, index) => {
        // Even indices are regular markdown, odd indices are code for the runner
        if (index % 2 === 0) {
          return (
            <ReactMarkdown
              key={index}
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
            >
              {part}
            </ReactMarkdown>
          );
        } else {
          return (
            <CodeRunner key={index} initialCode={part.trim()} language="c" />
          );
        }
      })}
    </div>
  );
}
