import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { getMeProfileQueryOptions } from '@/api/queries/user';
import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';
import { Loader } from '@/components/shared/ui/loader';

const Layout = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const theme = useAppTheme();

  // Fetch User's profile
  const {
    data: { data },
  } = useSuspenseQuery(getMeProfileQueryOptions());

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.Neutral[900],
        },
      }}
    >
      <Stack.Screen name="index" />

      {/* Wrap around a suspense and only render stack if user has successfully completed their profile */}
      <Stack.Protected guard={data !== null}>
        <Stack.Screen name="verification/confirmation" />
      </Stack.Protected>
    </Stack>
  );
});

Layout.displayName = 'Layout';
export default Layout;
