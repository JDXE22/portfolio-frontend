import AboutSection from "@/app/(components)/sections/aboutSection/aboutSection";
import ProjectsSection from "@/app/(components)/sections/projectsSection/projectsSection";
import ContactSection from "@/app/(components)/sections/contactSection/contactSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
