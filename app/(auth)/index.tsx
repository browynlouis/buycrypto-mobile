import { Link } from 'expo-router';

import { useAuthStore } from '@/features/auth/store';
import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button';
import { Text } from '@/shared/components/ui/text';

export default function Auth() {
  const { clearTokens } = useAuthStore();
  return (
    <Page>
      <Link href="/(auth)/login">
        <Text>Go to Login</Text>
      </Link>

      <Button onPress={() => clearTokens()}>Logout</Button>
    </Page>
  );
}
