import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components/native';

import { useAppStore } from '@/store';
import { getTheme } from '@/styles';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const { resolvedTheme, themeAppearance } = useAppStore();

  useFonts({
    'circular-std-black': require('@/assets/fonts/circular-std-black.ttf'),
    'circular-std-bold': require('@/assets/fonts/circular-std-bold.ttf'),
    'circular-std-medium': require('@/assets/fonts/circular-std-medium.ttf'),
  });

  return (
    <StyledComponentThemeProvider
      theme={getTheme(themeAppearance === 'system' ? colorScheme : resolvedTheme)}
    >
      {children}
      <StatusBar
        style={themeAppearance === 'system' ? 'auto' : resolvedTheme === 'light' ? 'dark' : 'light'}
      />
    </StyledComponentThemeProvider>
  );
}
