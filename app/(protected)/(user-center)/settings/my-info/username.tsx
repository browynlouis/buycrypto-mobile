import React from 'react';

import { UsernameScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function UsernamePage() {
  return (
    <>
      {/* Page Header */}
      <Header title="Username" />

      {/* Main Content */}
      <Page>
        <UsernameScreen />
      </Page>
    </>
  );
}
