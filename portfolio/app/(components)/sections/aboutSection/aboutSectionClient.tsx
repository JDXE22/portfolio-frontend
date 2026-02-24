'use client';
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AboutInfo } from '@/types/types';

function DownloadIcon() {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      className='shrink-0'
      aria-hidden='true'>
      <path
        d='M7.5 1v8.5M4 6.5l3.5 4 3.5-4M2 12.5h11'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

// Soft skill accent markers — one per position, cycling if list grows
const MARKERS = ['◆', '▸', '◉', '◈', '◇'];

export default function AboutClient({ items }: { items: AboutInfo[] }) {
  const t = useTranslations('about');
  const softSkills = t.raw('skillsList') as string[];

  if (items.length === 0) {
    return <p className='text-center text-foreground/50'>{t('sectionTitle')}</p>;
  }

  return (
    <div className='mx-auto max-w-6xl space-y-8 px-0'>
      {items.map((info) => (
        <React.Fragment key={info.headline}>
          {/* ── Bio + Portrait ──────────────────────────── */}
          <div className='grid grid-cols-1 items-start gap-10 md:grid-cols-5'>
            {/* Bio column */}
            <div className='flex flex-col gap-8 md:col-span-3'>
              <div className='relative pl-5'>
                <div className='absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-malibu-400 via-malibu-600 to-transparent' />
                <h3 className='text-display mb-5 text-foreground'>
                  {t('headline')}
                </h3>
                <p className='text-body-lg leading-relaxed text-foreground/75'>
                  {t('bio')}
                </p>
              </div>

              {/* Download CV */}
              <div className='flex justify-center'>
                <a
                  href='/cv.pdf'
                  download='David_Esparza_CV.pdf'
                  aria-label='Download David Esparza CV as PDF'
                  className='
                    inline-flex items-center gap-2.5
                    rounded-lg border border-malibu-400/30
                    bg-malibu-950/20 px-5 py-2.5
                    text-sm font-medium text-malibu-300
                    shadow-sm transition-all duration-200
                    hover:border-malibu-400/55 hover:bg-malibu-900/30 hover:text-malibu-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-500/50
                  '>
                  <DownloadIcon />
                  {t('downloadCV')}
                </a>
              </div>
            </div>

            {/* Portrait — leads on mobile, trails on desktop */}
            {info.avatarIconUrl && (
              <div className='order-first md:col-span-2 md:order-last'>
                <div className='relative mx-auto aspect-[3/4] w-full max-w-[260px] md:max-w-none'>
                  <Image
                    src={info.avatarIconUrl}
                    alt='David Esparza'
                    fill
                    sizes='(max-width: 768px) 260px, 40vw'
                    className='rounded-2xl object-cover object-top shadow-xl ring-1 ring-white/[0.08]'
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Skills row ───────────────────────────────── */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Technical skills — API progress bars */}
            {info.skills?.length > 0 && (
              <div className='section-card p-6'>
                <h4 className='text-title mb-6 text-foreground/90'>
                  {t('techSkills')}
                </h4>
                <div className='space-y-4'>
                  {info.skills.map((skill, i) => (
                    <div key={i} className='group'>
                      <div className='mb-1.5 flex items-center justify-between'>
                        <span className='text-sm font-medium text-malibu-100'>
                          {skill.name}
                        </span>
                        <span className='text-xs text-foreground/55'>
                          {skill.level}%
                        </span>
                      </div>
                      <div className='h-1.5 overflow-hidden rounded-full bg-foreground/10'>
                        <div
                          className='h-full rounded-full bg-gradient-to-r from-malibu-600 to-malibu-400 transition-all duration-700 ease-out group-hover:shadow-[0_0_8px_rgba(79,175,225,0.45)]'
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soft skills — i18n pill tags */}
            {softSkills.length > 0 && (
              <div className='section-card p-6'>
                <h4 className='text-title mb-6 text-foreground/90'>
                  {t('softSkills')}
                </h4>
                <div className='flex flex-wrap gap-2.5'>
                  {softSkills.map((skill, i) => (
                    <span
                      key={i}
                      className='
                        inline-flex items-center gap-1.5
                        rounded-full border border-malibu-400/25
                        bg-malibu-950/30 px-3.5 py-1.5
                        text-sm font-medium text-malibu-200/90
                        transition-colors duration-200
                        hover:border-malibu-400/50 hover:bg-malibu-900/30 hover:text-malibu-100
                      '>
                      <span
                        className='text-[9px] leading-none text-malibu-400/80'
                        aria-hidden='true'>
                        {MARKERS[i % MARKERS.length]}
                      </span>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
