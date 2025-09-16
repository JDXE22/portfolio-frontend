"use client";
import React, { useEffect } from "react";
import { ModalProps } from "@/types/types";
import { classNameGenerator } from "@/lib/className";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className,
  header,
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={classNameGenerator(
          "relative z-10 w-[min(92vw, 700px)] rounded-lg border border-foreground/10 bg-background p-6 shadow-xl",
          showCloseButton && "pt-5",
          className
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full p-2 text-foreground/70 hover:bg-foreground/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30
          "
          >
            <span aria-hidden>x</span>
          </button>
        )}
        {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
        <div className="max-h-[70vh] overflow-auto">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}
