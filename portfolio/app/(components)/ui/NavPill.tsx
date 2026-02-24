'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { smoothScrollToId } from '@/lib/scroll';

const SECTIONS = [
  { id: 'hero', labelKey: 'hero.nav' },
  { id: 'about', labelKey: 'about.sectionTitle' },
  { id: 'technologies', labelKey: 'technologies.sectionTitle' },
  { id: 'projects', labelKey: 'projects.sectionTitle' },
  { id: 'contact', labelKey: 'contact.sectionTitle' },
] as const;

export function NavPill() {
  const t = useTranslations();
  const [active, setActive] = useState<string>('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trackSection = () => {
      const threshold = window.innerHeight * 0.45;
      let current: (typeof SECTIONS)[number]['id'] = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', trackSection, { passive: true });
    trackSection();
    return () => window.removeEventListener('scroll', trackSection);
  }, []);

  return (
    <nav
      aria-label='Section navigation'
      className={`fixed right-5 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-4 pointer-events-none'
      }`}>
      {/* Frosted pill container — groups all dots into one readable unit */}
      <div className='flex flex-col items-center gap-3 rounded-full border border-foreground/10 bg-background/75 px-2.5 py-4 shadow-sm backdrop-blur-md'>
        {SECTIONS.map(({ id, labelKey }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type='button'
              aria-label={`Go to ${t(labelKey)} section`}
              onClick={() => smoothScrollToId(id)}
              className='group relative flex h-5 w-5 items-center justify-center'>
              {/* Tooltip */}
              <span
                className='
                  pointer-events-none absolute right-full mr-3 whitespace-nowrap
                  rounded-md border border-foreground/10 bg-background/90 px-2.5 py-1
                  text-xs font-medium text-foreground/80 shadow-sm backdrop-blur-sm
                  opacity-0 translate-x-1
                  transition-all duration-200
                  group-hover:opacity-100 group-hover:translate-x-0
                '>
                {t(labelKey)}
              </span>
              {/* Dot */}
              <span
                className={`
                  block rounded-full transition-all duration-300
                  ${
                    isActive
                      ? 'h-2.5 w-2.5 bg-malibu-400 shadow-[0_0_8px_rgba(79,175,225,0.65)]'
                      : 'h-1.5 w-1.5 bg-foreground/50 group-hover:h-2 group-hover:w-2 group-hover:bg-malibu-400/70'
                  }
                `}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
