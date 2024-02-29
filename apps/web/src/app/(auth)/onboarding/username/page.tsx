import Steps from "@/app/(auth)/onboarding/steps";
import React from "react";
import UsernameForm from "@/app/(auth)/onboarding/username/username-form";
import {db} from "@repo/drizzle";
import supabaseServer from "@/lib/supabaseServer";

export default async function UsernameOnboardingPage() {
    const supabase = supabaseServer();
    const {data: {session}} = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) return null;

    const existingUser = await db.query.profiles.findFirst({
        columns: {
            username: true
        },
        where: (profiles, {eq}) => eq(profiles.id, userId)
    });

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Select a username
                </h1>
                <p className="text-sm text-muted-foreground">
                    First lets get you a username
                </p>
            </div>
            <div className="grid gap-6">
                <Steps progress={1}/>
                <UsernameForm existing={existingUser?.username}/>
            </div>
        </>
    )
}