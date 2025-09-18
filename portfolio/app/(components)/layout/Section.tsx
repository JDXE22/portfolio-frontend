import { SectionProps } from "@/types/types";

export function Section({
  id,
  title,
  className,
  children,
  align = "left",
}: SectionProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];
  return (
    <>
      <section id={id} className={`w-full px-6 py-20 sm:py-28 ${className}`}>
        <div className="mx-auto max-w-5xl min-h-[560px] flex flex-col">
          {title && (
            <header className={`mb-10 ${alignmentClasses}`}>
              <h2
                className={`text-2xl sm:text-3xl font-semibold tracking-tight`}
              >
                {title}
              </h2>
            </header>
          )}

          <div className="flex-1">{children}</div>
        </div>
      </section>
    </>
  );
}
