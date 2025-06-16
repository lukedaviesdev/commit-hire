import { useQuery } from '@tanstack/react-query';

import { fetchJobs } from '../lib/api';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};
