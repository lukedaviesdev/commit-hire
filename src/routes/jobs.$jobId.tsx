import { createFileRoute } from '@tanstack/react-router';

import { JobDetailsModal } from '@/components/jobs/job-details-modal/job-details-modal';

export const Route = createFileRoute('/jobs/$jobId')({
  component: () => {
    const { jobId } = Route.useParams();
    return <JobDetailsModal jobId={jobId} />;
  },
});
