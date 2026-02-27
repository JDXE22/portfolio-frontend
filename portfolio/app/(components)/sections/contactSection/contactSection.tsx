import { useTranslations } from 'next-intl';
import { Section } from '@/app/(components)/layout/Section';

export default function ContactSection() {
  const dictionary = useTranslations('contact');

  return (
    <Section id='contact' title={dictionary('sectionTitle')} align='center'>
      <p className='mx-auto mb-10 max-w-lg text-center text-sm text-foreground/60'>
        {dictionary('subtitle')}
      </p>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Email */}
        <a
          href='mailto:davidesparzaj22@gmail.com'
          className='section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-malibu-400/40'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-malibu-700/30 transition-colors group-hover:bg-malibu-600/40'>
              <svg
                className='h-7 w-7 text-malibu-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-foreground'>
                {dictionary('links.email.label')}
              </h4>
              <p className='mt-0.5 text-sm text-foreground/60'>
                {dictionary('links.email.sublabel')}
              </p>
            </div>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href='https://www.linkedin.com/in/juan-david-esparza-castillo/'
          target='_blank'
          rel='noopener noreferrer'
          className='section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-malibu-400/40'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-malibu-700/30 transition-colors group-hover:bg-malibu-600/40'>
              <svg
                className='h-7 w-7 text-malibu-400'
                fill='currentColor'
                viewBox='0 0 24 24'>
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-foreground'>
                {dictionary('links.linkedin.label')}
              </h4>
              <p className='mt-0.5 text-sm text-foreground/60'>
                {dictionary('links.linkedin.sublabel')}
              </p>
            </div>
          </div>
        </a>

        {/* GitHub */}
        <a
          href='https://github.com/JDXE22'
          target='_blank'
          rel='noopener noreferrer'
          className='section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-malibu-400/40'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-malibu-700/30 transition-colors group-hover:bg-malibu-600/40'>
              <svg
                className='h-7 w-7 text-malibu-400'
                fill='currentColor'
                viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-foreground'>
                {dictionary('links.github.label')}
              </h4>
              <p className='mt-0.5 text-sm text-foreground/60'>
                {dictionary('links.github.sublabel')}
              </p>
            </div>
          </div>
        </a>

        {/* Discord */}
        <div className='section-card group p-6 transition-all duration-300 hover:-translate-y-1 hover:border-malibu-400/40'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-malibu-700/30 transition-colors group-hover:bg-malibu-600/40'>
              <svg
                className='h-7 w-7 text-malibu-400'
                fill='currentColor'
                viewBox='0 0 24 24'>
                <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-foreground'>
                {dictionary('links.discord.label')}
              </h4>
              <p className='mt-0.5 font-mono text-sm text-foreground/60'>
                juandavid_35956
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
