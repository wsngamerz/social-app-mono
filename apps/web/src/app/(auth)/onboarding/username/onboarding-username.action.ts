"use server";

import * as z from "zod";
import {State} from "@/types/actions";
import {usernameSchema} from "@/app/(auth)/onboarding/username/onboarding-username.schema";
import {db} from "@repo/drizzle";
import {profiles} from "@repo/drizzle/schema";
import {eq} from "drizzle-orm";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/types/supabase";

export async function updateUsername(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const {username} = usernameSchema.parse({
            username: data.get("username"),
        });

        const supabase = createServerActionClient<Database>({cookies});
        const userId = (await supabase.auth.getSession()).data.session?.user.id;
        if (!userId) {
            return {
                status: "error",
                message: "Error getting current user",
            }
        }

        const existing = await db.select({id: profiles.id}).from(profiles).where(eq(profiles.username, username));
        if (existing.length > 0 && existing[0]?.id !== userId) {
            return {
                status: "error",
                message: "Username already exists",
                errors: {
                    username: ["Username already exists"],
                }
            };
        }

        // upsert the username
        await db.insert(profiles)
            .values({id: userId, username})
            .onConflictDoUpdate({
                target: profiles.id,
                set: {username},
            })

        return {
            status: "success",
            message: "Username updated",
        }
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
