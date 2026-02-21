import { Section } from '@/app/(components)/layout/Section';
import { getAboutMeInfo } from '@/data/dataApi';
import { AboutInfo } from '@/types/types';
import AboutClient from '@/app/(components)/sections/aboutSection/aboutSectionClient';

export default async function AboutSection() {
  const aboutInfo = await getAboutMeInfo();
  const items: AboutInfo[] =
    Array.isArray(aboutInfo) && aboutInfo.length > 0 ? aboutInfo : [];

  return (
    <Section id='about' align='center'>
      <AboutClient items={items} />
    </Section>
  );
}
