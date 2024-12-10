/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [], // Remove "m.media-amazon.com" or add relevant domains if needed
  },
};

export default nextConfig;
