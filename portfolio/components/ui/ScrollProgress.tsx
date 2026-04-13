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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 9999,
      }}>
      <motion.div
        style={{
          height: '100%',
          background: '#2895cf',
          transformOrigin: 'left center',
          scaleX,
        }}
      />
    </div>
  );
}
