import { RepoData } from '@/components/repo-data/repo-data';
import { DefaultLayout } from '@/layout/default-layout';

export const DataPage = () => {
  return (
    <DefaultLayout
      meta={{
        title: 'Data Example',
      }}
    >
      <div className="border rounded-lg p-6 bg-card space-y-8">
        <p>An example of data fetching with TanStack Query</p>
        <RepoData />
      </div>
    </DefaultLayout>
  );
};
