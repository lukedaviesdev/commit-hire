import { useNavigate, useSearch } from '@tanstack/react-router';

import { useFilteredJobs } from '@/hooks/use-filtered-jobs';
import { useJobs } from '@/hooks/use-jobs';

import { JobCard } from '../job-card/job-card';
import {
  JobFilters,
  type JobFilters as JobFiltersType,
} from '../job-filters/job-filters';

export const JobList = () => {
  const navigate = useNavigate({ from: '/jobs' });
  const search = useSearch({ from: '/jobs' });
  const { data: jobs, isLoading, error } = useJobs();

  // Provide defaults for optional search parameters
  const currentFilters = {
    search: search?.search || '',
    tag: search?.tag || 'all',
    location: search?.location || 'all',
  };

  const filteredJobs = useFilteredJobs(jobs || [], currentFilters);

  const handleFiltersChange = (newFilters: JobFiltersType) => {
    // Only include non-default values in the URL
    const searchParameters: Partial<JobFiltersType> = {};

    if (newFilters.search && newFilters.search.trim() !== '') {
      searchParameters.search = newFilters.search;
    }

    if (newFilters.tag && newFilters.tag !== 'all') {
      searchParameters.tag = newFilters.tag;
    }

    if (newFilters.location && newFilters.location !== 'all') {
      searchParameters.location = newFilters.location;
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
      <JobFilters
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
          />
        ))}
      </div>
    </div>
  );
};
