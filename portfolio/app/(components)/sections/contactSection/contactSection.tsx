'use client';

import React from 'react';
import { sendContactForm } from '@/data/dataApi';
import { Button } from '@/app/(components)/ui/Button';
import { Section } from '@/app/(components)/layout/Section';
import { errorMessage } from '@/lib/errors';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [showCc, setShowCc] = React.useState(false);
  const [showBcc, setShowBcc] = React.useState(false);

  const dictionary = useTranslations('contact');

  const formRef = React.useRef<HTMLFormElement>(null);

  const inputBase =
    'w-full rounded-md border border-foreground/15 bg-background/70 px-3 py-2.5 text-sm text-foreground ' +
    'placeholder:text-foreground/40 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:opacity-50';

  const lineInput =
    'flex-1 min-w-[10rem] bg-transparent outline-none border-none px-0 py-1 text-sm text-foreground placeholder:text-foreground/40';

  const clearField = (name: string) => {
    const element = formRef.current?.elements.namedItem(
      name,
    ) as HTMLInputElement | null;
    if (element) element.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFiles(Array.from(e.target.files ?? []));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const formEl = event.currentTarget;

    const data = new FormData(event.currentTarget);
    files.forEach((f) => data.append('files', f));

    try {
      const res = await sendContactForm(data);
      setSuccess(res?.message ?? 'Thanks! I’ll get back to you soon.');
      formEl.reset();
      setFiles([]);
      setShowCc(false);
      setShowBcc(false);
    } catch (e) {
      setError(errorMessage(e));
      setSuccess(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id='contact'
      title={dictionary('sectionTitle')}
      equalHeight
      align='center'>
      <div className='group relative mx-auto max-w-xl'>
        <div
          className='
            pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur
            transition-opacity duration-300
            bg-[conic-gradient(from_140deg,rgba(99,102,241,0.45),rgba(168,85,247,0.35),rgba(236,72,153,0.35),rgba(16,185,129,0.45),rgba(99,102,241,0.45))]
            group-hover:opacity-40 group-focus-within:opacity-60
          '
        />
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          data-testid='contact-form'
          className='
            relative rounded-2xl border border-foreground/12 p-8 shadow-sm backdrop-blur-sm
            transition-colors
            bg-background/65
            bg-[radial-gradient(circle_at_20%_18%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_80%_82%,rgba(236,72,153,0.16),transparent_60%)]
            hover:border-foreground/20
            focus-within:border-indigo-400/45
          '>
          <div className='flex flex-col gap-8'>
            {/* Name */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='name'
                className='text-sm font-medium text-foreground'>
                {dictionary('name')}
              </label>
              <input
                id='name'
                name='name'
                type='text'
                required
                autoComplete='name'
                className={inputBase}
              />
            </div>

            {/* Email / CC / BCC */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='email'
                className='text-sm font-medium text-foreground'>
                {dictionary('email')}
              </label>
              <div
                className='
                  rounded-lg border border-foreground/15 px-3 py-2 shadow-inner overflow-hidden
                  bg-background/50
                  bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.15),transparent_55%),radial-gradient(circle_at_90%_90%,rgba(168,85,247,0.12),transparent_60%)]
                  focus-within:border-indigo-400/40 transition
                '
                role='group'
                aria-labelledby='email'>
                {/* Primary email row */}
                <div className='flex flex-wrap items-center gap-2 pb-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    autoComplete='email'
                    placeholder='primary@example.com'
                    className={lineInput}
                  />
                  <div className='ml-auto flex gap-4 pr-1'>
                    {!showCc && (
                      <button
                        type='button'
                        onClick={() => setShowCc(true)}
                        className='text-[11px] font-medium text-indigo-400 underline decoration-dotted underline-offset-2 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded px-0'>
                        {dictionary('addCc')}
                      </button>
                    )}
                    {!showBcc && (
                      <button
                        type='button'
                        onClick={() => setShowBcc(true)}
                        className='text-[11px] font-medium text-indigo-400 underline decoration-dotted underline-offset-2 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded px-0'>
                        {dictionary('addBcc')}
                      </button>
                    )}
                  </div>
                </div>

                {/* CC row */}
                {showCc && (
                  <div className='flex flex-wrap items-center gap-2 border-t border-foreground/10 py-2'>
                    <span className='w-9 shrink-0 text-[11px] font-semibold tracking-wide text-foreground/45'>
                      CC
                    </span>
                    <input
                      id='cc'
                      name='cc'
                      type='text'
                      placeholder='optional1@example.com, optional2@example.com'
                      className={lineInput}
                    />
                    <button
                      type='button'
                      aria-label='Remove CC'
                      onClick={() => {
                        clearField('cc');
                        setShowCc(false);
                      }}
                      className='ml-auto rounded px-1 text-foreground/40 transition hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40'>
                      ×
                    </button>
                  </div>
                )}

                {/* BCC row */}
                {showBcc && (
                  <div className='flex flex-wrap items-center gap-2 border-t border-foreground/10 py-2'>
                    <span className='w-9 shrink-0 text-[11px] font-semibold tracking-wide text-foreground/45'>
                      BCC
                    </span>
                    <input
                      id='bcc'
                      name='bcc'
                      type='text'
                      placeholder='hidden@example.com'
                      className={lineInput}
                    />
                    <button
                      type='button'
                      aria-label='Remove BCC'
                      onClick={() => {
                        clearField('bcc');
                        setShowBcc(false);
                      }}
                      className='ml-auto rounded px-1 text-foreground/40 transition hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40'>
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='message'
                className='text-sm font-medium text-foreground'>
                {dictionary('message')}
              </label>
              <textarea
                id='message'
                name='message'
                rows={6}
                required
                className={inputBase + ' resize-y min-h-[160px]'}
              />
            </div>

            {/* Attachments & Actions */}
            <div className='flex flex-col items-center gap-6'>
              <div className='flex flex-wrap items-center justify-center gap-3'>
                <label
                  htmlFor='files'
                  className='inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50'>
                  {dictionary('chooseFiles')}{' '}
                </label>
                <input
                  id='files'
                  name='files'
                  type='file'
                  multiple
                  onChange={handleFileChange}
                  className='sr-only'
                />
                <span className='text-xs text-foreground/60'>
                  {files.length
                    ? `${files.length} file${
                        files.length > 1 ? 's' : ''
                      } selected`
                    : ''}
                </span>
              </div>

              {error && (
                <p
                  role='alert'
                  data-testid='contact-error'
                  className='text-sm font-medium text-red-500'>
                  {error}
                </p>
              )}
              {success && (
                <p
                  role='status'
                  data-testid='contact-success'
                  className='text-sm font-medium text-emerald-500'>
                  {success}
                </p>
              )}

              <Button
                type='submit'
                disabled={submitting}
                aria-busy={submitting}
                className='w-full max-w-xs'>
                {submitting ? dictionary('sending') : dictionary('sendMessage')}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
        <a
          href='mailto:davidesparzaj22@gmail.com'
          className='section-card p-6 group hover:border-malibu-400/40 transition-all duration-300 hover:-translate-y-1'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full bg-malibu-700/30 flex items-center justify-center group-hover:bg-malibu-600/40 transition-colors'>
              <svg
                className='w-7 h-7 text-malibu-400'
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
              <h4 className='font-semibold text-foreground mb-1'>Email Me</h4>
              <p className='text-sm text-foreground/60'>Quick response</p>
            </div>
          </div>
        </a>

        <a
          href='https://www.linkedin.com/in/juan-david-esparza-castillo/'
          target='_blank'
          rel='noopener noreferrer'
          className='section-card p-6 group hover:border-malibu-400/40 transition-all duration-300 hover:-translate-y-1'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full bg-malibu-700/30 flex items-center justify-center group-hover:bg-malibu-600/40 transition-colors'>
              <svg
                className='w-7 h-7 text-malibu-400'
                fill='currentColor'
                viewBox='0 0 24 24'>
                <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-foreground mb-1'> LinkedIn </h4>
              <p className='text-sm text-foreground/60'>Let's connect</p>
            </div>
          </div>
        </a>

        <a
          href='https://github.com/JDXE22'
          target='_blank'
          rel='noopener noreferrer'
          className='section-card p-6 group hover:border-malibu-400/40 transition-all duration-300 hover:-translate-y-1'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 rounded-full bg-malibu-700/30 flex items-center justify-center group-hover:bg-malibu-600/40 transition-colors'>
              <svg
                className='w-7 h-7 text-malibu-400'
                fill='currentColor'
                viewBox='0 0 24 24'>
                <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
              </svg>
            </div>
            <div>
              <h4 className='font-semibold text-foreground mb-1'>GitHub</h4>
              <p className='text-sm text-foreground/60'>View code</p>
            </div>
          </div>
        </a>
      </div>
    </Section>
  );
}
