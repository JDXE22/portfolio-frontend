"use client";

import React from "react";
import { sendContactForm } from "@/data/projects";
import { Button } from "@/app/(components)/ui/Button";
import { Section } from "@/app/(components)/layout/Section";

export default function ContactSection() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(event.target.files ?? []));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const data = new FormData(event.currentTarget);
    files.forEach((f) => data.append("files", f));

    try {
      const res = await sendContactForm(data);
      setSuccess(res?.message ?? "Thanks! I’ll get back to you soon.");
      event.currentTarget.reset();
      setFiles([]);
    } catch (e) {
      setError(
        typeof e === "object" && e !== null && "message" in e
          ? e.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="contact" title="Contact">
      <form
        onSubmit={handleSubmit}
        data-testid="contact-form"
        className="space-y-4"
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full rounded-md border p-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="files" className="sr-only">
            Attachments
          </label>
          <input
            id="files"
            name="files"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {error && (
          <p
            role="alert"
            data-testid="contact-error"
            className="text-sm text-red-500"
          >
            {error}
          </p>
        )}
        {success && (
          <p
            role="status"
            data-testid="contact-success"
            className="text-sm text-emerald-500"
          >
            {success}
          </p>
        )}

        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          Send Message
        </Button>
      </form>
    </Section>
  );
}
