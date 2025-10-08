import { Section } from '@/app/(components)/layout/Section';
import { getTechStack } from '@/data/dataApi';
import { StackCategory, TechStack } from '@/types/types';

const CATEGORY_ORDER: StackCategory[] = [
  'frontend',
  'backend',
  'tooling',
  'security',
];

export default async function TechnologiesSection() {
  let tecnologies: TechStack[] = [];

  try {
    tecnologies = await getTechStack();
  } catch (err) {
    // optional: console.error so you can see server output
    // console.error('getTechStack error', err);
    tecnologies = [];
  }

  const grouped: Record<StackCategory, TechStack[]> = tecnologies.reduce(
    (acc, tech) => {
      (acc[tech.category] ||= []).push(tech);
      return acc;
    },
    {} as Record<StackCategory, TechStack[]>
  );

  return (
    <Section id="technologies" equalHeight align="center">
      <div>
        {/* use a real title (or translations) instead of an empty expression */}
        <h2 className="text-3xl font-bold mb-6">Technologies</h2>

        <div className="space-y-8">
          {CATEGORY_ORDER.filter((category) => grouped[category]?.length).map(
            (category) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-4 text-malibu-400">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {grouped[category].map((tech) => (
                    <div key={tech.name} className="flex flex-col items-center">
                      <img
                        src={tech.iconPublicId}
                        alt={tech.name}
                        className="w-12 h-12 mb-2"
                      />
                      <span className="text-sm text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Section>
  );
}
