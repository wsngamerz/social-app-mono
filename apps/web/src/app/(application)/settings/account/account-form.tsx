"use client";

import {Input} from "@ui/components/ui/input";
import {Button} from "@ui/components/ui/button";
import {Label} from "@ui/components/ui/label";
import {CalendarIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@ui/components/ui/popover";
import {Calendar} from "@ui/components/ui/calendar";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form";
import {useFormState} from "react-dom";
import {FormEvent} from "react";
import {FormSubmit} from "@/components/shared/form-submit";
import {toast} from "sonner";
import {State} from "@/types/actions";
import {updateAccount} from "@/app/(application)/settings/account/account.action";
import {AccountFormSchema, accountSchema} from "@/app/(application)/settings/account/account.schema";

type AccountFormProps = {
    firstName: string | null;
    lastName: string | null;
}

export default function AccountForm({firstName, lastName}: AccountFormProps) {
    const [state, formAction] = useFormState<State, FormData>(updateAccount, null);
    const form = useForm<AccountFormSchema>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            firstName: firstName || "",
            lastName: lastName || "",
        },
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(
            event.target as HTMLFormElement,
            (event.nativeEvent as SubmitEvent).submitter,
        );

        await form.handleSubmit(async () => {
            // execute the server action and sync errors to the form
            const result = await updateAccount(state, formData);

            if (result?.status === "error") {
                if (result.errors) {
                    for (let errorsKey in result.errors) {
                        for (let error in result.errors[errorsKey]) {
                            form.setError(errorsKey as keyof AccountFormProps, {
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
                        name="firstName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="first name" {...field}/>
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
                                    <Input placeholder="last name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2 flex flex-col">
                        <Label>Date of birth</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[240px] pl-3 text-left font-normal"
                                    disabled
                                >
                                    <span>Pick a date</span>
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                </div>
                <div className="py-4">
                    <FormSubmit forcePending={form.formState.isSubmitting}>
                        Update Account
                    </FormSubmit>
                </div>
            </form>
        </Form>
    );
}