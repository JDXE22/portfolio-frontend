import { render, screen } from "@testing-library/react";
import AboutSection from "./aboutSection";

test("Render about section", async () => {
  const ui = await AboutSection();
  render(ui);

  expect(screen.getByText(/About-me/i)).toBeDefined();
});
