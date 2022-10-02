const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    disableStaticImages: true,
    domains: ["placehold.jp", "images.microcms-assets.io"],
  },
};

module.exports = withBundleAnalyzer(withVanillaExtract(nextConfig));
