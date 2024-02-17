import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function Markdown({ content }: MarkdownProps) {
    return (
        <div className="w-full max-w-full prose prose-slate prose-sm dark:prose-invert prose-img:rounded prose-headings:my-0.5 prose-p:my-0.5 prose-img:my-0.5">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

type MarkdownProps = {
    content: string;
};
