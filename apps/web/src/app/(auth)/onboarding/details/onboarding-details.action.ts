"use server";

import * as z from "zod";
import {State} from "@/types/actions";
import {db} from "@repo/drizzle";
import {profiles} from "@repo/drizzle/schema";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Database} from "@/types/supabase";
import {detailsSchema} from "@/app/(auth)/onboarding/details/onboarding-details.schema";

export async function updateDetails(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const {firstName, lastName, displayName} = detailsSchema.parse({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            displayName: data.get("displayName"),
        });

        const supabase = createServerActionClient<Database>({cookies});
        const userId = (await supabase.auth.getSession()).data.session?.user.id;
        if (!userId) {
            return {
                status: "error",
                message: "Error getting current user",
            }
        }

        // upsert the details
        await db.insert(profiles)
            .values({id: userId, firstName, lastName, displayName})
            .onConflictDoUpdate({
                target: profiles.id,
                set: {firstName, lastName, displayName},
            })

        return {
            status: "success",
            message: "Details updated",
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
