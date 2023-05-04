/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "Access-Control-Allow-Credentials", value: "true" },

  { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },

  { key: "X-Frame-Options", value: "ALLOW-FROM https://dealers.bittel.bg" },
  // { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Access-Control-Allow-Credentials", value: "true" },
  {
    key: "Access-Control-Allow-Methods",
    value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  },
  {
    key: "Access-Control-Allow-Headers",
    value:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
];
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "static.xx.fbcdn.net",
      "platform-lookaside.fbsbx.com",
      "www.bittel.bg",
      "bittel.bg",
    ],
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
