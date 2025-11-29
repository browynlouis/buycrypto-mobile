import { useTheme as useStyledTheme } from 'styled-components/native';

import { AppTheme } from '@/styles';

export function useTheme(): AppTheme {
  const theme = useStyledTheme();

  return theme;
}
