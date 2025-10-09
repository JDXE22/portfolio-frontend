import AboutSection from "@/app/(components)/sections/aboutSection/aboutSection";
import ProjectsSection from "@/app/(components)/sections/projectsSection/projectsSection";
import ContactSection from "@/app/(components)/sections/contactSection/contactSection";
import { HeroSection } from "@/app/(components)/sections/heroSection/heroSection";
import TechnologiesSection from "@/app/(components)/sections/technologiesSection/techSection";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <HeroSection />
      <AboutSection />
      <TechnologiesSection/>
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
