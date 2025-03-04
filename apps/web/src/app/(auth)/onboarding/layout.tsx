import {redirect} from "next/navigation";
import React from "react";
import supabaseServer from "@/lib/supabaseServer";

export default async function OnboardingLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const supabase = supabaseServer();
    const {data: {session}} = await supabase.auth.getSession();

    // don't allow unauthenticated users to onboard
    if (!session || !session.user) redirect("/login");

    return (
        <div className="p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-96">
                {children}
            </div>
        </div>
    );
}