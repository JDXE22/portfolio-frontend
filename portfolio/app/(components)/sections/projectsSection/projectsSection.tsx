import { getProjects } from "@/data/projects";
import { Section } from "@/app/(components)/layout/Section";
import { IProject } from "@/types/types";

export default async function ProjectsSection() {
  const projects: IProject[] = await getProjects();

  return (
    <Section id="projects" title="Projects">
      <div>
        {projects.length === 0 ? (
          <p data-testid="projects-empty" className="text-center text-gray-500">
            No projects yet.
          </p>
        ) : (
          <div
            data-testid="projects-grid"
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
          >
            {projects.map((project) => (
              <div
                key={project._id ?? project._id}
                data-testid="project-card"
                className="rounded-lg border border-gray-200 p-4"
              >
                {project.imgUrl && (
                  <img
                    src={project.imgUrl}
                    alt={`${project.title} image`}
                    className="mb-3 h-32 w-full object-cover rounded-md"
                  />
                )}
                <h4 className="font-semibold mb-2">{project.title}</h4>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
