"use client";

import "./styles.override.css";

import GifPickerReact, {type TenorImage, Theme} from 'gif-picker-react';
import {Popover, PopoverContent, PopoverTrigger} from "@ui/components/ui/popover";
import {UseFormReturn} from "react-hook-form";
import {useTheme} from "next-themes";
import {getTenorApiKey} from "@/components/gif-picker/picker.action";
import {useState} from "react";

type GifPickerProps = {
    children: React.ReactNode;
    form: UseFormReturn<any>;
};

export default function GifPicker({children, form}: GifPickerProps) {
    const {theme} = useTheme()
    const [apiKey, setApiKey] = useState("")


    const onGifChosen = (image: TenorImage) => {
        const body = form.getValues("content");
        const imageString = `![${image.description}](${image.url})`;

        form.setValue("content", body ? `${body}\n${imageString}` : imageString);
    }

    const onPopoverClick = async () => {
        if (apiKey !== "") return;
        const response = await getTenorApiKey();
        setApiKey(response.tenorApiKey);
    }

    return (
        <Popover>
            <PopoverTrigger asChild onClick={onPopoverClick}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
                {apiKey !== "" && (
                    <GifPickerReact
                        tenorApiKey={apiKey}
                        onGifClick={onGifChosen}
                        theme={(theme === "dark" ? Theme.DARK : Theme.LIGHT)}/>
                )}
            </PopoverContent>
        </Popover>
    );
}