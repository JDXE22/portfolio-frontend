import { Section } from "@/app/(components)/layout/Section";
import getAboutMeInfo from "@/data/projects";

export default async function AboutSection() {
  const aboutInfo = await getAboutMeInfo();

  return (
    <Section id="about" title="About-me" subtitle="short-introduction">
      <div className="grid gap-6 sm:grid-cols-2 md: grid-cols-3">
        {aboutInfo.map((info) => (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {info.headline}
            </h3>
            <p className="text-gray-600">{info.bio}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
