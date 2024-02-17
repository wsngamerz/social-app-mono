import { FaPlus } from "react-icons/fa";
import { ComposeDialog } from "@/components/post/compose/compose-dialog";
import { Button } from "@ui/components/ui/button";
import { NAV_ITEMS } from "@/components/shared/navigation/navigation";
import NavLink from "@/components/shared/navigation/navlink";

export default function TabBar() {
    return (
        <div className="relative">
            <div className="bg-gray-100 dark:bg-slate-900 border-t w-full h-[calc(env(safe-area-inset-bottom)+4rem)] pb-[env(safe-area-inset-bottom)] fixed bottom-0 flex items-center sm:hidden z-10">
                <div className="flex flex-grow p-2 relative h-full gap-2">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            href={item.href}
                            key={item.label}
                            className="group flex-grow flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-800 rounded-lg h-full"
                            activeClassName="font-black bg-gray-50 dark:bg-slate-950"
                        >
                            <item.icon className="w-6 h-6 group-data-[active=true]:hidden" />
                            <item.iconActive className="w-6 h-6 group-data-[active=true]:block hidden" />
                            <div className="sr-only">{item.label}</div>
                        </NavLink>
                    ))}
                    <div className="absolute bottom-16 right-1 p-2">
                        <ComposeDialog>
                            <Button className="rounded-full p-2 h-14 w-14">
                                <FaPlus className="h-6 w-6" />
                            </Button>
                        </ComposeDialog>
                    </div>
                </div>
            </div>
        </div>
    );
}
