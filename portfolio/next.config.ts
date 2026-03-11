import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    /* Serve AVIF first (best compression + quality), WebP as fallback.
       Per SEO skill and web-quality-audit: use modern formats for images. */
    formats: ['image/avif', 'image/webp'],

    /* Extend the default device sizes to cover 1440px and 1536px breakpoints.
       Without these, a 72vw image on a 1440px screen (= ~1036px) has no
       matching variant between the default 1080px and 1920px entries,
       so Next.js serves 1080px which gets upscaled → blur.
       With 1280 added, the 1036px image gets served at 1280px = 0 upscaling. */
    deviceSizes: [640, 750, 828, 1080, 1280, 1440, 1920, 2048, 3840],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
