import React from 'react';

type SitePanelProps = {
  children: React.ReactNode;
};

export default function SitePanel({ children }: SitePanelProps) {
  return (
    <div className='w-full h-full'>
      <div className='mx-auto w-full max-w-[min(100vw,120rem)] overflow-visible'>
        {children}
      </div>
    </div>
  );
}
