"use server";

import {db} from "@repo/drizzle"
import {replies} from "@repo/drizzle/schema";
import {eq} from "drizzle-orm";
import {createServerActionClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function deleteReply(id: string) {
    const supabase = createServerActionClient<Database>({cookies})
    const userSession = await supabase.auth.getSession();
    const userId = userSession?.data.session?.user.id;

    if (!userId)
        throw new Error("User not found")

    const reply = (await db.select().from(replies).where(eq(replies.id, id)))[0];
    if (!reply)
        throw new Error("Reply not found")

    if (reply.userId !== userId)
        throw new Error("User not authorized to delete reply")

    if (reply.deleted)
        throw new Error("reply already deleted")

    await db.update(replies).set({deleted: true, deletedAt: new Date()}).where(eq(replies.id, id));

    revalidatePath(`/post/${reply.postId}`);
}