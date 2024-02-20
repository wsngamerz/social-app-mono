import {Separator} from "@ui/components/ui/separator";
import AccountForm from "./account-form";
import {getUserId} from "@/lib/user";
import {db} from "@repo/drizzle";

export default async function SettingsAccountPage() {
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
                <h3 className="text-lg font-medium">Account</h3>
                <p className="text-sm text-muted-foreground">
                    Update your account settings.
                </p>
            </div>
            <Separator/>
            <AccountForm firstName={profile.firstName} lastName={profile.lastName}/>
        </div>
    )
}