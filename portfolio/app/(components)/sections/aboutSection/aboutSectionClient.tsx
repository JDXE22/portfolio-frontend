"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { AboutInfo } from "@/types/types";
import { Modal } from "@/app/(components)/ui/Modal";

export default function AboutClient({ items }: { items: AboutInfo[] }) {
  const t = useTranslations("about");

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<AboutInfo | null>(null);

  const openDetails = (info: AboutInfo) => {
    setSelected(info);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
    setSelected(null);
  };

  if (items.length === 0) {
    return <p>{t("empty")}</p>;
  }
  return (
    <div>
      <h2>{t("sectionTitle")}</h2>
      {items.map((info) => (
        <div key={info.headline}>
          <h3>{info.headline}</h3>
          <p>{info.bio}</p>

          {info.skills?.length > 0 && (
            <>
              <h4>{t("skills")}</h4>
              <ul>
                {info.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}

      <Modal
        open={isOpen}
        onClose={close}
        title={selected ? selected.headline : t("modal.title")}
        showCloseButton
      >
        {selected && (
          <div className="space-y-3">
            <p className="text-sm text-foreground/80">{selected.bio}</p>

            {selected.education && (
              <>
                <h5 className="font-medium">{t("education")}</h5>
                <ul>
                  {selected.education.map((e, i) => (
                    <li key={i}>
                      <strong>{e.degree}</strong> — {e.institution}{" "}
                      {e.duration ? `(${e.duration})` : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {selected.certifications?.length > 0 && (
              <>
                <h5 className="font-medium">{t("certifications")}</h5>
                <ul>
                  {selected.certifications.map((c, i) => (
                    <li key={i}>
                      {c.title} — {c.issuer} {c.date ? `(${c.date})` : ""}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={close} className="px-3 py-1 rounded bg-gray-100">
                {t("modal.close")}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
