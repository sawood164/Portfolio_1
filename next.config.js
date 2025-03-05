/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["your-domain.com"],
    formats: ["image/avif", "image/webp"],
  },
  // Remove deprecated options and simplify config
  webpack(config) {
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
