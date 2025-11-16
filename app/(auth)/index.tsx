import { Link } from 'expo-router';

import { Page } from '@/components/layouts/page';
import { Text } from '@/components/ui/text';

export default function Auth() {
  return (
    <Page>
      <Link href="/(auth)/login" asChild>
        <Text>Go to Login</Text>
      </Link>
    </Page>
  );
}
