import { SectionProps } from '@/types/ui.types';

export function Section({
  id,
  title,
  className,
  children,
  align = 'left',
  noPadding,
  noMinHeight,
  customMinHeight,
}: SectionProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const paddingClasses = noPadding ? 'px-0 py-0' : 'px-6 py-20 sm:py-32';
  const heightClass = noMinHeight
    ? ''
    : customMinHeight
      ? customMinHeight
      : 'min-h-[300px]';

  return (
    <section id={id} className={`w-full ${paddingClasses} ${className || ''}`}>
      <div className={`mx-auto w-full max-w-6xl flex flex-col ${heightClass}`}>
        {title && (
          <header className={`mb-12`}>
            <h2
              className={`${alignmentClasses} text-headline font-display`}>
              {title}
            </h2>
          </header>
        )}

        {children}
      </div>
    </section>
  );
}
