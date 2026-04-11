'use client';
import React from 'react';
import type { ButtonProps } from '@/types/ui.types';
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
      'bg-deep-600 text-deep-50 hover:bg-deep-500 focus-visible:ring-deep-400/60',
    secondary:
      'border border-deep-500 text-deep-200 hover:border-deep-400 focus-visible:ring-deep-400/40',
    ghost:
      'text-deep-200 hover:bg-deep-800/20 focus-visible:ring-deep-400/20',
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
