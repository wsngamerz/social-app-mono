import * as z from "zod";

export const composePostSchema = z.object({
    content: z.string().min(1).max(512),
});

export type ComposePostForm = z.infer<typeof composePostSchema>;
