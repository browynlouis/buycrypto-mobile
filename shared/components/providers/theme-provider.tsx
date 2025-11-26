import { useFonts } from 'expo-font';
import React from 'react';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components/native';

import { useAppStore } from '@/libs/store';
import { getTheme } from '@/styles';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useAppStore();

  useFonts({
    'circular-std-black': require('@/assets/fonts/circular-std-black.ttf'),
    'circular-std-bold': require('@/assets/fonts/circular-std-bold.ttf'),
    'circular-std-medium': require('@/assets/fonts/circular-std-medium.ttf'),
  });

  return (
    <StyledComponentThemeProvider theme={getTheme(resolvedTheme)}>
      {children}
    </StyledComponentThemeProvider>
  );
}
