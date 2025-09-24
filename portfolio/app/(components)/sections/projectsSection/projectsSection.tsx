import { getProjects } from "@/data/dataApi";
import { Section } from "@/app/(components)/layout/Section";
import { IProject } from "@/types/types";
import ProjectsGrid from "@/app/(components)/sections/projectsSection/projectsGrid";

export default async function ProjectsSection() {
  const projects: IProject[] = await getProjects();

  return (
    <Section id="projects" title="Projects" align="center" equalHeight>
      <div className="h-full w-full flex items-center justify-center py-10">
        {projects.length === 0 ? (
          <p
            data-testid="projects-empty"
            className="m-auto text-center text-foreground/50"
          >
            []
          </p>
        ) : (
          <ProjectsGrid projects={projects} />
        )}
      </div>
    </Section>
  );
}
