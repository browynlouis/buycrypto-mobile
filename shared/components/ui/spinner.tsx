import { ActivityIndicator } from 'react-native';

import { useAppTheme } from '../providers/theme-provider/hooks';

export function Spinner() {
  const theme = useAppTheme();

  return <ActivityIndicator color={theme.colors.Neutral[900]} />;
}
