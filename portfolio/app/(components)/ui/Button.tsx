"use client";
import React from "react";
import type { ButtonProps, ClassValue } from "@/types/types";

const classNameGenerator = (...cls: ClassValue[]) =>
  cls.filter(Boolean).join(" ");

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-foreground text-background hover:opacity-90 focus-visible: ring-foreground/50",
    secondary:
      "bg-background border border-foreground/15 text-foreground  hover: bg-foreground/5 focus-visible:ring-foreground/20",
    ghost:
      "text-foreground hover:bg-foreground/5 focus-visible:ring-foreground/20",
  } as const;

  const sizes = { sm: "h-9 px-3 text-sm", md: "h-10 px-4 text-sm" } as const;

  return (
    <button
      className={classNameGenerator(
        base,
        variants[variant],
        sizes[size],
        className,
        { ...rest }
      )}
    ></button>
  );
}
