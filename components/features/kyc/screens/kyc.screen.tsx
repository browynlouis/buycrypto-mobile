import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';

import { getMeProfileQueryOptions, getMeQueryOptions } from '@/api/queries/user';
import { UserProfileResource } from '@/api/types';
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
    {
      data: { data: profile },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getMeProfileQueryOptions()],
  });

  return (
    <>
      <Col gap={32}>
        {/* Header */}
        <Intro kycLevel={user.kycLevel} />

        {/* Personal Info */}
        <PersonalInfo profile={profile as UserProfileResource | null} />

        {/* Verifications */}
        <KycLimits kycLevel={user.kycLevel} />
      </Col>

      {/* If user kyc is yet to be verified, allow profile update -  */}
      {user.kycLevel === 0 ? (
        <Button
          variant="plain"
          size="lg"
          style={{ marginTop: 'auto' }}
          endAdornment={<Icon name="ArrowRight2" />}
          onPress={() => router.push('/(protected)/(user-center)/settings/my-info/personal-info')}
        >
          Continue
        </Button>
      ) : (
        <Button
          variant="plain"
          size="lg"
          onPress={() => {}}
          style={{ marginTop: 'auto' }}
          endAdornment={<Icon name="ArrowRight2" />}
        >
          {!user.kycLevel ? 'Begin Verification' : 'Upgrade Verification'}
        </Button>
      )}
    </>
  );
});

KycScreen.displayName = 'KycScreen';

export { KycScreen };
