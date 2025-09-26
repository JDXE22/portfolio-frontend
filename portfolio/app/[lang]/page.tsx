import AboutSection from "@/app/(components)/sections/aboutSection/aboutSection";
import ProjectsSection from "@/app/(components)/sections/projectsSection/projectsSection";
import ContactSection from "@/app/(components)/sections/contactSection/contactSection";
import { HeroSection } from "@/app/(components)/sections/heroSection/heroSection";

export default async function Home(
  props: Readonly<{ params: { lang: string } }>
) {
  const { lang } = await props.params;
  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
