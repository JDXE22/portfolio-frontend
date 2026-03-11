import { render, screen, within } from '@testing-library/react';
import ProjectsSection from "./ProjectsSection";
import { serverEnv } from '@/config/env';
import { getProjects } from '@/data/dataApi';
import { describe, test } from 'node:test';

const baseUrl = serverEnv.PUBLIC_DB_CONNECTION;
(baseUrl ? describe : describe.skip)(
  'Projects Section (integration, real API)',
  () => {
    test('renders real projects from API', async () => {
      const data = await getProjects();

      const ui = await ProjectsSection();
      render(ui);

      if (data.length === 0) {
        expect(screen.getByTestId('projects-empty')).toBeInTheDocument();
      } else {
        const carousel = screen.getByTestId('projects-carousel');
        const cards = within(carousel).getAllByTestId('project-card');
        expect(cards.length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(data[0].title)).toBeInTheDocument();
      }
    });
  },
);
