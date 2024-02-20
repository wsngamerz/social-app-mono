import * as z from "zod";

export const profileSchema = z.object({
    username: z.string(),
    displayName: z.string(),
    bio: z.string(),
    profileImage: z.string(),
});

export type ProfileFormSchema = z.infer<typeof profileSchema>;
