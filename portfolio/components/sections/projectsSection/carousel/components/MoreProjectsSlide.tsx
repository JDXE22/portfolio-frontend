'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * MoreProjectsSlide — final carousel slide.
 *
 * Height matches ProjectSlide exactly (360px) so the carousel track
 * maintains a stable height throughout navigation — zero CLS.
 */
export function MoreProjectsSlide() {
  const t = useTranslations('projects.carousel');

  return (
    <div
      data-testid='more-projects-slide'
      /* Match ProjectSlide height exactly — prevents CLS on last slide */
      style={{ height: '480px' }}
      className='relative flex w-full flex-col items-center justify-center rounded-2xl section-card overflow-hidden px-8 text-center'>

      {/* Ambient glow — CSS only, zero JS, no layout impact */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 opacity-40'>
        <div className='absolute -left-24 -top-24 h-56 w-56 rounded-full bg-malibu-600/20 blur-3xl' />
        <div className='absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-malibu-400/10 blur-3xl' />
      </div>

      <div
        aria-hidden='true'
        className='mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-malibu-400/30 bg-malibu-800/30 text-xl backdrop-blur-sm'>
        🛠️
      </div>

      <h3 className='text-title mb-3 text-white'>
        {t('moreProjectsTitle')}
      </h3>

      <p className='text-body max-w-sm text-white/60'>
        {t('moreProjectsMessage')}
      </p>
    </div>
  );
}
