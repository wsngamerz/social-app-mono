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

const APP_NAME = "SocialApp";
const APP_DEFAULT_TITLE = "SocialApp";
const APP_TITLE_TEMPLATE = "%s - SocialApp";
const APP_DESCRIPTION = "The bestest social app in the world!";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
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
