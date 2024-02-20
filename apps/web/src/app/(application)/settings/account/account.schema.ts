import * as z from "zod";

export const accountSchema = z.object({
    firstName: z.string(),
    lastName: z.string()
});

export type AccountFormSchema = z.infer<typeof accountSchema>;
