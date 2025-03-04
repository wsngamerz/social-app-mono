import {db} from "@repo/drizzle";
import UserProfile from "@/components/profile";
import ComposeCard from "@/components/post/compose/compose-card";
import {Alert, AlertDescription, AlertTitle} from "@ui/components/ui/alert";
import {Terminal} from "lucide-react";
import Link from "next/link";
import {Profile} from "@repo/drizzle/schema";
import {and} from "drizzle-orm";
import supabaseServer from "@/lib/supabaseServer";

export default async function ProfilePage() {
    const supabase = supabaseServer();
    const userId = (await supabase.auth.getSession()).data.session?.user?.id;
    if (!userId) {
        return <p>Not logged in</p>;
    }

    const userProfile = await db.query.profiles.findFirst({
        where: (profiles, {eq}) => eq(profiles.id, userId)
    })
    if (!userProfile)
        return <p>No profile found</p>;

    // check if there exists any null values in the user profile
    const userProfileKeys = Object.keys(userProfile);
    const nullValues = [];
    for (const key of userProfileKeys) {
        if (userProfile[key as keyof Profile] === null) {
            nullValues.push(key);
        }
    }

    const userPosts = await db.query.posts.findMany({
        where: (posts, {eq}) => and(eq(posts.userId, userId), eq(posts.deleted, false)),
        orderBy: (posts, {desc}) => [desc(posts.createdAt)]
    });

    return (
        <UserProfile profile={userProfile} posts={userPosts}>
            {nullValues.length > 0 && (
                <Alert>
                    <Terminal className="h-4 w-4"/>
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        <p>
                            Your profile is incomplete. Please fill in the following fields:
                            <span
                                className="p-1 rounded bg-gray-100 font-mono text-xs ml-1">{nullValues.join(", ")}</span>.
                        </p>
                        <p>
                            This can be done in the <Link href="/settings" className="underline">Settings</Link>.
                        </p>
                    </AlertDescription>
                </Alert>
            )}
            <ComposeCard/>
        </UserProfile>
    );
}