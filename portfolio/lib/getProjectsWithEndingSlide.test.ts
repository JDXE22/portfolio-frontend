import { getProjectsWithEndingSlide } from '@/lib/getProjectsWithEndingSlide';

const makeProject = (id: string): IProject => ({
  id,
  slug: `project-${id}`,
  title: `Project ${id}`,
  description: `Description for project ${id}`,
  techStack: ['React'],
  liveStatus: 'Live',
  difficultyLevel: 'Medium',
  reasoning: 'Test reasoning',
});

describe('getProjectsWithEndingSlide', () => {
  test('empty projects array → only the more-projects slide', () => {
    const result = getProjectsWithEndingSlide([]);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('more-projects');
  });

  test('N projects → N + 1 slides', () => {
    const projects = [makeProject('1'), makeProject('2'), makeProject('3')];
    const result = getProjectsWithEndingSlide(projects);
    expect(result).toHaveLength(4);
  });

  test('first N slides are project slides preserving order', () => {
    const projects = [makeProject('a'), makeProject('b')];
    const result = getProjectsWithEndingSlide(projects);
    expect(result[0]).toEqual({ type: 'project', data: projects[0] });
    expect(result[1]).toEqual({ type: 'project', data: projects[1] });
  });

  test('last slide is always the more-projects slide', () => {
    const projects = [makeProject('x'), makeProject('y')];
    const result = getProjectsWithEndingSlide(projects);
    expect(result[result.length - 1].type).toBe('more-projects');
  });

  test('does not mutate the original projects array', () => {
    const projects = [makeProject('1')];
    const original = [...projects];
    getProjectsWithEndingSlide(projects);
    expect(projects).toEqual(original);
  });
});
