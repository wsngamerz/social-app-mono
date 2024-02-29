import {db} from "@repo/drizzle";
import UserProfile from "@/components/profile";
import {redirect} from "next/navigation";
import supabaseServer from "@/lib/supabaseServer";

export default async function UserPage({params}: { params: { username: string } }) {
    const supabase = supabaseServer();
    const currentUserId = (await supabase.auth.getSession()).data.session?.user?.id;
    if (!currentUserId) {
        return <p>Not logged in</p>;
    }

    const username = decodeURIComponent(params.username);
    if (!username || !username.startsWith('@'))
        return <p>No username found: {username}</p>;

    const userProfile = await db.query.profiles.findFirst({
        where: (profiles, {eq}) => eq(profiles.username, username.substring(1))
    })
    if (!userProfile)
        return <p>No profile found</p>;
    const userId = userProfile.id;

    if (userId === currentUserId) {
        redirect('/profile')
    }

    const userPosts = await db.query.posts.findMany({
        where: (posts, {eq}) => eq(posts.userId, userId),
        orderBy: (posts, {desc}) => [desc(posts.createdAt)]
    });

    return (
        <UserProfile profile={userProfile} posts={userPosts}/>
    );
}