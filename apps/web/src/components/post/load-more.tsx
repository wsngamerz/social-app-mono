"use client";

import {Loader2Icon} from "lucide-react";
import {useInView} from "react-intersection-observer";
import {useEffect, useState} from "react";
import PostList from "@/components/post/post-list";
import {getPosts, PostResponse} from "@/components/post/posts.action";
import {Card, CardContent} from "@ui/components/ui/card";
import Tumbleweed from "@/components/shared/tumbleweed";

export default function LoadMorePosts() {
    const {ref, inView} = useInView({
        rootMargin: "512px 0px 0px 0px"
    });
    const [posts, setPosts] = useState<PostResponse>([]);
    const [page, setPage] = useState(1);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        if (inView) {
            getPosts(page).then((data) => {
                setPosts([...posts, ...data]);
                if (data.length === 0) {
                    setIsAtEnd(true);
                } else {
                    setPage(page + 1);
                }
            });
        }
    }, [inView]);

    return (
        <>
            <PostList posts={posts}/>
            {!isAtEnd ? (
                <div className="flex justify-center py-8" ref={ref}>
                    <Loader2Icon size={32} className="animate-spin"/>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-6 flex flex-col items-center gap-4">
                        <Tumbleweed/>
                        <p className="text-gray-500">
                            Oh no! Looks like you have reached the end. Maybe try posting something?
                        </p>
                    </CardContent>
                </Card>
            )}
        </>
    )
}