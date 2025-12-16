import { ErrorBoundary } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import 'react-native-get-random-values';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { Page } from '@/components/shared/layouts/page';
import { AuthenticatedProvider } from '@/components/shared/providers/auth-provider/authenticated-provider';
import { VerificationProvider } from '@/components/shared/providers/auth-provider/verification-provider';
import { ConfirmationProvider } from '@/components/shared/providers/confirmation-provider/confirmation-provider';
import { QueryProvider } from '@/components/shared/providers/query-provider';
import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';
import { ThemeProvider } from '@/components/shared/providers/theme-provider/theme-provider';
import { toastConfig } from '@/lib/config';
import { useAppStore, useAuthStore } from '@/store';
import { getTheme } from '@/styles';

/**
 * RootLayout
 *
 * The top-level layout for the Expo Router app.
 * Handles:
 *  - Theming via ThemeProvider
 *  - Query management via QueryProvider
 *  - Global error boundaries
 *  - Authentication and 2FA context providers
 *  - Toast notifications
 *  - SplashScreen handling
 *
 * This layout ensures all child screens have access to:
 *  - Theme context
 *  - React Query context
 *  - Authenticated user context
 *  - Verification flow context
 *  - Toast notifications
 */
export default function RootLayout() {
  // Prevent the splash screen from hiding automatically
  SplashScreen.preventAutoHideAsync();

  return (
    <ThemeProvider>
      <ConfirmationProvider>
        <QueryProvider>
          <QueryErrorResetBoundary>
            {({ reset }) => {
              const { resolvedTheme } = useAppStore();

              return (
                <ErrorBoundary fallback={<Page />} onError={() => null}>
                  <AuthenticatedProvider>
                    <VerificationProvider>
                      <Routes />
                      <Toast config={toastConfig(getTheme(resolvedTheme))} />
                    </VerificationProvider>
                  </AuthenticatedProvider>
                </ErrorBoundary>
              );
            }}
          </QueryErrorResetBoundary>
        </QueryProvider>
      </ConfirmationProvider>
    </ThemeProvider>
  );
}

/**
 * Routes
 *
 * Handles the main navigation structure of the app.
 *
 * Responsibilities:
 *  - Applies safe area insets
 *  - Sets background color and StatusBar based on theme
 *  - Configures the main Stack navigator with protected routes
 *
 * Routes:
 *  - (auth): Shown when the user is not authenticated
 *  - (protected): Shown when the user is authenticated
 */
function Routes() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  const { auth } = useAuthStore();
  const { resolvedTheme } = useAppStore();
  console.log(auth);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: theme.colors.Neutral[900],
      }}
    >
      <StatusBar style={resolvedTheme === 'light' ? 'dark' : 'light'} />
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
          <Stack.Screen name="index" />
        </Stack.Protected>

        <Stack.Protected guard={!!auth}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
