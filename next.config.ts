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
      {
        protocol: 'https',
        hostname: 'scontent-gig4-1.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-gig4-2.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-2.cdninstagram.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'scontent-iad3-1.cdninstagram.com',
        port: '',
      },{
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: ''
      }
    ],
  },
  productionBrowserSourceMaps: false
};

export default nextConfig;
 
