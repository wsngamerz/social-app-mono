"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import * as z from "zod";
import { loginSchema } from "@/app/(auth)/login/login.schema";
import { State } from "@/types/actions";

export async function loginUser(
    prevState: State | null,
    data: FormData,
): Promise<State> {
    try {
        const { email, password } = loginSchema.parse({
            email: data.get("email"),
            password: data.get("password"),
        });

        const supabase = createServerActionClient<Database>({ cookies });
        const response = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (response.error) {
            console.error(response.error);
            return {
                status: "error",
                message: response.error.message,
            };
        } else {
            return {
                status: "success",
                message: "User login successfully",
            };
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                status: "error",
                message: "Invalid form data",
                errors: error.flatten().fieldErrors as {
                    [key: string]: string[];
                },
            };
        } else {
            return {
                status: "error",
                message: "An unknown error occurred",
            };
        }
    }
}
