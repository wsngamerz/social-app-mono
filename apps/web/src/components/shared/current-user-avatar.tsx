"use client";

import {Avatar, AvatarFallback, AvatarImage} from "@ui/components/ui/avatar";
import {useProfile} from "@/lib/profile";
import {Skeleton} from "@ui/components/ui/skeleton";


export default function CurrentUserAvatar() {
    const {profile, isError, isLoading} = useProfile();

    return (isLoading || isError || !profile) ? (
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
    ) : (
        <Avatar>
            <AvatarImage src={profile.profileImage || ""} alt="Your avatar"/>
            <AvatarFallback>
                {profile.displayName?.split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
