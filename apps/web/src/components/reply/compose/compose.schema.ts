import * as z from "zod";

export const composeReplySchema = z.object({
    postId: z.string().length(36),
    content: z.string().min(1).max(512),
});

export type ComposeReplyForm = z.infer<typeof composeReplySchema>;
