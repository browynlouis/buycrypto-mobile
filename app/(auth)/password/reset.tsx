import React from 'react';

import { ResetPasswordScreen } from '@/features/auth/screens';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function ResetPassword() {
  return (
    <>
      <Header showBackButton />
      <Page>
        <ResetPasswordScreen />
      </Page>
    </>
  );
}
