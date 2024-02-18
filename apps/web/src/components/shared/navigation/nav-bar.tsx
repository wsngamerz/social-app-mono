import CurrentUserAvatar from "@/components/shared/current-user-avatar";
import Brand from "@/components/shared/brand";
import Link from "next/link";
import { FaCog } from "react-icons/fa";

export default function Navbar() {
    return (
        <div className="bg-gray-100 dark:bg-slate-800 border-t w-full h-16 sticky top-0 flex items-center sm:hidden p-2 px-4 z-10 border-b">
            <div className="absolute border border-slate-950 rounded-full">
                <Link href="/profile">
                    <CurrentUserAvatar />
                </Link>
            </div>
            <div className="flex flex-grow items-center justify-center">
                <div className="inline-block">
                    <Brand />
                </div>
            </div>
            <div className="absolute right-0 top-0 h-full py-2 px-4 flex items-center">
                <Link href="/settings">
                    <span className="sr-only">Settings</span>
                    <FaCog className="h-6 w-6" />
                </Link>
            </div>
        </div>
    );
}
