import {MetadataRoute} from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "SocialApp",
        short_name: "SocialApp",
        description: "The Bestest Social Media App!",
        theme_color: "#a555f7",
        background_color: "#18181b",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
            {
                src: "icons/16x16.png",
                sizes: "16x16",
                type: "image/png"
            },
            {
                src: "icons/32x32.png",
                sizes: "32x32",
                type: "image/png"
            },
            {
                src: "icons/72x72.png",
                sizes: "72x72",
                type: "image/png"
            },
            {
                src: "icons/96x96.png",
                sizes: "96x96",
                type: "image/png"
            },
            {
                src: "icons/120x120.png",
                sizes: "120x120",
                type: "image/png"
            },
            {
                src: "icons/128x128.png",
                sizes: "128x128",
                type: "image/png"
            },
            {
                src: "icons/144x144.png",
                sizes: "144x144",
                type: "image/png"
            },
            {
                src: "icons/152x152.png",
                sizes: "152x152",
                type: "image/png"
            },
            {
                src: "icons/180x180.png",
                sizes: "180x180",
                type: "image/png"
            },
            {
                src: "icons/192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "icons/384x384.png",
                sizes: "384x384",
                type: "image/png"
            },
            {
                src: "icons/512x512.png",
                sizes: "512x512",
                type: "image/png"
            },
            {
                src: "icons/512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            }
        ]
    }
}