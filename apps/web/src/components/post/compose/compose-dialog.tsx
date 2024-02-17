"use client";

import * as React from "react";
import { Button } from "@ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@ui/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import ComposePost from "@/components/post/compose/compose-post";

const COMPOSE_TRIGGER_TEXT = "New Post";
const COMPOSE_TITLE = "New Post";
const COMPOSE_DESCRIPTION = "Create a new post";

export function ComposeDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 640px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children || (
                        <Button variant="outline">
                            {COMPOSE_TRIGGER_TEXT}
                        </Button>
                    )}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[640px] lg:max-w-[768px]">
                    <DialogHeader>
                        <DialogTitle>{COMPOSE_TITLE}</DialogTitle>
                        <DialogDescription>
                            {COMPOSE_DESCRIPTION}
                        </DialogDescription>
                    </DialogHeader>
                    <ComposePost />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children || (
                    <Button variant="outline">{COMPOSE_TRIGGER_TEXT}</Button>
                )}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>{COMPOSE_TITLE}</DrawerTitle>
                    <DrawerDescription>{COMPOSE_DESCRIPTION}</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <ComposePost />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
