import type { CarouselSlide, IProject } from '@/types/projects.types';

export function getProjectsWithEndingSlide(
  projects: IProject[],
): CarouselSlide[] {
  return [
    ...projects.map<CarouselSlide>((p) => ({ type: 'project', data: p })),
    { type: 'more-projects' },
  ];
}
