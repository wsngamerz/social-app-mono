import Post from "@/components/post";
import ComposeCard from "@/components/post/compose/compose-card";
import {db} from "@repo/drizzle";
import NoPosts from "@/components/post/no-posts";

export default async function HomePage() {
    const posts = await db.query.posts.findMany({
        with: {
            user: true,
        },
        orderBy: (posts, {desc}) => [desc(posts.createdAt)]
    })


    return (
        <>
            <h1 className="text-2xl font-bold">Home</h1>

            <div className="hidden sm:block">
                <ComposeCard/>
            </div>

            <div className="flex flex-col gap-4">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Post key={post.id} post={post} displayActions/>
                    ))
                ) : (
                    <NoPosts/>
                )}
            </div>
        </>
    );
}
