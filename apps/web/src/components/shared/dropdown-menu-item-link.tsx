"use client"

import {DropdownMenuItem} from "@ui/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

export default function DropdownMenuItemLink({href, children}: { href: string, children: React.ReactNode }) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }

    return (
        <Link href={href} onClick={handleClick}>
            <DropdownMenuItem>
                {children}
            </DropdownMenuItem>
        </Link>
    )
}