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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'rgba(255, 255, 255, 0.08)',
        zIndex: 9999,
      }}>
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(to right, #1977b0, #4fafe1, #1977b0)',
          boxShadow: '0 0 8px rgba(79, 175, 225, 0.6)',
          transformOrigin: 'left center',
          scaleX,
        }}
      />
    </div>
  );
}
