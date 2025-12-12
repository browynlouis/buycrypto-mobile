import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';

import { getMeQueryOptions } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { Loader } from '@/components/shared/ui/loader';

import { Intro } from './_partials/intro';
import { KycLimits } from './_partials/kyc-limits';
import { PersonalInfo } from './_partials/personal-info';

const KycScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();

  const [
    {
      data: { data: user },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions()],
  });

  return (
    <>
      <Col gap={32}>
        {/* Header */}
        <Intro kycLevel={user.kycLevel} />

        {/* Personal Info */}
        <PersonalInfo />

        {/* Verifications */}
        <KycLimits />
      </Col>

      {user.kycLevel !== null && (
        <Button
          variant="plain"
          size="md"
          style={{ marginTop: 'auto' }}
          endAdornment={user.kycLevel ? <Icon name="Shield" /> : <Icon name="ShieldPlus" />}
          onPress={() =>
            router.push('/(protected)/(user-center)/settings/my-info/kyc/personal-info')
          }
        >
          {user.kycLevel ? 'Begin Verification' : 'Upgrade'}
        </Button>
      )}
    </>
  );
});

KycScreen.displayName = 'KycScreen';

export { KycScreen };
