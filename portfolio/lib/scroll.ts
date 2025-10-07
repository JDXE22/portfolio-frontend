import { SmoothScrollOptions } from '@/types/types';

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function smoothScrollTo(targetY: number, duration = 550) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  if (!distance || duration <= 0) {
    window.scrollTo(0, targetY);
    return;
  }

  let start: number | null = null;
  let rafId = 0;

  const step = (timestamp: number) => {
    if (start === null) start = timestamp;
    const elapsed = timestamp - start;
    const t = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, Math.round(startY + distance * eased));
    if (t < 1) rafId = requestAnimationFrame(step);
  };

  rafId = requestAnimationFrame(step);
  return () => cancelAnimationFrame(rafId);
}

export function smoothScrollToElement(
  el: Element | null,
  opts: SmoothScrollOptions = {}
) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const headerOffset =
    opts.offset ??
    (parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-offset'
      )
    ) ||
      0);
  const targetY = window.scrollY + rect.top - headerOffset;
  smoothScrollTo(Math.max(0, Math.round(targetY)), opts.duration ?? 550);
}

export function smoothScrollToId(id: string, opts: SmoothScrollOptions = {}) {
  const el = document.getElementById(id);
  smoothScrollToElement(el, opts);
}
