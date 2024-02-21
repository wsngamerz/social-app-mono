import {HoverCard, HoverCardContent, HoverCardTrigger} from "@ui/components/ui/hover-card";
import {Avatar, AvatarFallback, AvatarImage} from "@ui/components/ui/avatar";
import Markdown from "@/components/shared/markdown";
import {CalendarDays} from "lucide-react";
import React, {type ForwardedRef, forwardRef} from "react";
import {Profile} from "@repo/drizzle/schema";
import {cn} from "@ui/lib/utils";
import NoBubbleLink from "@/components/shared/no-bubble-link";

type ProfileCardProps = {
    className?: string,
    user: Profile,
    hasHoverCard?: boolean,
}

function InternalProfileCard({user, className}: ProfileCardProps) {
    return (
        <div className={cn("flex gap-2", className)}>
            <Avatar>
                <AvatarImage
                    src={user.profileImage || ""}
                    alt="User avatar"
                />
                <AvatarFallback>
                    {user.displayName?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="text-left flex-grow flex flex-col">
                <span className="text-sm hover:underline">
                    {user.displayName}
                </span>
                <span className="text-xs hover:underline">
                    @{user.username}
                </span>
            </div>
        </div>
    )
}

const LinkedProfileCard = forwardRef((props: ProfileCardProps, forwardedRef: ForwardedRef<HTMLAnchorElement> | null) => {
    return (
        <NoBubbleLink {...props} href={`/user/@${props.user.username}`} ref={forwardedRef}>
            <InternalProfileCard user={props.user} className={props.className}/>
        </NoBubbleLink>
    )
});


export default function ProfileCard({user, className, hasHoverCard = true}: ProfileCardProps) {
    if (!hasHoverCard) {
        return <LinkedProfileCard user={user} className={className}/>
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <LinkedProfileCard user={user} className={className}/>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex flex-col">
                    <LinkedProfileCard user={user} className="flex-grow"/>
                    <div className="space-y-1 flex-grow">
                        <Markdown content={user.bio || ""} className="text-sm"/>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70"/>{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {user.createdAt.toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}