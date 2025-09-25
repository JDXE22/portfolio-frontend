"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { AboutInfo } from "@/types/types";

export default function AboutClient({ items }: { items: AboutInfo[] }) {
  const dictionary = useTranslations("about");
  if (items.length === 0) {
    return <p>{dictionary("empty")}</p>;
  }
  return (
    <div>
      <h2>{dictionary("sectionTitle")}</h2>
      {items.map((info) => {
        return (
          <div key={info.id}>
            <h3>{info.headline}</h3>
            <p>{info.bio}</p>
            {info.skills.length > 0 && (
              <>
                <h4>{dictionary("skills")}</h4>
                <ul>
                  {info.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
