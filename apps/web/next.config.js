const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

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

module.exports = withBundleAnalyzer(nextConfig)