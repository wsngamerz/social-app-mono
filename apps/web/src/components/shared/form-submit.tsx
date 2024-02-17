"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@ui/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

export function FormSubmit({
    children,
    forcePending,
}: Readonly<{ children?: React.ReactNode }> & {
    forcePending?: boolean;
}) {
    const { pending } = useFormStatus();
    const isPending = pending || forcePending;

    return (
        <Button type="submit" aria-disabled={isPending} disabled={isPending}>
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                children || "Submit"
            )}
        </Button>
    );
}
