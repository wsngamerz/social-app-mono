"use client";

import { Input } from "@ui/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/ui/form";
import { useFormState } from "react-dom";
import { FormEvent } from "react";
import { FormSubmit } from "@/components/shared/form-submit";
import { toast } from "sonner";
import { loginUser } from "@/app/(auth)/login/login.action";
import { type LoginFormSchema, loginSchema } from "@/app/(auth)/login/login.schema";
import { State } from "@/types/actions";
import {useRouter} from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [state, formAction] = useFormState<State, FormData>(loginUser, null);
    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(
            event.target as HTMLFormElement,
            (event.nativeEvent as SubmitEvent).submitter,
        );

        await form.handleSubmit(async () => {
            // execute the server action and sync errors to the form
            const result = await loginUser(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof LoginFormSchema, {
                                type: "server",
                                message: error,
                            });
                        }
                    }
                } else {
                    toast.error(result.message);
                }
            } else if (result?.status === "success") {
                toast.success(result.message);
                router.push("/")
            }
        })(event);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
                action={formAction}
                className="grid gap-2"
            >
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="user@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormSubmit forcePending={form.formState.isSubmitting}>
                    Login
                </FormSubmit>
            </form>
        </Form>
    );
}
