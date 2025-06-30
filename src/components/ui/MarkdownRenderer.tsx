import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }: { content: string }) => {
    return (
        <ReactMarkdown
            components={{
                code({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean; className?: string; children?: React.ReactNode }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={oneDark as any}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">
                            {children}
                        </code>
                    );
                }
            }}

        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
