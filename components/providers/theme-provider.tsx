import { useFonts } from 'expo-font';
import React from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as StyledComponentThemeProvider } from 'styled-components/native';

import { getTheme } from '@/styles';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'circular-std-black': require('@/assets/fonts/circular-std-black.ttf'),
    'circular-std-bold': require('@/assets/fonts/circular-std-bold.ttf'),
    'circular-std-medium': require('@/assets/fonts/circular-std-medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StyledComponentThemeProvider
      theme={colorScheme ? getTheme(colorScheme) : getTheme(colorScheme)}
    >
      {children}
    </StyledComponentThemeProvider>
  );
}
