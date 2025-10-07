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
    <Section id='hero' noPadding noMinHeight className='relative isolate'>
      <header className='absolute top-4 right-4 z-50'>
        <div
          className='flex items-center rounded-lg bg-foreground/6 backdrop-blur-md px-2 py-1 shadow-md'
          aria-label='Site header'>
          <div
            role='group'
            aria-label='Language switch'
            className='relative inline-flex items-center h-8 rounded-md bg-foreground/6 p-1 overflow-hidden'>
            <span
              aria-hidden
              className={`absolute inset-1 w-[calc(50%-0.375rem)] rounded-md bg-background transition-transform duration-250 ease-out ${
                currentLang === 'es' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            <Button
              variant='ghost'
              size='sm'
              onClick={() => switchLang('en')}
              aria-pressed={currentLang === 'en'}
              className={`relative z-10 h-full px-3 py-0 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400 ${
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
              className={`relative z-10 h-full px-3 py-0 text-sm rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400 ${
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
              onClick={() => scrollTo('about')}
              className='
                relative overflow-hidden pointer-events-auto border border-malibu-500/40 text-malibu-100
                before:absolute before:inset-0 before:-z-10 before:scale-x-0 before:bg-malibu-400 before:origin-left
                before:transition-transform before:duration-300 before:ease-out
                hover:before:scale-x-100 hover:text-malibu-50 hover:border-transparent
                focus-visible:ring-malibu-300/60
              '
              aria-label='Jump to About'>
              {t('buttons.about')}
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => scrollTo('projects')}
              className='
                relative overflow-hidden pointer-events-auto border border-malibu-500/40 text-malibu-100
                before:absolute before:inset-0 before:-z-10 before:scale-x-0 before:bg-malibu-600 before:origin-left
                before:transition-transform before:duration-300 before:ease-out
                hover:before:scale-x-100 hover:text-malibu-50 hover:border-transparent
                focus-visible:ring-malibu-300/60
              '
              aria-label='Jump to Projects'>
              {t('buttons.projects')}
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => scrollTo('contact')}
              className='
                relative overflow-hidden pointer-events-auto border border-malibu-500/40 text-malibu-100
                before:absolute before:inset-0 before:-z-10 before:scale-x-0 before:bg-malibu-600 before:origin-left
                before:transition-transform before:duration-300 before:ease-out
                hover:before:scale-x-100 hover:text-malibu-50 hover:border-transparent
                focus-visible:ring-malibu-300/60
              '
              aria-label='Jump to Contact'>
              {t('buttons.contact')}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
