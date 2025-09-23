"use client";
import React from "react";
import { Button } from "@/app/(components)/ui/Button";
import Particles from "@/app/(components)/backgrounds/Background";
import { getDictionary } from "@/i18n/dictionaries";
import { HeroProps } from "@/types/types";
import { Section } from "../../layout/Section";

const userLanguage =
  typeof navigator !== "undefined"
    ? navigator.language.startsWith("es")
      ? "es"
      : "en"
    : "en";

export function HeroSection({ lang }: HeroProps) {
  const dictionary = getDictionary((lang ?? userLanguage) as any).hero;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section
      id="hero"
      className="
        relative isolate flex min-h-screen w-full flex-col items-center justify-center
        overflow-hidden px-6 pt-32 pb-24
      "
    >
      <Particles
        className="-z-10"
        particleColors={["#ffffff", "#a5b4fc", "#f0abfc"]}
        particleCount={300}
        particleSpread={14}
        speed={0.25}
        particleBaseSize={110}
        moveParticlesOnHover
        alphaParticles
        disableRotation={false}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_70%)]"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {dictionary.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl">
          {dictionary.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => scrollTo("about")}
            aria-label="Jump to About"
          >
            {dictionary.buttons.about}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => scrollTo("projects")}
            aria-label="Jump to Projects"
          >
            {dictionary.buttons.projects}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => scrollTo("contact")}
            aria-label="Jump to Contact"
          >
            {dictionary.buttons.contact}
          </Button>
        </div>
      </div>
    </Section>
  );
}
