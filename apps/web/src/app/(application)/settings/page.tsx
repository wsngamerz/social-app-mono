import {Separator} from "@ui/components/ui/separator";
import ProfileForm from "./profile-form";
import {getUserId} from "@/lib/user";
import {db} from "@repo/drizzle"

export default async function SettingsProfilePage() {
    const userId = await getUserId();
    if (!userId) {
        return <p>Not logged in</p>
    }
    const profile = await db.query.profiles.findFirst({
        where: (profiles, {eq}) => eq(profiles.id, userId)
    });
    if (!profile) {
        return <p>Profile not found</p>
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator/>
            <ProfileForm username={profile.username}
                         displayName={profile.displayName}
                         bio={profile.bio}
                         profileImage={profile.profileImage}/>
        </div>
    )
}