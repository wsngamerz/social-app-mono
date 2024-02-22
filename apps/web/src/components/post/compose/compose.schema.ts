import * as z from "zod";

export const MAX_POST_LENGTH = 512;

export const composePostSchema = z.object({
    content: z.string().min(1).max(MAX_POST_LENGTH),
});

export type ComposePostForm = z.infer<typeof composePostSchema>;
