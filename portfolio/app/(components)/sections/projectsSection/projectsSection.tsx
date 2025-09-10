import { getProjects } from "@/data/projects";
import { Section } from "@/app/(components)/layout/Section";
import { IProject } from "@/types/types";

export default async function ProjectsSection() {
  const projects = await getProjects();
  return (
    <Section id="projects" title="Projects">
      <div>
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">[]</p>
        ) : (
          projects.map((project) => (
            <div key={project.id}>
              <img src={project.imgUrl} alt="project-img" />
              <h4> {project.title}</h4>
              <p>{project.description}</p>
            </div>
          ))
        )}
      </div>
    </Section>
  );
}
