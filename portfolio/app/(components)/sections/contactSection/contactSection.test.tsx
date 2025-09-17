import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/data/projects", () => ({
  __esModule: true,
  sendContactForm: vi
    .fn()
    .mockResolvedValue({ message: "Message sent successfully" }),
}));

import ContactSection from "./contactSection";
import { sendContactForm } from "@/data/dataApi";

afterEach(() => vi.clearAllMocks());

describe("ContactSection", () => {
  test("renders contact form elements", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });
  test("form gets submitted correctly", async () => {
    render(<ContactSection />);
    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    await userEvent.type(
      screen.getByLabelText(/message/i),
      "Hello there! this is a test message"
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Send Message/i })
    );
    expect(sendContactForm).toHaveBeenCalledTimes(1);
    expect(await screen.findByTestId("contact-success")).toBeInTheDocument();
  });
});
