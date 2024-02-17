import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCog, FaPlus, FaUser } from "react-icons/fa";
import { Button } from "@ui/components/ui/button";
import Brand from "@/components/shared/brand";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import DarkModeToggle from "@/components/shared/dark-mode-toggle";
import CurrentUserAvatar from "../current-user-avatar";
import { ComposeDialog } from "@/components/post/compose/compose-dialog";
import NavLink from "@/components/shared/navigation/navlink";
import { NAV_ITEMS } from "@/components/shared/navigation/navigation";

type SidebarProps = {
    displayName: string;
    username: string;
};

export default function LeftSidebar(props: SidebarProps) {
    return (
        <section className="hidden sm:flex shrink-0 w-16 lg:w-64 h-screen">
            <div className="fixed top-0 flex flex-col shrink-0 border-r gap-4 p-4 w-16 lg:w-64 h-screen">
                <div className="flex">
                    <Brand />
                </div>

                <div className="flex flex-col items-center lg:items-stretch h-full gap-2">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            href={item.href}
                            key={item.label}
                            className="group flex items-center justify-start w-fit gap-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg"
                            activeClassName="font-black bg-gray-50 dark:bg-slate-900"
                        >
                            <item.icon className="group-data-[active=true]:hidden" />
                            <item.iconActive className="group-data-[active=true]:block hidden" />
                            <div className="hidden lg:inline-block">
                                {item.label}
                            </div>
                        </NavLink>
                    ))}

                    <ComposeDialog>
                        <Button>
                            <span className="lg:hidden">
                                <FaPlus />
                            </span>
                            <span className="hidden lg:inline-block">
                                New Post
                            </span>
                        </Button>
                    </ComposeDialog>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-full flex items-center gap-2 p-0 lg:p-4 h-auto"
                        >
                            <CurrentUserAvatar />
                            <div className="hidden lg:inline-block text-left flex-grow">
                                <div className="text-sm">
                                    {props.displayName}
                                </div>
                                <div className="text-xs">@{props.username}</div>
                            </div>
                            <div className="hidden lg:inline-block">
                                <BsThreeDotsVertical />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem asChild>
                            <Link href="/profile">
                                <FaUser className="mr-2 w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/settings">
                                <FaCog className="mr-2 w-4 h-4" />
                                <span>Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <DarkModeToggle />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/api/auth/logout">
                                <LogOutIcon className="mr-2 w-4 h-4" />
                                <span>Logout</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </section>
    );
}
