/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Credentials", value: "true" },

  { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },

  { key: "X-Frame-Options", value: "ALLOW-FROM https://dealers.bittel.bg" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.xx.fbcdn.net", "platform-lookaside.fbsbx.com"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
