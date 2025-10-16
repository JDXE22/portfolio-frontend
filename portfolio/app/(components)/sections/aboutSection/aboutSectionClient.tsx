'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { AboutInfo } from '@/types/types';

export default function AboutClient({ items }: { items: AboutInfo[] }) {
  const t = useTranslations('about');

  if (items.length === 0) {
    return <p>{t('empty')}</p>;
  }
  const skills = t.raw('skillsList') as string[];

  return (
    <div className='grid gap-6'>
      {items.map((info) => (
        <div
          key={info.headline}
          className='bg-background/80 p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 max-w-6xl min-h-[480px] mx-auto'>
          {/* Avatar */}
          {info.avatarIconUrl && (
            <div className='flex-shrink-0 mb-6 md:mb-0 md:w-1/3 flex flex-col justify-center'>
              <img
                src={info.avatarIconUrl}
                alt={`${info.headline} avatar`}
                className='w-48 h-48 md:w-80 md:h-80 object-cover shadow-md rounded-lg'
              />
              {skills.length > 0 && (
                <div className='mb-8'>
                  <h4 className='mb-2 font-semibold text-foreground/90 mt-6 text-center'>
                    {t('skills')}:
                  </h4>
                  <ul className='list-inside text-foreground/80 space-y-1 text-base items-center list-none text-center'>
                    {skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className='flex-1 md:w-2/3 w-full h-full'>
            <h3 className='mb-4 text-3xl md:text-4xl font-bold text-foreground'>
              {t('headline')}
            </h3>
            <p className='text-foreground/80 mb-8 text-lg leading-relaxed max-w-[65ch]'>
              {t('bio')}
            </p>

            {info.socialLinks?.length > 0 && (
              <div>
                <h4 className='mb-3 font-semibold text-foreground/90 text-center'>
                  {t('socialLinks')}:
                </h4>
                <ul className='flex flex-wrap items-center gap-6 mt-3 justify-between'>
                  {info.socialLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-foreground hover:text-malibu-400 transition-colors'>
                        {link.iconPublicId && (
                          <img
                            src={link.iconPublicId}
                            alt={link.name}
                            className='h-7 w-7'
                          />
                        )}
                        <span className='hidden sm:inline'>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
