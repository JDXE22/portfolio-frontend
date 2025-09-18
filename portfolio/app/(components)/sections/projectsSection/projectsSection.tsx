import { getProjects } from "@/data/dataApi";
import { Section } from "@/app/(components)/layout/Section";
import { IProject } from "@/types/types";
import ProjectsGrid from "@/app/(components)/sections/projectsSection/projectsGrid";

export default async function ProjectsSection() {
  const projects: IProject[] = await getProjects();

  return (
    <Section id="projects" title="Projects" align="center">
      <div>
        {projects.length === 0 ? (
          <p data-testid="projects-empty" className="text-center text-gray-500">
            []
          </p>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </Section>
  );
}
