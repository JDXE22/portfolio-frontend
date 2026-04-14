'use client';

import React from 'react';
import type { IProject } from '@/types/projects.types';
import { FeaturedProjectCard } from '@/components/ui/FeaturedProjectCard';

interface ProjectSlideProps {
  project: IProject;
  index: number;
}

/**
 * ProjectSlide — wraps FeaturedProjectCard for carousel context.
 *
 * Fixed height is declared explicitly here so the carousel track never
 * causes layout shift (CLS = 0). The height is smaller than the original
 * full-height card to create the compact peek aesthetic.
 *
 * CWV note: explicit dimensions prevent CLS per web-quality-audit skill.
 */
export function ProjectSlide({ project, index }: ProjectSlideProps) {
  return (
    <div
      data-testid='project-card'
      /* Explicit height prevents CLS — fixed dimension so the carousel track
         never shifts layout between slides. */
      className='h-[480px] w-full'>
      <FeaturedProjectCard
        project={project}
        featured
        index={index}
      />
    </div>
  );
}
