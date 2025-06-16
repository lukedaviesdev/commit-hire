import { MotionWrapper } from '@/components/common/motion-wrapper/motion-wrapper';
import { Spinner } from '@/components/common/spinner/spinner';

interface JobDetailsModalStatesProperties {
  isLoading: boolean;
  error: Error | null;
}

export const JobDetailsModalStates = ({
  isLoading,
  error,
}: JobDetailsModalStatesProperties) => {
  if (isLoading) {
    return (
      <MotionWrapper
        key="loading"
        className="flex min-h-[200px] items-center justify-center py-8"
      >
        <Spinner size="lg" />
      </MotionWrapper>
    );
  }

  if (error) {
    return (
      <MotionWrapper key="error" className="text-destructive">
        Error loading job details. Please try again.
      </MotionWrapper>
    );
  }

  return (
    <MotionWrapper key="not-found" className="text-muted-foreground">
      Job not found
    </MotionWrapper>
  );
};
