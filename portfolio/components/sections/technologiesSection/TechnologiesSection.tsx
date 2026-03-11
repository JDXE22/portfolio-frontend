import { Section } from '@/components/layout/Section';
import { getTechStack } from '@/data/dataApi';
import { StackCategory } from '@/types/tech.types';
import TechnologiesSectionClient from './TechnologiesSectionClient';

export const CATEGORY_ORDER: StackCategory[] = [
  'languages',
  'frontend',
  'backend',
  'tooling',
  'security',
];

export default async function TechnologiesSection() {
  const technologies = await getTechStack();

  return (
    <Section id='technologies' align='center'>
      <TechnologiesSectionClient
        technologies={technologies}
        categoryOrder={CATEGORY_ORDER}
      />
    </Section>
  );
}
