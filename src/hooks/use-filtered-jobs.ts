import { useMemo } from 'react';

import { useCurrency } from '@/contexts/currency-context';

import type { Job } from '@/types/job';

export interface JobFilters {
  search: string;
  tag: string;
  location: string;
  savedOnly: boolean;
  remoteOnly: boolean;
  minSalary?: number;
  currency: string;
}

const matchesSearch = (job: Job, searchTerm: string): boolean => {
  const searchLower = searchTerm.toLowerCase();
  return (
    job.title.toLowerCase().includes(searchLower) ||
    job.company.toLowerCase().includes(searchLower) ||
    job.description.toLowerCase().includes(searchLower) ||
    job.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  );
};

const matchesLocation = (job: Job, location: string): boolean => {
  return location === 'all' || job.location === location;
};

const matchesTag = (job: Job, tag: string): boolean => {
  return tag === 'all' || job.tags.includes(tag);
};

const matchesSalary = (
  job: Job,
  minSalary: number | undefined,
  userCurrency: string,
  convert: (amount: number, fromCurrency: string, toCurrency: string) => number,
): boolean => {
  if (!minSalary || !job.salaryRange) return true;

  // Convert job's max salary to user's currency for comparison
  const jobMaxInUserCurrency = convert(
    job.salaryRange.max,
    job.salaryRange.currency || 'USD',
    userCurrency,
  );

  // Job qualifies if its maximum salary meets the user's minimum requirement
  return jobMaxInUserCurrency >= minSalary;
};

export const useFilteredJobs = (
  jobs: Job[],
  filters: JobFilters,
  savedJobIds: string[],
) => {
  const { convert } = useCurrency();

  return useMemo(() => {
    return jobs.filter((job) => {
      // Apply search filter
      if (filters.search && !matchesSearch(job, filters.search)) {
        return false;
      }

      // Apply location filter
      if (!matchesLocation(job, filters.location)) {
        return false;
      }

      // Apply tag filter
      if (!matchesTag(job, filters.tag)) {
        return false;
      }

      // Apply saved jobs filter
      if (filters.savedOnly && !savedJobIds.includes(job.id)) {
        return false;
      }

      // Apply remote filter
      if (filters.remoteOnly && !job.remote) {
        return false;
      }

      // Apply salary filter
      if (!matchesSalary(job, filters.minSalary, filters.currency, convert)) {
        return false;
      }

      return true;
    });
  }, [jobs, filters, savedJobIds, convert]);
};
