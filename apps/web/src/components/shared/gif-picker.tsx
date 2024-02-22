"use client";

import GifPickerReact, {type TenorImage, Theme} from 'gif-picker-react';
import {Popover, PopoverContent, PopoverTrigger} from "@ui/components/ui/popover";
import {UseFormReturn} from "react-hook-form";
import {useTheme} from "next-themes";

type GifPickerProps = {
    tenorApiKey: string;
    children: React.ReactNode;
    form: UseFormReturn<any>;
};

export default function GifPicker({tenorApiKey, children, form}: GifPickerProps) {
    const {theme} = useTheme()

    const onGifChosen = (image: TenorImage) => {
        const body = form.getValues("content");
        const imageString = `![${image.description}](${image.url})`;

        form.setValue("content", body ? `${body}\n${imageString}` : imageString);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-fit">
                <GifPickerReact tenorApiKey={tenorApiKey} onGifClick={onGifChosen} theme={(
                    theme === "dark" ? Theme.DARK : Theme.LIGHT
                )}/>
            </PopoverContent>
        </Popover>
    );
}