'use client';
import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      className={classNameGenerator(
        'group relative rounded-2xl overflow-hidden transition-all duration-500',
        featured ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[400px]',
      )}>
      {/* Gradient Overlay */}
      <div className='absolute bottom-0 left-0 right-0 z-20 p-8 space-y-4 transform group-hover: translate-y-0 transition-transform duration-500'>
        <div className='flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
          {project.techStack?.slice(0, featured ? 5 : 3).map((tech, i) => (
            <span
              key={i}
              className='px-3 py-1 rounded-full bg-malibu-800/80 backdrop-blur-sm border border-malibu-600/40 text-malibu-100 text-xs font-medium'>
              {tech}
            </span>
          ))}
        </div>
        {/* Title & Description */}
        <h3
          className={classNameGenerator(
            'font-bold tex-white',
            featured ? 'text-3xl' : 'text-2xl',
          )}>
          {project.title}
        </h3>

        <p className='text-foreground/90 text-base line-clamp-2 group-hover:opacity-100 transition-opacity duration-500 delay-200'>
          {project.description}
        </p>

        {/* CTAs */}
        <div className='flex gap-4 pt-4 group-hover: opacity-100 transition-opacity duration-500 delay-200'>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-6 py-2.5 rounded-lg bg-malibu-600 hover: bg-malibu-500 text-white font-medium transition-colors hover: shadow-xl'>
              View Live →
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='px-6 py-2.5 rounded-lg border border-malibu-400/60 hover:border-malibu-400 text-malibu-100 font-medium transition-colors backdrop-blur-sm'>
              View Code →
            </a>
          )}
          <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'>
            <div className='absolute inset-0 bg-gradient-to-t from-malibu-600/20 via-transparent to-transparent' />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
