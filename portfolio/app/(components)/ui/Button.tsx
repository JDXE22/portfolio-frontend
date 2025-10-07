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
    'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-foreground text-background focus-visible:ring-foreground/50',
    secondary:
      'bg-background border border-foreground/15 text-foreground focus-visible:ring-foreground/20',
    ghost: 'text-foreground focus-visible:ring-foreground/20',
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
