import { ErrorBoundary } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuthStore } from '@/features/auth/store';
import { useTheme } from '@/libs/hooks';
import { Page } from '@/shared/components/layouts/page';
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
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary fallback={<Page></Page>} onError={() => null}>
              <AuthProvider>
                <Routes />
              </AuthProvider>
              <ToastProvider />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
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
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
