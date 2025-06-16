import { JobList } from '@/components/jobs/job-list/job-list';
import { DefaultLayout } from '@/layout/default-layout';
import './styles.scss';

export const HomePage = () => {
  return (
    <DefaultLayout
      meta={{
        title: 'Home Page',
      }}
    >
      <JobList />
    </DefaultLayout>
  );
};
