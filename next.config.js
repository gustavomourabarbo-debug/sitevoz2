/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.vozdebrasilia.com.br' },
      { protocol: 'https', hostname: '**.wp.com' },
      { protocol: 'https', hostname: '**.wordpress.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      { protocol: 'http', hostname: '**.vozdebrasilia.com.br' },
    ],
  },
};

module.exports = nextConfig;