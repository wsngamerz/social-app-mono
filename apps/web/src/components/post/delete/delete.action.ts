"use server";

import {db} from "@repo/drizzle"
import {posts} from "@repo/drizzle/schema";
import {and, eq} from "drizzle-orm";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function deletePost(id: string) {
    const supabase = createServerActionClient<Database>({cookies})
    const userSession = await supabase.auth.getSession();
    const userId = userSession?.data.session?.user.id;

    if (!userId) {
        throw new Error("User not found")
    }

    // should be able to delete only if the post belongs to the user
    await db.delete(posts).where(and(eq(posts.id, id), eq(posts.userId, userId)));

    revalidatePath("/");
    revalidatePath(`/user/${userId}`);
    revalidatePath(`/post/${id}`);
    revalidatePath(`/profile`);
}