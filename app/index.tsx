import React from 'react';

import { Page } from '@/components/layouts/page';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';

export default function Index() {
  return (
    <Page>
      <Input />
      <Button size="sm">Proceed</Button>
    </Page>
  );
}
