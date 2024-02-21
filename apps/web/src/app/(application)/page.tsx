import ComposeCard from "@/components/post/compose/compose-card";
import HomepagePosts from "@/app/(application)/homepage-posts";
import {Suspense} from "react";

export default async function HomePage() {
    return (
        <>
            <h1 className="text-2xl font-bold">Home</h1>

            <div className="hidden sm:block">
                <ComposeCard/>
            </div>

            <div className="flex flex-col gap-4">
                <Suspense fallback={<div>Loading...</div>}>
                    <HomepagePosts/>
                </Suspense>
            </div>
        </>
    );
}
