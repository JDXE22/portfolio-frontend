'use client';
import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 z-50 h-1 bg-transparent'>
      <div
        className='h-full bg-gradient-to-r from-malibu-600 via-malibu-400 to-malibu-600 transition-all duration-150 shadow-lg shadow-malibu-500/50'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}