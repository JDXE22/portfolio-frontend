import type { CarouselSlide } from '@/types/projects.types';

export interface ProjectCarouselProps {
  slides: CarouselSlide[];
}

export interface CarouselButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
}

export interface SlideItemProps {
  slide: CarouselSlide;
  index: number;
  isCurrent: boolean;
}
