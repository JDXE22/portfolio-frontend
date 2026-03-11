import { Suspense } from 'react';
import AboutSection from '@/components/sections/aboutSection/AboutSection';
import ProjectsSection from '@/components/sections/projectsSection/ProjectsSection';
import ContactSection from '@/components/sections/contactSection/ContactSection';
import { HeroSection } from '@/components/sections/heroSection/HeroSection';
import TechnologiesSection from '@/components/sections/technologiesSection/TechnologiesSection';
import SitePanel from '@/components/layout/SitePanel';
import Footer from '@/components/layout/Footer';

function SectionSkeleton() {
  return (
    <div className='w-full px-6 py-12 sm:py-16 flex items-center justify-center min-h-[400px]'>
      <div className='w-8 h-8 rounded-full border-2 border-malibu-600 border-t-transparent animate-spin' />
    </div>
  );
}

export default async function Home() {
  return (
    <main
      id='main-content'
      tabIndex={-1}
      className='flex min-h-screen flex-col items-stretch w-full h-full'>
      <HeroSection />
      <SitePanel>
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <TechnologiesSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <ContactSection />
        <Footer />
      </SitePanel>
    </main>
  );
}
