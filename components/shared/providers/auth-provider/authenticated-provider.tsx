import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { getAuth } from '@/api/auth/routes';
import { $api } from '@/libs/api';
import { useAuthStore } from '@/libs/store';

export function AuthenticatedProvider({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuthStore();
  const { data, isLoading } = $api.useQuery(...getAuth);

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
