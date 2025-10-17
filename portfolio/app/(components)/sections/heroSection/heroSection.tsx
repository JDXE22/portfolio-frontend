'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/(components)/ui/Button';
import Particles from '@/app/(components)/backgrounds/Background';
import { Section } from '@/app/(components)/layout/Section';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { smoothScrollToId } from '@/lib/scroll';

export function HeroSection() {
  const t = useTranslations('hero');

  const router = useRouter();
  const params = useParams();

  const currentLang = params?.lang === 'es' ? 'es' : 'en';
  const switchLang = (target?: 'en' | 'es') => {
    if (target && target === currentLang) return;

    const nextLang = target ?? (currentLang === 'en' ? 'es' : 'en');
    router.push(`/${nextLang}`);
  };

  return (
    <Section
      id='hero'
      noPadding
      className='relative isolate min-h-[calc(100vh - 3rem)]'>
      <header className='absolute top-4 right-4 z-50'>
        <div
          className='flex items-center rounded-lg bg-foreground/6 backdrop-blur-md px-2 py-1 shadow-md'
          aria-label='Site header'>
          <div
            role='group'
            aria-label='Language switch'
            className='lang-toggle'>
            <span
              aria-hidden
              className={`lang-toggle-pill ${
                currentLang === 'es' ? 'es' : 'en'
              }`}
            />
            <Button
              type='button'
              size='sm'
              onClick={() => switchLang('en')}
              aria-pressed={currentLang === 'en'}
              className={`lang-toggle-btn ${
                currentLang === 'en' ? 'active' : ''
              } h-full px-3 py-0`}>
              EN
            </Button>
            <Button
              type='button'
              size='sm'
              onClick={() => switchLang('es')}
              aria-pressed={currentLang === 'es'}
              className={`lang-toggle-btn ${
                currentLang === 'es' ? 'active' : ''
              } h-full px-3 py-0`}>
              ES
            </Button>
          </div>
        </div>
      </header>

      <div className='flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 pt-12 pb-12 text-center'>
        <Particles
          className='-z-10'
          particleColors={['#ffffff', '#a5b4fc', '#f0abfc']}
          particleCount={300}
          particleSpread={14}
          speed={0.25}
          particleBaseSize={110}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
        />
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]'
        />

        <div className='relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center group'>
          <h1 className='text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-malibu-50 transition-colors duration-200'>
            {t('title')}
          </h1>
          <p className='mt-6 max-w-2xl text-lg text-malibu-200 sm:text-xl transition-colors duration-200'>
            {t('subtitle')}
          </p>

          <div className='mt-10 flex flex-wrap items-center justify-center gap-4 group'>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => smoothScrollToId('about')}
              className='
                animated-fill-btn gradient-border px-4 py-2'
              aria-label='Jump to About'>
              <span className='btn-content'>{t('buttons.about')}</span>
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => smoothScrollToId('projects')}
              className='
               animated-fill-btn gradient-border px-4 py-2

              '
              aria-label='Jump to Projects'>
              <span className='btn-content'>{t('buttons.projects')}</span>
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => smoothScrollToId('contact')}
              className='
               animated-fill-btn gradient-border px-4 py-2
              '
              aria-label='Jump to Contact'>
              <span className='btn-content'>{t('buttons.contact')}</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
