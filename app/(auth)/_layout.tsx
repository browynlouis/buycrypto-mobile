import { Stack } from 'expo-router';

import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';

export default function Layout() {
  const theme = useAppTheme();

  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.Neutral[900],
        },
      }}
    />
  );
}
