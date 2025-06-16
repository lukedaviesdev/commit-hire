import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { Job } from '@/lib/api';

import { Badge } from '@/components/ui/badge';

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
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
