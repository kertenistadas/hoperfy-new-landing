import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sign-up',
        destination: '/',
        permanent: true,
      },
      // Dead posts from the previous site, still in Search Console with backlinks.
      {
        source: '/blog/us-top-10-tech-conferences',
        destination: '/events/country/united-states',
        permanent: true,
      },
      {
        source: '/blog/unlocking-the-benefits-of-corporate-travel-a-win-win-for-employees-and-businesses',
        destination: '/blog/navigating-airports-like-a-pro',
        permanent: true,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'http',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
