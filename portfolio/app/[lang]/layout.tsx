import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { ScrollProgress } from '../(components)/ui/ScrollProgress';

type Props = {
  children: React.ReactNode;
  params: { lang: 'en' | 'es' };
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const messages = (await import(`../../i18n/${lang}.json`)).default;
  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <ScrollProgress />

      {children}
    </NextIntlClientProvider>
  );
}
