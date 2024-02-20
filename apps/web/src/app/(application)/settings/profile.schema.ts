import * as z from "zod";

export const profileSchema = z.object({
    username: z.string(),
    displayName: z.string().max(64),
    bio: z.string().max(256),
    profileImage: z.string(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
