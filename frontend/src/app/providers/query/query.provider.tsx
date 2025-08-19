import React from 'react';
import { IQueryProviderProps } from './types';
import { QUERY_CONFIG } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryProvider: React.FC<IQueryProviderProps> = ({ children }) => {
  const queryClient = new QueryClient(QUERY_CONFIG);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
