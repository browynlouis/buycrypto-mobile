import { Link } from 'expo-router';

import { Page } from '@/shared/components/layouts/page';
import { Text } from '@/shared/components/ui/text';

export default function Auth() {
  return (
    <Page>
      <Link href="/(auth)/login">
        <Text>Go to Login</Text>
      </Link>
    </Page>
  );
}
