import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Metadata, Viewport } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased app-gradient`}>
        {children}
      </body>
    </html>
  );
}
