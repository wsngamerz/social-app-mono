"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {cn} from "@ui/lib/utils";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
};

export default function NavLink({
    href,
    children,
    className,
    activeClassName,
}: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(className, isActive && activeClassName)}
            data-active={isActive ? "true" : "false"}
        >
            {children}
        </Link>
    );
}
