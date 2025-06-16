import { createFileRoute } from '@tanstack/react-router';

import { JobsPage } from '@/pages/jobPage';

export interface JobsSearch {
  search?: string;
  tag?: string;
  location?: string;
}

export const Route = createFileRoute('/jobs')({
  validateSearch: (search: Record<string, unknown>): JobsSearch => {
    // Only include params that are actually present in the URL
    const result: JobsSearch = {};

    if (search.search !== undefined && search.search !== null) {
      result.search = search.search.toString();
    }

    if (search.tag !== undefined && search.tag !== null) {
      result.tag = search.tag.toString();
    }

    if (search.location !== undefined && search.location !== null) {
      result.location = search.location.toString();
    }

    return result;
  },
  component: JobsPage,
});
