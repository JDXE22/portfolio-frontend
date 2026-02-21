'use client';
import { motion, useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className='fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-malibu-600 via-malibu-400 to-malibu-600 shadow-lg shadow-malibu-500/50'
      style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
    />
  );
}
