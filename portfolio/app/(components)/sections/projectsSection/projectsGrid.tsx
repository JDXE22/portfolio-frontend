"use client";
import React from "react";
import { Button } from "@/app/(components)/ui/Button";
import { Modal } from "@/app/(components)/ui/Modal";
import type { IProject, Props } from "@/types/types";
import { statusClass } from "@/lib/statusClass";
import { difficultyLevelClass } from "@/lib/difficultyClass";

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
        className={
          projects.length < 3
            ? "flex flex-wrap gap-8 justify-center sm:justify-center"
            : "grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {projects.map((project) => (
          <article
            key={project.id}
            data-testid="project-card"
            className={`group relative flex h-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background/80 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg ${
              projects.length < 3 ? "w-[280px] sm:w-[320px]" : ""
            }`}
          >
            {project.imgUrl && (
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.imgUrl}
                  alt={`${project.title} image`}
                  className="aspect-[16/9] w-full object-cover ring-1 ring-foreground/10 transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <div className="mb-3 flex items-start justify-between gap-3">
                <h4 className="font-semibold text-foreground">
                  {project.title}
                </h4>

                {project.liveStatus && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${statusClass(
                      project.liveStatus
                    )}`}
                  >
                    {project.liveStatus}
                  </span>
                )}
              </div>
              <p className="mb-4 line-clamp-6 text-sm leading-relaxed text-foreground/75">
                {project.description}
              </p>

              <div className="mt-auto pt-2">
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
          </article>
        ))}
      </div>

      <Modal
        open={isOpen}
        onClose={onClose}
        title={selectedProject?.title}
        showCloseButton
      >
        {selectedProject && (
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              {selectedProject.description}
            </p>

            {selectedProject.difficultyLevel && (
              <span
                aria-label={`Difficulty level: ${selectedProject.difficultyLevel}`}
                className={`${difficultyLevelClass(
                  selectedProject.difficultyLevel
                )} rounded-full px-2 py-0.5 text-[11px]`}
              >
                Difficulty: {selectedProject.difficultyLevel}
              </span>
            )}

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
                <p className="text-sm leading-relaxed text-foreground/80">
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
                  className="text-sm text-foreground underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/40 hover:opacity-80"
                >
                  View repository
                </a>
              )}

              {hasLiveUrl(selectedProject) && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/50 hover:opacity-80"
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
