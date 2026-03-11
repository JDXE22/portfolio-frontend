import { Section } from '@/components/layout/Section';
import { getAboutMeInfo } from '@/data/dataApi';
import { AboutInfo } from '@/types/about.types';
import AboutSectionClient from '@/components/sections/aboutSection/AboutSectionClient';

export default async function AboutSection() {
  const aboutInfo = await getAboutMeInfo();
  const items: AboutInfo[] =
    Array.isArray(aboutInfo) && aboutInfo.length > 0 ? aboutInfo : [];

  return (
    <Section id='about' align='center' noMinHeight>
      <AboutSectionClient items={items} />
    </Section>
  );
}
