import {Card, CardContent, CardHeader,} from "@repo/ui/components/ui/card";
import {timeAgo} from "@/lib/utils";
import React from "react";
import Markdown from "@/components/shared/markdown";
import {Profile, Reply as ReplyType} from "@repo/drizzle/schema";
import ProfileCard from "@/components/shared/profile-card";

type ReplyProps = {
    reply: ReplyType & { user: Profile }
};

export default function Reply({reply}: ReplyProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row gap-2 space-y-0 items-center">
                <ProfileCard user={reply.user}/>

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