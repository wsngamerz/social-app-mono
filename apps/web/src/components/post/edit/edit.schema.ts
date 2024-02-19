import * as z from "zod";

export const editPostSchema = z.object({
    id: z.string().uuid(),
    content: z.string().min(1).max(512),
});

export type EditPostForm = z.infer<typeof editPostSchema>;
