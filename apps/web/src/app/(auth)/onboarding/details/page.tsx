import Steps from "@/app/(auth)/onboarding/steps";
import React from "react";
import {db} from "@repo/drizzle";
import {cookies} from "next/headers";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import DetailsForm from "@/app/(auth)/onboarding/details/details-form";

export default async function DetailsOnboardingPage() {
    const supabase = createServerComponentClient<Database>({cookies});
    const {data: {session}} = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) return null;

    const existingUser = await db.query.profiles.findFirst({
        columns: {
            firstName: true,
            lastName: true,
            displayName: true,
            username: true,
        },
        where: (profiles, { eq }) => eq(profiles.id, userId)
    });


    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Complete your profile
                </h1>
                <p className="text-sm text-muted-foreground">
                    Now just a few more details to build your profile
                </p>
            </div>
            <div className="grid gap-6">
                <Steps progress={2}/>
                <DetailsForm existing={existingUser} />
            </div>
        </>
    )
}