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
import {Textarea} from "@ui/components/ui/textarea";
import {updateProfile} from "@/app/(application)/settings/profile.action";
import {ProfileFormSchema, profileSchema} from "@/app/(application)/settings/profile.schema";
import Link from "next/link";
import {buttonVariants} from "@ui/components/ui/button";
import {ExternalLinkIcon} from "lucide-react";

type ProfileFormProps = {
    username: string | null;
    displayName: string | null;
    bio: string | null;
    profileImage: string | null;
}

export default function ProfileForm({username, displayName, bio, profileImage}: ProfileFormProps) {
    const [state, formAction] = useFormState<State, FormData>(updateProfile, null);
    const form = useForm<ProfileFormSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: username || "",
            displayName: displayName || "",
            bio: bio || "",
            profileImage: profileImage || "",
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(
            event.target as HTMLFormElement,
            (event.nativeEvent as SubmitEvent).submitter,
        );

        await form.handleSubmit(async () => {
            // execute the server action and sync errors to the form
            const result = await updateProfile(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof ProfileFormSchema, {
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
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input className="opacity-50 cursor-not-allowed" placeholder="username" {...field}
                                           readOnly/>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription className="text-sm text-muted-foreground">
                                    This is your username, this is what is to be used if you are tagged in anything.
                                    If you wish to
                                    change it, please contact support.
                                </FormDescription>
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
                                    <Input placeholder="display name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription className="text-sm text-muted-foreground">
                                    This is the name that will be displayed on the site. It can be your real name or a
                                    pseudonym.
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="bio" {...field}/>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription className="text-sm text-muted-foreground">
                                    You can <span>@mention</span> other users and organizations to
                                    link to them.
                                </FormDescription>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="profileImage"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Profile Image</FormLabel>

                                <div className="w-full flex gap-2">
                                    <FormControl>
                                        <Input className="opacity-50 cursor-not-allowed"
                                               placeholder="profile image" {...field} readOnly/>
                                    </FormControl>
                                    <Link href="https://gravatar.com/connect"
                                          className={buttonVariants({variant: "outline"})}
                                          target="_blank">
                                        Take me to gravatar
                                        <ExternalLinkIcon className="ml-2 w-4 h-4 text-muted-foreground"/>
                                    </Link>
                                </div>
                                <FormMessage/>
                                <FormDescription className="text-sm text-muted-foreground">
                                    This is the image that represents you across the site. It is currently
                                    managed through gravatar.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="py-4">
                    <FormSubmit forcePending={form.formState.isSubmitting}>
                        Update Profile
                    </FormSubmit>
                </div>
            </form>
        </Form>
    );
}