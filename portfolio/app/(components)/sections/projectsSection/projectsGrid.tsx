'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/app/(components)/ui/Modal';
import type { IProject, Props } from '@/types/types';
import { difficultyLevelClass } from '@/lib/difficultyClass';
import { FeaturedProjectCard } from '../../ui/FeaturedProjectCard';

const hasLiveUrl = (p: IProject): p is IProject & { liveUrl: string } =>
  p.liveStatus === 'Live' &&
  typeof p.liveUrl === 'string' &&
  p.liveUrl.length > 0;

export default function ProjectsGrid({ projects }: Props) {
  const t = useTranslations('projects');

  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<IProject | null>(
    null,
  );

  const onClose = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section data-testid='projects-grid' className='max-w-6xl mx-auto px-4'>
        <header className='mb-8 text-center'>
          <h2 className='text-2xl sm:text-3xl font-semibold tracking-tight'>
            {t('sectionTitle')}
          </h2>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {projects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
              index={index}
            />
          ))}
        </div>
      </section>

      <Modal
        open={isOpen}
        onClose={onClose}
        title={selectedProject?.title}
        showCloseButton>
        {selectedProject && (
          <div className='space-y-3'>
            <p className='text-sm leading-relaxed text-foreground/80'>
              {t(`description.${selectedProject.slug}`)}
            </p>

            {selectedProject.difficultyLevel && (
              <span
                aria-label={`Difficulty level: ${selectedProject.difficultyLevel}`}
                className={`${difficultyLevelClass(
                  selectedProject.difficultyLevel,
                )} rounded-full px-2 py-0.5 text-[11px]`}>
                {t('modal.difficulty')}{' '}
                {t(`difficultyLevel.${selectedProject.difficultyLevel}`)}
              </span>
            )}

            {selectedProject.techStack?.length > 0 && (
              <ul className='flex flex-wrap gap-2'>
                {selectedProject.techStack.map((tech, i) => (
                  <li
                    key={`${selectedProject.id}-tech-${i}`}
                    className='rounded-full bg-foreground/10 px-3 py-1 text-xs text-foreground'>
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            {selectedProject.reasoning && (
              <div>
                <h5 className='font-medium'>{t(`why`)}</h5>
                <p className='text-sm leading-relaxed text-foreground/80'>
                  {t(`reasoning.${selectedProject.slug}`)}
                </p>
              </div>
            )}

            {selectedProject.imgUrl && (
              <img
                src={selectedProject.imgUrl}
                alt={`${selectedProject.title} image`}
                loading='lazy'
                decoding='async'
                className='mt-3 w-full object-cover rounded-md'
              />
            )}

            <div className='flex gap-3'>
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/40 hover:opacity-80'>
                  {t('viewRepository')}
                </a>
              )}

              {hasLiveUrl(selectedProject) && (
                <a
                  href={selectedProject.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/50 hover:opacity-80'>
                  {t('liveSite')}
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
