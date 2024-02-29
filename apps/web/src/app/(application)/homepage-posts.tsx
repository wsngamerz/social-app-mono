import NoPosts from "@/components/post/no-posts";
import {db} from "@repo/drizzle";
import {and, count, desc, eq, getTableColumns} from "drizzle-orm";
import {posts, profiles, replies} from "@repo/drizzle/schema";
import Post from "@/components/post";

export default async function HomepagePosts() {
    const allPosts = await db.select({
        ...getTableColumns(posts),
        user: getTableColumns(profiles),
        commentCount: count(replies.id)
    })
        .from(posts)
        .where(eq(posts.deleted, false))
        .leftJoin(replies, and(eq(posts.id, replies.postId), eq(replies.deleted, false)))
        .leftJoin(profiles, eq(posts.userId, profiles.id))
        .groupBy(posts.id, profiles.id)
        .orderBy(desc(posts.createdAt));

    return (
        <>
            {allPosts && allPosts.length > 0 ? (
                allPosts.map((post) => {
                    const {user, commentCount, ...rest} = post;
                    if (!user) return null;
                    const postWithUser = {
                        ...rest,
                        user
                    };
                    return (
                        <Post key={post.id} post={postWithUser} statistics={{
                            likes: 0,
                            comments: commentCount,
                            bookmarks: 0,
                            shares: 0
                        }} displayActions/>
                    )
                })
            ) : (
                <NoPosts/>
            )}
        </>
    )
}