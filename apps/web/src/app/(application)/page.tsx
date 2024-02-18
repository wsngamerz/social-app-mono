import Post from "@/components/post";
import ComposeCard from "@/components/post/compose/compose-card";
import {db} from "@repo/drizzle";
import NoPosts from "@/components/post/no-posts";
import {count, eq, getTableColumns} from "drizzle-orm";
import {posts, profiles, replies} from "@repo/drizzle/schema";

export default async function HomePage() {
    const allPosts = await db.select({
        ...getTableColumns(posts),
        user: getTableColumns(profiles),
        commentCount: count(replies.id)
    })
        .from(posts)
        .leftJoin(replies, eq(posts.id, replies.postId))
        .leftJoin(profiles, eq(posts.userId, profiles.id))
        .groupBy(posts.id, profiles.id);

    return (
        <>
            <h1 className="text-2xl font-bold">Home</h1>

            <div className="hidden sm:block">
                <ComposeCard/>
            </div>

            <div className="flex flex-col gap-4">
                {allPosts && allPosts.length > 0 ? (
                    allPosts.map((post) => {
                        const {user, commentCount, ...rest} = post;
                        if (!user) return null;
                        const postWithUser = {
                            ...rest,
                            user
                        };
                        return(
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
            </div>
        </>
    );
}
