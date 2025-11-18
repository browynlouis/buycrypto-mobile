import { SplashScreen, Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '@/features/auth/store';
import { useTheme } from '@/libs/hooks';
import {
  AuthProvider,
  QueryProvider,
  ThemeProvider,
  ToastProvider,
} from '@/shared/components/providers';

// Keep SplashScreen open and close laters
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
        <ToastProvider />
      </QueryProvider>
    </ThemeProvider>
  );
}

function Routes() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { auth } = useAuthStore();

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
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.Neutral[900],
          },
        }}
      >
        <Stack.Protected guard={!auth}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={!!auth}>
          <Stack.Screen name="(protected)/index" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
