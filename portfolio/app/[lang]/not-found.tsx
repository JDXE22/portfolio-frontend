import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <p className='text-8xl font-extrabold text-malibu-400'>404</p>
      <h1 className='mt-4 text-2xl font-semibold text-foreground'>
        Page not found
      </h1>
      <p className='mt-2 text-foreground/60'>
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href='/en'
        className='mt-8 inline-flex items-center gap-2 rounded-lg bg-malibu-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-malibu-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400'>
        Back to Home
      </Link>
    </main>
  );
}
