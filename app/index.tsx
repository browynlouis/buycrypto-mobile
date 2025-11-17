import { Link } from 'expo-router';
import React from 'react';

import { Page } from '@/shared/components/layouts/page';
import { Button } from '@/shared/components/ui/button/button';
import { Input } from '@/shared/components/ui/input/input';
import { Text } from '@/shared/components/ui/text';

export default function Index() {
  return (
    <Page>
      <Link href="/(auth)" asChild>
        <Text>Go to Auth</Text>
      </Link>

      <Input />
      <Button size="sm">Proceed</Button>
    </Page>
  );
}
