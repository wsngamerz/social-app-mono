"use server";

import * as z from "zod";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {State} from "@/types/actions";
import {editPostSchema} from "@/components/post/edit/edit.schema";
import {posts} from "@repo/drizzle/schema";
import {db} from "@repo/drizzle";
import {eq} from "drizzle-orm";

export async function editPost(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const {content, id} = editPostSchema.parse({
            content: data.get("content"),
            id: data.get("id"),
        });

        const supabase = createServerActionClient<Database>({cookies});
        const userId = (await supabase.auth.getSession()).data.session?.user.id;
        if (!userId) {
            return {
                status: "error",
                message: "You must be logged in to create a post",
            };
        }

        // update post
        await db.update(posts).set({
            text: content,
            updatedAt: new Date(),
        }).where(eq(posts.id, id));

        revalidatePath("/");
        revalidatePath(`/post/${id}`);
        revalidatePath(`/user/${userId}`);
        revalidatePath(`/profile`);

        return {
            status: "success",
            message: "Post updated successfully",
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
