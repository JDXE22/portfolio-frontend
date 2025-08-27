import { SectionProps } from "../../../types/types.ts";

export function Section({
  id,
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  return (
    <>
      <section id={id} className={`w-full px-6 py-16 sm:py-24 ${className}`}>
        <div className="mx-auto max-w-5xl">
          {title && (
            <header className="mb-8">
              <h2 className="text-2xl sm:text-lg font-semibold">{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </header>
          )}
          {children}
        </div>
      </section>
    </>
  );
}
