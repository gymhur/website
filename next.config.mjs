/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (!process.env.NEXT_PUBLIC_POSTHOG_HOST) return [];
    return [
      {
        source: '/ingest/static/:path*',
        destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/static/:path*`,
      },
      {
        source: '/ingest/:path*',
        destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
