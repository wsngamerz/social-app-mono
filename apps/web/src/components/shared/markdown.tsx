import React from "react";
import ReactMarkdown from "react-markdown";
import remarkEmoji from "remark-emoji";
import remarkTwemoji from "remark-twemoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, {defaultSchema, Options} from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

export default function Markdown({ content }: MarkdownProps) {
    return (
        <div className="w-full max-w-full prose prose-slate prose-sm dark:prose-invert prose-img:rounded prose-headings:my-0.5 prose-p:my-0.5 prose-img:my-0.5 prose-p:leading-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkEmoji, [remarkTwemoji, {
                    isReact: true,
                    className: "inline-block w-6"
                }]]}
                rehypePlugins={[
                    rehypeRaw,
                    [rehypeSanitize, {
                        ...defaultSchema,
                        attributes: {
                            ...defaultSchema.attributes,
                            "img" : ["src", "longdesc", "loading", "alt", "className"],
                        }
                    } as Options],
                    rehypeHighlight
                ]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

type MarkdownProps = {
    content: string;
};