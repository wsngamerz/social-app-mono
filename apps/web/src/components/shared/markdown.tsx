import React from "react";
import ReactMarkdown from "react-markdown";
import remarkEmoji from "remark-emoji";
import remarkTwemoji from "remark-twemoji";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, {defaultSchema, Options} from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import {cn} from "@ui/lib/utils";

type MarkdownProps = {
    content: string;
    className?: string;
};

export default function Markdown({content, className}: MarkdownProps) {
    return (
        <div
            className={cn("prose prose-slate prose-sm dark:prose-invert",
                "prose-headings:my-0.5 prose-headings:break-words",
                "prose-img:my-0.5 prose-img:rounded",
                "prose-p:my-0.5 prose-p:leading-6 prose-p:break-words",
                "w-full max-w-full overflow-hidden",
                className)}>
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
                            "img": ["src", "longdesc", "loading", "alt", "className"],
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