import React from 'react';

import { ResetPasswordScreen } from '@/features/auth/screens/forgot-password';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

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
