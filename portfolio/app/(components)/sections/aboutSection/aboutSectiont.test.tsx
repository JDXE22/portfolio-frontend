import { render, screen } from "@testing-library/react";
import AboutSection from "./aboutSection";

test("Render about section", () => {
  render(<AboutSection />);
  const element = screen.getByText(/About Me/i);
  expect(element).toBeDefined();
});
