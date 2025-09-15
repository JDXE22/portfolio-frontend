import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactSection from "./contactSection";

vi.mock("Contact form does connect to API", () => ({
  sendContactForm: vi.fn().mockResolvedValue({ success: true }),
}));

describe("ContactSection", () => {
  test("renders contact section", () => {
    render(<ContactSection />);
  });
  test("renders contact form elements", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });
});
