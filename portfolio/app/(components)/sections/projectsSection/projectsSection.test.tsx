import { render, screen } from "@testing-library/react";
import ProjectsSection from "./projectsSection";
import { vi } from "vitest";

vi.mock("@/data/projects", () => ({
  getProjects: vi.fn().mockResolvedValue([]),
}));

describe("Projects Section", () => {
  test("Renders empty state when no projects", async () => {
    const ui = await ProjectsSection();
    render(ui);
    expect(screen.getByTestId("projects-empty")).toBeDefined();
  });
});
