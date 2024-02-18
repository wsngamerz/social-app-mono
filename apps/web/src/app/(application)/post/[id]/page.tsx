import {notFound} from "next/navigation";
import {db} from "@repo/drizzle"
import {Post} from "@/components/post";

export default async function PostPage({params}: {params: {id: string}}) {
    const postId = params.id;
    if (!postId) notFound();

    const post = await db.query.posts.findFirst({
        with: {
            user: true,
        },
        where: (posts, {eq}) => eq(posts.id, postId)
    })
    if (!post) notFound();

    return (
        <div>
            <Post post={post} />
        </div>
    )
}