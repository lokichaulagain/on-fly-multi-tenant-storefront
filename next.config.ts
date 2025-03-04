const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com", "itmpwbjutsadjvzubrmf.supabase.co", "lkhtghtzssifepmxfhlw.supabase.co", "img.clerk.com", "miniture.novaworks.net", "miniture.b-cdn.net"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
