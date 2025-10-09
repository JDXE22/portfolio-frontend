'use client';
import { StackCategory, TechStack } from '@/types/types';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type Props = {
  technologies: TechStack[];
  categoryOrder: StackCategory[];
};

export default function TechClientSection({
  technologies: items,
  categoryOrder,
}: Props) {
  const t = useTranslations('technologies');

  const grouped: Record<StackCategory, TechStack[]> = useMemo(() => {
    return items.reduce((acc, tech) => {
      (acc[tech.category] ||= []).push(tech);
      return acc;
    }, {} as Record<StackCategory, TechStack[]>);
  }, [items]);

  const visibleCategories = useMemo(
    () => categoryOrder.filter((cat) => (grouped[cat] || []).length > 0),
    [categoryOrder, grouped]
  );

  const labelFor = (cat: StackCategory) => {
    const key = `categories.${cat}`;
    const translated = t ? t(key) : '';

    if (!translated || translated === key) {
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    return translated;
  };

  return (
    <div>
      <h2 className='text-3xl font-bold mb-6 text-center'>
        {t('sectionTitle')}
      </h2>
      <div className='space-y-8 text-center'>
        {visibleCategories.map((category) => (
          <div key={category}>
            <h3 className='text-xl font-semibold mb-4 text-malibu-400'>
              {labelFor(category)}
            </h3>
            <div className='flex flex-wrap gap-8 justify-center'>
              {grouped[category].map((tech) => (
                <div
                  key={tech.name}
                  className='flex flex-col items-center relative justify-center'
                  style={{ minHeight: '130px' }}
                >
                  <div className='group transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2'>
                    <img
                      src={tech.iconPublicId}
                      alt={tech.name}
                      className='w-18 h-18 cursor-pointer'
                    />
                    <span
                      className='pointer-events-none mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-200 bg-malibu-700 text-malibu-50 rounded px-3 py-1 whitespace-nowrap z-10 text-sm text-center shadow-lg translate-y-0 block'
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
}
