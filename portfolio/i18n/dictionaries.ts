export type SupportedLanguage = "en" | "es";

export const dictionaries = {
  en: {
    hero: {
      title: "Behind Every Code, There's a Story",
      subtitle: "Welcome to David's Portfolio",
      buttons: {
        projects: "Projects",
        contact: "Contact",
        about: "About Me",
      },
    },
  },
  es: {
    hero: {
      title: "Tras Cada Línea de Código Hay una Historia",
      subtitle: "Bienvenido al Portafolio de David",
      buttons: {
        projects: "Proyectos",
        contact: "Contacto",
        about: "Sobre Mí",
      },
    },
  },
} as const;

export type HeroMessages =
  | typeof dictionaries.en.hero
  | typeof dictionaries.es.hero;

export function getDictionary(lang: SupportedLanguage): { hero: HeroMessages } {
  return dictionaries[lang] || dictionaries.en;
}
