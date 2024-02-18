import {Card, CardContent, CardFooter, CardHeader,} from "@repo/ui/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@repo/ui/components/ui/avatar";
import {BsThreeDotsVertical} from "react-icons/bs";
import {Button} from "@repo/ui/components/ui/button";
import {FaBookmark, FaComment, FaHeart, FaShare} from "react-icons/fa";
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@repo/ui/components/ui/hover-card";
import {CalendarDays} from "lucide-react";
import Link from "next/link";
import {timeAgo} from "@/lib/utils";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import Markdown from "@/components/shared/markdown";
import {Post as PostType, Profile} from "@repo/drizzle/schema";
import ClickWrapper from "@/components/post/click-wrapper";

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
    return (
        <Card>
            <CardHeader className="flex flex-row gap-2 space-y-0 items-center">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={post.user.profileImage || ""}
                                    alt="User avatar"
                                />
                                <AvatarFallback>
                                    {post.user.displayName?.split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left flex-grow flex flex-col">
                                <Link
                                    href={`/user/@${post.user.username}`}
                                    className="text-sm hover:underline"
                                >
                                    {post.user.displayName}
                                </Link>
                                <Link
                                    href={`/user/@${post.user.username}`}
                                    className="text-xs hover:underline"
                                >
                                    @{post.user.username}
                                </Link>
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src={post.user.profileImage || ""}/>
                                <AvatarFallback>
                                    {post.user.displayName?.split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1 flex-grow">
                                <div className="flex flex-col">
                                    <Link
                                        href={`/user/@${post.user.username}`}
                                        className="text-sm font-semibold hover:underline"
                                    >
                                        {post.user.displayName}
                                    </Link>
                                    <Link
                                        href={`/user/@${post.user.username}`}
                                        className="text-xs hover:underline"
                                    >
                                        @{post.user.username}
                                    </Link>
                                </div>
                                <p className="text-sm">{"(BIO NOT YET IMPLEMENTED)"}</p>
                                <div className="flex items-center pt-2">
                                    <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Joined {post.user.createdAt.toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>

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
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Like</DropdownMenuItem>
                            <DropdownMenuItem>Bookmark</DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Add to List
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup value={"1"}>
                                        {["1", "2", "3"].map((label) => (
                                            <DropdownMenuRadioItem
                                                key={label}
                                                value={label}
                                            >
                                                {label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                Delete
                                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent>
                <Markdown content={post.text}/>
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