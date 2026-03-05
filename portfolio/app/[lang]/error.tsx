'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-2xl font-semibold text-foreground'>
        Something went wrong
      </h1>
      <p className='mt-2 text-foreground/60'>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className='mt-8 inline-flex items-center gap-2 rounded-lg bg-malibu-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-malibu-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400'>
        Try again
      </button>
    </main>
  );
}
