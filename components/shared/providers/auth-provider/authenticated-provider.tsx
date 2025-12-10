import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { $queryClient } from '@/api/clients/query-client';
import { useAuthStore } from '@/store';

export function AuthenticatedProvider({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuthStore();
  const { data, isLoading } = $queryClient.useQuery('get', '/auth');

  useEffect(() => {
    if (data) {
      const { data: auth } = data;

      setAuth(auth);
    }
  }, [data]);

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return <>{children}</>;
}
