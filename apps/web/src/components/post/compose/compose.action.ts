"use server";

import * as z from "zod";
import { composePostSchema } from "@/components/post/compose/compose.schema";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "@repo/drizzle";
import {posts} from "@repo/drizzle/schema";
import {State} from "@/types/actions";

export async function composePost(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const { content } = composePostSchema.parse({
            content: data.get("content"),
        });

        const supabase = createServerActionClient<Database>({ cookies });
        const userId = (await supabase.auth.getSession()).data.session?.user.id;
        if (!userId) {
            return {
                status: "error",
                message: "You must be logged in to create a post",
            };
        }

        await db.insert(posts).values({
            id: crypto.randomUUID(),
            text: content,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        revalidatePath("/");
        return {
            status: "success",
            message: "Post created successfully",
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
