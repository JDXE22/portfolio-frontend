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
      <section id={id} className={className}>
        {title && <h2>{title}</h2>}
        {subtitle && <p>{subtitle}</p>}
        {children}
      </section>
    </>
  );
}
