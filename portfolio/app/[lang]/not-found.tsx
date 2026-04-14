'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <p className='text-8xl font-bold text-malibu-400 font-display'>404</p>
      <h1 className='mt-4 text-2xl font-semibold text-foreground'>
        {t('title')}
      </h1>
      <p className='mt-2 text-foreground/60'>
        {t('description')}
      </p>
      <Link
        href={`/${locale}`}
        className='mt-8 inline-flex items-center gap-2 rounded-lg bg-malibu-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-malibu-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400'>
        {t('backHome')}
      </Link>
    </main>
  );
}
