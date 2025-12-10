import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import React from 'react';

import { getMeQueryOptions } from '@/api/queries/user';
import { Badge } from '@/components/shared/ui/badge';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Loader } from '@/components/shared/ui/loader';
import { Text } from '@/components/shared/ui/text';

import { KycLimits } from './_partials/kyc-limits';
import { PersonalInfo } from './_partials/personal-info';

const KycScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const [
    {
      data: { data: user },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions()],
  });

  return (
    <Col gap={32}>
      {/* Header */}
      <Col gap={12}>
        <Text size="text-lg" weight={700}>
          Identity Status (KYC)
        </Text>
        <Badge status={user.kycLevel !== 'NONE'}>{user.kycLevel}</Badge>
      </Col>

      {/* Personal Info */}
      <PersonalInfo />

      {/* Verifications */}
      <KycLimits />

      <Button variant="plain" style={{ marginTop: 'auto' }}>
        {user.kycLevel === 'NONE' ? 'Begin Verification' : 'Upgrade'}
      </Button>
    </Col>
  );
});

KycScreen.displayName = 'KycScreen';

export { KycScreen };
