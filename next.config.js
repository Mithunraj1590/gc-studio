/** @type {import('next').NextConfig} */
// const apiUrl = process.env.API_URL;
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'lightsalmon-gaur-152305.hostingersite.com',
        pathname: '/**',
      },
    ],
},
  turbopack: {},
// env: {
//     NEXT_PUBLIC_API_ENDPOINT: apiUrl,
// },
};

const withPWA = require("next-pwa")({
      dest: "public",
      register: true,
      skipWaiting: true,
  });
 
module.exports = withPWA(nextConfig);
