import './globals.css';
import { Metadata, Viewport } from 'next';
import React from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://davidesparza.dev';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'David Esparza | Full-Stack Developer',
    template: '%s | David Esparza',
  },
  description:
    'Full-Stack Developer specialising in reliable backends and seamless front-end experiences. Explore my projects, skills, and get in touch.',
  openGraph: {
    type: 'website',
    title: 'David Esparza | Full-Stack Developer',
    description:
      'Full-Stack Developer specialising in reliable backends and seamless front-end experiences.',
    siteName: "David Esparza's Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Esparza | Full-Stack Developer',
    description:
      'Full-Stack Developer specialising in reliable backends and seamless front-end experiences.',
  },
  robots: { index: true, follow: true },
  alternates: {
    languages: {
      en: '/en',
      es: '/es',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// The html/body shell is provided by app/[lang]/layout.tsx so that the
// lang attribute can be set dynamically per locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
