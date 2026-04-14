import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { Outfit, Source_Sans_3, Geist_Mono } from 'next/font/google';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { NavPill } from '@/components/ui/NavPill';
import { Providers } from '@/components/layout/Providers';

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const sourceSans = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});
const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://davidesparza.dev';

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: 'en' | 'es' }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const messages = (await import(`../../i18n/${lang}.json`)).default;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'David Esparza',
    'jobTitle': 'Full-Stack Developer',
    'url': `${BASE_URL}/${lang}`,
    'description':
      'Full-Stack Developer specialising in reliable backends and seamless front-end experiences.',
    'sameAs': [
      'https://www.linkedin.com/in/juan-david-esparza-castillo/',
      'https://github.com/JDXE22',
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${sourceSans.variable} ${geistMono.variable} antialiased app-gradient`}>
        {/* JSON-LD structured data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Skip-to-content for keyboard users */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-malibu-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg'>
          Skip to content
        </a>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <Providers>
            <ScrollProgress />
            <NavPill />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
