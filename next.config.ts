/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "images-na.ssl-images-amazon.com",
      "images-amazon.com",
      "m.media-amazon.com",
      "i.ebayimg.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://starfish-app-9bx4b.ondigitalocean.app/:path*",
      },
    ];
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // trailingSlash: true,
};

export default nextConfig;
