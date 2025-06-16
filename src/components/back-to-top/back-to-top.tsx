import { ArrowUp } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

import { MotionWrapper } from '@/components/common/motion-wrapper/motion-wrapper';
import { Button } from '@/components/ui/button';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionWrapper type="scale" className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-10 w-10 rounded-full shadow-lg"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Back to top</span>
          </Button>
        </MotionWrapper>
      )}
    </AnimatePresence>
  );
};
