import React from 'react';

import { LoginScreen } from '@/features/auth/screens/';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function Login() {
  return (
    <>
      <Header showBackButton />
      <Page>
        <LoginScreen />
      </Page>
    </>
  );
}
