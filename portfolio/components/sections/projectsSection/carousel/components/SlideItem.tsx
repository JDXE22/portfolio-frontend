import React, { memo } from 'react';
import { ProjectSlide } from './ProjectSlide';
import { MoreProjectsSlide } from './MoreProjectsSlide';
import { SLIDE_W_PCT } from '../ProjectCarousel.constants';
import { SlideItemProps } from '../ProjectCarousel.types';

export const SlideItem = memo(function SlideItem({
  slide,
  index,
  isCurrent,
}: SlideItemProps) {
  return (
    <div
      aria-hidden={!isCurrent}
      {...(!isCurrent ? { inert: true } : {})}
      style={{
        flex: `0 0 ${SLIDE_W_PCT}%`,
        opacity: isCurrent ? 1 : 0.42,
        transform: isCurrent ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        willChange: isCurrent ? 'transform, opacity' : 'auto',
      }}>
      {slide.type === 'project' ? (
        <ProjectSlide project={slide.data} index={index} />
      ) : (
        <MoreProjectsSlide />
      )}
    </div>
  );
});
