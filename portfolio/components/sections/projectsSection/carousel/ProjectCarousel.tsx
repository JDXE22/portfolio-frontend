'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ProjectCarouselProps } from './ProjectCarousel.types';
import { SLIDE_W_PCT, GAP_PX } from './ProjectCarousel.constants';
import { SlideItem } from './components/SlideItem';
import { CarouselButton } from './components/CarouselButton';

export function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const t = useTranslations('projects.carousel');

  const [currentIndex, setCurrentIndex] = useState(0);
  const pointerStartX = useRef<number | null>(null);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, slides.length - 1));
  }, [slides.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerStartX.current === null) return;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      const delta = e.clientX - pointerStartX.current;
      if (delta < -50) goNext();
      else if (delta > 50) goPrev();
      pointerStartX.current = null;
    },
    [goNext, goPrev],
  );

  const centreOffset = `${(100 - SLIDE_W_PCT) / 2}%`;
  const perStep = `(${SLIDE_W_PCT}% + ${GAP_PX}px) * ${currentIndex}`;
  const translateX = `calc(${centreOffset} - ${perStep})`;

  return (
    <div
      data-testid='projects-carousel'
      role='region'
      aria-label='Projects carousel'
      className='w-full select-none'>
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {t('slideIndicator', {
          current: currentIndex + 1,
          total: slides.length,
        })}
      </div>

      <div
        className='touch-pan-y overflow-hidden active:scale-[0.99] transition-transform duration-150'
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => (pointerStartX.current = null)}>
        <div
          style={{
            display: 'flex',
            gap: `${GAP_PX}px`,
            transform: `translateX(${translateX})`,
            transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            willChange: 'transform',
          }}>
          {slides.map((slide, i) => (
            <SlideItem
              key={i}
              slide={slide}
              index={i}
              isCurrent={i === currentIndex}
            />
          ))}
        </div>
      </div>

      <div className='mt-5 flex items-center justify-between px-1'>
        <CarouselButton
          onClick={goPrev}
          disabled={isFirst}
          aria-label={t('previous')}
          direction='prev'>
          ←
        </CarouselButton>

        <div className='flex items-center gap-1.5' aria-hidden='true'>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              style={{ outline: 'none' }}
              className={[
                'rounded-full transition-all duration-300',
                i === currentIndex
                  ? 'w-5 h-2 bg-malibu-400'
                  : 'w-2 h-2 bg-malibu-800/60 hover:bg-malibu-600/60',
              ].join(' ')}
            />
          ))}
        </div>

        <CarouselButton
          onClick={goNext}
          disabled={isLast}
          aria-label={t('next')}
          direction='next'>
          →
        </CarouselButton>
      </div>
    </div>
  );
}
