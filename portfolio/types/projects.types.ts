export type LiveStatus =
  | 'Live'
  | 'Maintenance'
  | 'Down'
  | 'Development'
  | 'Planned';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type IProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  imgUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  liveStatus: LiveStatus;
  difficultyLevel: DifficultyLevel;
  reasoning: string;
};

export type ProjectSlide = { type: 'project'; data: IProject };
export type MoreProjectsSlide = { type: 'more-projects' };
export type CarouselSlide = ProjectSlide | MoreProjectsSlide;

export type ProjectsSectionProps = { projects: ReadonlyArray<IProject> };
