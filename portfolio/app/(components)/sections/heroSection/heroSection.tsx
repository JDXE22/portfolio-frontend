'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/app/(components)/ui/Button';
import Particles from '@/app/(components)/backgrounds/Background';
import { Section } from '@/app/(components)/layout/Section';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export function HeroSection() {
  const t = useTranslations('hero');
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      noMinHeight
      className='
        relative isolate'>
      <header className='absolute top-0 left-0 w-full z-50 px-6 py-4'>
        <div className='flex justify-end'>
          <div
            role='group'
            aria-label='Language switch'
            className='relative inline-flex items-center h-9 rounded-md bg-foreground/6 p-1 overflow-hidden gap-0'>
            <span
              aria-hidden
              className={`absolute inset-1 w-[calc(50%-0.25rem)] rounded-md bg-background transition-transform duration-200 motion-safe:ease-out ${
                currentLang === 'es' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => switchLang('en')}
              aria-pressed={currentLang === 'en'}
              className={`relative z-10 h-full px-3 py-0 text-sm rounded focus:outline-none ${
                currentLang === 'en'
                  ? 'text-foreground'
                  : 'text-foreground/70 hover:text-foreground'
              }`}>
              EN
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => switchLang('es')}
              aria-pressed={currentLang === 'es'}
              className={`relative z-10 h-full px-3 py-0 text-sm rounded focus:outline-none ${
                currentLang === 'es'
                  ? 'text-foreground'
                  : 'text-foreground/70 hover:text-foreground'
              }`}>
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
        <div className='relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center'>
          <h1 className='text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
            {t('title')}
          </h1>
          <p className='mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl'>
            {t('subtitle')}
          </p>
          <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => scrollTo('about')}
              aria-label='Jump to About'>
              {t('buttons.about')}
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => scrollTo('projects')}
              aria-label='Jump to Projects'>
              {t('buttons.projects')}
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => scrollTo('contact')}
              aria-label='Jump to Contact'>
              {t('buttons.contact')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
