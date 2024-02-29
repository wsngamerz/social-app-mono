import Post from "@/components/post/index";
import {PostResponse} from "@/components/post/posts.action";

type PostListProps = {
    posts: PostResponse;
}
export default function PostList({posts}: PostListProps) {
    return (
        <>
            {posts.map((post) => {
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
            })}
        </>
    )
}