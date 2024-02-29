import NoPosts from "@/components/post/no-posts";
import LoadMorePosts from "@/components/post/load-more";
import {getPosts} from "@/components/post/posts.action";
import PostList from "@/components/post/post-list";

export default async function HomepagePosts() {
    const allPosts = await getPosts(0);

    return (
        <>
            {allPosts && allPosts.length > 0 ? (
                <>
                    <PostList posts={allPosts}/>
                    <LoadMorePosts/>
                </>
            ) : (
                <NoPosts/>
            )}
        </>
    )
}