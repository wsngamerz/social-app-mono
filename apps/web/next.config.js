const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

const withSerwist = require("@serwist/next").default({
    swSrc: "src/sw.ts",
    swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["@repo/ui"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gravatar.com",
                pathname: "/avatar/*"
            }
        ]
    },
    reactStrictMode: true
};

module.exports = withBundleAnalyzer(
    withSerwist(nextConfig)
)
