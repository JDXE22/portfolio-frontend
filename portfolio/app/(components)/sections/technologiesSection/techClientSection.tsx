'use client';
import Image from 'next/image';
import { StackCategory, TechStack } from '@/types/types';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { motion } from 'framer-motion';

type Props = {
  technologies: TechStack[];
  categoryOrder: StackCategory[];
};

const WIDE_CATEGORIES: StackCategory[] = ['languages'];

export default function TechClientSection({
  technologies: items,
  categoryOrder,
}: Props) {
  const t = useTranslations('technologies');

  const grouped: Record<StackCategory, TechStack[]> = useMemo(() => {
    return items.reduce(
      (acc, tech) => {
        (acc[tech.category] ||= []).push(tech);
        return acc;
      },
      {} as Record<StackCategory, TechStack[]>,
    );
  }, [items]);

  const visibleCategories = useMemo(
    () => categoryOrder.filter((cat) => (grouped[cat] || []).length > 0),
    [categoryOrder, grouped],
  );

  const labelFor = (cat: StackCategory) => {
    const key = `categories.${cat}`;
    const translated = t ? t(key as Parameters<typeof t>[0]) : '';
    if (!translated || translated === key) {
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
    return translated;
  };

  return (
    <div className='space-y-8'>
      {/* Section heading */}
      <h2 className='text-headline text-center text-foreground'>
        {t('sectionTitle')}
      </h2>

      {/* Category grid — languages full-width, rest fill 2 cols */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {visibleCategories.map((category, catIdx) => {
          const isWide = WIDE_CATEGORIES.includes(category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: catIdx * 0.08,
                ease: 'easeOut',
              }}
              className={`section-card p-6 ${isWide ? 'md:col-span-2' : ''}`}>
              {/* Category label row */}
              <div className='mb-6 flex items-center gap-3'>
                <span className='inline-flex shrink-0 items-center rounded-full border border-malibu-400/30 bg-malibu-950/50 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-malibu-300'>
                  {labelFor(category)}
                </span>
                <div className='h-px flex-1 bg-gradient-to-r from-malibu-400/25 to-transparent' />
              </div>

              {/* Icons */}
              <div className='flex flex-wrap justify-center gap-x-8 gap-y-6'>
                {grouped[category].map((tech, idx) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                      duration: 0.35,
                      delay: catIdx * 0.08 + idx * 0.055,
                      ease: 'easeOut',
                    }}
                    className='group flex flex-col items-center gap-2'>
                    {/* Icon — zoom + lift on hover */}
                    <div className='flex h-[72px] w-[72px] items-center justify-center transition-transform duration-200 ease-out group-hover:-translate-y-1.5 group-hover:scale-125'>
                      <Image
                        src={tech.iconPublicId}
                        alt={tech.name}
                        width={72}
                        height={72}
                        className='object-contain drop-shadow-sm'
                      />
                    </div>
                    {/* Name — muted at rest, highlighted on hover */}
                    <span className='text-[11px] font-medium text-foreground/45 transition-colors duration-200 group-hover:text-malibu-300'>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
