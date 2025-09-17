"use client";

import React from "react";
import { sendContactForm } from "@/data/dataApi";
import { Button } from "@/app/(components)/ui/Button";
import { Section } from "@/app/(components)/layout/Section";
import { errorMessage } from "@/lib/errors";

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
      setError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="contact" title="Contact">
      <form
        onSubmit={handleSubmit}
        data-testid="contact-form"
        className="mx-auto max-w-xl rounded-2xl border border-foreground/10 bg-foreground/[0.04] shadow-sm p-6 backdrop-blur transition-shadow hover:shadow-md"
      >
        <div className="space-y-4">
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-foreground/15 bg-background/70 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 shadowm-sm focus-visible: outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45 "
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
            className="w-full rounded-lg border border-foreground/15 bg-background/70 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 shadow-sm
            focus-visible: outline-none focus-visible: ring-2 focus-visible:ring-indigo-500/45 "
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
            className="w-full rounded-lg border border-foreground/15 bg-background/70 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 shadow-s
            focus-visible: outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/45
            "
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
            className="block w-full text-sm text-foreground file:mr-3 file:rounded-md 
            file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white
            hover:file:bg-indigo-500"
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

        <Button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="w-full sm:w-auto"
        >
          Send Message
        </Button>
      </form>
    </Section>
  );
}
