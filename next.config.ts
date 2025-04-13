import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'], // Allow DALL-E image URLs
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.openai.com',
      },
      {
        protocol: 'https',
        hostname: '**.blob.core.windows.net',
      },
    ],
  },
  eslint: {
    // Don't fail the build if there are ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;