import {Card, CardContent, CardHeader,} from "@repo/ui/components/ui/card";
import {timeAgo} from "@/lib/utils";
import React from "react";
import Markdown from "@/components/shared/markdown";
import {Profile, Reply as ReplyType} from "@repo/drizzle/schema";
import ProfileCard from "@/components/shared/profile-card";
import {getUserId} from "@/lib/user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@ui/components/ui/dropdown-menu";
import {Button} from "@ui/components/ui/button";
import {BsThreeDotsVertical} from "react-icons/bs";
import {Flag, Pencil, ShieldX, User} from "lucide-react";
import DropdownMenuItemLink from "@/components/shared/dropdown-menu-item-link";
import DeleteMenuItem from "@/components/reply/delete/delete-menu-item";

type ReplyProps = {
    reply: ReplyType & { user: Profile }
};

export default async function Reply({reply}: ReplyProps) {
    const currentUserId = await getUserId();

    return (
        <Card>
            <CardHeader className="flex flex-row gap-2 space-y-0 items-center">
                <ProfileCard user={reply.user}/>

                <div className="flex-grow flex justify-end gap-4">
                    <div className="text-xs">{timeAgo(reply.createdAt)}</div>
                </div>

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
                        {currentUserId !== reply.user.id ? (
                            <>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4"/>
                                    <span>Follow @{reply.user.username}</span>
                                </DropdownMenuItem>
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
                        ) : (
                            <>
                                <DropdownMenuItemLink href={`/post/${reply.postId}/reply/${reply.id}/edit`}>
                                    <Pencil className="mr-2 h-4 w-4"/>
                                    <span>Edit</span>
                                </DropdownMenuItemLink>
                                <DeleteMenuItem id={reply.id}/>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>

            <CardContent>
                <Markdown content={reply.text}/>
            </CardContent>
        </Card>
    );
}