import AboutSection from "@/app/(components)/sections/aboutSection/aboutSection";
import ProjectsSection from "@/app/(components)/sections/projectsSection/projectsSection";
import ContactSection from "@/app/(components)/sections/contactSection/contactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
