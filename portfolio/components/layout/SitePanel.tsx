import React from 'react';

type SitePanelProps = {
  children: React.ReactNode;
};

export default function SitePanel({ children }: SitePanelProps) {
  return (
    <div className='w-full bg-background/90 h-full border-t border-white/5'>
      <div className='mx-auto w-full max-w-[min(100vw,120rem)] bg-background/60 overflow-visible'>
        {children}
      </div>
    </div>
  );
}
