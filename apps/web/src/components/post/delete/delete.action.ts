"use server";

import {db} from "@repo/drizzle"
import {posts} from "@repo/drizzle/schema";
import {eq} from "drizzle-orm";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function deletePost(id: string) {
    const supabase = createServerActionClient<Database>({cookies})
    const userSession = await supabase.auth.getSession();
    const userId = userSession?.data.session?.user.id;

    if (!userId)
        throw new Error("User not found")

    const post = (await db.select().from(posts).where(eq(posts.id, id)))[0];
    if (!post)
        throw new Error("Post not found")

    if (post.userId !== userId)
        throw new Error("User not authorized to delete post")

    if (post.deleted)
        throw new Error("Post already deleted")

    await db.update(posts).set({deleted: true, deletedAt: new Date()}).where(eq(posts.id, id));

    revalidatePath("/");
    revalidatePath(`/user/${userId}`);
    revalidatePath(`/post/${id}`);
    revalidatePath("/profile");
}