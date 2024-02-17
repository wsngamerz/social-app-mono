"use client"

import {Button} from "@ui/components/ui/button";
import React from "react";
import {updateFollow} from "@/app/(auth)/onboarding/follow/follow.action";
import {toast} from "sonner";

export default function FinishButton() {
    async function handleFinish() {
        await updateFollow();
        toast.success("You're all set! Welcome to SocialApp.");
    }

    return (
        <Button onClick={handleFinish}>
            Finish
        </Button>
    )
}