import { MapPin, Briefcase } from 'lucide-react';

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
            className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            <Briefcase
              className="h-3 w-3 text-muted-foreground"
              aria-hidden="true"
            />
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Location</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          {job.location}
        </div>
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
