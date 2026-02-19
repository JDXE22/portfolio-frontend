'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { AboutInfo } from '@/types/types';
import { Button } from '@/app/(components)/ui/Button';

export default function AboutClient({ items }: { items: AboutInfo[] }) {
  const t = useTranslations('about');
  const [copied, setCopied] = React.useState<number | null>(null);

  const copyUserName = (username: string, id: number) => {
    navigator.clipboard.writeText(username);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  if (items.length === 0) {
    return <p>{t('empty')}</p>;
  }
  const skills = t.raw('skillsList') as AboutInfo['skills'];

  return (
    <div className='grid gap-6'>
      {items.map((info) => (
        <div
          key={info.headline}
          className='bg-background/80 p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 max-w-6xl min-h-[480px] mx-auto'>
          {/* Avatar */}
          {info.avatarIconUrl && (
            <div className='flex-shrink-0 mb-6 md:mb-0 md:w-1/3 flex flex-col justify-center'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-malibu-900/30 via-transparent to-malibu-400/20 rounded-lg'></div>
                <img
                  src={info.avatarIconUrl}
                  alt={`${info.headline} avatar`}
                  className='relative w-full max-w-80 md:max-w-[28rem] h-auto shadow-xl rounded-lg mx-auto'
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className='flex-1 md:w-2/3 w-full space-y-8'>
            <div className='relative'>
              <div className='absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-malibu-400 via-malibu-600 to-transparent rounded-full' />
              <h3 className='text-display mb-6 bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent '>
                {t('headline')}
              </h3>
              <p className='text-body-lg text-foreground/80 leading-relaxed'>
                {t('bio')}
              </p>
            </div>

            {skills.length > 0 && (
              <div className='section-card p-6'>
                <h4 className='text-title mb-6 text-foreground/90'>
                  {t('skills')}:
                </h4>
                <div className='space-y-4'>
                  {skills.map((skill, i) => (
                    <div key={i} className='group'>
                      <div className='flex items-center justify-between mb-2'>
                        <span className='text-malibu-100 font-medium'>
                          {skill.name}
                        </span>
                        <span className='text-caption text-foreground/60'>
                          {skill.level}%
                        </span>
                        <div
                          className='h-full bg-gradient-to-r from-malibu-600 to-malibu-400 rounded-full transition-all duration-700 ease-out group-hover:shadow-lg group-hover:shadow-malibu-400/50'
                          style={{ width: `${skill.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {info.socialLinks?.length > 0 && (
              <div className='bg-foreground/5 rounded-lg p-6'>
                <h4 className='mb-4 font-semibold text-foreground/90 text-center'>
                  {t('socialLinks')}:
                </h4>
                <ul className='flex flex-wrap items-center gap-8 justify-center'>
                  {info.socialLinks.map((link, i) => (
                    <li key={i} className='relative group'>
                      <a
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-2 text-foreground hover:text-malibu-400 transition-colors'>
                        {link.iconPublicId && (
                          <img
                            src={link.iconPublicId}
                            alt={link.name}
                            className='h-10 w-10 object-contain'
                          />
                        )}{' '}
                      </a>
                      {link.name?.toLowerCase() === 'discord' &&
                        link.username && (
                          <span
                            className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-200 z-10 shadow-lg pointer-events-auto cursor-pointer ${
                              copied === i
                                ? 'bg-green-700 text-white'
                                : 'bg-malibu-700 text-malibu-50'
                            }
                            `}
                            onClick={() => copyUserName(link.username!, i)}
                            title='Click to copy'>
                            {copied === i ? 'Copied' : link.username}
                          </span>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download CV Button */}
            <div className='flex justify-center'>
              <Button
                variant='secondary'
                size='md'
                className='animated-fill-btn gradient-border'>
                <a
                  href='/cv.pdf'
                  download='David_Esparza_CV.pdf'
                  className='flex items-center gap-3 m-2'
                  aria-label='Download David Esparza CV as PDF'>
                  <span className='btn-content'> {t('downloadCV')}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
