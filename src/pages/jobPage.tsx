import { Outlet } from '@tanstack/react-router';

import { JobList } from '@/components/jobs/job-list/job-list';
import { DefaultLayout } from '@/layout/default-layout';
import './styles.scss';

export const JobsPage = () => {
  return (
    <DefaultLayout
      meta={{
        title: 'Jobs Page',
      }}
    >
      <JobList />
      <Outlet />
    </DefaultLayout>
  );
};
