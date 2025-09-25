import { SectionProps } from "@/types/types";

export function Section({
  id,
  title,
  className,
  children,
  align = "left",
  noPadding,
  noMinHeight,
  equalHeight,
  customMinHeight,
}: SectionProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const paddingClasses = noPadding ? "px-0 py-0" : "px-6 py-20 sm:py-28";
  const heightClass = noMinHeight
    ? ""
    : customMinHeight
    ? customMinHeight
    : "min-h-[560px]";

  const flexClass = equalHeight ? "flex-1" : "";

  return (
    <>
      <section
        id={id}
        className={`w-full ${paddingClasses} ${className || ""}`}
      >
        <div
          className={`mx-auto max-w-5xl flex flex-col ${flexClass} ${heightClass}`}
        >
          {title && (
            <header className={`mb-10`}>
              <h2
                className={`${alignmentClasses} text-2xl sm:text-3xl font-semibold tracking-tight`}
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
