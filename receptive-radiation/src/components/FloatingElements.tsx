import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingElementsProps {
  children: React.ReactNode;
  className?: string;
}

export default function FloatingElements({ children, className = '' }: FloatingElementsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
}


