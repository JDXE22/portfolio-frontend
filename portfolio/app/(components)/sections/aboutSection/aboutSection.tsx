import { Section } from "@/app/(components)/layout/Section";
import { getAboutMeInfo } from "@/data/dataApi";
import { AboutInfo } from "@/types/types";

export default async function AboutSection() {
  const aboutInfo = await getAboutMeInfo();

  const items: AboutInfo[] =
    Array.isArray(aboutInfo) && aboutInfo.length > 0 ? aboutInfo : [];

  return (
    <Section id="about">
      <div className="grid gap-6">
        {items.map((info) => (
          <div
            key={info.headline}
            className="rounded-lg border border-foreground/10 bg-background p-6 shadow-sm hover:shadow-md transition-shadow"
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
              <div className="mt-4">
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
              <div className="mt-4">
                <h4 className="mb-2 font-semibold text-foreground/90">
                  Tech Stack:
                </h4>
                <ul className="flex flex-wrap items-center gap-3 text-foreground/80">
                  {info.techStack.map((tech, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 rounded-md border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-sm text-foreground/80 transition-colors hover:bg-foreground/[0.06]"
                    >
                      {tech.iconPublicId && (
                        <img
                          src={tech.iconPublicId}
                          alt={tech.name}
                          className="h-5 w-5"
                        />
                      )}
                      <span className="whitespace-nowrap">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {info.socialLinks?.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-1 font-semibold text-foreground/90">
                  Social Links:
                </h4>
                <ul className="list-disc list-inside text-foreground/80">
                  {info.socialLinks.map((link, i) => (
                    <li key={link.name ?? i}>
                      <a
                        href={link.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                      >
                        {link.iconPublicId && (
                          <img
                            src={link.iconPublicId}
                            alt={link.name}
                            className="h-4 w-4"
                          />
                        )}
                        {link.name || link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
