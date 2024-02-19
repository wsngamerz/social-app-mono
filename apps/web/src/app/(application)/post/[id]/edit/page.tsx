import EditPost from "@/components/post/edit";
import {db} from "@repo/drizzle";

type EditPostPageProps = {
    params: {
        id: string;
    };
}

export default async function EditPostPage({params}: EditPostPageProps) {
    const post = await db.query.posts.findFirst({
        where: (posts, {eq}) => eq(posts.id, params.id),
    });

    if (!post) return null;

    return (
        <>
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <EditPost id={params.id} text={post.text}/>
        </>
    )
}