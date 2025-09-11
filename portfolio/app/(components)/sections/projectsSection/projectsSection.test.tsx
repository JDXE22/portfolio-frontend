import { render, screen } from "@testing-library/react";
import ProjectsSection from "./projectsSection";

describe("Projects Section", () => {
  test("Render projects section with no projects", async () => {
    const ui = await ProjectsSection();
    render(ui);
    expect(screen.getByText("Projects")).toBeDefined();
    expect(screen.getByText("[]")).toBeDefined();
  });
});
