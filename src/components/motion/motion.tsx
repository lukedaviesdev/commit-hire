import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

import { MotionWrapper } from '@/components/common/motion-wrapper/motion-wrapper';
import { Button } from '@/components/ui/button';

export const MotionDemo = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="space-y-8 p-8">
      <div className="flex gap-4">
        <Button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isVisible && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MotionWrapper type="fade">
              <div className="rounded-lg border p-4">Fade Animation</div>
            </MotionWrapper>

            <MotionWrapper type="slide">
              <div className="rounded-lg border p-4">Slide Animation</div>
            </MotionWrapper>

            <MotionWrapper type="scale">
              <div className="rounded-lg border p-4">Scale Animation</div>
            </MotionWrapper>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
