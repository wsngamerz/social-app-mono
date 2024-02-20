import React from 'react';
import {Post as PostType, Profile} from "@repo/drizzle/schema";
import ProfileHeader from "@/components/profile/profile-header";
import NoPosts from "@/components/post/no-posts";
import Post from '../post';
import {Card, CardContent, CardHeader} from "@ui/components/ui/card";
import Markdown from "@/components/shared/markdown";
import {Separator} from "@ui/components/ui/separator";
import {CalendarDays} from "lucide-react";

type UserProfileProps = {
    profile: Profile,
    posts: PostType[],
    children?: React.ReactNode
}

export default function UserProfile({profile, posts, children}: UserProfileProps) {
    return (
        <div className="grid gap-4">
            <ProfileHeader profile={profile}/>

            <div className="grid grid-cols-1 xl:grid-cols-[auto_350px] gap-4">
                <div className="grid gap-4 order-2 xl:order-1">
                    {children && (
                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <Post key={post.id} post={{...post, user: profile}}/>
                            ))
                        ) : (
                            <NoPosts/>
                        )}
                    </div>
                </div>

                <Card className="h-fit order-1 xl:order-2">
                    <CardHeader className="pb-1">
                        <h2 className="font-bold">Account</h2>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <Markdown content={profile.bio || ""}/>
                        <Separator/>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {profile.createdAt.toLocaleDateString()} {profile.createdAt.toLocaleTimeString()}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}