import { useNavigate, useSearch } from '@tanstack/react-router';
import { Bookmark, BookmarkCheck } from 'lucide-react';

import { TextHighlight } from '@/components/common/text-highlight/text-highlight';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSavedJobs } from '@/hooks/use-saved-jobs';

import type { Job } from '@/types/job';

interface JobCardProperties {
  job: Job;
  searchHighlight?: string;
}

export const JobCard = ({ job, searchHighlight = '' }: JobCardProperties) => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/jobs' });
  const { isSaved, toggleSave } = useSavedJobs();

  const handleClick = () => {
    navigate({ to: `/jobs/${job.id}`, search });
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click navigation
    toggleSave(job.id);
  };

  const jobIsSaved = isSaved(job.id);

  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-muted/50"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
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
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSaveClick}
            className="shrink-0"
            aria-label={jobIsSaved ? 'Unsave job' : 'Save job'}
          >
            {jobIsSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
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
