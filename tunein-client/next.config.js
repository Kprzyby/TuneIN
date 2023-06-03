/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-countup"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["encrypted-tbn0.gstatic.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
