'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { IProject } from '@/types/projects.types';
import { classNameGenerator } from '@/lib/className';
import { Modal } from './Modal';
import { useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Softer, semi-transparent colors to avoid "shine"
  const difficultyColor = {
    Easy: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Hard: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  }[project.difficultyLevel || 'Easy'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      className={classNameGenerator(
        'group relative rounded-2xl overflow-hidden transition-all duration-500 h-full cursor-pointer',
        featured ? 'md:col-span-2' : '',
      )}
      onClick={handleOpenModal}>

      {project.imgUrl ? (
        <Image
          src={project.imgUrl}
          alt={`${project.title} screenshot`}
          fill
          className='object-cover object-center transition-transform duration-700 group-hover:scale-105'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 72vw'
          quality={90}
          loading={index === 0 ? 'eager' : 'lazy'}
          priority={index === 0}
        />
      ) : (
        <div className='absolute inset-0 bg-malibu-950' />
      )}

      <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10' />

      <div className='absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8 space-y-4 transform translate-y-4 lg:translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
        <div className='flex flex-wrap items-center gap-3'>
          <h3 className={classNameGenerator(
            'font-bold text-white leading-tight font-display',
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl',
          )}>
            {project.title}
          </h3>

          {project.difficultyLevel && (
            <span className={classNameGenerator(
              'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border',
              difficultyColor,
            )}>
              {t(`difficultyLevel.${project.difficultyLevel}`)}
            </span>
          )}
        </div>

        <div className='flex flex-wrap gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
          {project.techStack?.slice(0, featured ? 5 : 3).map((tech, i) => (
            <span
              key={i}
              className='px-3 py-1 rounded-full bg-malibu-800/70 border border-malibu-700/40 text-malibu-100 text-[10px] sm:text-xs font-semibold'>
              {tech}
            </span>
          ))}
        </div>

        <p className='text-white/80 text-sm sm:text-base line-clamp-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200'>
          {t.has(`description.${project.slug}`) ? t(`description.${project.slug}`) : project.description}
        </p>

        <div className='flex flex-wrap gap-4 pt-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300'>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
              className='px-6 py-2.5 rounded-xl bg-malibu-600 hover:bg-malibu-500 text-white text-xs sm:text-sm font-bold transition-all active:scale-95'>
              {t('liveSite')} →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => e.stopPropagation()}
              className='px-6 py-2.5 rounded-xl border border-malibu-500/50 hover:bg-white/10 text-malibu-50 text-xs sm:text-sm font-bold transition-all active:scale-95'>
              {t('viewRepository')} →
            </a>
          )}
        </div>
      </div>

      <Modal open={isModalOpen} onClose={handleCloseModal} title={project.title} className='max-w-4xl'>
        <div className='flex flex-col items-center text-center gap-12 w-full max-w-3xl mx-auto'>
          {/* Hero Image Section - Conditional */}
          {project.imgUrl && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className='relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10'>
              <Image
                src={project.imgUrl}
                alt={project.title}
                fill
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-malibu-950/40 via-transparent to-transparent' />
            </motion.div>
          )}

          {/* Difficulty Badge - Centered and Soft */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <div className='flex flex-col items-center gap-3'>
              <span className='text-malibu-400 text-[10px] font-bold uppercase tracking-[0.3em]'>
                {t('modal.difficulty')}
              </span>
              <span className={classNameGenerator(
                'px-6 py-2 rounded-2xl text-xs font-bold uppercase tracking-[0.1em] border',
                difficultyColor
              )}>
                {t(`difficultyLevel.${project.difficultyLevel}`)}
              </span>
            </div>
          </motion.div>

          {/* Content Block: Tech Stack & Description combined in one flow */}
          <div className='flex flex-col items-center gap-10 w-full'>

            {/* Tech Stack */}
            <section className='flex flex-col items-center gap-4'>
              <h4 className='text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]'>
                {t('techStackTitle')}
              </h4>
              <div className='flex flex-wrap justify-center gap-2.5'>
                {project.techStack?.map((tech, i) => (
                  <span
                    key={i}
                    className='px-4 py-2 rounded-2xl bg-white/[0.03] text-malibu-100 text-[11px] font-bold border border-white/5 hover:border-malibu-500/30 hover:bg-white/[0.05] transition-all cursor-default'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Main Description */}
            <section className='space-y-4 max-w-2xl'>
              <div className='flex items-center justify-center gap-3 mb-2 opacity-50'>
                <div className='h-px w-8 bg-malibu-500' />
                <h4 className='text-white text-xs font-bold uppercase tracking-widest'>
                  {t('descriptionTitle')}
                </h4>
                <div className='h-px w-8 bg-malibu-500' />
              </div>
              <p className='text-malibu-50/90 text-base sm:text-lg leading-relaxed font-normal'>
                {t.has(`description.${project.slug}`) ? t(`description.${project.slug}`) : project.description}
              </p>
            </section>

            {/* Why Reasoning (Centered Block) */}
            {t.has(`reasoning.${project.slug}`) && (
              <section className='w-full p-8 rounded-xl bg-white/[0.02] border border-white/5 text-center'>
                <h4 className='text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4'>
                  {t('why')}
                </h4>
                <p className='text-malibu-50/80 text-base sm:text-lg leading-relaxed font-medium italic max-w-2xl mx-auto'>
                  "{t(`reasoning.${project.slug}`)}"
                </p>
              </section>
            )}

            {/* CTA Buttons - Centered */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4'>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-malibu-600 hover:bg-malibu-500 text-white font-bold text-sm transition-all active:scale-95 w-full sm:w-auto'
                >
                  {t('liveSite')}
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
                    <polyline points='15 3 21 3 21 9'></polyline>
                    <line x1='10' y1='14' x2='21' y2='3'></line>
                  </svg>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-malibu-50 font-bold text-sm transition-all active:scale-95 w-full sm:w-auto'
                >
                  {t('viewRepository')}
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
