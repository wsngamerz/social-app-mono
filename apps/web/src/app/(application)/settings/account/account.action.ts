"use server";

import * as z from "zod";
import {State} from "@/types/actions";
import {getUserId} from "@/lib/user";
import {db} from "@repo/drizzle"
import {profiles} from "@repo/drizzle/schema";
import {eq} from "drizzle-orm";
import {accountSchema} from "@/app/(application)/settings/account/account.schema";
import {revalidatePath} from "next/cache";

export async function updateAccount(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const {firstName, lastName} = accountSchema.parse({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
        });

        const userId = await getUserId();
        if (!userId) {
            return {
                status: "error",
                message: "User not found",
            };
        }

        await db.update(profiles).set({
            firstName,
            lastName,
        }).where(eq(profiles.id, userId));

        revalidatePath("/settings/account");

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
