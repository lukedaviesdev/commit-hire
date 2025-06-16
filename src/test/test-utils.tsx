import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: AllTheProviders, ...options }),
  };
};

export * from '@testing-library/react';

export { customRender as render };
