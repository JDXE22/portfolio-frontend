export type SupportedLanguage = "en" | "es";

export const dictionaries = {
  en: {
    hero: {
      title: "Behind Every Code, There's a Story",
      subtitle: "Hi there! I'm David, a Full Stack Developer",
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
      subtitle: "Hola, soy David, Desarrollador Full Stack",
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
