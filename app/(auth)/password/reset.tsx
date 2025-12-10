import React from 'react';

import { ResetPasswordScreen } from '@/components/features/auth/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function ResetPasswordPage() {
  return (
    <>
      {/* Page Header */}
      <Header showBackButton />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <ResetPasswordScreen />
      </Page>
    </>
  );
}
