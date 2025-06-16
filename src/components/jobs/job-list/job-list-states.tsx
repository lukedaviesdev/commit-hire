import { MotionWrapper } from '@/components/common/motion-wrapper/motion-wrapper';
import { Spinner } from '@/components/common/spinner/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';

import type { Job } from '@/types/job';

interface JobListStatesProperties {
  isLoading: boolean;
  error: Error | null;
  jobs: Job[] | undefined;
}

export const JobListStates = ({
  isLoading,
  error,
  jobs,
}: JobListStatesProperties) => {
  if (isLoading) {
    return (
      <MotionWrapper className="flex min-h-[200px] items-center justify-center">
        <Spinner size="lg" />
      </MotionWrapper>
    );
  }

  if (error) {
    return (
      <MotionWrapper>
        <Alert variant="destructive">
          <AlertDescription>
            Error loading jobs. Please try again.
          </AlertDescription>
        </Alert>
      </MotionWrapper>
    );
  }

  if (!jobs?.length) {
    return (
      <MotionWrapper>
        <Alert>
          <AlertDescription>No jobs found.</AlertDescription>
        </Alert>
      </MotionWrapper>
    );
  }
};
