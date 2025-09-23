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

export function HeroSection({ lang = "en" }: HeroProps) {
  const dictionary = getDictionary(lang ?? userLanguage).hero;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Section
      id="hero"
      className="relative flex min-h-[68vh] items-center justify-center px-6 pt-28 pb-20 overflow-hidden"
    >
      <Particles
        particleColors={["#ffffff", "#a5b4fc", "#f0abfc"]}
        particleCount={240}
        particleSpread={14}
        speed={0.25}
        particleBaseSize={110}
        moveParticlesOnHover
        alphaParticles
        disableRotation={false}
      />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {dictionary?.title}{" "}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl">
          {dictionary?.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => scrollTo("projects")}
            aria-label="Jump to Projects"
          >
            {dictionary?.buttons.projects}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => scrollTo("contact")}
            aria-label="Jump to Contact"
          >
            {dictionary?.buttons.contact}
          </Button>
        </div>
      </div>
    </Section>
  );
}
