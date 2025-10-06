import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: { lang: 'en' | 'es' };
};

export default async function LangLayout({
  children,
  params: { lang },
}: Props) {
  const messages = (await import(`../../i18n/${lang}.json`)).default;
  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
