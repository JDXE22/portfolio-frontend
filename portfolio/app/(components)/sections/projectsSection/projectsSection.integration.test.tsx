import { render, screen, within } from "@testing-library/react";
import ProjectsSection from "./projectsSection";
import { vi } from "vitest";
import { serverEnv } from "@/config/env";
import { getProjects } from "@/data/projects";

const baseUrl = serverEnv.PUBLIC_DB_CONNECTION;
(baseUrl ? describe : describe.skip)(
  "Projects Section (integration, real API)",
  () => {
    test("renders real projects from API", async () => {
      const data = await getProjects();

      const ui = await ProjectsSection();
      render(ui);

      if (data.length === 0) {
        expect(screen.getByTestId("projects-empty")).toBeInTheDocument();
      } else {
        const grid = screen.getByTestId("projects-grid");
        const cards = within(grid).getAllByTestId("project-card");
        expect(cards).toHaveLength(data.length);

        expect(screen.getByText(data[0].title)).toBeInTheDocument();
      }
    });
  }
);
