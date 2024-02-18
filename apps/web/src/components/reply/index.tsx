import {Card, CardContent, CardHeader,} from "@repo/ui/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@repo/ui/components/ui/avatar";
import {HoverCard, HoverCardContent, HoverCardTrigger,} from "@repo/ui/components/ui/hover-card";
import {CalendarDays} from "lucide-react";
import Link from "next/link";
import {timeAgo} from "@/lib/utils";
import React from "react";
import Markdown from "@/components/shared/markdown";
import {Reply as ReplyType, Profile} from "@repo/drizzle/schema";

type ReplyProps = {
    reply: ReplyType & { user: Profile }
};

export default function Reply({reply}: ReplyProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row gap-2 space-y-0 items-center">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="flex gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={reply.user.profileImage || ""}
                                    alt="User avatar"
                                />
                                <AvatarFallback>
                                    {reply.user.displayName?.split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-left flex-grow flex flex-col">
                                <Link
                                    href={`/user/@${reply.user.username}`}
                                    className="text-sm hover:underline"
                                >
                                    {reply.user.displayName}
                                </Link>
                                <Link
                                    href={`/user/@${reply.user.username}`}
                                    className="text-xs hover:underline"
                                >
                                    @{reply.user.username}
                                </Link>
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarImage src={reply.user.profileImage || ""}/>
                                <AvatarFallback>
                                    {reply.user.displayName?.split(" ")
                                        .map((name) => name[0])
                                        .join("")
                                        .toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1 flex-grow">
                                <div className="flex flex-col">
                                    <Link
                                        href={`/user/@${reply.user.username}`}
                                        className="text-sm font-semibold hover:underline"
                                    >
                                        {reply.user.displayName}
                                    </Link>
                                    <Link
                                        href={`/user/@${reply.user.username}`}
                                        className="text-xs hover:underline"
                                    >
                                        @{reply.user.username}
                                    </Link>
                                </div>
                                <p className="text-sm">{"(BIO NOT YET IMPLEMENTED)"}</p>
                                <div className="flex items-center pt-2">
                                    <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Joined {reply.user.createdAt.toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>

                <div className="flex-grow flex justify-end gap-4">
                    <div className="text-xs">{timeAgo(reply.createdAt)}</div>
                </div>
            </CardHeader>

            <CardContent>
                <Markdown content={reply.text}/>
            </CardContent>
        </Card>
    );
}