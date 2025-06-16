import { useRouter } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';

import { MotionWrapper } from '@/components/common/motion-wrapper/motion-wrapper';
import { JobCard } from '@/components/jobs/job-card/job-card';
import { JobDetailsModal } from '@/components/jobs/job-details-modal/job-details-modal';
import { useJobs } from '@/hooks/useJobs';

import { JobListStates } from './job-list-states';

export const JobList = () => {
  const router = useRouter();
  const { data: jobs, isLoading, error } = useJobs();
  const jobId = router.state.location.pathname.split('/').pop();

  if (isLoading || error) {
    return <JobListStates isLoading={isLoading} error={error} jobs={jobs} />;
  }

  return (
    <MotionWrapper className="space-y-4">
      <AnimatePresence mode="wait">
        {jobId && <JobDetailsModal jobId={jobId} />}
      </AnimatePresence>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs &&
          jobs.map((job) => (
            <MotionWrapper key={job.id} type="slide" delay={0.1}>
              <JobCard job={job} />
            </MotionWrapper>
          ))}
      </div>
    </MotionWrapper>
  );
};
