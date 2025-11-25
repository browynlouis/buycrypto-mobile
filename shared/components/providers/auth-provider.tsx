import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { getAuth } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';
import { $api } from '@/libs/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth } = useAuthStore();
  const { data, isLoading, error } = $api.useQuery(...getAuth);

  console.log(error?.message);

  useEffect(() => {
    if (data) {
      const { data: user } = data;

      setAuth({
        id: user.id,
        email: user.email,
      });
    }
  }, [data]);

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return <>{children}</>;
}
