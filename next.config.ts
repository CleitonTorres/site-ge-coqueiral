import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/cleitontorres.png',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/42627426?v=4',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
      },
    ],
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
 
