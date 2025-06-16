import { useNavigate, useSearch } from '@tanstack/react-router';

import { TextHighlight } from '@/components/common/text-highlight/text-highlight';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { Job } from '@/types/job';

interface JobCardProperties {
  job: Job;
  searchHighlight?: string;
}

export const JobCard = ({ job, searchHighlight = '' }: JobCardProperties) => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/jobs' });

  const handleClick = () => {
    navigate({ to: `/jobs/${job.id}`, search });
  };

  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-muted/50"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>
          <TextHighlight
            text={job.title}
            highlight={searchHighlight}
            className="line-clamp-2"
          />
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          <TextHighlight text={job.company} highlight={searchHighlight} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
            >
              <TextHighlight text={tag} highlight={searchHighlight} />
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground">{job.location}</div>
      </CardContent>
    </Card>
  );
};
