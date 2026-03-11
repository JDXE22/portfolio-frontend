import { getProjects } from '@/data/dataApi';
import { Section } from '@/components/layout/Section';
import { IProject } from '@/types/projects.types';
import { ProjectCarousel } from './carousel/ProjectCarousel';
import { getProjectsWithEndingSlide } from '@/lib/getProjectsWithEndingSlide';
import { getTranslations } from 'next-intl/server';

export default async function ProjectsSection() {
  const dictionary = await getTranslations('projects');
  const projects: IProject[] = await getProjects();

  return (
    <Section id='projects' title={dictionary('sectionTitle')} align='center'>
      <div className='w-full'>
        {projects.length === 0 ? (
          <p
            data-testid='projects-empty'
            className='m-auto text-center text-foreground/50'>
            []
          </p>
        ) : (
          <ProjectCarousel slides={getProjectsWithEndingSlide(projects)} />
        )}
      </div>
    </Section>
  );
}
