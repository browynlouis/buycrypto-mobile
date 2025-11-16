import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { useTheme } from '@/libs/hooks';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

function Routes() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: theme.colors.Neutral[900],
      }}
    >
      <Stack
        initialRouteName="(auth)"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.Neutral[900],
          },
        }}
      >
        <Stack.Protected guard={true}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
