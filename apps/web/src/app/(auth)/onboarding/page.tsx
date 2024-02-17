import Steps from "@/app/(auth)/onboarding/steps";
import {Button} from "@ui/components/ui/button";
import Link from "next/link";
import {FaArrowRight} from "react-icons/fa";
import React from "react";

export default function OnboardingPage() {
    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Complete your profile
                </h1>
                <p className="text-sm text-muted-foreground">
                    Let's get to know you better
                </p>
            </div>
            <div className="grid gap-6">
                <Steps progress={0}/>
                <Button className="gap-2" asChild>
                    <Link href="/onboarding/username">
                        Get started
                        <FaArrowRight/>
                    </Link>
                </Button>
            </div>
        </>
    )
}