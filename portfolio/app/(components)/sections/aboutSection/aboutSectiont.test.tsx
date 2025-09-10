import { render, screen } from "@testing-library/react";
import AboutSection from "./aboutSection";

test("Render about section", async () => {
  const ui = await AboutSection();
  console.log(ui);
  render(ui);

  expect(screen.getByText(/About Me/i)).toBeDefined();
  expect(
    screen.getByText(
      /I’m a Full‑Stack developer specializing in backend systems/i
    )
  ).toBeDefined();
  expect(screen.getAllByTestId("skills-id").length).toBe(5);
});
