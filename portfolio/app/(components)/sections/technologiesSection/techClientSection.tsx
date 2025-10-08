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
      <h2 className='text-3xl font-bold mb-6'>{t('technologies')}</h2>

      <div className='space-y-8'>
        {visibleCategories.map((category) => (
          <div key={category}>
            <h3 className='text-xl font-semibold mb-4 text-malibu-400'>
              {labelFor(category)}
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
              {grouped[category].map((tech) => (
                <div key={tech.name} className='flex flex-col items-center'>
                  <img
                    src={tech.iconPublicId}
                    alt={tech.name}
                    className='w-12 h-12 mb-2'
                  />
                  <span className='text-sm text-center'>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
