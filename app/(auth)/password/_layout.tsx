import { Stack } from 'expo-router';

import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';

export default function Layout() {
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        contentStyle: {
          backgroundColor: theme.colors.Neutral[900],
        },
      }}
    />
  );
}
