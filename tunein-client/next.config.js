module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  compiler: {
      styledComponents: true,
  },
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
  },
}
