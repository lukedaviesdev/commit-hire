import { useMemo } from 'react';

import { useCurrencyConversion } from './use-currency-conversion';

import type { JobFilters } from '@/components/jobs/job-filters/job-filters';
import type { Job } from '@/types/job';

const matchesSearch = (job: Job, searchTerm: string): boolean => {
  const searchLower = searchTerm.toLowerCase();
  return (
    job.title.toLowerCase().includes(searchLower) ||
    job.company.toLowerCase().includes(searchLower) ||
    job.tags.some((tag) => tag.toLowerCase().includes(searchLower))
  );
};

const matchesSalaryRange = (
  job: Job,
  minSalary?: number,
  userCurrency: string = 'USD',
  convertFunction?: (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ) => number,
): boolean => {
  // If no salary filter is set, pass the filter
  if (!minSalary) return true;

  // If salary filter is set but job has no salary range, exclude it
  if (!job.salaryRange || !convertFunction) return false;

  // Convert job salary range to user's preferred currency
  const jobMaxInUserCurrency = convertFunction(
    job.salaryRange.max,
    job.salaryRange.currency || 'USD',
    userCurrency,
  );

  // Check minimum salary requirement (user's min vs job's max)
  // A job matches if its maximum salary is at least the user's minimum requirement
  return jobMaxInUserCurrency >= minSalary;
};

export const useFilteredJobs = (
  jobs: Job[],
  filters: JobFilters,
  savedIds: string[] = [],
) => {
  const { convert } = useCurrencyConversion();

  return useMemo(() => {
    return jobs.filter((job) => {
      // Saved only filter
      if (filters.savedOnly && !savedIds.includes(job.id)) {
        return false;
      }

      // Search filter
      if (filters.search && !matchesSearch(job, filters.search)) {
        return false;
      }

      // Tag filter
      if (
        filters.tag &&
        filters.tag !== 'all' &&
        !job.tags.includes(filters.tag)
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        filters.location !== 'all' &&
        job.location !== filters.location
      ) {
        return false;
      }

      // Remote only filter
      if (filters.remoteOnly && job.remote !== true) {
        return false;
      }

      // Minimum salary filter with currency conversion
      if (
        !matchesSalaryRange(job, filters.minSalary, filters.currency, convert)
      ) {
        return false;
      }

      return true;
    });
  }, [jobs, filters, savedIds, convert]);
};
