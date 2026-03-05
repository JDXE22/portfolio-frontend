'use client';
import React from 'react';
import type { Props } from '@/types/types';
import { FeaturedProjectCard } from '../../ui/FeaturedProjectCard';

export default function ProjectsGrid({ projects }: Props) {
  return (
    <div data-testid='projects-grid' className='mx-auto max-w-6xl px-0'>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {projects.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            featured={index === 0}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
