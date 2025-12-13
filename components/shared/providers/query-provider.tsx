import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { toast } from '@/lib/utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      onError(error) {
        toast().error(error.message);
      },
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
