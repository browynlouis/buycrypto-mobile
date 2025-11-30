import { Stack } from 'expo-router';

import { useAppTheme } from '@/shared/components/providers/theme-provider/hooks';

export default function Layout() {
  const theme = useAppTheme();

  return (
    <Stack
      initialRouteName="(user-center)/index"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.Neutral[900],
        },
      }}
    />
  );
}
