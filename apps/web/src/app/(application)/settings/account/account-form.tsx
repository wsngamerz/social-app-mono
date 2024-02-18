"use client";

import {Input} from "@ui/components/ui/input";
import {Button} from "@ui/components/ui/button";
import {Label} from "@ui/components/ui/label";
import {CalendarIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@ui/components/ui/popover";
import {Calendar} from "@ui/components/ui/calendar";

export function AccountForm() {
    return (
        <>
            <form className="space-y-8 max-w-md">
                <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input placeholder="Will" disabled/>
                </div>

                <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input placeholder="Neild" disabled/>
                </div>

                <div className="space-y-2 flex flex-col">
                    <Label>Date of birth</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-[240px] pl-3 text-left font-normal"
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

                <Button type="submit">Update account</Button>
            </form>
        </>
    )
}