import {notFound} from "next/navigation";
import {db} from "@repo/drizzle"
import {Post} from "@/components/post";
import ComposeReply from "@/components/reply/compose";
import NoReplies from "@/components/reply/no-replies";
import Reply from "@/components/reply";
import ReplyOrder from "@/app/(application)/post/[id]/reply-order";
import {Card, CardContent} from "@ui/components/ui/card";
import Tumbleweed from "@/components/shared/tumbleweed";

type PostPageProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PostPage({params, searchParams}: PostPageProps) {
    // get replies order from searchParams, default to asc
    let replyOrder: "asc" | "desc";
    if (searchParams.order && searchParams.order === "desc") {
        replyOrder = "desc";
    } else {
        replyOrder = "asc";
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
            {!post.deleted ? (
                <>
                    <Post post={post}/>
                    <ComposeReply/>
                </>
            ) : (
                <Card>
                    <CardContent className="p-6 flex flex-col items-center gap-4 text-sm text-muted-foreground">
                        <Tumbleweed/>
                        <p>This post has been deleted</p>
                    </CardContent>
                </Card>
            )}
            <div className="flex justify-end">
                <ReplyOrder/>
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