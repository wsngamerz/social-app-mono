import { FaGoogle } from "react-icons/fa";
import { Button } from "@repo/ui/components/ui/button"
import Link from "next/link";
import LoginForm from "@/app/(auth)/login/login-form";
import React from "react";

export default function LoginPage() {
    return (
        <div className="p-8">
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
                <Button variant="default" asChild>
                    <Link href="/register">Register</Link>
                </Button>
            </div>

            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Login
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials below to login
                    </p>
                </div>
                <div className="grid gap-6">
                    <LoginForm />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <Button
                        className="flex gap-2"
                        variant="secondary"
                        type="button"
                        disabled
                    >
                        <FaGoogle />
                        Google
                    </Button>
                </div>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By continuing, you agree to our
                    <Link className="px-1 underline" href="/terms">
                        Terms of Service
                    </Link>
                    and
                    <Link className="px-1 underline" href="/privacy">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
