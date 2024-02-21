import "@repo/ui/globals.css";
import "./highlight.css";

import type {Metadata, Viewport} from "next";
import {Inter as FontSans} from "next/font/google";
import React from "react";
import {cn} from "@repo/ui/lib/utils";
import {Toaster} from "@repo/ui/components/ui/sonner";
import {ThemeProvider} from "@/app/theme-provider";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next"
import PullToRefresh from "@/app/pull-to-refresh";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const runtime = "edge";

export const metadata: Metadata = {
    title: "SocialApp",
    description: "The newest and bestest social media app",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    userScalable: false,
    minimumScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable,
            )}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            // enableSystem
            disableTransitionOnChange
        >
            <PullToRefresh>
                <div className="w-full h-screen flex justify-center items-center relative">
                    {children}
                </div>
            </PullToRefresh>
            <Toaster position="top-right"/>
        </ThemeProvider>
        <Analytics/>
        <SpeedInsights/>
        </body>
        </html>
    );
}
