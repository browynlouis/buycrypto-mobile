import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';

import { getKycInfoQueryOptions } from '@/api/queries/kyc';
import { getMeQueryOptions } from '@/api/queries/user';
import { BottomScreenWrapper } from '@/components/shared/ui/bottom-screen-wrapper';
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
      data: { data: kyc },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getKycInfoQueryOptions()],
  });

  return (
    <>
      <Col gap={32}>
        {/* Header */}
        <Intro kycLevel={kyc.currentKycLevel} />

        {/* Personal Info */}
        <PersonalInfo profile={user.profile} />

        {/* Verifications */}
        <KycLimits kycLevel={kyc.currentKycLevel} />
      </Col>

      {/* If user kyc is yet to be verified, allow profile update -  */}
      <BottomScreenWrapper>
        <Button
          variant="plain"
          size="lg"
          endAdornment={<Icon name="ArrowRight2" />}
          onPress={() => {
            if (!kyc.currentKycLevel) {
              router.push('/(protected)/(user-center)/settings/my-info/personal-info');
            } else {
            }
          }}
        >
          Continue
        </Button>
      </BottomScreenWrapper>
    </>
  );
});

KycScreen.displayName = 'KycScreen';

export { KycScreen };
