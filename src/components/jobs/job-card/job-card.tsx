import { useNavigate } from '@tanstack/react-router';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { Job } from '@/lib/api';

export const JobCard = ({ job }: { job: Job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/jobs/$jobId', params: { jobId: job.id } });
  };

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-lg">{job.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {job.company} — {job.location}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
