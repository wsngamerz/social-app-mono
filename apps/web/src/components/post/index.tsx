"use client";

import {Card, CardContent, CardFooter, CardHeader,} from "@repo/ui/components/ui/card";
import {BsThreeDotsVertical} from "react-icons/bs";
import {Button} from "@repo/ui/components/ui/button";
import {FaBookmark, FaComment, FaHeart, FaShare} from "react-icons/fa";
import {Bookmark, Flag, Heart, Pencil, Share, ShieldX, User} from "lucide-react";
import {timeAgo} from "@/lib/utils";
import React, {Suspense} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import Markdown from "@/components/shared/markdown";
import {Post as PostType, Profile} from "@repo/drizzle/schema";
import ClickWrapper from "@/components/post/click-wrapper";
import DropdownMenuItemLink from "@/components/shared/dropdown-menu-item-link";
import DeleteMenuItem from "@/components/post/delete/delete-menu-item";
import ProfileCard from "@/components/shared/profile-card";
import {useProfile} from "@/lib/profile";

type PostProps = {
    post: PostType & { user: Profile } & Record<string, unknown>,
    displayActions?: boolean,
    statistics?: {
        likes: number,
        comments: number,
        bookmarks: number,
        shares: number
    }
};

export function Post({post, displayActions = false, statistics}: PostProps) {
    const {profile, isError, isLoading} = useProfile();

    return (
        <Card>
            <CardHeader className="flex flex-row gap-2 space-y-0 items-center">
                <ProfileCard user={post.user}/>

                <div className="flex-grow flex justify-end gap-4">
                    <div className="text-xs">{timeAgo(post.createdAt)}</div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <BsThreeDotsVertical/>
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {profile && !(isLoading || isError) && (
                                <>
                                    {profile.id !== post.user.id && (
                                        <>
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4"/>
                                                <span>Follow @{post.user.username}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator/>
                                        </>
                                    )}
                                    <DropdownMenuItem>
                                        <Heart className="mr-2 h-4 w-4"/>
                                        <span>Like</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bookmark className="mr-2 h-4 w-4"/>
                                        <span>Bookmark</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Share className="mr-2 h-4 w-4"/>
                                        <span>Share</span>
                                    </DropdownMenuItem>
                                    {profile.id === post.user.id ? (
                                        <>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItemLink href={`/post/${post.id}/edit`}>
                                                <Pencil className="mr-2 h-4 w-4"/>
                                                <span>Edit</span>
                                            </DropdownMenuItemLink>
                                            <DeleteMenuItem id={post.id}/>
                                        </>
                                    ) : (
                                        <>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuItem>
                                                <Flag className="mr-2 h-4 w-4"/>
                                                <span>Report</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <ShieldX className="mr-2 h-4 w-4"/>
                                                <span>Block</span>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <Suspense fallback={<div>Loading...</div>}>
                    <Markdown content={post.text}/>
                </Suspense>
            </CardContent>

            {displayActions && (
                <CardFooter className="gap-2 flex-wrap">
                    <PostInteraction disabled>
                        <FaHeart/>
                        <span>{statistics ? statistics.likes : "Like"}</span>
                    </PostInteraction>
                    <PostInteraction>
                        <FaComment/>
                        <span>{statistics ? statistics.comments : "Comment"}</span>
                    </PostInteraction>
                    <PostInteraction disabled>
                        <FaBookmark/>
                        <span>{statistics ? statistics.bookmarks : "Bookmark"}</span>
                    </PostInteraction>
                    <PostInteraction disabled>
                        <FaShare/>
                        <span>{statistics ? statistics.shares : "Share"}</span>
                    </PostInteraction>
                </CardFooter>
            )}
        </Card>
    );
}

function PostInteraction({children, disabled = false}: { children: React.ReactNode, disabled?: boolean }) {
    return (
        <Button variant="outline" className="grow gap-2 text-xs p-2 h-auto" disabled={disabled}>
            {children}
        </Button>
    );
}

export default function WrappedPost(props: PostProps) {
    return (
        <ClickWrapper id={props.post.id}>
            <Post {...props} />
        </ClickWrapper>
    );
}