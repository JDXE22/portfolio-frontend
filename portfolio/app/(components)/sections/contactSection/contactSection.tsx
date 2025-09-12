"use client";
import { Section } from "@/app/(components)/layout/Section";
import { Button } from "@/app/(components)/ui/Button";
import React from "react";

export default function ContactSection() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    setFiles(selectedFiles);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    files.forEach((file) => {
      formData.append("files", file);
    });
    try {
      form.reset();
      setFiles([]);
      setSuccess("Thanks! I'll get back to you soon.");
    } catch (error) {
      setError("Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }

    // Handle form submission logic here
  };

  return (
    <Section id="contact" className="py-16" title="Contact">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
        <p className="text-center text-lg">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out!
        </p>
        <div className="mt-6">
          <form
            onSubmit={handleSubmit}
            className="mt-3 rounded-xl border border-foreground/10 bg-foreground/5 p-5 shadow-sm space-y-4 flex flex-col"
            data-testid="contact-form"
          >
            <div className="text-left">
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                name="Name"
                placeholder="Your name"
                required
                className="w-full rounded-md border border-foreground/15 bg-background p-2 text-sm outline-none focus:border-foreground/30"
              />
            </div>
            <div className="text-left">
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="Email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-md border border-foreground/15 bg-background p-2 text-sm outline-none focus:border-foreground/30"
              />
            </div>
            <div className="text-left">
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="Message"
                placeholder="Message"
                required
                rows={5}
                className="w-full rounded-md border border-foreground/15 bg-background p-2 text-sm outline-none focus:border-foreground/30"
              />
            </div>
            <div className="text-left">
              <label htmlFor="files" className="sr-only">
                Attachments
              </label>
              <input
                id="files"
                name="files"
                type="file"
                multiple
                onChange={handleFileChange}
                className="w-full rounded-md border border-foreground/15 bg-background p-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-foreground/10 file:px-3 file:py-1 file:text-foreground hover:file:bg-foreground/15"
              />
              {files.length > 0 && (
                <ul
                  className="mt-2 list-disc pl-5 text-xs text-foreground/70"
                  data-testid="files-list"
                >
                  {files.map((file, index) => (
                    <li key={`${file.name}-${index}`}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
            {error && (
              <p
                className="text-center"
                role="alert"
                data-testid="contact-error"
              >
                <span className="text-sm text-red-500">{error}</span>
              </p>
            )}
            {success && (
              <p
                className="text-sm text-emerald-500"
                role="status"
                data-testid="contact-success"
              ></p>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
                aria-busy={submitting}
                data-testid="submit-btn"
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
