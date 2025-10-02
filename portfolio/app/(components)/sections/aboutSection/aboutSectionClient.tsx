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
