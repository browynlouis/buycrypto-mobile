import React from 'react';

import { ForgotPasswordScreen } from '@/features/auth/screens/';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function ForgotPassword() {
  return (
    <>
      <Header showBackButton title="Forgot Password" />
      <Page>
        <ForgotPasswordScreen />
      </Page>
    </>
  );
}
