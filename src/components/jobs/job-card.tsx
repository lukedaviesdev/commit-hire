import { useNavigate } from '@tanstack/react-router';
import { Building2, MapPin, Wallet, Laptop } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useCurrency } from '@/contexts/currency-context';

import type { Job } from '@/types/job';

interface JobCardProperties {
  job: Job;
  userCurrency?: string;
}

export const JobCard = ({ job, userCurrency = 'USD' }: JobCardProperties) => {
  const navigate = useNavigate();
  const { convert } = useCurrency();

  const formatSalary = (
    min: number,
    max: number,
    originalCurrency: string,
    targetCurrency: string,
  ) => {
    const convertedMin = convert(min, originalCurrency, targetCurrency);
    const convertedMax = convert(max, originalCurrency, targetCurrency);

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: targetCurrency,
      maximumFractionDigits: 0,
    });

    const convertedRange = `${formatter.format(convertedMin)} - ${formatter.format(convertedMax)}`;

    // Show original if different currency
    if (originalCurrency !== targetCurrency) {
      const originalFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: originalCurrency,
        maximumFractionDigits: 0,
      });
      const originalRange = `${originalFormatter.format(min)} - ${originalFormatter.format(max)}`;
      return `${convertedRange} (orig. ${originalRange})`;
    }

    return convertedRange;
  };

  const handleViewDetails = () => {
    navigate({
      to: '/jobs',
      search: (previous) => ({ ...previous, jobId: job.id }),
    });
  };

  return (
    <Card className="group h-full cursor-pointer transition-all hover:shadow-md">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{job.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm">{job.company}</span>
            </div>
          </div>
          {job.remote && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Laptop className="h-3 w-3" aria-hidden="true" />
              Remote
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>{job.location}</span>
          </div>
          {job.salaryRange && (
            <div className="flex items-center gap-1">
              <Wallet className="h-4 w-4" aria-hidden="true" />
              <span>
                {formatSalary(
                  job.salaryRange.min,
                  job.salaryRange.max,
                  job.salaryRange.currency!,
                  userCurrency,
                )}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {job.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewDetails}
          className="ml-2 shrink-0"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
