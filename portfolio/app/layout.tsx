import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { Metadata } from 'next';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Created by David Esparza',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased app-gradient`}>
        {children}
      </body>
    </html>
  );
}
