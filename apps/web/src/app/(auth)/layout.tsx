import React from "react";
import Brand from "@/components/shared/brand";
import ForceLight from "@/components/shared/force-light";

export default async function AuthLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ForceLight>
            <div
                className="container relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900"></div>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Brand/>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                “This is probably a pretty cool social
                                application.”
                            </p>
                            <footer className="text-sm">William Neild</footer>
                        </blockquote>
                    </div>
                </div>
                {children}
            </div>
        </ForceLight>
    );
}
