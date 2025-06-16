import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  Briefcase,
  Wallet,
  Laptop,
} from 'lucide-react';

import { TextHighlight } from '@/components/common/text-highlight/text-highlight';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCurrency } from '@/contexts/currency-context';
import { useSavedJobs } from '@/hooks/use-saved-jobs';

import type { Job } from '@/types/job';

interface JobCardProperties {
  job: Job;
  searchHighlight?: string;
  preferredCurrency?: string;
}

export const JobCard = ({
  job,
  searchHighlight = '',
  preferredCurrency = 'USD',
}: JobCardProperties) => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/jobs' });
  const { isSaved, toggleSave } = useSavedJobs();
  const { convert } = useCurrency();

  const handleClick = () => {
    navigate({ to: `/jobs/${job.id}`, search });
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click navigation
    toggleSave(job.id);
  };

  const jobIsSaved = isSaved(job.id);

  const formatSalary = (salaryRange?: {
    min: number;
    max: number;
    currency?: string;
  }) => {
    if (!salaryRange) return null;

    const { min, max, currency = 'USD' } = salaryRange;

    // Format in original currency
    const originalFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 0,
    });

    const originalRange = `${originalFormatter.format(min)} – ${originalFormatter.format(max)}`;

    // If preferred currency is different, show conversion
    if (preferredCurrency !== currency) {
      const convertedMin = convert(min, currency, preferredCurrency);
      const convertedMax = convert(max, currency, preferredCurrency);

      const convertedFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: preferredCurrency,
        notation: 'compact',
        maximumFractionDigits: 0,
      });

      const convertedRange = `${convertedFormatter.format(convertedMin)} – ${convertedFormatter.format(convertedMax)}`;

      return (
        <div className="space-y-1">
          <div className="font-medium">{convertedRange}</div>
          <div className="text-xs text-muted-foreground">≈ {originalRange}</div>
        </div>
      );
    }

    return originalRange;
  };

  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-muted/50 flex flex-col justify-between"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle>
              <TextHighlight
                text={job.title}
                highlight={searchHighlight}
                className="line-clamp-2 pb-2"
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
        <div className="flex gap-4 items-start min-h-[40px]">
          {job.remote ? (
            <div className="flex items-center gap-2">
              <Laptop
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="bg-accent text-accent-foreground text-xs rounded px-2 py-0.5">
                Remote
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground ">
              <MapPin
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              {job.location}
            </div>
          )}
          <Separator orientation="vertical" className="h-5" />
          {job.salaryRange && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground flex-1">
              <Wallet
                className="h-4 w-4 text-muted-foreground mt-0.5"
                aria-hidden="true"
              />
              <div className="flex-1">{formatSalary(job.salaryRange)}</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
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
              <TextHighlight text={tag} highlight={searchHighlight} />
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
