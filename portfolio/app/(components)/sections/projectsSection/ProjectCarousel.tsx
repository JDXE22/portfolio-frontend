'use client';

import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { useTranslations } from 'next-intl';
import type { CarouselSlide } from '@/types/types';
import { ProjectSlide } from './ProjectSlide';
import { MoreProjectsSlide } from './MoreProjectsSlide';

// ── Constants ─────────────────────────────────────────────────────────────────

/**
 * Width of each slide as a percentage of the track container.
 * 70% leaves 30% split between the two peeking neighbours
 * (15% per side), giving a clear affordance that more slides exist.
 */
const SLIDE_W_PCT = 72;

/** Horizontal gap between slides (px) */
const GAP_PX = 20;

// ── Performance helpers ───────────────────────────────────────────────────────

/**
 * Memoised slide renderer — prevents re-rendering every slide on index change.
 * Per vercel-react-native-skills: memoize list item components.
 */
const SlideItem = memo(function SlideItem({
  slide,
  index,
  isCurrent,
}: {
  slide: CarouselSlide;
  index: number;
  isCurrent: boolean;
}) {
  return (
    /**
     * Each slide is full-width within the track.
     * opacity/transform animations only — no width/height thrash (CWV-safe).
     * inert hides non-current slides from assistive tech and Tab order.
     */
    <div
      aria-hidden={!isCurrent}
      /* inert removes off-screen slides from the tab order entirely.
         Cast needed: React's HTMLDivElement types accept inert as boolean. */
      {...(!isCurrent ? { inert: true } : {})}
      style={{
        flex: `0 0 ${SLIDE_W_PCT}%`,
        opacity: isCurrent ? 1 : 0.42,
        transform: isCurrent ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        willChange: 'transform, opacity',
      }}>
      {slide.type === 'project' ? (
        <ProjectSlide project={slide.data} index={index} />
      ) : (
        <MoreProjectsSlide />
      )}
    </div>
  );
});

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProjectCarouselProps {
  slides: CarouselSlide[];
}

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

  // ── Keyboard ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // ── Touch / pointer swipe ───────────────────────────────────────────────────
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (pointerStartX.current === null) return;
      const delta = e.clientX - pointerStartX.current;
      if (delta < -50) goNext();
      else if (delta > 50) goPrev();
      pointerStartX.current = null;
    },
    [goNext, goPrev],
  );

  // ── Track offset ────────────────────────────────────────────────────────────
  /**
   * translateX formula for a fixed-percentage-width track:
   *
   * Each slide is SLIDE_W_PCT% of the container.
   * The (100% - SLIDE_W_PCT%) remainder is split evenly on each side
   * as the natural peek. We add half of the leftover to push the active
   * slide to the visual centre, then subtract (SLIDE_W_PCT% + GAP) per step.
   *
   * Breakdown:
   *   centring offset = (100% - SLIDE_W_PCT%) / 2
   *   per-step offset = (SLIDE_W_PCT% + GAP_PX) × currentIndex
   */
  const centreOffset = `${(100 - SLIDE_W_PCT) / 2}%`;
  const perStep      = `(${SLIDE_W_PCT}% + ${GAP_PX}px) * ${currentIndex}`;
  const translateX   = `calc(${centreOffset} - ${perStep})`;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div
      data-testid='projects-carousel'
      role='region'
      aria-label='Projects carousel'
      className='w-full select-none'>
      {/* SR live region — informs screen readers of which slide is shown */}
      <div aria-live='polite' aria-atomic='true' className='sr-only'>
        {t('slideIndicator', {
          current: currentIndex + 1,
          total: slides.length,
        })}
      </div>

      {/* ── Outer clip: overflow-hidden exposes peek via SLIDE_W_PCT < 100% ── */}
      <div
        className='overflow-hidden'
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}>
        {/* ── Slide track: all slides in a flex row ── */}
        <div
          style={{
            display: 'flex',
            gap: `${GAP_PX}px`,
            transform: `translateX(${translateX})`,
            /* Animate only transform — compositor-only, zero CLS / layout cost */
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

      {/* ── Navigation controls ── */}
      <div className='mt-5 flex items-center justify-between px-1'>
        <CarouselButton
          onClick={goPrev}
          disabled={isFirst}
          aria-label={t('previous')}
          direction='prev'>
          ←
        </CarouselButton>

        {/* Dot indicators — quick visual index more compact than text */}
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

// ── CarouselButton ─────────────────────────────────────────────────────────────

interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
}

/**
 * Navigation button — hover and focus states only use color/opacity changes
 * (no width/height) to avoid layout recalculations (CWV-safe).
 */
const CarouselButton = memo(function CarouselButton({
  direction: _direction,
  children,
  className,
  ...rest
}: CarouselButtonProps) {
  return (
    <button
      type='button'
      className={[
        'flex h-10 w-10 items-center justify-center rounded-full',
        'border border-malibu-400/30 bg-malibu-800/20 backdrop-blur-sm',
        'text-malibu-200 transition-colors duration-200',
        'hover:border-malibu-400/60 hover:bg-malibu-700/30 hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400/60 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-30',
        className ?? '',
      ].join(' ')}
      {...rest}>
      {children}
    </button>
  );
});
