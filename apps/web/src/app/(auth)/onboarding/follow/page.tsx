import Steps from "@/app/(auth)/onboarding/steps";
import React from "react";
import {Card, CardContent} from "@ui/components/ui/card";
import FinishButton from "@/app/(auth)/onboarding/follow/finish";

export default async function FollowOnboardingPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Follow some people
                </h1>
                <p className="text-sm text-muted-foreground">
                    Let's get you started by following some people.
                </p>
            </div>
            <div className="grid gap-6">
                <Steps progress={3}/>
                <Card>
                    <CardContent className="p-6">
                        <p className="text-muted-foreground text-sm">
                            {/*Follow some people to get started. You can always unfollow them later.*/}
                            This is a placeholder, the onboarding process is now complete.
                        </p>
                    </CardContent>
                </Card>
                <FinishButton/>
            </div>
        </>
    )
}