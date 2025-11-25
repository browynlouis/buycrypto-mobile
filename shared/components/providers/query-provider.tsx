import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { toast } from '@/libs/utils';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
    mutations: {
      onSuccess(data, variables, onMutateResult, context) {
        toast().success((data as any)?.message ?? 'Request successful');
      },
      onError(error) {
        toast().error(error.message);
      },
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
