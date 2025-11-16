import { Stack } from 'expo-router';

import { useTheme } from '@/libs/hooks';

export default function Layout() {
  const theme = useTheme();

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
