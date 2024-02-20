"use server";

import * as z from "zod";
import {State} from "@/types/actions";
import {profileSchema} from "@/app/(application)/settings/profile.schema";
import {getUserId} from "@/lib/user";
import {db} from "@repo/drizzle"
import {profiles} from "@repo/drizzle/schema";
import {eq} from "drizzle-orm";

export async function updateProfile(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const {username, displayName, bio, profileImage} = profileSchema.parse({
            username: data.get("username"),
            displayName: data.get("displayName"),
            bio: data.get("bio"),
            profileImage: data.get("profileImage"),
        });

        const userId = await getUserId();
        if (!userId) {
            return {
                status: "error",
                message: "User not found",
            };
        }

        await db.update(profiles).set({
            username: username,
            displayName: displayName,
            bio: bio,
            profileImage: profileImage,
        }).where(eq(profiles.id, userId));

        return {
            status: "success",
            message: "Profile updated",
        };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid form data",
                errors: error.flatten().fieldErrors as {
                    [key: string]: string[];
                },
            };
        } else {
            return {
                status: "error",
                message: "An unknown error occurred",
            };
        }
    }
}
