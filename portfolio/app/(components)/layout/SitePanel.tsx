import React from 'react';

type SitePanelProps = {
  children: React.ReactNode;
};

export default function SitePanel({ children }: SitePanelProps) {
  return (
    <div className='mx-auto w-full max-w-6xl px-6 py-8 sm:py-12 bg-background/60 backdrop-blur-sm rounded-2xl border border-foreground/12 shadow-xl overflow-hidden'>
      {children}
    </div>
  );
}
