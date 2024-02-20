"use client";

import {Button} from "@ui/components/ui/button";
import {Label} from "@ui/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@ui/components/ui/radio-group";

export function NotificationsForm() {
    return (
        <>
            <form className="space-y-8 max-w-md">
                <div className="space-y-2">
                    <Label>
                        Notify me about
                    </Label>
                    <RadioGroup className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="all"/>
                            <Label className="font-normal">
                                All new messages
                            </Label>
                        </div>

                        <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="mentions"/>
                            <Label className="font-normal">
                                Direct messages and mentions
                            </Label>
                        </div>

                        <div className="flex items-center space-x-3 space-y-0">
                            <RadioGroupItem value="none"/>
                            <Label className="font-normal">
                                Nothing
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <Button type="submit" disabled>Update notifications</Button>
            </form>
        </>
    )
}