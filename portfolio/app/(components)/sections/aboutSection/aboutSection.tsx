import { Section } from "@/app/(components)/layout/Section";
import { getAboutMeInfo } from "@/data/projects";

export default async function AboutSection() {
  const aboutInfo = await getAboutMeInfo();

  return (
    <Section id="about" title="About Me" subtitle="short-introduction">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {aboutInfo.map((info) => (
          <div
            key={info.headline}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-md"
          >
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {info.headline}
            </h3>
            <p className="text-gray-600">{info.bio}</p>

            {info.avatarIconUrl && (
              <img
                src={info.avatarIconUrl}
                alt={`${info.headline} avatar`}
                className="mt-4 h-32 w-32 rounded-full object-cover"
              />
            )}

            {info.skills?.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-1 font-semibold text-gray-700">Skills:</h4>
                <ul className="list-disc list-inside text-gray-600">
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
                <h4 className="mb-1 font-semibold text-gray-700">
                  Tech Stack:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {info.techStack.map((tech, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {tech.iconPublicId && (
                        <img
                          src={tech.iconPublicId}
                          alt={tech.name}
                          className="h-5 w-5"
                        />
                      )}
                      <span>{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {info.socialLinks?.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-1 font-semibold text-gray-700">
                  Social Links:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {info.socialLinks.map((link, i) => (
                    <li key={link.name ?? i}>
                      <a
                        href={link.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline inline-flex items-center gap-2"
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
