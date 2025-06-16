import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

import { useFilteredJobs, type JobFilters } from '@/hooks/use-filtered-jobs';
import { useJobs } from '@/hooks/use-jobs';
import { useSavedJobs } from '@/hooks/use-saved-jobs';

import { JobCard } from '../job-card/job-card';
import { JobFilters as JobFiltersComponent } from '../job-filters/job-filters';

export const JobList = () => {
  const navigate = useNavigate({ from: '/jobs' });
  const search = useSearch({ from: '/jobs' });
  const { data: jobs, isLoading, error } = useJobs();
  const { savedIds } = useSavedJobs();

  // Provide defaults for optional search parameters - memoized to prevent object recreation
  const currentFilters = useMemo(
    () => ({
      search: search?.search || '',
      tag: search?.tag || 'all',
      location: search?.location || 'all',
      savedOnly: search?.savedOnly || false,
      remoteOnly: search?.remoteOnly || false,
      minSalary: search?.minSalary,
      currency: search?.currency || 'USD',
    }),
    [search],
  );

  const filteredJobs = useFilteredJobs(jobs || [], currentFilters, savedIds);

  const handleFiltersChange = (newFilters: JobFilters) => {
    // Only include non-default values in the URL
    const searchParameters: Partial<JobFilters> = {};

    if (newFilters.search && newFilters.search.trim() !== '') {
      searchParameters.search = newFilters.search;
    }

    if (newFilters.tag && newFilters.tag !== 'all') {
      searchParameters.tag = newFilters.tag;
    }

    if (newFilters.location && newFilters.location !== 'all') {
      searchParameters.location = newFilters.location;
    }

    if (newFilters.savedOnly) {
      searchParameters.savedOnly = newFilters.savedOnly;
    }

    if (newFilters.remoteOnly) {
      searchParameters.remoteOnly = newFilters.remoteOnly;
    }

    if (newFilters.minSalary && newFilters.minSalary > 0) {
      searchParameters.minSalary = newFilters.minSalary;
    }

    if (newFilters.currency && newFilters.currency !== 'USD') {
      searchParameters.currency = newFilters.currency;
    }

    navigate({
      search: searchParameters,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading jobs</div>;
  }

  return (
    <div className="space-y-6">
      <JobFiltersComponent
        jobs={jobs || []}
        onFiltersChange={handleFiltersChange}
        currentFilters={currentFilters}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            searchHighlight={search?.search || ''}
            preferredCurrency={currentFilters.currency}
          />
        ))}
      </div>
    </div>
  );
};
