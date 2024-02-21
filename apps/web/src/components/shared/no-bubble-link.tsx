"use client";

import Link from "next/link";
import React, {type ForwardedRef, forwardRef} from "react";

type NoBubbleLinkProps = {
    children: React.ReactNode,
    href: string
}

const NoBubbleLink = forwardRef((props: NoBubbleLinkProps, forwardedRef: ForwardedRef<HTMLAnchorElement> | null) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();
    }

    return (
        <Link {...props} href={props.href} onClick={handleClick} ref={forwardedRef}>
            {props.children}
        </Link>
    )
});

export default NoBubbleLink;