import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { getAuth } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { $api } from '@/libs/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
