/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.valorant-api.com',
        },
      ],
      domains: ['media.valorant-api.com']
      
    },
  
  }

module.exports = nextConfig
