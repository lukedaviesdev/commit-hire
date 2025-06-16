import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface MotionWrapperProperties {
  children: ReactNode;
  className?: string;
  type?: 'fade' | 'slide' | 'scale';
  delay?: number;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

export const MotionWrapper = ({
  children,
  className,
  type = 'fade',
  delay = 0,
}: MotionWrapperProperties) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[type]}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </motion.div>
  );
};
