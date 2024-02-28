"use client";

import { toast } from "sonner";
import { Textarea } from "@ui/components/ui/textarea";
import { Button } from "@ui/components/ui/button";
import { FaPhotoVideo, FaSmile } from "react-icons/fa";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@ui/components/ui/form";
import { FormSubmit } from "@/components/shared/form-submit";
import { State } from "@/types/actions";
import {ComposeReplyForm as ComposeReply, composeReplySchema} from "./compose.schema";
import {composeReply} from "@/components/reply/compose/compose.action";
import {usePathname} from "next/navigation";
import {Input} from "@ui/components/ui/input";
import GifPicker from "@/components/gif-picker";

export default function ComposeReplyForm() {
    const postId = usePathname().split("/").pop();
    if (!postId || postId.length !== 36) {
        return <div>Error: Invalid post id</div>;
    }

    const [state, formAction] = useFormState<State, FormData>(
        composeReply,
        null,
    );
    const form = useForm<ComposeReply>({
        resolver: zodResolver(composeReplySchema),
        defaultValues: {
            postId: postId,
            content: "",
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(
            event.target as HTMLFormElement,
            (event.nativeEvent as SubmitEvent).submitter,
        );

        await form.handleSubmit(async () => {
            // execute the server action and sync errors to the form
            const result = await composeReply(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof ComposeReply, {
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
                form.reset();
            }
        })(event);
    };

    const handleTextareaKeyDown = (
        event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (event.key === "Enter" && event.ctrlKey) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    };

    const notYetImplemented = () => {
        toast.warning("This feature is not available yet.");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit}
                action={formAction}
                className="w-full flex flex-col gap-2"
            >
                {/* Hidden input to pass along post id */}
                <FormField
                    control={form.control}
                    name="postId"
                    render={({ field }) => (
                        <FormItem className="hidden">
                            <FormControl>
                                <Input
                                    placeholder="postId"
                                    {...field}
                                    readOnly/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Reply to this post..."
                                    {...field}
                                    onKeyDown={handleTextareaKeyDown}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={notYetImplemented}
                        type="button"
                    >
                        <FaSmile />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={notYetImplemented}
                        type="button"
                    >
                        <FaPhotoVideo />
                    </Button>
                    <GifPicker form={form}>
                        <Button
                            variant="outline"
                            type="button">
                            GIF
                        </Button>
                    </GifPicker>
                    <div className="flex flex-grow justify-end">
                        <FormSubmit forcePending={form.formState.isSubmitting}>
                            Reply
                        </FormSubmit>
                    </div>
                </div>
            </form>
        </Form>
    );
}
