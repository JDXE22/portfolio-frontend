import React from 'react';

type SitePanelProps = {
  children: React.ReactNode;
};

export default function SitePanel({ children }: SitePanelProps) {
  return (
    <div className='w-full bg-background/90 h-full'>
      <div className='mx-auto w-full max-w-[205vh] bg-background/60 backdrop-blur-sm rounded-2xl overflow-visible shadow-2xl'>
        {children}
      </div>
    </div>
  );
}
