'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { IProject } from '@/types/types';
import { classNameGenerator } from '@/lib/className';

interface FeaturedProjectCardProps {
  project: IProject;
  featured?: boolean;
  index: number;
}

export const FeaturedProjectCard = ({
  project,
  featured = false,
  index,
}: FeaturedProjectCardProps) => {
  const t = useTranslations('projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      className={classNameGenerator(
        'group relative rounded-2xl overflow-hidden transition-all duration-500 h-full',
        featured ? 'md:col-span-2' : '',
      )}>
      {/* Background image via Next.js Image for lazy-loading and optimisation */}
      {project.imgUrl ? (
        <Image
          src={project.imgUrl}
          alt={`${project.title} screenshot showing the project interface`}
          fill
          className='object-cover object-center'
          /**
           * `sizes` tells Next.js / the browser how wide this image renders.
           *
           * In the carousel each slide is 72% of the viewport (SLIDE_W_PCT).
           * Getting this wrong is the #1 cause of blurry Next.js images:
           *   - Too small → Next serves a sub-resolution variant that gets upscaled
           *   - Too large → wastes bandwidth
           *
           * Breakpoints match the Section component's px-6 padding context:
           *   < 640px  → full-width (carousel takes 100vw, no horizontal room for peek)
           *   640–1024 → 90vw (peek visible but still nearly full-width on small tablets)
           *   > 1024   → 72vw (peek carousel at full desktop: 72% of viewport)
           */
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 72vw'
          /**
           * quality=90: Next.js defaults to 75 which loses detail at large sizes.
           * Project screenshots contain text/UI which compress poorly at low quality.
           * Per vercel-react-native-skills (ui-expo-image) and web-quality-audit:
           * use high quality for content-rich images.
           */
          quality={90}
          /* Carousel: first project is always mounted & visible on page load
             (index=0). Use eager loading so it is not a lazy-loaded LCP hit. */
          loading={index === 0 ? 'eager' : 'lazy'}
          priority={index === 0}
          decoding={index === 0 ? 'sync' : 'async'}
        />
      ) : (
        <div className='absolute inset-0 bg-malibu-950' />
      )}

      {/* Gradient scrim so text is always readable */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10' />

      {/* Content */}
      <div className='absolute bottom-0 left-0 right-0 z-20 p-8 space-y-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
        <div className='flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
          {project.techStack?.slice(0, featured ? 5 : 3).map((tech, i) => (
            <span
              key={i}
              className='px-3 py-1 rounded-full bg-malibu-800/80 backdrop-blur-sm border border-malibu-600/40 text-malibu-100 text-xs font-medium'>
              {tech}
            </span>
          ))}
        </div>

        <h3
          className={classNameGenerator(
            'font-bold text-white',
            featured ? 'text-3xl' : 'text-2xl',
          )}>
          {project.title}
        </h3>

        <p className='text-white/80 text-base line-clamp-2 group-hover:opacity-100 transition-opacity duration-500 delay-200'>
          {t.has(`description.${project.slug}`)
            ? t(`description.${project.slug}`)
            : project.description}
        </p>

        {/* CTAs */}
        <div className='flex gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200'>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${t('liveSite')} – ${project.title} (opens in new tab)`}
              className='px-6 py-2.5 rounded-lg bg-malibu-600 hover:bg-malibu-500 text-white font-medium transition-colors hover:shadow-xl'>
              {t('liveSite')} →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${t('viewRepository')} – ${project.title} (opens in new tab)`}
              className='px-6 py-2.5 rounded-lg border border-malibu-400/60 hover:border-malibu-400 text-malibu-100 font-medium transition-colors backdrop-blur-sm'>
              {t('viewRepository')} →
            </a>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10'>
        <div className='absolute inset-0 bg-gradient-to-t from-malibu-600/20 via-transparent to-transparent' />
      </div>
    </motion.div>
  );
};
