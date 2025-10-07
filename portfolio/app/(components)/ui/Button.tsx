'use client';
import React from 'react';
import type { ButtonProps } from '@/types/types';
import { classNameGenerator } from '@/lib/className';

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'bg-malibu-600 text-malibu-50 hover:opacity-90 focus-visible:ring-malibu-300/60',
    secondary:
      'border border-malibu-400 text-malibu-100 focus-visible:ring-malibu-300/40',
    ghost:
      'text-malibu-100 hover:bg-malibu-800/10 focus-visible:ring-malibu-300/20',
  } as const;

  const sizes = { sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 text-sm' } as const;

  return (
    <button
      className={classNameGenerator(
        base,
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}>
      {children}
    </button>
  );
}
