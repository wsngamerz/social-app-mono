"use client";

import { Switch } from "@ui/components/ui/switch";
import { Label } from "@ui/components/ui/label";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
    const { setTheme, theme } = useTheme();

    const onCheckedChange = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <div className="flex items-center space-x-2 w-full">
            <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={onCheckedChange}
            />
            <Label htmlFor="dark-mode" className="font-normal flex-grow">
                Dark Mode
            </Label>
        </div>
    );
}
