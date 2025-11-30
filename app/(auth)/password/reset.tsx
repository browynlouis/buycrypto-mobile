import React from 'react';

import { ResetPasswordScreen } from '@/components/features/auth/screens';
import { Header } from '@/components/shared/header';
import { Page } from '@/components/shared/layouts/page';

export default function ResetPassword() {
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
