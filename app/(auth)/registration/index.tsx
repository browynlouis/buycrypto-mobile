import { Link } from 'expo-router';
import React from 'react';

import { CountrySelectionScreen } from '@/components/features/auth/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';
import { Text } from '@/components/shared/ui/text';

export default function RegistrationCountrySelectionPage() {
  return (
    <>
      {/* Page Header */}
      <Header
        showBackButton
        rightElement={
          <Link href={'/(auth)/login'}>
            <Text align="center" color="link">
              Login
            </Text>
          </Link>
        }
      />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <CountrySelectionScreen />
      </Page>
    </>
  );
}
