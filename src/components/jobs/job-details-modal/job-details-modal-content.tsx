import { MotionWrapper } from '@/components/common/motion-wrapper/motion-wrapper';
import { DialogDescription } from '@/components/ui/dialog';

import type { Job } from '@/types/job';

interface JobDetailsModalContentProperties {
  job: Job;
}

export const JobDetailsModalContent = ({
  job,
}: JobDetailsModalContentProperties) => {
  return (
    <MotionWrapper key="content" type="slide" className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{job.title}</h2>
        <p className="text-muted-foreground">{job.company}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Location</h3>
        <p className="text-muted-foreground">{job.location}</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Description</h3>
        <DialogDescription className="text-muted-foreground whitespace-pre-wrap">
          {job.description}
        </DialogDescription>
      </div>
    </MotionWrapper>
  );
};
