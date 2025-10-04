"use client";
import React from "react";
import { useTranslations } from "next-intl";
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

  const t = useTranslations("projects");

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
            ? "flex flex-wrap justify-center gap-8"
            : "grid items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }
      >
        {projects.map((project) => (
          <article
            key={project.id}
            data-testid="project-card"
            className={`group relative flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background/80 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg ${
              projects.length < 3 ? "w-[280px] sm:w-[320px]" : ""
            }`}
          >
            <div className="p-4 pb-3">
              {project.imgUrl ? (
                <img
                  src={project.imgUrl}
                  alt={`${project.title} image`}
                  className="aspect-[16/9] w-full rounded-lg object-cover ring-1 ring-foreground/10 transition-transform duration-300 group-hover:scale-[1.01]"
                />
              ) : (
                <div
                  className="aspect-[16/9] w-full rounded-lg bg-foreground/5 ring-1 ring-foreground/5"
                  aria-hidden
                />
              )}
            </div>

            <div className="flex flex-1 flex-col px-4 pb-4">
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
              <p className="mb-4 line-clamp-5 text-sm text-foreground/70">
                {t(`description.${project.slug}`)}
              </p>

              <div className="mt-auto pt-2 flex justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  data-testid="more-projectInfo-btn"
                  onClick={() => onMore(project)}
                >
                  {t("moreInfo")}
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
          <div className="space-y-3">
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
                {t('modal.difficulty')} {t(`difficultyLevel.${selectedProject.difficultyLevel}`)}
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
                <h5 className="font-medium">{t(`why`)}</h5>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {t(`reasoning.${selectedProject.slug}`)}
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
                  {t("viewRepository")}
                </a>
              )}

              {hasLiveUrl(selectedProject) && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/50 hover:opacity-80"
                >
                  {t("liveSite")}
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
