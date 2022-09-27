const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    disableStaticImages: true,
    domains: ["placehold.jp", "images.microcms-assets.io"],
  },
};

module.exports = withVanillaExtract(nextConfig);
