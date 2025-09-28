"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { AboutInfo } from "@/types/types";

export default function AboutClient({ items }: { items: AboutInfo[] }) {
  const t = useTranslations("about");

  if (items.length === 0) {
    return <p>{t("empty")}</p>;
  }
  const skills = t.raw("skillsList") as string[];

  return (
    <div className="grid gap-6">
      {items.map((info) => (
        <div
          key={info.headline}
          className="rounded-lg border border-foreground/10 bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            {t("headline")}
          </h3>
          <p className="text-foreground/80">{t("bio")}</p>

          {info.avatarIconUrl && (
            <img
              src={info.avatarIconUrl}
              alt={`${info.headline} avatar`}
              className="mt-4 h-32 w-32 rounded-full object-cover"
            />
          )}

          {skills.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-1 font-semibold text-foreground/90">
                {t("skills")}:
              </h4>
              <ul className="list-disc list-inside text-foreground/80">
                {skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {info.techStack?.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-2 font-semibold text-foreground/90">
                {t("techStack")}:
              </h4>
              <ul className="flex flex-wrap items-center gap-3">
                {info.techStack.map((tech, i) => (
                  <li
                    key={i}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-md border border-foreground/10 bg-foreground/[0.05] p-1 transition-colors hover:bg-foreground/[0.08] focus-within:bg-foreground/[0.08]"
                  >
                    {tech.iconPublicId && (
                      <img
                        src={tech.iconPublicId}
                        alt={tech.name}
                        aria-hidden="true"
                        className="h-7 w-7 object-contain"
                      />
                    )}
                    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 scale-0 rounded bg-black px-2 py-1 text-xs text-white opacity-0 shadow transition-all group-hover:scale-100 group-hover:opacity-100">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links */}
          {info.socialLinks?.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-1 font-semibold text-foreground/90">
                {t("socialLinks")}:
              </h4>
              <ul className="flex flex-col gap-2">
                {info.socialLinks.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-foreground hover:text-indigo-500 no-underline"
                      style={{ textDecoration: "none" }}
                    >
                      {link.iconPublicId && (
                        <img
                          src={link.iconPublicId}
                          alt={link.name}
                          className="h-7 w-7"
                        />
                      )}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
