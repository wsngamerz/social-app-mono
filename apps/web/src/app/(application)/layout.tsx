import LeftSidebar from "@/components/shared/navigation/left-sidebar";
import React from "react";
import {cookies} from "next/headers";
import {Database} from "@/types/supabase";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {redirect} from "next/navigation";
import TabBar from "@/components/shared/navigation/tab-bar";
import Navbar from "@/components/shared/navigation/nav-bar";
import {db} from "@repo/drizzle"
import {profiles} from "@repo/drizzle/schema";
import {eq} from "drizzle-orm";

export default async function ApplicationLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const supabase = createServerComponentClient<Database>({cookies});
    const {
        data: {session},
    } = await supabase.auth.getSession();

    // If the user is not logged in, redirect to the login page
    if (!session || !session.user)
        redirect("/login");

    // get the user profile
    const userProfile = (await db.select().from(profiles).where(eq(profiles.id, session.user.id)).limit(1))[0]
    if (!userProfile || !userProfile.displayName || !userProfile.username) {
        console.log("User profile not found or incomplete");
        redirect("/onboarding");
    }

    return (
        <div className="max-w-screen-xl w-full h-full flex relative flex-col sm:flex-row">
            {/* Top Nav Bar (Mobile) */}
            <Navbar/>

            {/* Left sidebar */}
            <LeftSidebar
                displayName={userProfile.displayName}
                username={userProfile.username}
            />

            {/* Main content */}
            <main className="p-4 w-full h-full min-h-screen flex flex-col gap-4">
                {children}
                <div className="w-full h-20 shrink-0"></div>
            </main>

            {/* Bottom Tab Bar (Mobile) */}
            <TabBar/>
        </div>
    );
}
