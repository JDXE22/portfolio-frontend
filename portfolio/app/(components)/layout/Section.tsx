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
      <section
        id={id}
        className={`w-full ${alignmentClasses} px-6 py-16 sm:py-24 ${className}`}
      >
        <div className="mx-auto max-w-5xl">
          {title && (
            <header className="mb-8">
              <h2 className="text-lg sm:text-2xl font-semibold">{title}</h2>
            </header>
          )}
          {children}
        </div>
      </section>
    </>
  );
}
