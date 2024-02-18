"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function ClickWrapper({id, children}: { id: string, children: React.ReactNode }) {
    const router = useRouter();
    const clickHandler = () => {
        router.push(`/post/${id}`);
    }

    return (
        <div onClick={clickHandler} className="cursor-pointer">
            {children}
        </div>
    )
}