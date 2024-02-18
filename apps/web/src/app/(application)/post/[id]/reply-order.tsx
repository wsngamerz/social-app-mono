"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@ui/components/ui/dropdown-menu";
import {Button} from "@ui/components/ui/button";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useCallback} from "react";

export default function ReplyOrder() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const order = searchParams.get("order") || "desc";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            console.log("params", params)
            params.set(name, value)
            console.log("params2", params)

            return params.toString()
        },
        [searchParams]
    )

    const setReplyOrder = (order: "asc" | "desc") => {
        router.push(pathname + '?' + createQueryString('order', order))
    }

    return (
        <div className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>Reply Order</span>
                        {order === "asc" ? (
                            <ChevronUp className="ml-2 h-4 w-4"/>
                        ) : (
                            <ChevronDown className="ml-2 h-4 w-4"/>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setReplyOrder("asc")}>
                        <ChevronUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setReplyOrder("desc")}>
                        <ChevronDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"/>
                        Newest First
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}