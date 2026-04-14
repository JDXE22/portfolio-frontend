'use client';

import { useTranslations } from 'next-intl';

export function MoreProjectsSlide() {
  const t = useTranslations('projects.carousel');

  return (
    <div
      data-testid='more-projects-slide'
      className='relative flex h-[480px] w-full flex-col items-center justify-center rounded-2xl section-card overflow-hidden px-8 text-center'>
      <div
        aria-hidden='true'
        className='mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-malibu-700/30 bg-malibu-900/40 text-xl'>
        🛠️
      </div>

      <h3 className='text-title mb-3 text-white font-display'>
        {t('moreProjectsTitle')}
      </h3>

      <p className='text-body max-w-sm text-white/60'>
        {t('moreProjectsMessage')}
      </p>
    </div>
  );
}
