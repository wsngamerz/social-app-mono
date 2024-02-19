"use client"

import {Delete} from "lucide-react";
import {DropdownMenuItem} from "@ui/components/ui/dropdown-menu";
import React from "react";
import {deletePost} from "@/components/post/delete/delete.action";

type DeleteMenuItemProps = {
    id: string;
}

export default function DeleteMenuItem({id}: DeleteMenuItemProps) {
    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const confirm = window.confirm("Are you sure you want to delete this item?");
        if (confirm) {
            await deletePost(id);
        }
    }

    return (
        <DropdownMenuItem onClick={handleDelete}>
            <Delete className="mr-2 h-4 w-4"/>
            <span>Delete</span>
            {/*<DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
    )
}