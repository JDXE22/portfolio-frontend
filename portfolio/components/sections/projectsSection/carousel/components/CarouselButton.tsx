import React, { memo } from 'react';
import { CarouselButtonProps } from '../ProjectCarousel.types';

export const CarouselButton = memo(function CarouselButton({
  direction: _direction,
  children,
  className,
  ...rest
}: CarouselButtonProps) {
  return (
    <button
      type='button'
      className={[
        'flex h-10 w-10 items-center justify-center rounded-full',
        'border border-malibu-400/30 bg-malibu-800/20 backdrop-blur-sm',
        'text-malibu-200 transition-colors duration-200',
        'hover:border-malibu-400/60 hover:bg-malibu-700/30 hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-malibu-400/60 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-30',
        className ?? '',
      ].join(' ')}
      {...rest}>
      {children}
    </button>
  );
});
