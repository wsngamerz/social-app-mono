"use client";

import {Input} from "@ui/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form";
import {useFormState} from "react-dom";
import {FormEvent} from "react";
import {FormSubmit} from "@/components/shared/form-submit";
import {toast} from "sonner";
import {State} from "@/types/actions";
import {type Username, usernameSchema} from "@/app/(auth)/onboarding/username/onboarding-username.schema";
import {updateUsername} from "@/app/(auth)/onboarding/username/onboarding-username.action";
import {useRouter} from "next/navigation";

export default function UsernameForm({existing}: { existing: string|null|undefined }) {
    const router = useRouter();
    const [state, formAction] = useFormState<State, FormData>(updateUsername, null);
    const form = useForm<Username>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: existing || "",
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(
            event.target as HTMLFormElement,
            (event.nativeEvent as SubmitEvent).submitter,
        );

        await form.handleSubmit(async () => {
            // execute the server action and sync errors to the form
            const result = await updateUsername(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof Username, {
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
                router.push("/onboarding/details");
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
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormSubmit forcePending={form.formState.isSubmitting}>
                    Set and Continue
                </FormSubmit>
            </form>
        </Form>
    );
}
