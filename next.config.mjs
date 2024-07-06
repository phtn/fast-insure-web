// @ts-check
await import("./src/env.js");

// const withPWA = withPWAInit({
//   dest: "public",
//   cacheOnFrontEndNav: true,
//   aggressiveFrontEndNavCaching: true,
//   reloadOnOnline: true,
//   disable: false,
//   workboxOptions: {
//     disableDevLogs: true,
//   },
//   register: false,
// });

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    // config.resolve.alias.canvas = false;
    return config;
  },
  async headers() {
    return [
      {
        source: "/account/sign-in",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
        ],
      },
    ];
  },
};

export default config;
