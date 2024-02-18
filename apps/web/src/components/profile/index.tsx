import React from 'react';
import {Post as PostType, Profile} from "@repo/drizzle/schema";
import ProfileHeader from "@/components/profile/profile-header";
import NoPosts from "@/components/post/no-posts";
import Post from '../post';

type UserProfileProps = {
    profile: Profile,
    posts: PostType[],
    children?: React.ReactNode
}

export default function UserProfile({profile, posts, children}: UserProfileProps) {
    return (
        <div className="grid gap-4">
            <ProfileHeader profile={profile}/>

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
    );
}