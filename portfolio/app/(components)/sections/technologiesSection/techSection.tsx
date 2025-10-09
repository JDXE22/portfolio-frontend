import { Section } from '@/app/(components)/layout/Section';
import { getTechStack } from '@/data/dataApi';
import { StackCategory } from '@/types/types';
import TechClientSection from './techClientSection';

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
    <Section id='technologies' equalHeight align='center'>
      <TechClientSection
        technologies={technologies}
        categoryOrder={CATEGORY_ORDER}
      />
    </Section>
  );
}
