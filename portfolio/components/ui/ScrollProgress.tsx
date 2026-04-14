'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div
      role='presentation'
      aria-hidden='true'
      className='fixed inset-x-0 top-0 z-[9999] h-[3px] bg-white/5'>
      <motion.div
        className='h-full bg-malibu-500'
        style={{ transformOrigin: 'left center', scaleX }}
      />
    </div>
  );
}
