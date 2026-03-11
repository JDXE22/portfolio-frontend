import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { ProjectCarousel } from './ProjectCarousel';
import type { CarouselSlide, IProject } from '@/types/types';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === 'slideIndicator' && params)
      return `${params.current} / ${params.total}`;
    return key;
  },
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(
      (
        { children, ...rest }: React.HTMLAttributes<HTMLDivElement>,
        ref: React.Ref<HTMLDivElement>,
      ) => (
        <div ref={ref} {...rest}>
          {children}
        </div>
      ),
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock('@/app/(components)/ui/FeaturedProjectCard', () => ({
  FeaturedProjectCard: ({ project }: { project: IProject }) => (
    <div data-testid='featured-card'>{project.title}</div>
  ),
}));

const makeProject = (id: string): IProject => ({
  id,
  slug: `project-${id}`,
  title: `Project ${id}`,
  description: `Desc ${id}`,
  techStack: ['React'],
  liveStatus: 'Live',
  difficultyLevel: 'Easy',
  reasoning: '',
});

const makeSlides = (n: number): CarouselSlide[] => [
  ...Array.from({ length: n }, (_, i) => ({
    type: 'project' as const,
    data: makeProject(String(i + 1)),
  })),
  { type: 'more-projects' as const },
];

describe('ProjectCarousel', () => {
  test('renders the carousel landmark with correct aria-label', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    const region = screen.getByRole('region', { name: /projects carousel/i });
    expect(region).toBeInTheDocument();
  });

  test('renders data-testid="projects-carousel"', () => {
    render(<ProjectCarousel slides={makeSlides(1)} />);
    expect(screen.getByTestId('projects-carousel')).toBeInTheDocument();
  });

  test('shows the first project slide on initial render', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  test('Next button advances to the next slide', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  test('Previous button goes back to the previous slide', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    const prevBtn = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  test('Previous button is disabled on the first slide', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    const prevBtn = screen.getByRole('button', { name: /previous/i });
    expect(prevBtn).toBeDisabled();
  });

  test('Next button is disabled on the last slide (more-projects)', () => {
    const slides = makeSlides(1);
    render(<ProjectCarousel slides={slides} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(nextBtn).toBeDisabled();
  });

  test('last slide renders the more-projects slide', () => {
    const slides = makeSlides(1);
    render(<ProjectCarousel slides={slides} />);
    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);
    expect(screen.getByTestId('more-projects-slide')).toBeInTheDocument();
  });

  test('aria-live region is present', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    const live = document.querySelector('[aria-live="polite"]');
    expect(live).toBeInTheDocument();
  });

  test('ArrowRight key navigates to next slide', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('Project 2')).toBeInTheDocument();
  });

  test('ArrowLeft key navigates to previous slide', () => {
    render(<ProjectCarousel slides={makeSlides(2)} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });
});
