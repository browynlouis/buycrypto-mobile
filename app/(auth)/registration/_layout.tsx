import { Stack } from 'expo-router';

import { RegistrationFormProvider } from '@/features/auth/screens/registration';
import { useTheme } from '@/shared/components/providers/theme-provider/hooks';

export default function Layout() {
  const theme = useTheme();

  return (
    // Registration Form Context -- for steps

    <RegistrationFormProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          contentStyle: {
            backgroundColor: theme.colors.Neutral[900],
          },
        }}
      />
    </RegistrationFormProvider>
  );
}
