import AboutSection from '@/app/(components)/sections/aboutSection/aboutSection';
import ProjectsSection from '@/app/(components)/sections/projectsSection/projectsSection';
import ContactSection from '@/app/(components)/sections/contactSection/contactSection';
import { HeroSection } from '@/app/(components)/sections/heroSection/heroSection';
import TechnologiesSection from '@/app/(components)/sections/technologiesSection/techSection';
import SitePanel from '@/app/(components)/layout/SitePanel';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-stretch w-full h-full'>
      <SitePanel>
        <HeroSection />
        <AboutSection />
        <TechnologiesSection />
        <ProjectsSection />
        <ContactSection />
      </SitePanel>
    </main>
  );
}
