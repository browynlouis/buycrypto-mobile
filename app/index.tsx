import { Link } from 'expo-router';
import React from 'react';

import { Page } from '@/components/shared/layouts/page';
import { Button } from '@/components/shared/ui/button/button';
import { Input } from '@/components/shared/ui/input/input';
import { Text } from '@/components/shared/ui/text';

export default function Index() {
  return (
    <Page>
      <Link href="/(auth)/login" asChild>
        <Text>Go to Auth</Text>
      </Link>

      <Input />
      <Button size="sm">Proceed</Button>
    </Page>
  );
}
