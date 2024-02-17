import * as z from "zod";

export const detailsSchema = z.object({
    firstName: z.string().min(1).max(64),
    lastName: z.string().min(1).max(64),
    displayName: z.string().min(1).max(64),
});

export type Details = z.infer<typeof detailsSchema>;
