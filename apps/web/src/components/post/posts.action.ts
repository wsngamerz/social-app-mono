"use server";

import {db} from "@repo/drizzle";
import {and, count, desc, eq, getTableColumns} from "drizzle-orm";
import {posts, profiles, replies} from "@repo/drizzle/schema";

export async function getPosts(page: number = 0) {
    const postdata = await db.select({
        ...getTableColumns(posts),
        user: getTableColumns(profiles),
        commentCount: count(replies.id)
    })
        .from(posts)
        .where(eq(posts.deleted, false))
        .leftJoin(replies, and(eq(posts.id, replies.postId), eq(replies.deleted, false)))
        .leftJoin(profiles, eq(posts.userId, profiles.id))
        .groupBy(posts.id, profiles.id)
        .orderBy(desc(posts.createdAt))
        .limit(6)
        .offset(page * 6);

    return postdata;
}

export type PostResponse = Awaited<ReturnType<typeof getPosts>>;