'use client';
import { StackCategory, TechStack } from '@/types/types';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

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
    <div className='py-12 px-4 sm:px-6 lg:px-8'>
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
              {grouped[category].map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  className='group flex flex-col items-center justify-center relative'
                  style={{ minHeight: '150px' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: 'easeOut',
                  }}>
                  <div className='transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 flex flex-col items-center'>
                    <img
                      src={tech.iconPublicId}
                      alt={tech.name}
                      className='w-16 h-16 cursor-pointer'
                    />
                  </div>
                  <span className='pointer-events-none mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-200 bg-malibu-700 text-malibu-50 rounded px-3 py-1 whitespace-nowrap z-10 text-sm text-center shadow-lg'>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
