"use client";
import React from "react";
import { Button } from "@/app/(components)/ui/Button";
import { Modal } from "@/app/(components)/ui/Modal";
import type { IProject, LiveStatus } from "@/types/types";

type Props = { projects: ReadonlyArray<IProject> };

const hasLiveUrl = (p: IProject): p is IProject & { liveUrl: string } =>
  p.liveStatus === "Live" &&
  typeof p.liveUrl === "string" &&
  p.liveUrl.length > 0;

export default function ProjectsGrid({ projects }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<IProject | null>(
    null
  );

  const onMore = (project: IProject) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div
        data-testid="projects-grid"
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            data-testid="project-card"
            className="rounded-lg border border-gray-300 p-4"
          >
            {project.imgUrl && (
              <img
                src={project.imgUrl}
                alt={`${project.title} image`}
                className="mb-3 h-32 w-full object-cover rounded-md"
              />
            )}
            <h4 className="font-semibold mb-2">{project.title}</h4>
            <p className="text-sm text-gray-600 mb-4 line-clamp-4">
              {project.description}
            </p>

            {/* Optional small badge */}
            {project.liveStatus && (
              <span className="mr-2 rounded bg-foreground/10 px-2 py-0.5 text-xs">
                {project.liveStatus}
              </span>
            )}

            <div className="mt-3">
              <Button
                variant="secondary"
                size="sm"
                data-testid="more-projectInfo-btn"
                onClick={() => onMore(project)}
              >
                More Info
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={isOpen}
        onClose={onClose}
        title={selectedProject?.title}
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        {selectedProject && (
          <div className="space-y-3">
            <h5 className="text-md text-foreground/90">
              {selectedProject.title}
            </h5>
            <p className="text-sm text-foreground/80">
              {selectedProject.description}
            </p>

            {selectedProject.techStack?.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech, i) => (
                  <li
                    key={`${selectedProject.id}-tech-${i}`}
                    className="rounded-full bg-foreground/10 px-3 py-1 text-xs text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            {selectedProject.reasoning && (
              <div>
                <h5 className="font-medium">Why did I build this project?</h5>
                <p className="text-sm text-foreground/80">
                  {selectedProject.reasoning}
                </p>
              </div>
            )}

            {selectedProject.imgUrl && (
              <img
                src={selectedProject.imgUrl}
                alt={`${selectedProject.title} image`}
                className="mt-3 w-full object-cover rounded-md"
              />
            )}

            <div className="flex gap-3">
              {selectedProject.repoUrl && (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-900 hover:underline"
                >
                  View repository
                </a>
              )}

              {hasLiveUrl(selectedProject) && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-900 hover:underline"
                >
                  Live site
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
