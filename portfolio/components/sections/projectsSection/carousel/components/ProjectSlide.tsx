'use client';

import React from 'react';
import type { IProject } from '@/types/projects.types';
import { FeaturedProjectCard } from '@/components/ui/FeaturedProjectCard';

interface ProjectSlideProps {
  project: IProject;
  index: number;
}

export function ProjectSlide({ project, index }: ProjectSlideProps) {
  return (
    <div data-testid='project-card' className='h-[480px] w-full'>
      <FeaturedProjectCard project={project} featured index={index} />
    </div>
  );
}
