"use client";

import {useTheme} from "next-themes";

type CircleProgressProps = {
    value: number;
    size: number;
}

export default function CircleProgress({ value, size }: CircleProgressProps) {
    const {theme} = useTheme();
    const pct = Math.floor((value / size) * 100);

    return (
        <div className="flex justify-center items-center w-10 h-10 rounded-full"
             style={{
                 "background":
                     `radial-gradient(closest-side, ${theme === "dark" ? "hsl(var(--background))" : "white"} 79%, transparent 80% 100%), conic-gradient(rgb(168 85 247) ${pct}%, transparent 0)`
             }}
             role="progressbar"
             aria-valuenow={value}
             aria-valuemin={0}
             aria-valuemax={size}>
            <span className="text-xs text-muted-foreground">{pct}%</span>
        </div>
    )
}