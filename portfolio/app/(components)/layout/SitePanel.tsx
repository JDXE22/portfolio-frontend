import React from 'react';

type SitePanelProps = {
  children: React.ReactNode;
};

export default function SitePanel({ children }: SitePanelProps) {
  return (
    <div className='w-full bg-background/90'>
      <div className='mx-auto w-full max-w-6xl sm:py-12 bg-background/60 backdrop-blur-sm rounded-2xl border-foreground/12 shadow-2xl overflow-hidden'>
        {children}
      </div>
    </div>
  );
}
