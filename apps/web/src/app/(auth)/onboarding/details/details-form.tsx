"use client";

import {Input} from "@ui/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form";
import {useFormState} from "react-dom";
import {FormEvent} from "react";
import {FormSubmit} from "@/components/shared/form-submit";
import {toast} from "sonner";
import {State} from "@/types/actions";
import {useRouter} from "next/navigation";
import {Details, detailsSchema} from "@/app/(auth)/onboarding/details/onboarding-details.schema";
import {updateDetails} from "@/app/(auth)/onboarding/details/onboarding-details.action";

type ExistingDetails = {
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    username: string | null;
}

export default function DetailsForm({existing}: { existing?: ExistingDetails }) {
    const router = useRouter();
    const [state, formAction] = useFormState<State, FormData>(updateDetails, null);
    const form = useForm<Details>({
        resolver: zodResolver(detailsSchema),
        defaultValues: {
            firstName: existing?.firstName || "",
            lastName: existing?.lastName || "",
            displayName: existing?.displayName || existing?.username || "",
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(
            event.target as HTMLFormElement,
            (event.nativeEvent as SubmitEvent).submitter,
        );

        await form.handleSubmit(async () => {
            // execute the server action and sync errors to the form
            const result = await updateDetails(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof Details, {
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
                router.push("/onboarding/follow");
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
                        name="firstName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="displayName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription>
                                    This is the name that will be displayed to other users. You can think of it as your
                                    public name or a nickname.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <FormSubmit forcePending={form.formState.isSubmitting}>
                    Save and Continue
                </FormSubmit>
            </form>
        </Form>
    );
}
