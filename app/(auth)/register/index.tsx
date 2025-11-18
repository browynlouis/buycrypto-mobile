import React from 'react';

import { RegisterScreen } from '@/features/auth/screens';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function Register() {
  return (
    <>
      <Header showBackButton />
      <Page>
        <RegisterScreen />
      </Page>
    </>
  );
}
