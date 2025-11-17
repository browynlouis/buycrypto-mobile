import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { getAuthUser } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { $api } from '@/libs/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuthStore();
  const { data, isLoading } = $api.useQuery(...getAuthUser);

  useEffect(() => {
    setAuth(data ?? null);
  }, [data]);

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return <>{children}</>;
}
