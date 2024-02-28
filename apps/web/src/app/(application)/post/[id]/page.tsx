import {notFound} from "next/navigation";
import {db} from "@repo/drizzle"
import {Post} from "@/components/post";
import ComposeReply from "@/components/reply/compose";
import NoReplies from "@/components/reply/no-replies";
import Reply from "@/components/reply";
import ReplyOrder from "@/app/(application)/post/[id]/reply-order";

type PostPageProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PostPage({params, searchParams}: PostPageProps) {
    // get replies order from searchParams, default to desc
    let replyOrder: "asc" | "desc";
    if (searchParams.order && searchParams.order === "asc") {
        replyOrder = "asc";
    } else {
        replyOrder = "desc";
    }


    const postId = params.id;
    if (!postId) notFound();

    const post = await db.query.posts.findFirst({
        with: {
            user: true,
        },
        where: (posts, {eq}) => eq(posts.id, postId)
    })
    if (!post) notFound();

    const replies = await db.query.replies.findMany({
        where: (replies, {eq}) => eq(replies.postId, postId),
        orderBy: (replies, {desc, asc}) => [replyOrder == "desc" ? desc(replies.createdAt) : asc(replies.createdAt)],
        with: {
            user: true,
        }
    })

    return (
        <div className="flex flex-col gap-4 min-w-0">
            <Post post={post}/>
            <ComposeReply/>
            <div className="flex justify-end">
                <ReplyOrder />
            </div>
            {replies && replies.length > 0 ? (
                replies.map((reply) => (
                    <Reply key={reply.id} reply={reply}/>
                ))
            ) : (
                <NoReplies/>
            )}
        </div>
    )
}