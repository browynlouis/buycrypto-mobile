import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

import { getMeQueryOptions } from '@/api/queries/user';
import { Page } from '@/components/shared/layouts/page';
import { BottomScreenWrapper } from '@/components/shared/ui/bottom-screen-wrapper';
import { CopyButton } from '@/components/shared/ui/copy-button';
import { Col } from '@/components/shared/ui/flex';
import { Header } from '@/components/shared/ui/header';
import { Loader } from '@/components/shared/ui/loader';
import { QrCodeDisplay } from '@/components/shared/ui/qr-code';
import { Text } from '@/components/shared/ui/text';
import { toast } from '@/lib/utils';

const DepositViaBuyCryptoPay = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();

  const {
    data: { data: user },
  } = useSuspenseQuery(getMeQueryOptions());

  useEffect(() => {
    if (!user.username) {
      toast().error('Please set a username before using BuyCrypto pay');

      router.push('/(protected)/(user-center)/settings/my-info/username');
    }
  }, [user]);

  return (
    <>
      {/* Page Header */}
      <Header showBackButton title={`Receive`} />

      {/* Main Content */}
      <Page>
        <Col gap={24}>
          <Col align="center" gap={6}>
            <Text size="text-md" weight={600}>
              {user.username}
            </Text>
            <CopyButton
              size="sm"
              showIcon
              value={user.uniqueId}
              variant="text"
              style={{ height: 'auto' }}
            >
              <Text size="text-sm" faded>
                {user.uniqueId} (BuyCrypto ID)
              </Text>
            </CopyButton>
          </Col>

          <QrCodeDisplay size={220} />
        </Col>

        <BottomScreenWrapper>
          <CopyButton value={user.uniqueId} variant="plain" showIcon size="md">
            Copy ID
          </CopyButton>
        </BottomScreenWrapper>
      </Page>
    </>
  );
});

DepositViaBuyCryptoPay.displayName = 'DepositViaBuyCryptoPay';

export default DepositViaBuyCryptoPay;
