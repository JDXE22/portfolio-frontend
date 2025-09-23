import { Section } from "@/app/(components)/layout/Section";
import { getAboutMeInfo } from "@/data/dataApi";
import { AboutInfo } from "@/types/types";

export default async function AboutSection() {
  const aboutInfo = await getAboutMeInfo();

  const items: AboutInfo[] =
    Array.isArray(aboutInfo) && aboutInfo.length > 0 ? aboutInfo : [];

  return (
    <Section id="about" title="About Me" align="center">
      <div className="grid gap-6">
        {items.map((info) => (
          <div
            key={info.headline}
            className="rounded-lg border border-foreground/10 bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              {info.headline}
            </h3>
            <p className="text-foreground/80">{info.bio}</p>

            {info.avatarIconUrl && (
              <img
                src={info.avatarIconUrl}
                alt={`${info.headline} avatar`}
                className="mt-4 h-32 w-32 rounded-full object-cover"
              />
            )}

            {info.skills?.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-1 font-semibold text-foreground/90">
                  Skills:
                </h4>
                <ul className="list-disc list-inside text-foreground/80">
                  {info.skills.map((skill, i) => (
                    <li data-testid="skills-id" key={i}>
                      {skill}{" "}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {info.techStack?.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-2 font-semibold text-foreground/90">
                  Tech Stack:
                </h4>
                <ul className="flex flex-wrap items-center gap-3">
                  {info.techStack.map((tech, i) => {
                    const tipId = `tech-tooltip-${i}`;
                    return (
                      <li
                        key={i}
                        tabIndex={0}
                        aria-describedby={tipId}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-md border border-foreground/10 bg-foreground/[0.05] p-1 transition-colors hover:bg-foreground/[0.08] focus-within:bg-foreground/[0.08]"
                      >
                        {tech.iconPublicId && (
                          <img
                            src={tech.iconPublicId}
                            alt=""
                            aria-hidden="true"
                            className="h-7 w-7 object-contain"
                          />
                        )}
                        <span className="sr-only">{tech.name}</span>
                        {/* Tooltip */}
                        <span
                          id={tipId}
                          role="tooltip"
                          className="
                          pointer-events-none absolute -bottom-8 left-1/2 z-10 
                          -translate-x-1/2 whitespace-nowrap rounded-md
                          bg-foreground/90 px-2 py-1 text-[11px] font-medium
                          text-background opacity-0 shadow-md transition
                          group-hover:opacity-100 group-focus-within:opacity-100
                        "
                        >
                          {tech.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {info.socialLinks?.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-1 font-semibold text-foreground/90">
                  Social Links:
                </h4>
                <ul className="flex flex-wrap items-center gap-4">
                  {info.socialLinks.map((link, i) => {
                    const tipId = `social-tooltip-${i}`;
                    const label = link.name || link.url || `Link`;
                    return (
                      <li key={link.name ?? i}>
                        <a
                          href={link.url ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-describedby={tipId}
                          s
                          className="group relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-foreground/10 bg-foreground/[0.05] p-1 transition-colors hover:bg-foreground/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
                        >
                          {link.iconPublicId && (
                            <img
                              src={link.iconPublicId}
                              alt=""
                              aria-hidden="true"
                              className="h-5 w-5 object-contain"
                            />
                          )}
                          {/* Tooltip */}
                          <span
                            id={tipId}
                            role="tooltip"
                            className="
                            pointer-events-none absolute -bottom-8 left-1/2
                            -translate-x-1/2 whitespace-nowrap rounded-md
                            bg-foreground/90 px-2 py-1 text-[11px] font-medium
                            text-background opacity-0 shadow-md transition
                            group-hover:opacity-100 group-focus-visible:opacity-100
                          "
                          >
                            {link.name || link.url}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
