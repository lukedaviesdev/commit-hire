import { DefaultLayout } from '@/layout/default-layout';
import './styles.scss';

export const HomePage = () => {
  return (
    <DefaultLayout
      meta={{
        title: 'Home Page',
      }}
    >
      <h1>welcome to the home page</h1>
    </DefaultLayout>
  );
};
