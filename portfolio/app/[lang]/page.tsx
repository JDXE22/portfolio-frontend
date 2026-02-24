import { Suspense } from 'react';
import AboutSection from '@/app/(components)/sections/aboutSection/aboutSection';
import ProjectsSection from '@/app/(components)/sections/projectsSection/projectsSection';
import ContactSection from '@/app/(components)/sections/contactSection/contactSection';
import { HeroSection } from '@/app/(components)/sections/heroSection/heroSection';
import TechnologiesSection from '@/app/(components)/sections/technologiesSection/techSection';
import SitePanel from '@/app/(components)/layout/SitePanel';

function SectionSkeleton() {
  return (
    <div className='w-full px-6 py-12 sm:py-16 flex items-center justify-center min-h-[400px]'>
      <div className='w-8 h-8 rounded-full border-2 border-malibu-600 border-t-transparent animate-spin' />
    </div>
  );
}

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-stretch w-full h-full'>
      <SitePanel>
        <HeroSection />
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
      </SitePanel>
    </main>
  );
}
