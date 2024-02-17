import {
    MdExplore,
    MdHome,
    MdMessage,
    MdNotifications,
    MdOutlineExplore,
    MdOutlineHome,
    MdOutlineMessage,
    MdOutlineNotifications,
    MdOutlineSearch,
    MdSearch,
} from "react-icons/md";
import { IconType } from "react-icons";

type NavItem = {
    label: string;
    href: string;
    icon: IconType;
    iconActive: IconType;
};

export const NAV_ITEMS: NavItem[] = [
    { label: "Home", href: "/", icon: MdOutlineHome, iconActive: MdHome },
    {
        label: "Explore",
        href: "/explore",
        icon: MdOutlineExplore,
        iconActive: MdExplore,
    },
    {
        label: "Search",
        href: "/search",
        icon: MdOutlineSearch,
        iconActive: MdSearch,
    },
    {
        label: "Notifications",
        href: "/notifications",
        icon: MdOutlineNotifications,
        iconActive: MdNotifications,
    },
    {
        label: "Messages",
        href: "/messages",
        icon: MdOutlineMessage,
        iconActive: MdMessage,
    },
];
