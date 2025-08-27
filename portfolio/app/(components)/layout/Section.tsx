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
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
          {children}
        </div>
      </section>
    </>
  );
}
