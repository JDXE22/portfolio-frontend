import { render, screen } from "@testing-library/react";
import AboutSection from "./aboutSection";

test("Render about section", async () => {
  const ui = await AboutSection();
  console.log(ui);
  render(ui);

  expect(screen.getByText(/About Me/i)).toBeDefined();
});
