'use client';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getUTCFullYear();

  return (
    <footer className='w-full border-t border-malibu-800/20 px-6 py-8'>
      <div className='mx-auto flex max-w-6xl w-full flex-col items-center justify-between gap-4 sm:flex-row'>
        <p className='text-xs font-medium tracking-wide text-foreground/40'>
          {t('rights', { year })}
        </p>

        <div className='flex items-center gap-2'>
          <span className='h-1 w-1 rounded-full bg-malibu-600/30' />
          <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/25'>
            {t('builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
