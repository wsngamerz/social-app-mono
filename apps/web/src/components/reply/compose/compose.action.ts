"use server";

import * as z from "zod";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {composeReplySchema} from "@/components/reply/compose/compose.schema";
import {replies} from "@repo/drizzle/schema";
import {revalidatePath} from "next/cache";
import {db} from "@repo/drizzle";

export type State =
    | {
    status: "success";
    message: string;
}
    | {
    status: "error";
    message: string;
    errors?: { [key: string]: string[] };
}
    | null;

export async function composeReply(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const {content, postId} = composeReplySchema.parse({
            postId: data.get("postId"),
            content: data.get("content"),
        });

        const supabase = createServerActionClient<Database>({cookies});
        const userId = (await supabase.auth.getSession()).data.session?.user.id;
        if (!userId) {
            return {
                status: "error",
                message: "You must be logged in to create a post",
            };
        }

        await db.insert(replies).values({
            id: crypto.randomUUID(),
            text: content,
            userId: userId,
            postId: postId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        revalidatePath(`/post/${postId}`)
        return {
            status: "success",
            message: "Reply created successfully",
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
