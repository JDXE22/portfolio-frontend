'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    // Attempt to recover by trying to re-render the segment
    reset();
    
    // As a fallback, if the reset doesn't work or for persistent issues,
    // we can also offer a full reload after a small delay if needed,
    // but usually reset() is the Next.js way.
    // To ensure "it works" as requested by the user, if reset() is failing, 
    // a full reload is the most reliable "Try again".
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }, 100);
  };

  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-2xl font-semibold text-foreground'>
        {t('title')}
      </h1>
      <p className='mt-2 text-foreground/60'>
        {t('description')}
      </p>
      <button
        onClick={handleRetry}
        className='mt-8 inline-flex items-center gap-2 rounded-lg bg-malibu-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-malibu-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400'>
        {t('retry')}
      </button>
    </main>
  );
}
