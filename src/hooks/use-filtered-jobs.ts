import { useMemo } from 'react';

import type { JobFilters } from '@/components/jobs/job-filters/job-filters';
import type { Job } from '@/types/job';

export const useFilteredJobs = (
  jobs: Job[],
  filters: JobFilters,
  savedIds: string[] = [],
) => {
  return useMemo(() => {
    return jobs.filter((job) => {
      // Saved only filter
      if (filters.savedOnly && !savedIds.includes(job.id)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.tags.some((tag) => tag.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
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

      return true;
    });
  }, [jobs, filters, savedIds]);
};
