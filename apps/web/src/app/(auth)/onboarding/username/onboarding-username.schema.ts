import * as z from "zod";

export const usernameSchema = z.object({
    username: z.string().min(3).max(32).refine((value) => !value.includes(" "), {
        message: "Username cannot contain spaces",
    }),
});

export type Username = z.infer<typeof usernameSchema>;
