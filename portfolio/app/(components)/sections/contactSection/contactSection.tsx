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
  const [showCc, setShowCc] = React.useState(false);
  const [showBcc, setShowBcc] = React.useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const inputBase =
    "w-full rounded-md border border-foreground/15 bg-background/70 px-3 py-2.5 text-sm text-foreground " +
    "placeholder:text-foreground/40 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:opacity-50";

  const lineInput =
    "flex-1 min-w-[10rem] bg-transparent outline-none border-none px-0 py-1 text-sm text-foreground placeholder:text-foreground/40";

  const clearField = (name: string) => {
    const element = formRef.current?.elements.namedItem(
      name
    ) as HTMLInputElement | null;
    if (element) element.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFiles(Array.from(e.target.files ?? []));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const formEl = event.currentTarget;

    const data = new FormData(event.currentTarget);
    files.forEach((f) => data.append("files", f));

    try {
      const res = await sendContactForm(data);
      setSuccess(res?.message ?? "Thanks! I’ll get back to you soon.");
      formEl.reset();
      setFiles([]);
      setShowCc(false);
      setShowBcc(false);
    } catch (e) {
      setError(errorMessage(e));
      setSuccess(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section id="contact" title="Contact Me" align="center">
      <div className="group relative mx-auto max-w-xl">
        <div
          className="
            pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur
            transition-opacity duration-300
            bg-[conic-gradient(from_140deg,rgba(99,102,241,0.45),rgba(168,85,247,0.35),rgba(236,72,153,0.35),rgba(16,185,129,0.45),rgba(99,102,241,0.45))]
            group-hover:opacity-40 group-focus-within:opacity-60
          "
        />
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          data-testid="contact-form"
          className="
            relative rounded-2xl border border-foreground/12 p-8 shadow-sm backdrop-blur-sm
            transition-colors
            bg-background/65
            bg-[radial-gradient(circle_at_20%_18%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_80%_82%,rgba(236,72,153,0.16),transparent_60%)]
            hover:border-foreground/20
            focus-within:border-indigo-400/45
          "
        >
          <div className="flex flex-col gap-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputBase}
              />
            </div>

            {/* Email / CC / BCC */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <div
                className="
                  rounded-lg border border-foreground/15 px-3 py-2 shadow-inner overflow-hidden
                  bg-background/50
                  bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.15),transparent_55%),radial-gradient(circle_at_90%_90%,rgba(168,85,247,0.12),transparent_60%)]
                  focus-within:border-indigo-400/40 transition
                "
                role="group"
                aria-labelledby="email"
              >
                {/* Primary email row */}
                <div className="flex flex-wrap items-center gap-2 pb-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="primary@example.com"
                    className={lineInput}
                  />
                  <div className="ml-auto flex gap-4 pr-1">
                    {!showCc && (
                      <button
                        type="button"
                        onClick={() => setShowCc(true)}
                        className="text-[11px] font-medium text-indigo-400 underline decoration-dotted underline-offset-2 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded px-0"
                      >
                        Add CC
                      </button>
                    )}
                    {!showBcc && (
                      <button
                        type="button"
                        onClick={() => setShowBcc(true)}
                        className="text-[11px] font-medium text-indigo-400 underline decoration-dotted underline-offset-2 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded px-0"
                      >
                        Add BCC
                      </button>
                    )}
                  </div>
                </div>

                {/* CC row */}
                {showCc && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-foreground/10 py-2">
                    <span className="w-9 shrink-0 text-[11px] font-semibold tracking-wide text-foreground/45">
                      CC
                    </span>
                    <input
                      id="cc"
                      name="cc"
                      type="text"
                      placeholder="optional1@example.com, optional2@example.com"
                      className={lineInput}
                    />
                    <button
                      type="button"
                      aria-label="Remove CC"
                      onClick={() => {
                        clearField("cc");
                        setShowCc(false);
                      }}
                      className="ml-auto rounded px-1 text-foreground/40 transition hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* BCC row */}
                {showBcc && (
                  <div className="flex flex-wrap items-center gap-2 border-t border-foreground/10 py-2">
                    <span className="w-9 shrink-0 text-[11px] font-semibold tracking-wide text-foreground/45">
                      BCC
                    </span>
                    <input
                      id="bcc"
                      name="bcc"
                      type="text"
                      placeholder="hidden@example.com"
                      className={lineInput}
                    />
                    <button
                      type="button"
                      aria-label="Remove BCC"
                      onClick={() => {
                        clearField("bcc");
                        setShowBcc(false);
                      }}
                      className="ml-auto rounded px-1 text-foreground/40 transition hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className={inputBase + " resize-y min-h-[160px]"}
              />
            </div>

            {/* Attachments & Actions */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <label
                  htmlFor="files"
                  className="inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                >
                  Choose files
                </label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <span className="text-xs text-foreground/60">
                  {files.length
                    ? `${files.length} file${
                        files.length > 1 ? "s" : ""
                      } selected`
                    : ""}
                </span>
              </div>

              {error && (
                <p
                  role="alert"
                  data-testid="contact-error"
                  className="text-sm font-medium text-red-500"
                >
                  {error}
                </p>
              )}
              {success && (
                <p
                  role="status"
                  data-testid="contact-success"
                  className="text-sm font-medium text-emerald-500"
                >
                  {success}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="w-full max-w-xs"
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Section>
  );
}
