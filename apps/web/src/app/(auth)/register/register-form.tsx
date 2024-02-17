"use client";

import {registerUser} from "@/app/(auth)/register/register.action";
import {Input} from "@ui/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form";
import {useFormState} from "react-dom";
import {type RegisterFormSchema, registerSchema,} from "@/app/(auth)/register/register.schema";
import {FormEvent} from "react";
import {FormSubmit} from "@/components/shared/form-submit";
import {toast} from "sonner";
import {State} from "@/types/actions";

export default function RegisterForm() {
    const [state, formAction] = useFormState<State, FormData>(
        registerUser,
        null,
    );
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerSchema),
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
            const result = await registerUser(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof RegisterFormSchema, {
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
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="user@example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Min 8 characters"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormSubmit forcePending={form.formState.isSubmitting}>
                    Sign Up
                </FormSubmit>
            </form>
        </Form>
    );
}
