import {Profile} from "@repo/drizzle/schema";
import Image from "next/image";
import {Card, CardContent} from "@ui/components/ui/card";

type ProfileHeaderProps = {
    profile: Profile
}

export default function ProfileHeader({profile}: ProfileHeaderProps) {
    return (
        <Card
            className="pt-32 md:pt-24 lg:pt-32 bg-emerald-500 rounded-lg"
            // style={{
            //     background: accentColor,
            // }}
        >
            <CardContent className="bg-card rounded-lg p-0 border m-[-1px]">
                <div className="flex flex-col items-center gap-4 p-4 md:flex-row">
                    <div className="-mt-28 md:-mt-16">
                        <ProfileImage
                            profileImageUrl={profile.profileImage || ""}
                            name={profile.displayName || `${profile.firstName} ${profile.lastName}`}
                        />
                    </div>

                    <div className="flex-grow">
                        <div className="text-base">
                            <div className="flex flex-col leading-none text-center md:text-left">
                                <span className="font-bold text-xl md:text-2xl lg:text-3xl">
                                    {profile.displayName}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    @{profile.username}
                                </span>
                            </div>
                            <div className="text-xs font-light text-gray-800 dark:text-gray-400 break-all text-center md:text-left">{profile.id}</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

type ProfileImageProps = {
    profileImageUrl: string;
    name: string;
}

function ProfileImage({profileImageUrl, name}: ProfileImageProps) {
    if (profileImageUrl.startsWith("https://gravatar.com/avatar/")) {
        profileImageUrl += "?s=256";
    }

    return (
        <div className="bg-card p-1 rounded-full aspect-square flex items-center justify-center w-48 h-48">
            <Image
                className="rounded-full"
                src={profileImageUrl}
                alt={`Profile image for user: ${name}`}
                width={256}
                height={256}
            />
        </div>
    );
}