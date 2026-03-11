'use client';
import { classNameGenerator } from '@/lib/className';
import React from 'react';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  icon?: React.ReactNode;
}

export default function CtaButton({
  variant = 'primary',
  size = 'lg',
  icon,
  className,
  children,
  ...rest
}: CTAButtonProps) {
  const base = `group relative inline-flex items-center justify-center gap-3 font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-malibu-400/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden`;

  const variants = {
    primary: `bg-gradient-to-r from-malibu-600 to-malibu-500 text-white shadow-lg shadow-malibu-600/30 hover:shadow-xl hover:shadow-malibu-500/40 hover:-translate-y-0.5 active:translate-y-0`,
    secondary: `bg-transparent border-2 border-malibu-400/60 text-malibu-100 backdrop-blur-sm hover:border-malibu-400 hover:bg-malibu-800/20 hover:-translate-y-0.5`,
  };

  const sizes = {
    md: `h-12 px-6 text-base`,
    lg: `h-14 px-8 text-lg`,
  };

  return (
    <button
      className={classNameGenerator(
        base,
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}>
      <span
        aria-hidden='true'
        className='absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: 'translateX(-100%)',
          animation: 'shimmer 2s infinite',
        }}
      />
      {icon && (
        <span className='group-hover:rotate-6 transition-transform duration-300'>
          {icon}
        </span>
      )}
      <span className='relative z-10'>{children}</span>
    </button>
  );
}
