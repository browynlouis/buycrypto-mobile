import { Stack } from 'expo-router';

import { useTheme } from '@/libs/hooks';

export default function Layout() {
  const theme = useTheme();

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
