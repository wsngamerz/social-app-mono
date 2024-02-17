import * as z from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;
