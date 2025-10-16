import React from 'react';

type SitePanelProps = {
  children: React.ReactNode;
};

export default function SitePanel({ children }: SitePanelProps) {
  return (
    <div className='w-full bg-background/90 h-full'>
      <div className='mx-auto w-full max-w-[200vh] bg-background/60 backdrop-blur-sm rounded-2xl border-foreground/12 shadow-2xl overflow-visible'>
        {children}
      </div>
    </div>
  );
}
